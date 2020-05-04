import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import Modal from './Modal';
import sampleFishes from '../sample-fishes';
import base from '../base';

const {Component} = React;

class App extends Component {
    constructor() {
        super();
        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);

        this.state = {
            fishes: {},
            order: {},
            meats:{},
            compt: {},
            sup: {}
        }
    }

    componentWillMount(){
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if (localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }


    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    addFish(fish) {
        //update our state
        const fishes = {...this.state.fishes};//put the existent fishes into a new variable its a copy
        //add in our new fish
        const timestamp = Date.now();

        fishes[`fish-${timestamp}`] = fish;
        //set state
        this.setState({ fishes });
    }

    updateFish(key, updateFish) {
         const fishes = {...this.state.fishes};
         fishes[key] = updateFish;
         this.setState ({ fishes });
    }

    removeFish(key) {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes});
    }

    loadSamples() {
        console.log(sampleFishes);
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder(key) {
        //take a copy of our state
        const order = {...this.state.order};
        ///update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        //update our state
        this.setState({order});
    }

    removeFromOrder(key) {
        const order = {...this.state.order};

        delete order[key];
        this.setState({order});
    }

    render(){
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="fresh sea food"/>
                    <ul className="list-of-fishes">
                        {
                            Object.keys(this.state.fishes)
                            .map(key => <Fish
                                            key={key}
                                            index={key}
                                            details={this.state.fishes[key]}
                                            addToOrder={this.addToOrder}/>
                                )
                        }
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    params={this.state.params}
                    removeFromOrder={this.removeFromOrder}
                />

                <Inventory
                    addFish={this.addFish}
                    removeFish={this.removeFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                    storeId={this.props.params.storeId}
                />
            </div>
        );
    }
}


export default App;

    // <div className="menu">
                //  <Header tagline="fresh sea food"/>
                // </div>
                // <Order />

                // <Inventory />
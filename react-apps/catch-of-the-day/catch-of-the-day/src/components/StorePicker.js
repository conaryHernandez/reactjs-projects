import React from 'react';
import ReactDOM from 'react-dom';
import {getFunName} from '../helpers'; 

const { Component } = React;

class StorePicker extends Component {
	constructor(){
		super();

		this.goToStore = this.goToStore.bind(this);
	}

	goToStore(event){
		event.preventDefault();

		const storeId = this.storeInput.value;

		this.context.router.transitionTo(`/store/${storeId}` );
	}

	render(){
		return (
	      <form className="store-selector" onSubmit={this.goToStore}>
	        <h2>Please Enter a Store</h2>
	        <input type="text" required placeholder="store name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} />
	        <button type="submit">Visit a Store</button>
	      </form>
    	);	
 	}
}

StorePicker.contextTypes= {
	router: React.PropTypes.object
}


export default StorePicker;
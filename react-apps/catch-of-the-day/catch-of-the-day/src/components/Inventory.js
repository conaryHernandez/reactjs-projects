import React from 'react';
import ReactDOM from 'react-dom';
import FishForm from './FishForm';
import base from '../base';

const { Component } = React ;

class Inventory extends Component {
   constructor(){
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.state= {
          uid: null,
          owner: null
        }
   }

   componentDidMount() {
      base.onAuth((user)=> {
        if(user){
          this.authHandler(null, {user});
        }
      });
   }

   handleChange(e, key) {
        const fish = this.props.fishes[key];

        const updatedFish = {
            ...fish,
            [e.target.name]:e.target.value
        }

        this.props.updateFish(key, updatedFish);
   }

   authenticate(provider) {
      base.authWithOAuthPopup(provider, this.authHandler);
   }

   logout() {
     base.unauth();
     this.setState({ uid:null });
   }

   authHandler(err, authData) {
      if (err) {
        console.error(err);
        return;
      }

      const storeRef = base.database().ref(this.props.storeId);

      storeRef.once('value', (snapshot)=> {
          const data = snapshot.val() || {};

          if(!data.owner) {
            storeRef.set({
              owner: authData.user.uid
            })
          }

          this.setState({
            uid: authData.user.uid,
            owner: data.owner || authData.user.uid
          })
      });
   }

   renderLogin() {
      return(
        <nav className="login">
          <h2>Inventory</h2>
            <p>Sign in to manage your store's Inventory</p>
            <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
            <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
        </nav>
      )
   }

   renderInventory(key) {
        const fish = this.props.fishes[key];

        return(
            <div className="fish-edit" key={key}>
                <input type="text"  name="name" value={fish.name} placeholder="fish Name" onChange={(e)=> this.handleChange(e, key)}/>
                <input type="text"  name="price" value={fish.price} placeholder="fish Price" onChange={(e)=> this.handleChange(e, key)}/>
                <select name="status" value={fish.status} onChange={(e)=> this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea  name="desc" value={fish.desc} placeholder="fish Desc" onChange={(e)=> this.handleChange(e, key)}></textarea>
                <input  name="image" value={fish.image} type="text" placeholder="fish Image" onChange={(e)=> this.handleChange(e, key)}/>
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
   }

  render(){
    const logout = <button onClick={()=> this.logout()}>Log Out!</button>;
    //if they are not logged in
    if(!this.state.uid) {
        return <div>{this.renderLogin()}</div>
    }


    //check the owner
    if(this.state.uid !== this.state.owner) {
        return (
          <div>
            <p>Sorry you aren't the owner of this store!</p>
            {logout}
          </div>
        )
    }

    return (
      <div className="Inventory-container">
        <h2>Inventory</h2>
        {logout}
            {Object.keys(this.props.fishes).map(this.renderInventory)}
        <FishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;
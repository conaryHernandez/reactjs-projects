import React from 'react';
import ReactDOM from 'react-dom';

const {Component} = React;

class FishForm extends Component {

	createFish(event) {
		event.preventDefault();

		const fish = {
			name: this.name.value,
			price: this.price.value,

			status: this.status.value,

			desc: this.desc.value,

			image: this.image.value,
		}
		this.props.addFish(fish);
		this.FishForm.reset();
	}
	render(){
		return(
			<form ref={(input)=> this.FishForm = input}className="fish-edit" onSubmit={(e)=> this.createFish(e)}>
				<input  ref={(input) => this.name = input}type="text" placeholder="fish Name"/>
				<input  ref={(input) => this.price = input}type="text" placeholder="fish Price"/>
				<select ref={(input) => this.status = input}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea  ref={(input) => this.desc = input}placeholder="fish Desc"></textarea>
				<input  ref={(input) => this.image = input}type="text" placeholder="fish Image"/>
				<button type="submit">Add Fish</button>
			</form>
		);
	}
}


export default FishForm;
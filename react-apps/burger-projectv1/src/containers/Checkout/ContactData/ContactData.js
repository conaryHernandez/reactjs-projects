import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

const buildFormElement = (
		inputType = 'input',
		type = 'text',
		placeholder = 'Your placeholder...',
		additionalProperties = {}
	) => {
	let options = {};

  options = {
  	elementType: inputType,
  	elementConfig: {
  		type: type,
  		placeholder: placeholder,
  		...additionalProperties
  	},
  	value: ''
  };

	return options;
}

const deliveryOptions = [
	{value: 'fastest', displayValue: 'fastest'},
	{value: 'cheapest', displayValue: 'cheapest'}
];

class ContactData extends Component {
	state = {
		orderForm: {
			name: buildFormElement('input', 'text', 'Your name...'),
      street: buildFormElement('input', 'text', 'Street...'),
      zipCode: buildFormElement('input', 'text', 'Zip Code...'),
      country: buildFormElement('input', 'text', 'Country'),
      email: buildFormElement('input', 'email', 'Your email...'),
    	deliveryMethod: buildFormElement('select', 'text', 'Your deliveryMethod...', {options: deliveryOptions}),
		},
		loading: false
	}

	orderHandler = (e) => {
		e.preventDefault();

    this.setState({ loading : true });

		const formData = {};

		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}

    const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData: formData
    };

    axios.post('/orders.json', order)
      .then(response => {
          console.log('response', response);
          this.setState({ loading: false });
          this.props.history.push('/');
      })
      .catch(error => {
          console.log('error', error);
          this.setState({ loading: false });
      });

	}

	inputChangedHandler = (event) => {
		const { name, value} = event.target;
		const updatedForm = {...this.state.orderForm};

		updatedForm[name].value = value;

		this.setState({ orderForm: updatedForm });
	}

	render() {
		const formElementsArray = [];

		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
				name: key
			});
		}

		if(this.state.loading) {

			return <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data:</h4>
				<form onSubmit={this.orderHandler}>
					{ formElementsArray.map(formElement => (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							elementName={formElement.name}
							value={formElement.config.value}
							changed={this.inputChangedHandler}
						/>
						)
					)}
					<Button btnType="Success">Order</Button>
				</form>
			</div>
		);
	}

}

export default ContactData;
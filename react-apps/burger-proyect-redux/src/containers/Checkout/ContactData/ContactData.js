import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/order';

const buildFormElement = (
		inputType = 'input',
		type = 'text',
		placeholder = 'Your placeholder...',
		value = '',
		validations = {},
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
  	value,
  	validations,
  	valid: false,
  	touched: false,
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
			name: buildFormElement('input', 'text', 'Your name...', '', {required: true}),
			street: buildFormElement('input', 'text', 'Street...', '', {required: true}),
			zipCode: buildFormElement('input', 'text', 'Zip Code...', '', {required: true, minLength: 5, maxLength: 7}),
			country: buildFormElement('input', 'text', 'Country', '', {required: true}),
			email: buildFormElement('input', 'email', 'Your email...', '', {required: true}),
    		deliveryMethod: buildFormElement('select', 'text', 'Your deliveryMethod...', 'fastest', {} , {options: deliveryOptions}),
		},
		formIsValid: false,
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
			ingredients: this.props.ings,
			price: this.props.totalPrice,
			orderData: formData
		};

		this.props.onOrderBurger(order);
	}

	inputChangedHandler = (event) => {
		const { name, value} = event.target;
		const updatedForm = {...this.state.orderForm};
		let formIsValid = true;

		updatedForm[name].value = value;
		updatedForm[name].valid = this.checkValidity(updatedForm[name].value, updatedForm[name].validations);
		updatedForm[name].touched = true;

		for (let inputIdentifier in updatedForm) {
			formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
		}

		this.setState({ orderForm: updatedForm, formIsValid });
	}

	checkValidity = (value, rules) => {
		let isValid = true;

		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.minLength && isValid;
		}

		return isValid;
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

		if(this.props.loading) {

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
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validations}
							touched={formElement.config.touched}
						/>
						)
					)}
					<Button disabled={!this.state.formIsValid} className={classes.Button} btnType="Success">Order</Button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		loading: state.order.loading
	};
}

const mapDispatchToProps= dispatch => {
	return {
		onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),  
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
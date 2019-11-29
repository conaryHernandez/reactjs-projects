import React, {useState} from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/order';
import { buildFormElement, checkValidity, buildFormElements } from '../../../utils/utils';
 
const deliveryOptions = [
	{value: 'fastest', displayValue: 'fastest'},
	{value: 'cheapest', displayValue: 'cheapest'}
];

const ContactData = (props) => {
	const [orderForm, setOrderForm] = useState({
		name: buildFormElement('input', 'text', 'Your name...', '', {required: true}),
		street: buildFormElement('input', 'text', 'Street...', '', {required: true}),
		zipCode: buildFormElement('input', 'text', 'Zip Code...', '', {required: true, minLength: 5, maxLength: 7}),
		country: buildFormElement('input', 'text', 'Country', '', {required: true}),
		email: buildFormElement('input', 'email', 'Your email...', '', {required: true, isEmail: true}),
		deliveryMethod: buildFormElement('select', 'text', 'Your deliveryMethod...', 'fastest', {} , {options: deliveryOptions}),
	});

	const [formIsValid, setFormIsValid] = useState(false); 

	const orderHandler = (e) => {
		e.preventDefault();

		const formData = {};

		for (let formElementIdentifier in orderForm) {
			formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
		}

		const order = {
			ingredients: props.ings,
			price: props.totalPrice,
			orderData: formData,
			userId: props.userId
		};

		props.onOrderBurger(order, props.token);
	}

	const inputChangedHandler = (event) => {
		const { name, value} = event.target;
		const updatedForm = {...orderForm};
		let formIsValid = true;

		updatedForm[name].value = value;
		updatedForm[name].valid = checkValidity(updatedForm[name].value, updatedForm[name].validations);
		updatedForm[name].touched = true;

		for (let inputIdentifier in updatedForm) {
			formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
		}

		setOrderForm(updatedForm);
		setFormIsValid(formIsValid)
	}

	const formElementsArray = buildFormElements(orderForm);

	if(props.loading) {

		return <Spinner />;
	}

	return (
		<div className={classes.ContactData}>
			<h4>Enter your contact data:</h4>
			<form onSubmit={orderHandler}>
				{ formElementsArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						elementName={formElement.name}
						value={formElement.config.value}
						changed={inputChangedHandler}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validations}
						touched={formElement.config.touched}
					/>
					)
				)}
				<Button disabled={!formIsValid} className={classes.Button} btnType="Success">Order</Button>
			</form>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
}

const mapDispatchToProps= dispatch => {
	return {
		onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),  
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
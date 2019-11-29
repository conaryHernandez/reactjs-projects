import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
	const checkoutCancelledHandler = () => {
		props.history.goBack();
	}

	const checkoutContinuedHandler = () => {
		props.history.replace('/checkout/contact-data');
	}

	if(Object.keys(props.ings).length < 1 || props.purchased) {
		return <Redirect to="/" />
	}

	return (
		<div>
			<CheckoutSummary
				ingredients={props.ings}
				checkoutCancelled={checkoutCancelledHandler}
				checkoutContinued={checkoutContinuedHandler}
			/>
			<Route path={props.match.path + '/contact-data'} component={ContactData} />
		</div>
	);
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	};
}

export default connect(mapStateToProps)(Checkout);
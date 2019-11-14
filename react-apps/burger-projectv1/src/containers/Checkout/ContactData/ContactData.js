import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css'
import axios from '../../../axios-orders';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false
	}

	orderHandler = (e) => {
		e.preventDefault();

    this.setState({ loading : true });

    const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
            name: 'Conary',
            address: {
                street: 'main street',
                zipCode: '001',
                country: 'Honduras'
            },
            email: 'test@test.com'
        },
        deliveryMethod: 'fastest'
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

	render() {

		if(this.state.loading) {

			return <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data:</h4>
				<form>
					<input className={classes.Input} type="text" name="name" placeholder="Your Name" />
					<input className={classes.Input} type="text" name="email" placeholder="Your Email" />
					<input className={classes.Input} type="text" name="street" placeholder="Your street" />
					<input className={classes.Input} type="text" name="postCode" placeholder="Your post code" />
					<Button btnType="Success" clicked={this.orderHandler}>Order</Button>
				</form>
			</div>
		);
	}

}

export default ContactData;
import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	}

	componentDidMount() {
		axios.get('/orders.json')
			.then(res => {
				const fetchedOrders = [];

				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key
					});
				}
				this.setState({ orders: fetchedOrders, loading: false });
			})
			.catch(error => {
				this.setState({ loading: false });
				console.log('error', error);
			});
	}

	buildOrders = () => {
		let orders = null;

		orders = this.state.orders.map(order => {
			return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
		});

		return orders;
	}

	render() {
		return (
			<div>
				{this.buildOrders()}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);
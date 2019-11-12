import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliar';

// const withErrorHandler = (WrappedComponent, axios) => {
// 	return (props) => {
// 		return (
// 				<Aux>
// 					<Modal show>
// 						Something Went Wrong!
// 					</Modal>
// 					<WrappedComponent {...props} />
// 				</Aux>
// 		);
// 	}
// };

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		constructor(props) {
			super(props);

			axios.interceptors.request.use(req => {
				this.setState({ error: ''});

				return req;
			});
			axios.interceptors.response.use(res => res, error => {
				this.setState({ error: error });
			});
		}

		state = {
			error: '',
		}

		errorConfirmedHandler = () => {
			this.setState({error: ''});
		}

		render() {
			return (
					<Aux>
						<Modal
							show={this.state.error}
							modalClosed={this.errorConfirmedHandler}
						>
							{this.state.error ? this.state.error.message : null}
						</Modal>
						<WrappedComponent {...this.props} />
					</Aux>
			);
		}
	}
};

export default withErrorHandler;
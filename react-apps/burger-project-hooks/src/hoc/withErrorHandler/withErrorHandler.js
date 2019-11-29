import React, { useEffect, useState } from 'react';

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
	return (props) => {
		const [ error, setError ] = useState('');

		const reqInterceptor = axios.interceptors.request.use(req => {
			setError('');

			return req;
		});
		const resInterceptor = axios.interceptors.response.use(res => res, error => {
			setError(error);
		});

		useEffect(() => {			
			return () => {
				axios.interceptors.request.eject(reqInterceptor);
				axios.interceptors.response.eject(resInterceptor);
			};
		}, [reqInterceptor, resInterceptor])

		const errorConfirmedHandler = () => {
			setError('');
		}

		return (
			<Aux>
				<Modal
					show={error}
					modalClosed={errorConfirmedHandler}
				>
					{error ? error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</Aux>
		);
	}
};

export default withErrorHandler;
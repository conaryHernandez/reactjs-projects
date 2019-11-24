import React, { Component } from 'react';
import { buildFormElement, checkValidity, buildFormElements} from '../../utils/utils';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/auth';
import { connect} from 'react-redux';
import {Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
			name: buildFormElement('input', 'text', 'Your name...', '', {required: true}),
			password: buildFormElement('input', 'password', 'Your password...', '', {required: true}),
        },
        isSignup: true,
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirect) {
            this.props.onSetAuthRedirect()
        }
    }

    inputChangedHandler = (event) => {
        const { name, value} = event.target;
		const updatedForm = {...this.state.controls};
		let formIsValid = true;

		updatedForm[name].value = value;
		updatedForm[name].valid = checkValidity(updatedForm[name].value, updatedForm[name].validations);
		updatedForm[name].touched = true;

		for (let inputIdentifier in updatedForm) {
			formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
		}

		this.setState({ controls: updatedForm, formIsValid });
    }

    submitHandler = (event) => {
        event.preventDefault();

        this.props.onAuth(this.state.controls.name.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchSignHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            };
        });
    }

    buildErrorMessage = (error) => {
        let errorLabel = null;

        if (error) {
            errorLabel = <p>{error.message}</p>;
        }

        return errorLabel;
    }


    render() {
        const errorMessage = this.buildErrorMessage(this.props.error);
        const formElementsArray = buildFormElements(this.state.controls);
        
        if(this.props.loading) {
            return <Spinner />;
        }

        if(this.props.isAuth) {
            return <Redirect to={this.props.authRedirect} />;
        }

        return(
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
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
                    <Button btnType="success" disabled={!this.state.formIsValid}>Submit</Button>
                </form>
                <Button
                    clicked={this.switchSignHandler}
                    btnType="Danger"
                >
                    Switch to {this.state.isSignup ? 'Sign In': 'Sign Up'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== '',
        buildingBurger: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirect: () => dispatch(actions.setAuthRedirect('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
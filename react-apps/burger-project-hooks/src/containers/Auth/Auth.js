import React, { useState, useEffect } from 'react';
import { buildFormElement, checkValidity, buildFormElements} from '../../utils/utils';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/auth';
import { connect} from 'react-redux';
import {Redirect } from 'react-router-dom';

const Auth = (props) => {
    const [controls, setControls] = useState({
        name: buildFormElement('input', 'text', 'Your name...', '', {required: true}),
        password: buildFormElement('input', 'password', 'Your password...', '', {required: true}),
    });
    const [isSignup, setIsSignup] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        if(!props.buildingBurger && props.authRedirect) {
            props.onSetAuthRedirect()
        }
    }, [])

    const inputChangedHandler = (event) => {
        const { name, value} = event.target;
		const updatedForm = {...controls};
		let formIsValid = true;

		updatedForm[name].value = value;
		updatedForm[name].valid = checkValidity(updatedForm[name].value, updatedForm[name].validations);
		updatedForm[name].touched = true;

		for (let inputIdentifier in updatedForm) {
			formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
		}

        setControls(updatedForm);
        setFormIsValid(formIsValid);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        props.onAuth(controls.name.value, controls.password.value, isSignup);
    }

    const switchSignHandler = () => {
        setIsSignup(!isSignup);
    }

    const buildErrorMessage = (error) => {
        let errorLabel = null;

        if (error) {
            errorLabel = <p>{error.message}</p>;
        }

        return errorLabel;
    }

    const errorMessage = buildErrorMessage(props.error);
    const formElementsArray = buildFormElements(controls);
    
    if(props.loading) {
        return <Spinner />;
    }

    if(props.isAuth) {
        return <Redirect to={props.authRedirect} />;
    }

    return(
        <div className={classes.Auth}>
            {errorMessage}
            <form onSubmit={submitHandler}>
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
                <Button btnType="success" disabled={!formIsValid}>Submit</Button>
            </form>
            <Button
                clicked={switchSignHandler}
                btnType="Danger"
            >
                Switch to {isSignup ? 'Sign In': 'Sign Up'}
            </Button>
        </div>
    );
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
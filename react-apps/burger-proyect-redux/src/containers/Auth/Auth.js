import React, { Component } from 'react';
import { buildFormElement, checkValidity, buildFormElements} from '../../utils/utils';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

class Auth extends Component {
    state = {
        controls: {
			name: buildFormElement('input', 'text', 'Your name...', '', {required: true}),
			password: buildFormElement('input', 'password', 'Your password...', '', {required: true}),
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

    render() {
        const formElementsArray = buildFormElements(this.state.controls);

        return(
            <div className={classes.Auth}>
                <form>
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
                    <Button btnType="success">Submit</Button>
                </form>
            </div>
        );
    }
}

export default Auth;
import React, { Component } from 'react';
import {UserConsumer, UserContext} from '../context/UserContext';

class Auth extends Component {
    static contextType = UserContext;

    loginHandler = () => {
        const {login} = this.context;

        login();
    }

    render() {
        return(
            <div>
                <UserConsumer>
                { context => {
                    console.log(context);

                    return <h1>{context.name}</h1>
                }}

                </UserConsumer>
                <h1>New test: {this.context.name}</h1>
                <button onClick={this.loginHandler}>Trigger Action</button>

            </div>
        );
    }
}

export default Auth;
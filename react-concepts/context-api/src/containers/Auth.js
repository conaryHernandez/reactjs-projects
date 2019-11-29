import React, { Component } from 'react';
import {UserConsumer} from '../context/UserContext';

class App extends Component {
    render() {
        return(
            <UserConsumer>
            { context => {
                console.log(context);

                return <h1>{context.name}</h1>
            }}

            </UserConsumer>
        );
    }
}

export default App;
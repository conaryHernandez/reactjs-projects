import React, { Component } from 'react';
import UserContextProvider from './context/UserContext';
import Auth from './containers/Auth';

import './App.css';

class App extends Component {
    render() {
        return(
            <UserContextProvider>
                <h1>React app</h1>
                <Auth />
            </UserContextProvider>
        );
    }
}

export default App;
import React, {Component} from 'react';

export const UserContext = React.createContext({
    name: '',
    loging: () => {},
    signup: () => {}
});

class UserContextProvider extends Component {
    state = {
        name: 'Conary'
    }

    login = () => {
        console.log('login function');
    }

    signup = () => {
        console.log('signup function');
    }


    render() {
        return (
            <UserContext.Provider value={{
                name: this.state.name,
                login: this.login,
                signup: this.signup
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}



export const UserConsumer = UserContext.Consumer;
export default UserContextProvider;
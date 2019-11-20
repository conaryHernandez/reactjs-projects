import React, {Component} from 'react';

import './AddPerson.css';

class AddPerson extends Component {
    state = {
        name: '',
        age: 0,
    }

    onChangeHandler = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="AddPerson">
                <input type="text" name="name" onChange={this.onChangeHandler} value={this.state.name}/>
                <input type="number" name="age" onChange={this.onChangeHandler} value={this.state.age}/>
                <button onClick={this.props.personAdded(this.state.name, this.state.age)}>Add Person</button>
            </div>    
        );
    }
}

export default AddPerson;
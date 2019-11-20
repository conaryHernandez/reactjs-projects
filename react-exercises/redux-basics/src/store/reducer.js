const initialState = {
    persons: [],
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_PERSON': 
            const newPerson = {
                id: Math.random(),
                name: action.name,
                age: action.age
            }
            return {
                persons: state.persons.concat(newPerson)
            };
        case 'DELETE_PERSON': 
            const updatedPersons = state.persons.filter(person => person.id !== action.id);

            return {
                persons: updatedPersons,
            };
    }

    return state;
};

export default reducer;


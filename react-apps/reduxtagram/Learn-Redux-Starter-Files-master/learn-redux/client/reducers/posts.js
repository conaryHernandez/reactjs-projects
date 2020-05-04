//add a reducer takes in tow things

//1. the action (info aboute what happened)
//2. copy of the current state

function posts(state = [], action) {
	// console.log(state, action);
	switch(action.type) {
		case 'INCREMENT_LIKES' :
			console.log("incrementing likes");
			const index = action.index;

			return [
				...state.slice(0, index),
				{...state[index], likes: state[index].likes + 1 },
				...state.slice(index + 1),
			]
		default:
			return state;
	}
}

export default posts;
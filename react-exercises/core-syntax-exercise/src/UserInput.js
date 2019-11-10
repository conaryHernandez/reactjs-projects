import React from 'react';

const style = {
	background: 'red',
	color: 'black'
}

const UserInput = (props) => {

	return (
		<input
			type="text"
			name="username"
			style={style}
			onChange={props.changeHandler}
			value={props.username}/>
	);
}

export default UserInput;
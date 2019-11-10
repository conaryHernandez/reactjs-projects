import React from 'react';

const UserOuput = (props) => {
	return (
		<div>
			<p>Hello {props.username || 'user'}</p>
			<p>Welcome to my site</p>
		</div>
	);
}

export default UserOuput;
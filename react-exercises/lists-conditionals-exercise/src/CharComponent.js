import React from 'react';

const style = {
	display: 'inline-block',
	padding: '16px',
	textAlign: 'center',
	margin: '16px',
	border: '1px solid black'
};

const CharComponent = (props) => {

	return (
		<div onClick={props.handleClick} style={style}>
			<p>{props.char}</p>
		</div>
	);
}

export default CharComponent;
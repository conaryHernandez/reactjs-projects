import React from 'react';

const ValidationComponent = (props) => {

	return props.content.length >= 5 ? <p>Text long enough</p> : <p>Text too short</p>
}

export default ValidationComponent;
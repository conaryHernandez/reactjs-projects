import React from 'react';


import classes from './Input.css';

const Input = (props) => {
	let inputElement = null;

	switch (props.elementType) {
		case ('input'):
			inputElement = (
				<input
					className={classes.InputElement}
					name={props.elementName}
					{...props.elementConfig}
					onChange={props.changed}
					value={props.value}
				/>
			);
			break;
		case ('textarea'):
			inputElement = (
				<textarea
					className={classes.InputElement}
					name={props.elementName}
					{...props.elementConfig}
					onChange={props.changed}
					value={props.value}
				/>
			);
			break;
		case ('select'):
			inputElement = (
				<select
					className={classes.InputElement}
					name={props.elementName}
					onChange={props.changed}
					value={props.value}
				>
					{props.elementConfig.options.map(op => {
						return <option key={op.value} value={op.value}>{op.displayValue}</option>
					})}
				</select>
			);
			break;

		default:
			inputElement = (
				<input
					className={classes.InputElement}
					name={props.elementName}
					{...props.elementConfig}
					onChange={props.changed}
					value={props.value}
				 />
			);
			break;
	}
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default Input;
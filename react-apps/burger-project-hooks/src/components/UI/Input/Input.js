import React from 'react';


import classes from './Input.css';

const Input = (props) => {
	let inputElement = null;
	let validationError = null;
	const inputClasses = [classes.InputElement];

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	if (props.invalid && props.touched) {
	  validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
	}

	switch (props.elementType) {
		case ('input'):
			inputElement = (
				<input
					className={inputClasses.join(' ')}
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
					className={inputClasses.join(' ')}
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
					className={inputClasses.join(' ')}
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
					className={inputClasses.join(' ')}
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
			{validationError}
		</div>
	);
};

export default Input;
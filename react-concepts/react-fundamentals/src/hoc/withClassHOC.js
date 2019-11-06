import React from 'react';

const withClassHOC = (WrappedComponent, classes) => {
	return props => {
		<div className={classes}>
			<WrappedComponent />
		</div>
	}
}

export default withClassHOC;
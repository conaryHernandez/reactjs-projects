import React from 'react';

const { Component } = React;

class Modal extends Component {

	constructor(props) {
		super(props);
	}

	render(){
		return(
			<div className="modal-bg">
				<div className="modal-content">
					<h1>{this.props.body}</h1>
					<p>{this.props.paragraph}</p>
				</div>
				<div className="modal-control">
					 {this.props.control}
				</div>
			</div>
		);
	}
}

export default Modal;
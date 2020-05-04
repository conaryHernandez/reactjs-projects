import React from 'react';

class Comments extends React.Component {
	constructor(props) {
		super(props);

		this.renderComment = this.renderComment.bind(this);
	}

	renderComment(comment, index) {
		// console.log(comment);
		return (
			<div className="comment" key={index}>
				<p>
					<strong>{comment.user}</strong>
					{comment.text}
					<button className="remove-comment" onClick={this.props.removeComment.bind(null, this.props.params.postId, index)}>&times;</button>
				</p>
			</div>
		)
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(this.props);
		const { postId } = this.props.params;
		const author = this.refs.author.value;
		const comment = this.refs.comment.value;
		this.props.addComment(postId, author, comment);
		this.refs.commentForm.reset();
	}

	render() {
		return (
			<div className="comment">
				{this.props.postComments.map(this.renderComment)}
				<form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
					<input type="text" ref="author" placeholder="author"/>
					<input type="text" ref="comment" placeholder="comment"/>
					<input type="submit" hidden/>
				</form>
			</div>
		);
	}
}

export default Comments;
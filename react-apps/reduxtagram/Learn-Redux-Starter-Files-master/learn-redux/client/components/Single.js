import React from 'react';
import Photo from './Photo';
import Comments from './Comments'
import { Link } from 'react-router';

class Single extends React.Component {
	render() {
		const { postId } = this.props.params;

		const index = this.props.posts.findIndex((post) => post.code === this.props.params.postId);
		const post = this.props.posts[index];
		const postComments = this.props.comments[postId] || [];

		// console.log(index);
		// console.log(post);
		return (
			<div className="single-photo">
				<Photo index={index} post={post} {...this.props} />
				<Comments postComments={postComments} {...this.props }></Comments>
			</div>
		);
	}
}

export default Single;
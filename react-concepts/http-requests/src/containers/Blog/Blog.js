import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import axios from 'axios';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectdPostId: null,
        error: false
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.splice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Conary'
                    }
                });
                this.setState({ posts: updatedPosts});
            })
            .catch(err => {
                console.log(err);
                this.setState({error: true});
            });
    }

    _buildPostsList = () => {
        const posts = this.state.posts.map(post => {
            return (
                <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={this.postSelectedHandler(post.id)}
                />
            );
        });

        return posts;
    }

    postSelectedHandler = (id) => () => {
        this.setState({selectdPostId: id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>

        if (this.state.error) {
            return posts;
        }

        return (
            <div>
                <section className="Posts">
                    {this._buildPostsList()}
                </section>
                <section>
                    <FullPost id={this.state.selectdPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
import React from 'react';
import { Container } from 'semantic-ui-react';
import Poster from '../components/Poster.js';
import Post from '../components/Post.js';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = { user: this.props.user, posts: [] }
	}

	componentDidMount = async () => {
		await fetch('http://localhost:8080/feed?user=' + this.state.user.username)
			.then(response => response.json())
			.then(response => {
				if(response.status === 200) {
					this.setState({ posts: response.data})
				}
			});
	}

	render() {
		return(
			<div style={{ backgroundColor: 'white', width: 'inherit', height: '100%', overflowY: 'scroll'}}>
				<Poster name={this.state.user}/>
				{this.state.posts.map(post => {
					return(
						<Post post={post}/>
					)
				})}
				{this.state.posts.length === 0 && 
					<div>HEEHEE</div>
				}
				{/*Lista de posts*/}
			</div>
		);
	}
}
import React from 'react';
import { Container } from 'semantic-ui-react';
import Poster from './Poster.js';
import Post from './Post.js';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = { user: this.props.user, posts: {} }
	}

	componentDidMount = async () => {
		await fetch('http://localhost:8080/feed?user=' + this.props.user.username)
			.then(response => {
				if (response.status === 200) {
					this.setState({ posts: response.data})
				} else {
					console.log('cry')
				}
			});
	}

	render() {
		return(
			<div style={{ backgroundColor: 'purple', width: 'inherit', height: 'inherit', overflowY: 'scroll'}}>
				<Poster/>
				<Post/>
				<Post/>
				<Post/>
				{/*Lista de posts*/}
			</div>
		);
	}
}
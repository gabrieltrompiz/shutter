import React from 'react';
import { Container } from 'semantic-ui-react';
import Poster from '../components/Poster.js';
import Post from '../components/Post.js';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = { user: this.props.user, posts: {} }
	}

	componentDidMount = async () => {
		// await fetch('http://localhost:8080/feed?user=' + this.state.user.username)
		// 	.then(response => {
		// 		if (response.status === 200) {
		// 			this.setState({ posts: response.data})
		// 		} else {
		// 			console.log('cry')
		// 		}
		// 	});
		//FIXME: Esta verga esta dando peo, despues te explico xq
	}

	render() {
		return(
			<div style={{ backgroundColor: 'white', width: 'inherit', height: '100%', overflowY: 'scroll'}}>
				<Poster/>
				<Post/>
				<Post/>
				<Post/>
				{/*Lista de posts*/}
			</div>
		);
	}
}
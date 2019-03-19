import React from 'react';
import { Container } from 'semantic-ui-react';
import Poster from './Poster.js';
import Post from './Post.js';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return(
			<div style={{ backgroundColor: 'red', width: 'inherit', height: 'inherit', overflowY: 'scroll'}}>
				<Poster/>
				<Post/>
				{/*Lista de posts*/}
			</div>
		);
	}
}
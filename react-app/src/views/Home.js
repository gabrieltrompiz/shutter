import React from 'react';
import Poster from '../components/Poster.js';
import Post from '../components/Post.js';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = { user: this.props.user, posts: [], lastPost: null }
	}

	updateFeed = async () => {
		await fetch('http://localhost:8080/feed', { credentials: 'include' })
		.then(response => response.json())
		.then(response => {
			if(response.status === 200) {
				this.setState({ posts: response.data, lastPost: response.data[response.data.length - 1] });
			}
		});
	}

	componentDidMount = () => {
		this.updateFeed()
	}

	chargeMorePosts = async () => {
		await fetch('http://localhost:8080/feed?time=' + this.state.lastPost, { credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if(response.status === 200) {
					this.setState({ posts: response.data})
				}
			});
	}

	render() {
		return(
			<div style={{ backgroundColor: 'transparent', width: '67%', height: '97vh' }}>
				<Poster user={this.state.user} updateFeed={this.updateFeed} />
				{this.state.posts.map(post => {
					return(
						<Post post={post} key={post.idPost}/>
					)
				})}
				{this.state.posts.length === 0 && 
					<div style={styles.empty}>
						<span style={styles.icon}><i className="far fa-frown"></i></span>
						<span style={styles.text}>It seems like you don't have friends <br /> or they haven't posted yet.</span>
					</div>
				}
			</div>
		);
	}
}

const styles = {
	empty: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '65%',
		width: '100%',
		borderStyle: 'dashed',
		borderWidth: 2,
		borderColor: 'grey',
		borderRadius: 20,
		fontFamily: 'Heebo',
		color: 'grey',
		opacity: 0.8,
	},
	icon: {
		fontSize: 40,
		paddingBottom: 20,
		paddingTop: 20
	},
	text: {
		fontSize: 22, 
		fontWeight: '900', 
		textAlign: 'center', 
		lineHeight: 1.1, 
		paddingBottom: 20
	}
}
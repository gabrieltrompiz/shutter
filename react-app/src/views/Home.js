import React from 'react';
import Poster from '../components/Poster.js';
import Post from '../components/Post.js';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = { user: this.props.user, posts: [], lastPost: null, postsCount: 20 }
	}

	updateFeed = async () => {
		await fetch('http://localhost:8080/feed?posts=' + this.state.postsCount, { credentials: 'include' })
		.then(response => response.json())
		.then(response => {
			if(response.status === 200) {
				this.setState({ posts: response.data, lastPost: response.data[response.data.length - 1] });
			}
		});
	}

	chargeMorePosts = () => {
		this.setState(() => ({ postsCount: this.state.postsCount + 20 }), () => this.updateFeed())
	}

	componentDidMount = () => {
		this.updateFeed()
	}

	render() {
		const styles = this.getStyles(this.props.darkTheme)
		return(
			<div style={{ backgroundColor: 'transparent', width: '67%', height: '97vh' }}>
				<Poster user={this.state.user} updateFeed={this.updateFeed} darkTheme={this.props.darkTheme}/>
				{this.state.posts.map(post => {
					return(
						<Post post={post} key={post.idPost} darkTheme={this.props.darkTheme} userId={this.props.user.id}/>
					)
				})}
				{this.state.posts.length === 0 && 
					<div style={styles.empty}>
						<span style={styles.icon}><i className="far fa-frown"></i></span>
						<span style={styles.text}>It seems like you don't have friends <br /> or they haven't posted yet.</span>
					</div>
				}
				{this.state.posts.length % 20 === 0 && this.state.posts.length !== 0 &&
					<button style={styles.button} onMouseOver={() => { this.button.style.cursor = 'pointer' }} onClick={() => this.chargeMorePosts()} ref={(ref) => this.button = ref}>
						Charge more posts
					</button>
				}
			</div>
		);
	}

	getStyles = (dark) => {
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
				borderColor: dark ? '#8899A6' : 'grey',
				borderRadius: 20,
				fontFamily: 'Heebo',
				color: dark ? '#8899A6' : 'grey',
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
			},
			button: {
				width: '100%',
				height: 80,
				marginBottom: 30,
				outline: 0,
				borderColor: dark ? '#1c2938' : 'rgb(221, 223, 226)',
				borderRadius: 5,
				borderWidth: 1.5,
				borderStyle: 'solid',
				backgroundColor: dark ? '#1c2938' : 'white',
				fontFamily: 'Heebo',
				fontWeight: 'bolder',
				fontSize: 16,
				color: dark ? 'white' : 'black'
			}
		}
		return styles
	}
}
import React from 'react';
import { Image, Container, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import Button from '../components/Button';
import FriendContainer from '../components/FriendContainer';
import Post from '../components/Post.js';
export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: this.props.user, friendList: [], posts: [], lastPost: null }
	}

	updateProfile = async () => {
		const user = { username: this.state.user.username, name: this.state.user.name, 
			lastName: this.state.user.lastName };
		await fetch('http://localhost:8080/posts?user=' + this.state.user.username, { credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.status === 200) {
					response.data.forEach(post => {
						post.user = user;
					})
					const lastPost = response.data[response.data.length - 1];
					this.setState({ posts: response.data });
					if(lastPost !== undefined) { this.setState({ lastPost: lastPost.creationTime })}
				} else console.log('cry');
			});

		await fetch('http://localhost:8080/friends?username=' + this.state.user.username, { credentials: 'include' })
		.then(response => response.json())
		.then(response => {
			if (response.status === 200) {
				this.setState({ friendList: response.data });
			} else console.log('cry');
		});
	}

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.user.username !== this.props.user.username) {
			this.setState({ user: nextProps.user }, () => this.updateProfile())
		}
	}

	componentDidMount = async () => {
		this.updateProfile()
	}

	chargeMorePosts = async () => {
		await fetch('http://localhost:8080/posts?time=' + this.state.lastPost, { credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if(response.status === 200) {
					this.setState({ posts: response.data, lastPost: response.data[response.data.length - 1].creationTime})
				}
			});
	}
	
	render() {
		const source = "http://localhost:8080/files?type=avatar&file=" + this.state.user.username + ".png"
		const date = new Date(this.state.user.birthday)
		const birthday = date.getDate() + "/" + (parseInt(date.getMonth(), 10) + 1) + "/" + date.getFullYear()
		const person = this.props.own ? 'You ' : this.state.user.name + ' ' + this.state.user.lastName + ' '
		return(	
			<Segment raised style={{ marginTop: '2.5vh', height: '95vh' }}>
				<Container fluid style={{ height: '100%' }}>
					<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
						<Header as='h2' textAlign='center' style={{ marginTop: 0, marginBottom: 0, marginLeft: '40%', color: 'black' }}>{this.state.user.username}</Header>
						<Button outlined color='#FF5252' height={30} width={100} onClick={() => this.props.changeView('EditProfile')}>Edit Profile</Button>
					</div>
					
					<Divider />
					<Grid style={{ height: '96%' }}>
						<Grid.Column width={11} style={{ height: 'inherit' }}>
							<div style={{ display: 'flex', width: '100%', paddingLeft: 20 }}>
								<Image
									src={source}
									style={{ width: 100, height: 100, marginTop: 12 }}
									circular={true}
									verticalAlign='middle'
								/>
								<div style={{ marginTop: 25, paddingLeft: 10 }}>
									<Header as='h2' style={{ marginTop: 0, marginBottom: 0, display: 'inline-block', color: 'black' }}>{this.state.user.name + " " + this.state.user.lastName}</Header><br />
									<Header as='h5' style={{ marginTop: 5, marginLeft: 0, display: 'inline-block', color: 'black', opacity: 0.5 }}>
										<Icon name='birthday cake' style={{ marginRight: 0, color: 'black', fontSize: 18 }} />
										{birthday}
									</Header>
								</div>
								<Header as='h1' textAlign='center' style={{ marginLeft: 120, paddingTop: 20, fontSize: 35 }}>
									<Header.Content>{this.state.posts.length}</Header.Content>
									<Header.Subheader>Posts</Header.Subheader>
								</Header>
								<Header as='h1' textAlign='center' style={{ marginLeft: 60, paddingTop: 20, fontSize: 35 }}>
									<Header.Content>{this.state.friendList.length}</Header.Content>
									<Header.Subheader>Friends</Header.Subheader>
								</Header>	
							</div>
							<Divider/>
							{this.state.posts.length > 0 && 
							<div style={{ overflowY: 'scroll', width: '100%', height: '72.5%', paddingRight: 10 }}>
								{this.state.posts.map(post => {
									return <Post post={post} key={post.idPost}/>
								})}
							</div>}
							{this.state.posts.length === 0 &&
							<div style={styles.emptyPosts}>
								<p>{person}haven't posted anything yet.</p>
							</div>}
						</Grid.Column>
						<Grid.Column width={5}>
							<Container style={styles.friendList}>
							<p style={styles.title}>Friends</p>
							<Divider fitted style={{ width: '100%', marginBottom: 10 }}/>
								{this.state.friendList.length === 0 &&
								<div style={styles.empty}>
									<span><i className="far fa-frown" style={{ fontSize: 50, marginBottom: 10 }}></i></span>
									<span style={{ fontSize: 20, textAlign: 'center' }}>{person}don't have any friends.</span>
								</div>}
								{this.state.friendList.map(friend => {
									return <FriendContainer friend={friend} key={friend.username} changeView={this.props.changeView}
									changeUser={this.props.changeUser} />
								})}
							</Container>
						</Grid.Column>
					</Grid>					
				</Container>
			</Segment>			
			);
	}

}

const styles = {
    title: {
		fontFamily: 'Heebo',
		fontSize: 25,
		fontWeight: 'bolder',
		margin: 0,
		paddingBottom: 5
	},
	friendList: {
	    width: '100%', 
		height: '99%', 
		borderRadius: 5, 
		padding: 14,
		border: '1px solid rgba(34,36,38,.15)',
		overflowY: 'scroll'
	},
	empty: {
		display: 'flex',
		height: '85%',
		flexDirection: 'column',
		color: 'grey',
		opacity: 0.8,
		alignItems: 'center',
		justifyContent: 'center',
		fontFamily: 'Heebo',
		fontWeight: 'bolder'
	},
	emptyPosts: {
		display: 'flex',
		height: '75%',
		flexDirection: 'column',
		color: 'grey',
		opacity: 0.8,
		alignItems: 'center',
		justifyContent: 'center',
		fontFamily: 'Heebo',
		fontWeight: 'bolder',
		fontSize: 20
	},

}
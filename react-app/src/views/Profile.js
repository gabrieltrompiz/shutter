import React from 'react';
import { Image, Container, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import Button from '../components/Button';
import FriendContainer from '../components/FriendContainer';
import Post from '../components/Post.js';

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: this.props.user, ownFriendList: [], posts: [], lastPost: null, otherFriendList: [], frPending: false }
	}

	updateProfile = async () => {
		let user = this.state.user;
		user.lowercaseUsername = this.state.user.username.toLowerCase();
		    this.setState({ user: user });
		if(!this.props.own) {
			await fetch('http://localhost:8080/friends?user=' + this.state.user.id, { credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.status === 200) {
					this.setState({ otherFriendList: response.data });
				} else console.log('cry');
			});
		}
		await fetch('http://localhost:8080/posts?user=' + this.props.user.id, { credentials: 'include' })
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
	}

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.isFriend !== this.props.isFriend) {
			this.setState({ frPending: !nextProps.isFriend })
		}
		if(nextProps.user.username !== this.props.user.username) {
			this.setState({ user: nextProps.user }, () => this.updateProfile())
		}
	}

	componentDidMount = async () => {
		if(this.props.ownFriendList !== undefined) { this.setState({ ownFriendList: this.props.ownFriendList }) }
		this.updateProfile()
		if(!this.props.own && !this.props.isFriend) {
			await fetch('http://localhost:8080/checkFriendRequest?id=' + this.props.user.id, { credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if(response.status === 200) {
					this.setState({ frPending: response.data })
				}
			})
		} 
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

	deletePost = (postToDelete) => {
		let postsState = [...this.state.posts]
		postsState.some((post, i) => {
			if(post.idPost === postToDelete.idPost) { 
				postsState = postsState.slice(0, i).concat(postsState.slice(i + 1, postsState.length));
				return true
			}
			return true;
		})
		this.setState({ posts: postsState })
	}

	addFriend = async () => {
		const notification = {
			notificationSender: this.props.ownUser.id,
			notificationReceiver: this.props.user.id,
			typeNotificationId: 1,
			user: this.props.ownUser,
			notificationDate: Date.now()
		}
		this.props.notificationSocket.send(JSON.stringify(notification))
		this.setState({ frPending: true })
	}
	
	render() {
		const source = "http://localhost:8080/files?type=avatar&file=" + this.state.user.username + ".png"
		const date = new Date(this.state.user.birthday)
		const birthday = date.getDate() + "/" + (parseInt(date.getMonth(), 10) + 1) + "/" + date.getFullYear()
		const person = this.props.own ? 'You ' : this.state.user.name + ' ' + this.state.user.lastName + ' '
		const shouldShowPosts = (this.props.own || this.props.isFriend)
		const shouldShowEmpty = (this.props.own && this.state.ownFriendList.length === 0) || (!this.props.own && this.state.otherFriendList.length === 0)
		const dark = this.props.darkTheme
		const styles = this.getStyles(dark)
		const user = this.props.own ? this.props.user : this.props.ownUser
		return(	
			<Segment raised style={{ marginTop: '2.5vh', height: '95vh', backgroundColor: dark ? '#15202B' : 'white' }}>
				<Container fluid style={{ height: '100%' }}>
					<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
						<Header as='h2' textAlign='center' style={{ marginTop: 0, marginBottom: 0, marginLeft: '40%', color: dark ? 'white' : 'black' }}>{this.state.user.username}</Header>
						{this.props.own && 
						<Button outlined color='#FF5252' height={30} width={100} onClick={() => this.props.changeView('EditProfile')}>Edit Profile</Button>}
						{!this.props.own && !this.props.isFriend && !this.state.frPending &&
						<Button outlined color='green' height={30} width={100} onClick={() => this.addFriend()}>Add Friend</Button>}
						{this.state.frPending &&
						<span style={{ color: 'green', fontFamily: 'Roboto', fontSize: 18, alignSelf: 'center' }}>Friend Request Pending</span>}
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
									<Header as='h2' style={{ marginTop: 0, marginBottom: 0, display: 'inline-block', color: dark ? 'white' : 'black' }}>{this.state.user.name + " " + this.state.user.lastName}</Header><br />
									<Header as='h5' style={{ marginTop: 5, marginLeft: 0, display: 'inline-block', color: dark ? '#738290' : 'grey' }}>
										<Icon name='birthday cake' style={{ marginRight: 0, color: dark ? '#738290' : 'grey', fontSize: 18 }} />
										{birthday}
									</Header>
								</div>
								<Header as='h1' textAlign='center' style={{ marginLeft: 120, paddingTop: 20, fontSize: 35, color: dark ? 'white' : 'black' }}>
									<Header.Content>{this.state.posts.length}</Header.Content>
									<Header.Subheader style={{ color: dark ? 'white' : '' }}>Posts</Header.Subheader>
								</Header>
								<Header as='h1' textAlign='center' style={{ marginLeft: 60, paddingTop: 20, fontSize: 35, color: dark ? 'white' : 'black' }}>
									<Header.Content>{this.props.own ? this.state.ownFriendList.length : this.state.otherFriendList.length}</Header.Content>
									<Header.Subheader style={{ color: dark ? 'white' : '' }}>Friends</Header.Subheader>
								</Header>	
							</div>
							<Divider/>
							{this.state.posts.length > 0 && shouldShowPosts &&
							<div style={{ overflowY: 'scroll', width: '100%', height: '72.5%', paddingRight: 10 }}>
								{this.state.posts.map(post => {
									return <Post post={post} key={post.idPost} darkTheme={dark} userId={this.props.user.id} ownUser={user} deletePost={this.deletePost} notificationSocket={this.props.notificationSocket}
									reportsSocket={this.props.reportsSocket}/>
								})}
							</div>}
							{this.state.posts.length === 0 && shouldShowPosts &&
							<div style={styles.emptyPosts}>
								<p>{person}haven't posted anything yet.</p>
							</div>}
							{!shouldShowPosts && 
							<div style={styles.emptyPosts}>
								<i className="fas fa-eye-slash" style={{ fontSize: 50, marginBottom: 10 }}></i>
								<p>You and are not friends with {person}.</p>
								<p>You can't see his/her posts.</p>
							</div>}
						</Grid.Column>
						<Grid.Column width={5}>
							<Container style={styles.friendList}>
							<p style={styles.title}>Friends</p>
							<Divider fitted style={{ width: '100%', marginBottom: 10 }}/>
								{shouldShowEmpty &&
								<div style={styles.empty}>
									<span><i className="far fa-frown" style={{ fontSize: 50, marginBottom: 10 }}></i></span>
									<span style={{ fontSize: 20, textAlign: 'center' }}>{person}don't have any friends.</span>
								</div>}
								{this.props.own && this.state.ownFriendList.map(friend => {
									return <FriendContainer friend={friend} key={friend.username} changeView={this.props.changeView}
									changeUser={this.props.changeUser} darkTheme={dark}/>
								})}
								{!this.props.own && this.state.otherFriendList.map(friend => {
									return <FriendContainer friend={friend} key={friend.username} changeView={this.props.changeView}
									changeUser={this.props.changeUser} darkTheme={dark}/>
								})}
							</Container>
						</Grid.Column>
					</Grid>					
				</Container>
			</Segment>			
			);
	}
	getStyles = (dark) => {
		const styles = {
			title: {
				fontFamily: 'Heebo',
				fontSize: 25,
				fontWeight: 'bolder',
				margin: 0,
				paddingBottom: 5,
				color: dark ? 'white' : 'black'
			},
			friendList: {
				width: '100%', 
				height: '99%', 
				borderRadius: 5, 
				padding: 14,
				border: dark ? '1px solid #1C2938' : '1px solid rgba(34,36,38,.15)',
				overflowY: 'scroll'
			},
			empty: {
				display: 'flex',
				height: '85%',
				flexDirection: 'column',
				color: dark ? '#8899A6' : 'grey',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: 'Heebo',
				fontWeight: 'bolder'
			},
			emptyPosts: {
				display: 'flex',
				height: '75%',
				flexDirection: 'column',
				color: dark ? '#8899A6' : 'grey',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: 'Heebo',
				fontWeight: 'bolder',
				fontSize: 20
			}
		}
		return styles
	}
}
import React from 'react'
import { Menu, Icon, Container, Header, Image, Label } from 'semantic-ui-react'
import Home from './Home';
import Notifications from './Notifications';
import Profile from './Profile';
import Search from './Search';
import EditProfile from './EditProfile';
import Inbox from './/Inbox.js';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { activeItem : 'Home', anotherUser: {}, ownFriendList: [], onlineUsers: [], notifications: [], notifCounter: 0, reloadFeed: false }
		this.notificationSocket = null;
		this.userSocket = null;
		this.reportsSocket = null;
		this.connectSockets();
	}

	componentDidMount = async () => {
		await fetch('http://localhost:8080/friends?user=' + this.props.user.id, { credentials: 'include' })
		.then(response => response.json())
		.then(response => {
			if (response.status === 200) {
				this.setState({ ownFriendList: response.data });
			} else console.log('cry');
		});
	}

	checkIfFriend = () => {
		let isFriend = false;
		this.state.ownFriendList.forEach(friend => {
			if(friend.username === this.state.anotherUser.username) {
				isFriend = true;
			}
		})
		return isFriend
	}

	updateDashboard = async () => {
		await fetch('http://localhost:8080/friends?user=' + this.props.user.id, { credentials: 'include' })
		.then(response => response.json())
		.then(response => {
			if (response.status === 200) {
				this.setState({ ownFriendList: response.data, reloadFeed: !this.state.reloadFeed });
			} else console.log('cry');
		});
	}

	componentWillUnmount = async () => {
		this.userSocket.close()
		this.notificationSocket.close()
		this.reportsSocket.close()
	}

	connectSockets = async () => {
		this.userSocket = new WebSocket("ws://localhost:8080/users")
		this.userSocket.onmessage = event => {
			if(event.data.startsWith("Connected:")) {
				const username = event.data.split(":")[1]
				let friendObject = {}
				this.state.ownFriendList.forEach(friend => {
					if(friend.username.toLowerCase() === username) {
						friendObject = friend;
					}
				})
				const onlineUsers = [...this.state.onlineUsers]
				onlineUsers.push(friendObject)
				this.setState({ onlineUsers: onlineUsers })
			}
			else if(event.data.startsWith("Disconnected:")) {
				const username = event.data.split(":")[1]
				let onlineUsers = [...this.state.onlineUsers]
				onlineUsers.forEach((user, i) => {
					if(user.username.toLowerCase() === username) {
						onlineUsers = onlineUsers.slice(0, i).concat(onlineUsers.slice(i + 1, onlineUsers.length))
					}
				})
				this.setState({ onlineUsers: onlineUsers })
			}
			else if(event.data) {
				let onlineFriends = [];
				JSON.parse(event.data).forEach(username => {
					this.state.ownFriendList.forEach(friend => {
						if(friend.username.toLowerCase() === username) {
							onlineFriends.push(friend)
						}
					})
				})
				this.setState({ onlineUsers: onlineFriends })
			}
		}
		this.notificationSocket = new WebSocket("ws://localhost:8080/notifications")
		this.notificationSocket.onmessage = event => {
			if(event.data.startsWith("Notifications;")) {
				const json = event.data.split(";")[1]
				const notifications = JSON.parse(json)
				this.setState({ notifications: notifications })
			}
			else if(event.data === 'Friend Added') {
				this.updateDashboard().then(() => this.userSocket.send("update"))
			}
			else {
				const newNot = JSON.parse(event.data)
				const notState = [...this.state.notifications]
				notState.unshift(newNot)
				this.setState(() => ({ notifications: notState, notifCounter: this.state.notifCounter + 1 }))
			}
		}
		this.reportsSocket = new WebSocket('ws://localhost:8080/reports')
	}
	
	handleItemClick = (evt, {name}) => {
		if(name === 'Notifications') { this.setState({ notifCounter: 0 }) }
		this.setState({ activeItem : name });
	};

	handleChangeView = view => {
		this.setState({ activeItem: view })
	}

	logout = async () => {
		await fetch('http://localhost:8080/logout', { credentials: 'include' })
		this.props.handleLoggedIn(false)
	}

	changeUser = user => {
		this.setState({ anotherUser: user })
	}
	

	getView = () => {
		switch(this.state.activeItem) {
			case 'Home':
				return (
					<div style={{ display: 'flex' }}>
						<Home user={this.props.user} changeView={this.handleChangeView} changeUser={this.props.changeUser} handleLoggedIn={this.props.handleLoggedIn} darkTheme={this.props.darkTheme} reload={this.state.reloadFeed}
						notificationSocket={this.notificationSocket} reportsSocket={this.reportsSocket} friendList={this.state.ownFriendList}/>
						<Inbox darkTheme={this.props.darkTheme} friends={this.state.onlineUsers} changeUser={this.changeUser} changeView={this.handleChangeView}/>
					</div>);
			
			case 'Profile':
				return <Profile user={this.props.user} changeView={this.handleChangeView} changeUser={this.changeUser} own ownFriendList={this.state.ownFriendList} darkTheme={this.props.darkTheme}
				notificationSocket={this.notificationSocket} reportsSocket={this.reportsSocket}/>;
			
			case 'OtherUserProfile':
				return <Profile user={this.state.anotherUser} changeView={this.handleChangeView} changeUser={this.changeUser} own={this.props.user.username === this.state.anotherUser.username}
				isFriend={this.checkIfFriend()} updateDashboard={this.updateDashboard} darkTheme={this.props.darkTheme} ownUser={this.props.user} notificationSocket={this.notificationSocket}
				reportsSocket={this.reportsSocket}/>;

			case 'EditProfile':
				return <EditProfile user={this.props.user} changeView={this.handleChangeView} changeUser={this.props.changeUser} darkTheme={this.props.darkTheme}/>;

			case 'Notifications':
				return <Notifications user={this.props.user} changeView={this.handleChangeView} darkTheme={this.props.darkTheme} notifications={this.state.notifications} notificationSocket={this.notificationSocket}
				updateDashboard={this.updateDashboard}/>
			
			case 'Search':
				return <Search user={this.props.user} changeView={this.handleChangeView} changeUser={this.changeUser} darkTheme={this.props.darkTheme}/>;
			
			default:
				throw new Error();
		}
	}

	render() {
		const dark = this.props.darkTheme
		return (
			<Container fluid style={{ height: '100vh', backgroundColor: '#FAFAFC' }}>
				<div style={{ backgroundColor: '#f1f2f4', display: 'flex' }}>
					<Menu vertical style={{ height: '100vh', position: 'sticky', backgroundColor: dark ? '#1C2938' : 'white', width: '17.5%' }} pointing secondary>
						<Menu.Item header style={{ textAlign: 'center' }}>
							<Image
								as="img"
								src={require('../assets/pandagram.png')}
								style={{ width: 70, height: 70, borderRadius: 12, margin: 'auto', marginTop: 10,
								WebkitFilter: dark ? 'brightness(2000%)' : '' }}
							/>
							<p style={{ fontFamily: 'Billabong', fontSize: 40, fontWeight: '400', color: dark ? 'white' : 'black' }}>Pandagram</p>
						</Menu.Item>
						<Menu.Item active={this.state.activeItem === 'Home'} onClick={this.handleItemClick} name='Home' 
						style={{ borderColor: dark && this.state.activeItem === 'Home' ? 'white' : '' }}>
							<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5, color: dark ? 'white' : 'black' }}>
								<Icon name='home' style={{ float: 'left', fontSize: 16 }}/>
								Home
							</Header>
						</Menu.Item>
						<Menu.Item active={this.state.activeItem === 'Profile'} onClick={this.handleItemClick} name='Profile' 
						style={{ borderColor: dark && this.state.activeItem === 'Profile' ? 'white' : '' }}>
							<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5, color: dark ? 'white' : 'black' }}>
								<Icon name='user' style={{ float: 'left', fontSize: 16 }}/>
								Profile
							</Header>
						</Menu.Item>
						<Menu.Item active={this.state.activeItem === 'Notifications'} onClick={this.handleItemClick} name='Notifications' 
						style={{ borderColor: dark && this.state.activeItem === 'Notifications' ? 'white' : '' }}>
							{this.state.notifCounter > 0 && <Label color='teal'>{this.state.notifCounter}</Label>}
							<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5, color: dark ? 'white' : 'black' }}>
								<Icon name='inbox' style={{ float: 'left', fontSize: 16 }}/>
								Notifications
							</Header>
						</Menu.Item>
						<Menu.Item active={this.state.activeItem === 'Search'} onClick={this.handleItemClick} name='Search' 
						style={{ borderColor: dark && this.state.activeItem === 'Search' ? 'white' : '' }}>
							<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5, color: dark ? 'white' : 'black' }}>
								<Icon name='search' style={{ float: 'left', fontSize: 16 }}/>
								Search
							</Header>
						</Menu.Item>
						<Menu.Item  onClick={this.props.switchTheme}>
							<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5, color: dark ? 'white' : 'black' }}>
								<Icon name='moon' style={{ float: 'left', fontSize: 16  }}/>
								Toggle Dark Mode
							</Header>
						</Menu.Item>
						<Menu.Item active={this.state.activeItem === 'LogOut'} onClick={this.logout}>
							<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5, color: dark ? 'white' : 'black' }}>
								<Icon name='sign out' style={{ float: 'left', fontSize: 16 }}/>
								Log out
							</Header>
						</Menu.Item>
					</Menu>
					<Container style={{ height: '100vh', width: '85%', overflowY: 'scroll', backgroundColor: dark ? '#10171E' : '' }}>
						<Container style={{ width: '75vw' }}>
							{this.getView()}
						</Container>
					</Container>
				</div>
			</Container>
		);
	}
}
import React from 'react'
import { Menu, Icon, Container, Header, Image } from 'semantic-ui-react'
import Home from './Home';
import Notifications from './Notifications';
import Profile from './Profile';
import Search from './Search';
import Settings from './Settings';
import EditProfile from './EditProfile';
import Inbox from './/Inbox.js';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { activeItem : 'Home', notifications: 10, anotherUser: {}, ownFriendList: [] } //TODO: revisar xq se expira si pongo otra inicial
		this.notificationSocket = null;
		this.userSocket = null;
	}

	componentDidMount = async () => {
		await fetch('http://localhost:8080/friends?user=' + this.props.user.id, { credentials: 'include' })
		.then(response => response.json())
		.then(response => {
			if (response.status === 200) {
				this.setState({ ownFriendList: response.data });
			} else console.log('cry');
		});
		// this.connectSockets();
	}

	componentWillDismount = () => {
		// this.disconnectSockets();
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
				this.setState({ ownFriendList: response.data });
			} else console.log('cry');
		});
	}

	// connectSockets = async () => {
	// 	this.notificationSocket = new WebSocket("ws://localhost:8080/notifications");
	// 	this.userSocket = new WebSocket("ws://localhost:8080/users");

	// 	console.log(this.notificationSocket);
	// 	console.log(this.userSocket);
		
	// 	this.userSocket.onmessage = evt => {
	// 		console.log('1');
	// 	}

	// 	this.userSocket.onopen = evt => {
	// 		console.log('Connected on Users Sockets');
	// 	}

	// 	this.userSocket.onclose = evt => {
	// 		console.log('Disconnected from Notifications Sockets');
	// 	}

	// 	this.userSocket.onerror = evt => {
	// 		console.log('4');
	// 	}


	// 	this.notificationSocket.onmessage = evt => {
	// 		this.newNotification(evt);
	// 	}

	// 	this.notificationSocket.onopen = evt => {
	// 		console.log('Connected on Notifications Sockets');
	// 	}

	// 	this.notificationSocket.onclose = evt => {
	// 		console.log('Disconnected from Notifications Sockets');
	// 	}

	// 	this.notificationSocket.onerror = evt => {
	// 		console.log('8');
	// 	}
	// }

	// newNotification = notification => {

	// }

	// disconnectSocket = async () => {
	// 	await this.socket.close();
	// }

	handleItemClick = (evt, {name}) => {
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
						<Home user={this.props.user} changeView={this.handleChangeView} changeUser={this.props.changeUser} handleLoggedIn={this.props.handleLoggedIn} darkTheme={this.props.darkTheme}/>
						<Inbox darkTheme={this.props.darkTheme}/>
					</div>);
			
			case 'Profile':
				return <Profile user={this.props.user} changeView={this.handleChangeView} changeUser={this.changeUser} own ownFriendList={this.state.ownFriendList} darkTheme={this.props.darkTheme}/>;
			
			case 'OtherUserProfile':
				return <Profile user={this.state.anotherUser} changeView={this.handleChangeView} changeUser={this.changeUser} own={this.props.user.username === this.state.anotherUser.username}
				isFriend={this.checkIfFriend()} updateDashboard={this.updateDashboard} darkTheme={this.props.darkTheme} ownUser={this.props.user}/>;

			case 'EditProfile':
				return <EditProfile user={this.props.user} changeView={this.handleChangeView} changeUser={this.props.changeUser} darkTheme={this.props.darkTheme}/>;

			case 'Notifications':
				return <Notifications user={this.props.user} changeView={this.handleChangeView} darkTheme={this.props.darkTheme}/>
			
			case 'Search':
				return <Search user={this.props.user} changeView={this.handleChangeView} changeUser={this.changeUser} darkTheme={this.props.darkTheme}/>;
			
			case 'Settings':
				return <Settings darkTheme={this.props.darkTheme}/>;
			
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
						<Menu.Item active={this.state.activeItem === 'Settings'} onClick={this.handleItemClick} name='Settings' 
						style={{ borderColor: dark && this.state.activeItem === 'Settings' ? 'white' : '' }}>
							<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5, color: dark ? 'white' : 'black'  }}>
								<Icon name='cog' style={{ float: 'left', fontSize: 16 }}/>
								Settings
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
			
			// <Container>
			// 	{/* <Home/>
			// 	<Notifications/>
			// 	<Profile/>
			// 	<Search/>
			// 	<Settings/> */}
			// </Container>
				
		);
	}
}
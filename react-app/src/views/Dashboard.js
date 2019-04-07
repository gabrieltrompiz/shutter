import React from 'react'
import { Menu, Label, Icon, Container, Grid, Header, Image, Segment } from 'semantic-ui-react'
import Home from './Home';
import Notifications from './Notifications';
import Profile from './Profile';
import Search from './Search';
import Settings from './Settings';
import EditProfile from './EditProfile';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { activeItem : 'Home', notifications: 10 } //TODO: revisar xq se expira si pongo otra inicial
	}

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

	getView = () => {
		switch(this.state.activeItem) {
			case 'Home':
				return (
					<div style={{ display: 'flex' }}>
						<Home user={this.props.user} changeView={this.handleChangeView} changeUser={this.props.changeUser} handleLoggedIn={this.props.handleLoggedIn}/>
						<Notifications />
					</div>);
			
			case 'Profile':
				return <Profile user={this.props.user} changeView={this.handleChangeView} own/>;
			
			case 'EditProfile':
				return <EditProfile user={this.props.user} changeView={this.handleChangeView} changeUser={this.props.changeUser}/>;
			
			case 'Search':
				return <Search user={this.props.user}/>;
			
			case 'Settings':
				return <Settings/>;
			
			default:
				throw new Error();
		}
	}

	render() {
		return (
			<Container fluid style={{ height: '100vh', backgroundColor: '#FAFAFC' }}>
				<div style={{ backgroundColor: '#f1f2f4', display: 'flex' }}>
					<Menu vertical style={{ height: '100vh', position: 'sticky', backgroundColor: 'white', width: '17.5%' }} pointing secondary>
						<Menu.Item header style={{ textAlign: 'center' }}>
							<Image
								as="img"
								src={require('../assets/pandagram.png')}
								style={{ width: 70, height: 70, borderRadius: 12, margin: 'auto', marginTop: 10 }}
							/>
							<p style={{ fontFamily: 'Billabong', fontSize: 40, fontWeight: '400' }}>Pandagram</p>
						</Menu.Item>
						<Menu.Item active={this.state.activeItem === 'Home'} onClick={this.handleItemClick} name='Home'>
							<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5 }}>
								<Icon name='home' style={{ float: 'left', fontSize: 16 }}/>
								Home
							</Header>
						</Menu.Item>
						<Menu.Item active={this.state.activeItem === 'Profile'} onClick={this.handleItemClick} name='Profile'>
							<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5 }}>
								<Icon name='user' style={{ float: 'left', fontSize: 16 }}/>
								Profile
							</Header>
						</Menu.Item>
						<Menu.Item active={this.state.activeItem === 'Search'} onClick={this.handleItemClick} name='Search'>
							<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5 }}>
								<Icon name='search' style={{ float: 'left', fontSize: 16 }}/>
								Search
							</Header>
						</Menu.Item>
						<Menu.Item active={this.state.activeItem === 'Settings'} onClick={this.handleItemClick} name='Settings'>
							<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5 }}>
								<Icon name='cog' style={{ float: 'left', fontSize: 16 }}/>
								Settings
							</Header>
						</Menu.Item>
						<Menu.Item active={this.state.activeItem === 'LogOut'} onClick={this.logout}>
							<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5 }}>
								<Icon name='sign out' style={{ float: 'left', fontSize: 16 }}/>
								Log out
							</Header>
						</Menu.Item>
					</Menu>
					<Container style={{ height: '100vh', width: '85%', overflowY: 'scroll' }}>
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
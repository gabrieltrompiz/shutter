import React from 'react'
import { Menu, Label, Input, Icon, Container, Grid, Header, Image, Segment } from 'semantic-ui-react'
import Home from '../components/Home';
import Inbox from '../components/Inbox';
import Profile from '../components/Profile';
import Search from '../components/Search';
import Settings from '../components/Settings';
import EditProfile from '../components/EditProfile';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { activeItem : 'Home' } //TODO: revisar xq se expira si pongo otra inicial
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

	render() {
		return (
			<Container fluid style={{ height: 'inherit', backgroundColor: '#FAFAFC' }}>
				<Grid>
					<Grid.Column width={3} style={{ height: '100vh' }}>
						<Menu vertical style={{ height: 'inherit' }} pointing secondary>
							<Menu.Item header style={{ textAlign: 'center' }}>
								<Image
									as="img"
									src={require('../assets/pandagram.png')}
									style={{ width: 55, height: 55, borderRadius: 12, margin: 'auto', marginTop: 10 }}
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
							<Menu.Item active={this.state.activeItem === 'Inbox'} onClick={this.handleItemClick} name='Inbox'>
								<Label color='teal'>1</Label>
								<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5 }}>
									<Icon name='inbox' style={{ float: 'left', fontSize: 16 }}/>
									Inbox
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
					</Grid.Column>
					<Grid.Column width={12}>
						<Segment raised style={{ height: '95vh', marginTop: '2.5vh' }}>
							{this.state.activeItem === 'Profile' && <Profile user={this.props.user} changeView={this.handleChangeView}/>}
							{this.state.activeItem === 'Edit' && <EditProfile user={this.props.user} changeView={this.handleChangeView} changeUser={this.props.changeUser}/>}	
						</Segment>
						
					</Grid.Column>
				</Grid>
			</Container>
			
			// <Container>
			// 	{/* <Home/>
			// 	<Inbox/>
			// 	<Profile/>
			// 	<Search/>
			// 	<Settings/> */}
			// </Container>
				
		);
	}
}
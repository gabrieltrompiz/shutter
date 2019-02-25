import React from 'react'
import { Menu, Label, Input, Icon, Container, Grid, Header, Image } from 'semantic-ui-react'
import Home from '../components/Home'
import Inbox from '../components/Inbox'
import Profile from '../components/Profile'
import Search from '../components/Search'
import Settings from '../components/Settings'

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { activeItem : 'Home' }
	}

	handleItemClick = (evt, {name}) => {
		this.setState({ activeItem : name });
		console.log(name);
	};

	logout = async () => {
		await fetch('http://localhost:8080/logout', { credentials: 'include' })
		this.props.handleLoggedIn(false)
	}

	render() {
		return (
			<Container fluid style={{ height: 'inherit', backgroundColor: '#FAFAFC' }}>
				<Grid>
					<Grid.Column width={4} style={{ height: '90vh', paddingTop: '5vh', float: 'left' }}>
						<Menu vertical style={{ height: 'inherit' }} pointing>
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
							<Menu.Item active={this.state.activeItem === 'LogOut'} onClick={this.handleItemClick} name='LogOut'>
								<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5 }}>
									<Icon name='sign out' style={{ float: 'left', fontSize: 16 }}/>
									Log out
								</Header>
							</Menu.Item>
						</Menu>
					</Grid.Column>
					<Grid.Column width={12}>
						<Profile/>
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
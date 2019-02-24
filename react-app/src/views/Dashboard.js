import React from 'react'
import { Menu, Label, Input, Icon, Container, Grid } from 'semantic-ui-react'
import Home from '../components/Home'
import Inbox from '../components/Inbox'
import Profile from '../components/Profile'
import Search from '../components/Search'
import Settings from '../components/Settings'

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {activeItem : 'Home'}
	}

	handleItemClick = (evt, {name}) => {
		this.setState({activeItem : name});
		console.log({name});
	}

	render() {
		const activeItem = this.state
		return (
			<Grid columns={2}>
				<Grid.Column>
					<Menu vertical borderless style={{textAlign : 'center', marginTop : '25vh'}}>
						<Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick}>
						</Menu.Item>
						<Menu.Item name='Profile' active={activeItem === 'Profile'} onClick={this.handleItemClick}>
						</Menu.Item>
						<Menu.Item name='Inbox' active={activeItem === 'Inbox'} onClick={this.handleItemClick}>
						</Menu.Item>
						<Menu.Item name='Search' active={activeItem === 'Search'} onClick={this.handleItemClick}>
						</Menu.Item>
						<Menu.Item name='Settings' active={activeItem === 'Settings'} onClick={this.handleItemClick}>
						</Menu.Item>
						<Menu.Item name='Log out' active={activeItem === 'LogOut'} onClick={this.handleItemClick}>
						</Menu.Item>
					</Menu>
				</Grid.Column>
				<Grid.Column>
					<Container>
						<Home/>
						<Inbox/>
						<Profile/>
						<Search/>
						<Settings/>
					</Container>
				</Grid.Column>
			</Grid>
			);
	}
}
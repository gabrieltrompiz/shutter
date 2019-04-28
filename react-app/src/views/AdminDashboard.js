import React from 'react'
import { Menu, Icon, Container, Header, Image } from 'semantic-ui-react'
import Stats from './Stats';
import Mail from './Mail';
import AdminSearch from './AdminSearch';


export default class AdminDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { activeItem: 'Stats' }
    }

    handleItemClick = (evt, {name}) => {
		this.setState({ activeItem : name });
	};


    getView = () => {
		switch(this.state.activeItem) {
            case 'Stats': return <Stats darkTheme={this.props.darkTheme} />
            case 'Mail': return <Mail darkTheme={this.props.darkTheme} />
            case 'Search': return <AdminSearch darkTheme={this.props.darkTheme} />
            default: break;
        }
	}

    logout = async () => {
		await fetch('http://localhost:8080/logout', { credentials: 'include' })
		this.props.handleLoggedIn(false)
	}

    render() {
        const dark = this.props.darkTheme
        return(
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
						<Menu.Item active={this.state.activeItem === 'Stats'} onClick={this.handleItemClick} name='Stats' 
						style={{ borderColor: dark && this.state.activeItem === 'Stats' ? 'white' : '' }}>
							<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5, color: dark ? 'white' : 'black' }}>
								<Icon name='chart bar' style={{ float: 'left', fontSize: 16 }}/>
								Stats
							</Header>
						</Menu.Item>
						<Menu.Item active={this.state.activeItem === 'Mail'} onClick={this.handleItemClick} name='Mail' 
						style={{ borderColor: dark && this.state.activeItem === 'Mail' ? 'white' : '' }}>
							<Header as='h5' style={{ paddingLeft: 10, marginTop: 0.5, color: dark ? 'white' : 'black' }}>
								<Icon name='send' style={{ float: 'left', fontSize: 16 }}/>
								Mail
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
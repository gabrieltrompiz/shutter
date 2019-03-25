import React from 'react'
import { Image, Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'
import Button from './Button';

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: this.props.user, friendList: {}, posts: {}, posts: 0, friends: 0 }
	}

	componentDidMount = async () => {
		await fetch('http://localhost:8080/userPosts?user=' + this.props.user.username)
			.then(response => {
				if (response.status === 200) {
					this.setState({ posts: response.data });
				} else {
					console.log('cry');
				}
			});

		await fetch('http://localhost:8080/friends?user=' + this.props.user.username, { credentials: 'include' })
			.then(response => {
				if (response.status === 200) {
					this.setState({ friendList: response.data });
				} else {
					console.log('cry');
				}
			});
	}
	
	render() {
		const source = "http://localhost:8080/files?type=avatar&file=" + this.state.user.username + ".png"
		console.log(source)
		const date = new Date(this.state.user.birthday)
		const birthday = date.getDate() + "/" + (parseInt(date.getMonth(), 10) + 1) + "/" + date.getFullYear()
		return(			
			<Container>
				<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
					<Header as='h2' textAlign='center' style={{ marginTop: 0, marginBottom: 0, marginLeft: '40%', color: 'black' }}>{this.state.user.username}</Header>
					<Button outlined color='#FF5252' height={30} width={100} onClick={() => this.props.changeView('EditProfile')}>Edit Profile</Button>
				</div>
				
				<Divider />
				<Grid>
					<Grid.Column width={11} style={{ height: '100%' }}>
						<div style={{ display: 'flex', width: '100%', height: 'fit-content', paddingLeft: 20 }} id="mardicion">
							<Image
							src={source}
							style={{ width: 100, height: 100, borderRadius: 50, marginTop: 12 }}
							verticalAlign='middle'
							/>
							<div style={{ marginTop: 25, paddingLeft: 10 }}>
								<Header as='h2' style={{ marginTop: 0, marginBottom: 0, display: 'inline-block', color: 'black' }}>{this.state.user.name + " " + this.state.user.lastName}</Header><br />
								<Header as='h5' style={{ marginTop: 5, marginLeft: 0, display: 'inline-block', color: 'black', opacity: 0.5 }}>
									<Icon name='birthday cake' style={{ marginRight: 0, color: 'black' }} />
									{birthday}
								</Header>
							</div>
							<Header as='h1' textAlign='center' style={{ marginLeft: 120, paddingTop: 20, fontSize: 35 }}>
								<Header.Content>{this.state.posts}</Header.Content>
								<Header.Subheader>Posts</Header.Subheader>
							</Header>
							<Header as='h1' textAlign='center' style={{ marginLeft: 60, paddingTop: 20, fontSize: 35 }}>
								<Header.Content>{this.state.friends}</Header.Content>
								<Header.Subheader>Friends</Header.Subheader>
							</Header>	
						</div>
						<Divider/>
						<Container style={{ backgroundColor: 'grey', width: '100%', height: '60vh', borderRadius: 5 }}>
							AQUI VAN LOS POSTS
						</Container>
					</Grid.Column>
					<Grid.Column width={5} style={{ height: '85vh' }}>
						<Container style={{ backgroundColor: 'purple', width: '100%', height: '100%', borderRadius: 5 }}>
							AQUI VAN LOS AMIGOS O OTRA COSA
						</Container>
					</Grid.Column>
				</Grid>					
			</Container>			
			);
	}

}
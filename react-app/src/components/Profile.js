import React from 'react'
import { Segment, Image, Form, Container, Message, Divider, Transition, Grid, Header } from 'semantic-ui-react'
import button from './Button'

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: this.props.user }
	}
	
	render() {
		return(
			<Container fluid>
				<Header as='h1' style={{ fontSize: 45, marginBottom: 2 }}>Profile</Header>

				
				<Divider style={{ marginTop: 2 }}/>
				<Grid columns={1}>
					<Grid.Column>
						<Image
							src={require('../assets/pandagram2.png')}
							style={{ width: 120, height: 120, borderRadius: 60 }}
						/>
						<Header as='h3'>{this.state.user.username}</Header>
					</Grid.Column>
				</Grid>
			</Container>
			);
	}

}
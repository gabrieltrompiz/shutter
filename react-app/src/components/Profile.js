import React from 'react'
import { Segment, Image, Form, Container, Message, Divider, Transition, Grid, Header } from 'semantic-ui-react'
import button from './Button'

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	render() {
		return(
			<Container fluid>
				<Grid>
					<Grid.Column>
						<div style={{marginTop: '3vh'}}>
							<Image
								src={require('../assets/pandagram2.png')}
								style={{ width: '200px', height: '200px', textAlign: 'center' }}
							/>
							<Header as='h3' style={{align: 'center'}}>Nickname</Header>
						</div>

					</Grid.Column>
				</Grid>
			</Container>
			);
	}

}
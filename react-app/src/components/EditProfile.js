import React from 'react';
import {Segment, Container, Image, Header, Form} from 'semantic-ui-react';
import Button from './Button';

export default class EditProfile extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
				<Container fluid style={{display: 'flex', height: '90vh'}}>
					<div>
						<Button color='#c00000' width={70} height={35}>Back</Button>
						<Image
							src={require('../assets/pandagram2.png')}
							style={{ width: 160, height: 160, borderRadius: '100%', marginTop: '2vw', marginLeft: '0.8vw' }}
						/>
					</div>
					<div style={{paddingLeft: '10vw', height: 'inherit', width: '30vw'}}>
						<Header as='h2' style={{paddingLeft: '3.2vw'}}>Edit Profile</Header>
							<Form>
								<Form.Input fluid label='Username'/>
								<Form.Input fluid label='Name'/>
								<Form.Input fluid label='Last Name'/>
								<Form.Input fluid label='Email'/>
							</Form>
						<div style={{ width: 100, height: 45, marginTop: '25vh', marginLeft: '5.5vw' }}>
							<Button color='#00b300' width={120} height={42}>Confirm</Button>
						</div>
					</div>
				</Container>
			);
	}
}
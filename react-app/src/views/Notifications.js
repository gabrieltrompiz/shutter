import React from 'react'
import Not from '../components/Not.js'
import { Segment, Divider } from 'semantic-ui-react';

export default class Inbox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return(
			<Segment raised style={{ width: '30%', height: '94vh', left: '67.5%', marginTop: '2.5vh', position: 'fixed' }}>
				<p style={styles.title}>Notifications</p>
				<Divider fitted style={{ marginTop: 2 }} />
			</Segment>
		);
	}
}

const styles = { 
	title: {
		fontFamily: 'Heebo',
		fontSize: 30,
		fontWeight: 'bolder',
		margin: 0
	}
}
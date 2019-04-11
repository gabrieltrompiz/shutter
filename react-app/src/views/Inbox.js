import React from 'react'
import { Segment, Divider } from 'semantic-ui-react';

export default class Inbox extends React.Component {
	constructor(props) {
		super(props)
		this.state = { friends: [] }
	}

	render() {
		return(
			<Segment raised style={{ width: '23%', height: '94vh', left: '74.5%', marginTop: '2.5vh', position: 'fixed' }}>
				<p style={styles.title}>Friends</p>
				<Divider fitted style={{ marginTop: 2 }} />
				{this.state.friends.length === 0 && 
				<div style={styles.empty}>
					<i className="fas fa-exclamation" style={styles.icon}></i>
					<p style={styles.text}>You don't have any <br /> connected friends.</p>
				</div>}
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
	},
	empty: {
		height: '92%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
	},
	icon: {
		color: 'grey',
		fontSize: 40,
		opacity: 0.8
	},
	text: {
		color: 'grey', 
		opacity: 0.8,
		fontSize: 22,
		fontFamily: 'Heebo', 
		fontWeight: 'bolder',
		textAlign: 'center',
		lineHeight: 1.1,
		marginTop: 10
	}
}
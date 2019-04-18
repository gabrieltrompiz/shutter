import React from 'react'
import { Segment, Divider } from 'semantic-ui-react';
import FriendContainer from '../components/FriendContainer';

export default class Inbox extends React.Component {
	render() {
		console.log(this.props.friends)
		const dark = this.props.darkTheme
		const styles = this.getStyles(dark)
		return(
			<Segment raised style={{ width: '23%', height: '94vh', left: '74.5%', marginTop: '2.5vh', position: 'fixed', backgroundColor: dark ? '#1C2938' : 'white' }}>
				<p style={styles.title}>Friends</p>
				<Divider fitted style={{ marginTop: 2 }} />
				{this.props.friends.length === 0 && 
				<div style={styles.empty}>
					<i className="fas fa-exclamation" style={styles.icon}></i>
					<p style={styles.text}>You don't have any <br /> connected friends.</p>
				</div>}
				{this.props.friends.map(friend => {
					return <FriendContainer friend={friend} key={friend.id} darkTheme={dark} changeUser={this.props.changeUser} changeView={this.props.changeView}/>
				})}
			</Segment>
		);
	}

	getStyles = (dark) => {
		const styles = { 
			title: {
				fontFamily: 'Heebo',
				fontSize: 30,
				fontWeight: 'bolder',
				margin: 0,
				color: dark ? 'white' : 'black'
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
				color: dark ? '#8899A6' : 'grey',
				fontSize: 40,
				opacity: 0.8
			},
			text: {
				color: dark ? '#8899A6' : 'grey', 
				opacity: 0.8,
				fontSize: 22,
				fontFamily: 'Heebo', 
				fontWeight: 'bolder',
				textAlign: 'center',
				lineHeight: 1.1,
				marginTop: 10
			}
		}
		return styles
	}
}


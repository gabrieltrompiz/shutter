import React from 'react';
import { Image } from 'semantic-ui-react';

export default class Not extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.notification
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState(nextProps.notification)
	}

	getBeautifiedDate = () => {
		const seconds = Math.floor((Date.now() - this.state.notificationDate) / 1000)
		const date = new Date(this.state.notificationDate)
		if(seconds < 0) { return '' }
        if(seconds <= 10) { return 'a few seconds ago' }
        else if(seconds < 60) { return seconds + ' seconds ago' }
        else if(seconds < 3600) { 
            const unit = Math.trunc(seconds / 60) === 1 ? ' minute ago' : ' minutes ago'
            return Math.trunc(seconds / 60) + unit
        }
        else if(seconds < 86400) { 
            const unit = Math.trunc(seconds / 3600) === 1 ? ' hour ago' : ' hours ago'
            return Math.trunc(seconds / 3600) + unit 
        }
		else if(seconds < 172800) {
			let hours, suffix, minutes;
			if(date.getHours() > 12) { hours = date.getHours() - 12; suffix = " PM" }
			else { hours = date.getHours(); suffix = " AM" }
			if(date.getMinutes() < 10) { minutes = "0" + date.getMinutes() }
			else { minutes = date.getMinutes() }
			if(hours === 0) { hours = 12 }
			return "Yesterday at " + parseInt(hours, 10) + ":" + minutes + suffix
		}
        else { 
			let hours, suffix, minutes;
			if(date.getHours() > 12) { hours = date.getHours() - 12; suffix = " PM" }
			else { hours = date.getHours(); suffix = " AM" }
			if(date.getMinutes() < 10) { minutes = "0" + date.getMinutes() }
			else { minutes = date.getMinutes() }
			if(hours === 0) { hours = 12 }
			const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			return months[date.getMonth()] + " " + date.getDate() + " at " + parseInt(hours, 10) + ":" + minutes + suffix;
		}
	}

	getMessage = () => {
		const user = this.state.user
		const styles = this.getStyles(this.props.darkTheme)
		switch(this.state.typeNotificationId) {
			case 1:
				return <span style={styles.text}><span style={styles.name}>{user.name + " " + user.lastName}</span> wants to be your friend.</span>
			case 2:
				return <span style={styles.text}><span style={styles.name}>{user.name + " " + user.lastName}</span> commented one of your posts.</span>
			case 3:
				return <span style={styles.text}><span style={styles.name}>{user.name + " " + user.lastName}</span> liked one of your posts.</span>
			case 4:
				return <span style={styles.text}><span style={styles.name}>{user.name + " " + user.lastName}</span> accepted your friend request.</span>
			case 5:
				return <span style={styles.text}><span style={styles.name}>{user.name + " " + user.lastName}</span> rejected your friend request.</span>
			default:
				throw new Error();
		}
	}

	acceptNotif = async (accepted) => {
		let notification = Object.assign({}, this.state);
		notification.user = this.props.ownUser
		notification.typeNotificationId = accepted ? 4 : 5
		notification.notificationAccepted = true
		notification.notificationSender = this.state.notificationReceiver
		notification.notificationReceiver = this.state.notificationSender
		this.props.notificationSocket.send(JSON.stringify(notification))
		this.setState({ notificationAccepted: accepted })
		this.props.updateDashboard()
	}

	render() {
		const source = 'http://localhost:8080/files?type=avatar&file=' + this.state.user.username + '.png'
		const dark = this.props.darkTheme
		const styles = this.getStyles(dark)
		return (
			<div>
				<div style={{ backgroundColor: dark ? '#1c2938' : '#f0f0f0', height: 60, width: '100%', display: 'flex', borderRadius: 5, border: 'none', marginTop: 10, position: 'relative' }}>
					<Image
						src={source}
						style={{ width: 40, height: 40, borderRadius: '100%', margin: 10 }}
					/>
					<div style={{ paddingTop: 10 }}>
						<p style={styles.date}>{this.getBeautifiedDate()}</p>
						{this.getMessage()}
					</div>
					{this.state.typeNotificationId === 1 && typeof this.state.notificationAccepted === "undefined" &&
					<div style={{ position: 'absolute', right: 0, alignSelf: 'center' }}>
						<button style={styles.btnCheck} onClick={() => this.acceptNotif(true)}><i className="fas fa-check"></i><br/> Accept</button>
						<button style={styles.btnReject} onClick={() => this.acceptNotif(false)}><i className="fas fa-times"></i><br/> Reject</button>
					</div>}
					{this.state.typeNotificationId === 1 && typeof this.state.notificationAccepted !== "undefined" &&
					<div style={{ position: 'absolute', right: 0, alignSelf: 'center', marginRight: 10 }}>
						{this.state.notificationAccepted ? <span style={{ fontFamily: 'Roboto', color: 'green' }}><i className="fas fa-check"></i> Accepted</span> :
						<span style={{ fontFamily: 'Roboto', color: 'red' }}><i className="fas fa-times"></i> Rejected</span>}
					</div>}
				</div>
			</div>
		);
	}

	getStyles = (dark) => {
		const styles = {
			name: {
				fontFamily: 'Heebo',
				fontWeight: 'bolder',
				fontSize: 14,
				color: dark ? 'white' : 'black',
				marginBottom: 0
			},
			date: {
				fontFamily: 'Heebo',
				fontWeight: 'light',
				color: dark ? '#8596A3' : 'grey',
				margin: 0,
				fontSize: 12
			},
			text: {
				fontFamily: 'Heebo',
				fontWeight: 'light',
				color: dark ? '#8596A3' : 'grey',
				fontSize: 14
			},
			btnCheck: {
				outline: 0,
				border: 'none',
				backgroundColor: 'transparent',
				cursor: 'pointer',
				fontFamily: 'Roboto',
				color: 'green',
				marginRight: 5
			},
			btnReject: {
				outline: 0,
				border: 'none',
				backgroundColor: 'transparent',
				cursor: 'pointer',
				fontFamily: 'Roboto',
				color: 'red',
				marginRight: 10
			},
			
		}
		return styles;
	}
}
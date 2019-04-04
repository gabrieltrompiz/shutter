import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import Button from './Button.js';

export default class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.post;
	}

	getBeautifiedDate = () => {
		const seconds = Math.floor((Date.now() - this.state.creationTime) / 1000)
		console.log('hehehe')
		const date = new Date(this.state.creationTime)
		if(seconds <= 0) { return '' }
        if(seconds <= 10) { return 'a few seconds ago' }
        else if(seconds <= 60) { return seconds + ' seconds ago' }
        else if(seconds <= 3600) { 
            const unit = Math.trunc(seconds / 60) === 1 ? ' minute ago' : ' minutes ago'
            return Math.trunc(seconds / 60) + unit
        }
        else if(seconds <= 86400) { 
            const unit = Math.trunc(seconds / 3600) === 1 ? ' hour ago' : ' hours ago'
            return Math.trunc(seconds / 3600) + unit 
        }
		else if(seconds <= 172800) {
			let hours, suffix, minutes;
			if(date.getHours() > 12) { hours = date.getHours() - 12; suffix = " PM" }
			else { hours = date.getHours(); suffix = " AM" }
			if(date.getMinutes() < 10) { minutes = "0" + date.getMinutes() }
			else { minutes = date.getMinutes() }
			return "Yesterday at " + parseInt(hours, 10) + ":" + minutes + suffix
		}
        else { 
			let hours, suffix, minutes;
			if(date.getHours() > 12) { hours = date.getHours() - 12; suffix = " PM" }
			else { hours = date.getHours(); suffix = " AM" }
			if(date.getMinutes() < 10) { minutes = "0" + date.getMinutes() }
			else { minutes = date.getMinutes() }
			const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			return months[date.getMonth()] + " " + date.getDate() + " at " + parseInt(hours, 10) + ":" + minutes + suffix;
		}
	}

	render() {
		const source = 'http://localhost:8080/files?type=avatar&file=' + this.state.user.username + '.png'
		return(
			<Container style={{ width: '100%', height: 'auto', marginBottom: '2.5vh', backgroundColor: 'white', borderColor: '#DDDFE2', 
			borderRadius: 5, borderWidth: 1.5, borderStyle: 'solid', breakInside: 'avoid', display: 'inline-block' }}>
				<div style={{ display: 'flex',  marginTop: 10, marginBottom: 10, marginLeft: 10 }}>
					<Image
						src={source}
						style={{ width: 50, height: 50, borderRadius: '100%' }}
					/>
					<div style={{ paddingTop: 5 }}>
						<span style={styles.name}>{this.state.user.name + " " + this.state.user.lastName}</span>
						<span style={styles.username}>{"· @" + this.state.user.username}</span><br/>
						<span style={styles.date}>{this.getBeautifiedDate()}</span>
					</div>
				</div>
				<p style={styles.text}>{this.state.postText}</p>
				
			</Container>
			);
	}
}
/*
<button style={{ backgroundColor: 'rgb(230, 230, 230)', border: 'none', width: '32.7%', marginLeft: '0.3%', marginRight: '0.3%', borderRadius: '15px' }}>Likes</button>
<button style={{ backgroundColor: 'rgb(230, 230, 230)', border: 'none', width: '32.7%', marginLeft: '0.3%', marginRight: '0.3%', borderRadius: '15px' }}>Comment</button>
<button style={{ backgroundColor: 'rgb(230, 230, 230)', border: 'none', width: '32.7%', marginLeft: '0.3%', marginRight: '0.3%', borderRadius: '15px' }}>Share</button>
*/
const styles = {
	name: {
		fontFamily: 'Heebo',
		fontWeight: 'bolder',
		fontSize: 18,
		paddingLeft: 10,
		paddingTop: 5
	},
	username: {
		paddingTop: 5,
		fontFamily: 'Roboto',
		fontWeight: 'light',
		color: 'grey',
		paddingLeft: 5
	},
	date: {
		fontFamily: 'Heebo',
		fontWeight: 'light',
		paddingLeft: 10,
		color: 'grey'
	},
	text: {
		wordWrap: 'break-word',
		fontSize: 16,
		fontFamily: 'Heebo',
		fontWeight: 'light',
		paddingLeft: 15,
		paddingRight: 15
	}
}
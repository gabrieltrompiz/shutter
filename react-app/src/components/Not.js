import React from 'react';
import { Image } from 'semantic-ui-react';

export default class Not extends React.Component {
	constructor(props) {
		super(props);
	}

	didComponentMount = () => {
		console.log(this.props.notification.notificationDate);
	}

	getBeautifiedDate = () => {
		const seconds = Math.floor((Date.now() - this.props.notification.notificationDate) / 1000)
		const date = new Date(this.props.notification.notificationDate)
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
		switch(this.props.notification.typeNotificationId) {
			case 1:
				break;

			case 2:
				break;

			case 3:
				break;

			case 4:
				break;

			default:
				throw new Error();
		}
	}

	render() {
		return(
				<div style={{ backgroundColor: 'white', height: '135px', width: '100%', display: 'flex', border: '1px solid rgb(220, 220, 220)' }}>
					<div style={{width: '15%'}}>
						<Image
							src={require('../assets/pandagram2.png')}
							style={{ width: 60, height: 60, borderRadius: '100%', marginTop: '3vh', marginLeft: '2.5vw' }}
						/>
						<p style={{ marginLeft: '2.1vw', marginTop: '1.4vh', fontFamily: 'Arial', fontSize: '12px', width: 'fill', margin: 'none' }}>
							{this.getBeautifiedDate()}
						</p>
					</div>
					
					<div style={{ width: 'inherit', fontFamily: 'Arial', fontSize: '18px', 
					paddingLeft: '2vw', paddingRight: '1vw', paddingTop: '4vh '}}>
						{'WISAM ES MARICO XDDDDDDDDDDDD'}
					</div>
				</div>
			);
	}
}
//fontFamily: 'Arial', fontSize: '22px'
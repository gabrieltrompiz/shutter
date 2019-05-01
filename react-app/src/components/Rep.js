import React from 'react'
import { Image } from 'semantic-ui-react';

export default class Rep extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.report
        console.log(this.state)
    }

    getBeautifiedDate = () => {
		const seconds = Math.floor((Date.now() - this.state.date) / 1000)
		const date = new Date(this.state.date)
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

    render() {
        const dark = this.props.darkTheme
        const source = 'http://localhost:8080/files?type=avatar&file=' + this.state.user.username + '.png'
        const styles = this.getStyles(dark)
        return(
            <div>
				<div style={{ backgroundColor: dark ? '#1c2938' : '#f0f0f0', height: 'auto', width: '100%', display: 'flex', borderRadius: 5, border: 'none', marginTop: 10, position: 'relative' }}>
                    <Image
						src={source}
						style={{ width: 60, height: 60, borderRadius: '100%', margin: 10 }}
					/>
                    <div style={{ paddingTop: 10 }}>
						<p style={styles.date}>{this.getBeautifiedDate()}</p>
                    </div>
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
				fontSize: 14
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
			}
        }
        return styles
    }
}
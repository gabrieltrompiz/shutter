import React from 'react'
import { Container, Image, Icon } from 'semantic-ui-react'
export default class PostShowcase extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.post
    }

	getBeautifiedDate = () => {
		const seconds = Math.floor((Date.now() - this.props.post.creationTime) / 1000)
		const date = new Date(this.props.post.creationTime)
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
        const styles = this.getStyles(dark)
        const source = 'http://localhost:8080/files?type=avatar&file=' + this.props.post.user.username + '.png'
        return(
            <Container style={{ width: '100%', height: 'auto', backgroundColor: dark ? '#1c2938' : 'white', borderColor: dark ? '#1C2938' : '#DDDFE2', 
			borderRadius: 5, borderWidth: 1.5, borderStyle: 'solid', breakInside: 'avoid', display: 'inline-block', position: 'relative', padding: 10 }}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex' }}>
						<Image
							src={source}
							style={{ width: 40, height: 40, borderRadius: '100%' }}
						/>
						<div style={{ paddingTop: 5 }}>
							<span style={styles.name}>{this.props.post.user.name + " " + this.props.post.user.lastName}</span>
							<span style={styles.username}>{"· @" + this.props.post.user.username}</span><br/>
							<span style={styles.date}>{this.getBeautifiedDate(this.state.creationTime)}</span>
						</div>
					</div>
				</div>
				<p style={styles.text}>{this.props.post.postText}</p>
				{this.props.deletable &&
				<div style={{ width: 'fit-content', height: 40, color: 'red', fontFamily: 'Roboto', cursor: 'pointer', 
                position: 'absolute', right: 10, top: '40%' }} onClick={() => this.props.delete(this.props.post.idPost)}>
                    <Icon name='delete'/>Delete
                </div>}
			</Container>
        );
    }

    getStyles = (dark) => {
        const styles = {
            name: {
				fontFamily: 'Heebo',
				fontWeight: 'bolder',
				fontSize: 18,
				paddingLeft: 10,
				paddingTop: 5,
				color: dark ? 'white' : 'black',
				marginBottom: 0
			},
			username: {
				paddingTop: 5,
				fontFamily: 'Roboto',
				fontWeight: 'light',
				color: dark ? '#8596A3' : 'grey',
				paddingLeft: 5
			},
			date: {
				fontFamily: 'Heebo',
				fontWeight: 'light',
				paddingLeft: 10,
				color: dark ? '#8596A3' : 'grey'
			},
			text: {
				wordWrap: 'break-word',
				fontSize: 16,
				fontFamily: 'Heebo',
				fontWeight: 'light',
				paddingLeft: 15,
				paddingRight: 15,
				color: dark ? 'white' : 'black'
			},
			stats: {
				fontFamily: 'Heebo',
				fontWeight: 'bolder',
				color: dark ? 'white' : 'black',
				fontSize: 16,
				paddingRight: 5
			},
			statsText: {
				fontFamily: 'Heebo',
				fontWeight: 'light',
				color: dark ? '#8596A3' : '#606770',
				fontSize: 16,
			}
        }
        return styles;
    }
}
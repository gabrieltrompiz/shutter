import React from 'react'
import { Image, Icon, Transition } from 'semantic-ui-react';
import Post from './Post';
import Comment from './Comment';

export default class Rep extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.report
    }

	componentDidMount = () => {
		this.setState({ showMenu: false })
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

	markAsRead = () => {
		this.props.reportsSocket.send("Resolve;" + this.state.reportId)
	}

	delete = () => {
		const suffix = this.state.typeReport === 1 ? 'DeletePost;' : 'DeleteComment;'
		this.props.reportsSocket.send(suffix + this.state.target)
	}

    render() {
        const dark = this.props.darkTheme
        const source = 'http://localhost:8080/files?type=avatar&file=' + this.state.user.username + '.png'
        const styles = this.getStyles(dark)
        return(
            <div>
				<div style={{ backgroundColor: dark ? '#192432' : '#f9f9f9', height: 'auto', width: '100%', display: 'flex', borderRadius: 5, border: 'none', marginTop: 10, position: 'relative' }}>
                    <Image
						src={source}
						style={{ width: 60, height: 60, borderRadius: '100%', margin: 10 }}
					/>
					<button style={styles.threeDots} onClick={() => this.setState({ showMenu: !this.state.showMenu })}>
                        <Icon name={"ellipsis horizontal"} style={{ fontSize: 20 }}></Icon>
                    </button>
					<Transition visible={this.state.showMenu} animation='fade left' duration={250} unmountOnHide>
                        <div style={styles.menu}>
                            <button style={styles.menuBtn} onClick={() => this.delete()}>
                                Delete {this.state.typeReport === 1 ? "Post" : 'Comment'}
                            </button>
                            <button style={styles.menuBtn} onClick={() => this.markAsRead()}>
                                Mark as Solved
                            </button>
                        </div>
                    </Transition>
                    <div style={{ paddingTop: 10, width: '80%' }}>
						<p style={styles.date}>{this.getBeautifiedDate()}</p>
						<p style={styles.name}>
							{this.state.user.name + " " + this.state.user.lastName + " reported a " + (this.state.typeReport === 1 ? 'post.' : 'comment.')}
						</p>
						<div style={{ width: '100%' }}>
							{this.state.typeReport === 1 &&
							<Post post={this.state.post} admin ownUser={{ id: 0 }} darkTheme={dark} />}
							{this.state.typeReport === 2 && 
							<Comment comment={this.state.comment} admin ownUser={{ id: 0 }} darkTheme={dark} />}
							<p style={styles.name}>Reason: {this.state.message.trim() === '' ? '(No reason given)' : this.state.message}</p>
						</div>
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
				marginBottom: 0,
				paddingBottom: 5
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
			threeDots: {
                outline: 0,
                border: 'none',
                backgroundColor: 'transparent',
                color: dark ? 'white' : 'black',
                textAlign: 'center',
                height: 'fit-content',
                cursor: 'pointer',
				position: 'absolute',
				right: 10,
				top: 10
            },
			menuBtn: {
                backgroundColor: 'transparent',
                cursor: 'pointer',
                color: dark ? 'white' : 'black',
                textAlign: 'center',
                outline: 0,
                border: 'none',
                fontFamily: 'Heebo',
				fontWeight: 'bold',
				width: '90%',
				height: 30,
				borderRadius: 5
            },
			menu: {
                position: 'absolute',
                right: 25,
                backgroundColor: dark ? '#1C2938' : '#e3e3e3',
                zIndex: 2,
                width: 150,
                padding: 10,
                borderRadius: 5
            },
        }
        return styles
    }
}
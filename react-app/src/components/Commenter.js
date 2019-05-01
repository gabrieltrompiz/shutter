import React from 'react';
import { Image, TextArea } from 'semantic-ui-react';

export default class Commenter extends React.Component {
	constructor(props) {
        super(props);
        this.state = { commentText: 'Add a comment...', empty: true }
    }

    checkFocus = () => {
		if(this.state.commentText === 'Add a comment...') {
			this.setState({ commentText: '', empty: true })
		}
	}

    checkFocusOut = () => {
		if(this.state.commentText.trim() === '') {
			this.setState({ commentText: 'Add a comment...', empty: true  })
		}
	}


    handleSend = async () => {
        if(this.state.commentText.trim() !== '') {
            let body = {
                commentText: this.state.commentText,
                commentUrl: '',
                postId: this.props.postId,
            };

            await fetch('http://localhost:8080/comments', {method: 'POST', body: JSON.stringify(body), credentials: 'include' })
            .then(response => response.json())
            .then(response => {
                if(response.status === 200) {
                    this.setState({ commentText: 'Add a comment...', empty: true });
                    this.props.addToConstant()
                    this.props.comment(body);
                }
            });
            if(this.props.user.id !== this.props.post.user.id) {
                let notification = {}
                notification.user = this.props.user
                notification.typeNotificationId = 2
                notification.notificationSender = this.props.user.id
                notification.notificationReceiver = this.props.post.user.id
                notification.notificationDate = Date.now()
                this.props.notificationSocket.send(JSON.stringify(notification))
            }
        }
    }

    handleInput = (event, {name, value}) => {
        this.setState({ commentText: value, empty: false })
    }

    resetCommenter = () => {

    }

    render() {
        const dark = this.props.darkTheme
        const empty = this.state.empty
        const styles = this.getStyles(dark, empty)
        return(
            <div style={{ display: 'flex', width: '100%', height: 'auto', padding: 5, margin: 10 }}>
                <Image
                    src={'http://localhost:8080/files?type=avatar&file=' + this.props.user.username + '.png'}
                    style={{ width: 35, height: 35, borderRadius: '100%', marginLeft: '0.8%' }}
                />
                <TextArea style={styles.textArea} onChange={this.handleInput} value={this.state.commentText} onFocus={() => this.checkFocus()}
                onBlur={() => this.checkFocusOut()}/>
                <button style={styles.button} onClick={() => this.handleSend()} disabled={empty}><i className="fas fa-plus"></i></button>
            </div>
        )
    }

    getStyles = (...settings) => {
        const dark = settings[0]
        const empty = settings[1]
        const styles = {
            button: {
                outline: 0,
                border: 'none',
                height: 35,
                width: 35,
                backgroundColor: dark ? '#1f2f3f' : '#f0f0f0',
                cursor: 'pointer',
                padding: 0,
                justifySelf: 'center',
                alignSelf: 'center',
                color: dark ? 'white' : 'black',
                borderRadius: '100%',
                marginLeft: 10
            },
            textArea: {
                resize: 'none', 
                width: '85%',
                height: 'auto', 
                border: 'none', 
                backgroundColor: dark ? '#1f2f3f' : '#f0f0f0', 
                outline: 0, 
                borderRadius: 5,
                marginLeft: 10,
                color: dark ? empty ? '#8899A6' : 'white' : empty ? '#728390' : 'black'
            }
        }
        return styles
    }
}

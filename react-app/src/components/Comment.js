import React from 'react';
import { Icon, Image, Transition, Segment, Divider, TextArea } from 'semantic-ui-react';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showMenu: false, reportText: '', reportVisible: false }
    }

    handleInput = (event, {name, value}) => {
        this.setState({ reportText: value })
    }

    deleteComment = async () => {
        console.log(this.props.comment);
        let body = {
            commentId: this.props.comment.commentId
        };

        await fetch ('http://localhost:8080/comments', {method: 'DELETE', credentials: 'include', body: JSON.stringify(body)})
            .then(response => response.json())
            .then(response => {
                if(response.status === 200) {
                    this.props.deleteComment(this.props.comment);
                }
            });
    };

    reportComment = () => {
        const report = {
			target: this.props.comment.commentId,
			typeReport: 2,
			message: this.state.reportText.trim()
		}
		this.props.reportsSocket.send(JSON.stringify(report))
		this.setState({ reportText: '', reportVisible: false, showMenu: false })
    };

    render() {
        const dark = this.props.darkTheme;
        const styles = this.getStyles(dark);
        return(
            <div style={{ height: 'auto', width: '96%', padding: 10, backgroundColor: dark ? '#1f2f3f' : '#f0f0f0' , margin: '2%', borderRadius: 5, position: 'relative' }}>
                <div style={{ display: 'flex', width: 'inherit' }}>
                    <Image
                        src={'http://localhost:8080/files?type=avatar&file=' + this.props.comment.user.username + '.png'}
                        style={{ width: 35, height: 35, borderRadius: '100%' }}
                    />
                    <div style={{ width: 'inherit' }}>
                        <span>
                            <span style={styles.name}>{this.props.comment.user.name + " " + this.props.comment.user.lastName}</span>
                            <span style={styles.username}>{"· @" + this.props.comment.user.username}</span>
                        </span>
                        <p style={styles.text}>{this.props.comment.commentText}</p>
                    </div>
                    {!this.props.admin && <button style={styles.threeDots} onClick={() => this.setState({ showMenu: !this.state.showMenu })}>
                        <Icon name={"ellipsis horizontal"}></Icon>
                    </button>}
                    <Transition visible={this.state.showMenu} animation='fade left' duration={250} unmountOnHide>
                        <div style={styles.menu}>
                            {this.props.comment.userId === this.props.ownUser.id &&
                            <button style={styles.menuBtn} onClick={() => this.deleteComment()}>
                                Delete Comment
                            </button>}

                            {this.props.comment.userId !== this.props.ownUser.id &&
                            <button style={styles.menuBtn} onClick={() => this.setState({ reportVisible: true })}>
                                Report Comment
                            </button>}
                        </div>
                    </Transition>
                </div>
                {this.state.reportVisible && 
                <div style={{ display: 'flex', position: 'fixed', width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.3)', top: 0, right: 0, left: 0, bottom: 0, zIndex: 3,
                alignItems: 'center', justifyContent: 'center' }}>
                    <Segment raised style={{ width: 600, height: 300, backgroundColor: dark ? '#1C2938' : 'white' }}>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            <p style={styles.title}>Report an issue</p>
                            <Icon name='times' onClick={() => this.setState({ reportVisible: false })} style={{ color: dark ? 'white' : 'black', fontSize: 24, cursor: 'pointer', alignSelf: 'center' }} />
                        </div>
                        <Divider fitted />
                        <p style={styles.subtitle}>Reason:</p>
                        <TextArea placeholder='Please describe your issue (optional)' style={styles.textArea} onChange={this.handleInput} value={this.state.reportText}/>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                            <button onClick={() => this.reportComment()} style={styles.reportBtn}>Send Report</button>
                        </div>
                    </Segment>
                </div>}
                {this.props.search &&
                <div style={{ width: 'fit-content', height: 40, color: 'red', fontFamily: 'Roboto', cursor: 'pointer', 
                position: 'absolute', right: 30, top: 20 }} onClick={() => this.props.delete(this.props.comment.commentId)}>
                    <Icon name='delete'/>Delete
                </div>}
            </div>
        )
    }

    getStyles = (dark) => {
        const styles = { 
            name: {
				fontFamily: 'Heebo',
				fontWeight: 'bolder',
				fontSize: 15,
				paddingLeft: 10,
				color: dark ? 'white' : 'black',
				marginBottom: 0
			},
			username: {
				fontFamily: 'Roboto',
				fontWeight: 'light',
				color: dark ? '#8596A3' : 'grey',
				paddingLeft: 5
			},
            text: {
                color: dark ? 'white' : 'black',
                paddingLeft: 12,
                margin: 0,
                fontFamily: 'Heebo',
                fontWeight: 'light',
                fontSize: 12,
                wordWrap: 'break-word',
            },
            menu: {
                position: 'absolute',
                right: 25,
                backgroundColor: dark ? '#1C2938' : '#e3e3e3',
                zIndex: 2,
                width: 150,
                padding: 15,
                borderRadius: 5
            },
            threeDots: {
                outline: 0,
                border: 'none',
                backgroundColor: 'transparent',
                color: dark ? 'white' : 'black',
                marginRight: -25,
                textAlign: 'center',
                height: 'fit-content',
                cursor: 'pointer'
            },
            menuBtn: {
                backgroundColor: 'transparent',
                cursor: 'pointer',
                color: dark ? 'white' : 'black',
                textAlign: 'center',
                outline: 0,
                border: 'none',
                width: '100%',
                fontFamily: 'Roboto'
            },
            title: {
				fontFamily: 'Heebo',
				fontSize: 24,
				fontWeight: 'bolder',
				color: dark ? 'white' : 'black',
				marginTop: 0,
				marginBottom: 2,
				alignSelf: 'flex-start'
			},
			subtitle: {
				fontFamily: 'Roboto',
				fontSize: 18,
				color: dark ? 'white' : 'black',
				marginLeft: 10,
				marginTop: 5,
				marginBottom: 4
			},
			textArea: {
                resize: 'none', 
                width: 'calc(100% - 25px)',
                height: '50%', 
                border: 'none', 
                backgroundColor: dark ? '#1f2f3f' : '#f0f0f0', 
                outline: 0, 
                borderRadius: 5,
                marginLeft: 15,
                color: dark ? 'white' : 'black',
				marginBottom: 15
            },
			reportBtn: {
				outline: 0,
				cursor: 'pointer',
				border: 'none',
				borderRadius: 5,
				color: dark ? 'white' : 'black',
				backgroundColor: dark ? '#1f2f3f' : '#e3e3e3',
				padding: 10,
				alignSelf: 'flex-end',
				fontFamily: 'Roboto'
			}
        }
        return styles
    }
}
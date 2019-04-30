import React from 'react';
import {Icon, Image, Transition} from 'semantic-ui-react';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showMenu: false }
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

    };

    render() {
        const dark = this.props.darkTheme;
        const styles = this.getStyles(dark);
        return(
            <div style={{ height: 'auto', width: '96%', padding: 10, backgroundColor: dark ? '#1f2f3f' : '#f0f0f0' , margin: '2%', borderRadius: 5 }}>
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
                    <button style={styles.threeDots}
                            onClick={() => this.setState({ showMenu: !this.state.showMenu })}>
                        <Icon name={"ellipsis horizontal"}></Icon>

                        <Transition visible={this.state.showMenu} animation='fade left' duration={250} unmountOnHide>
                            <div style={styles.menu}>
                                {this.props.comment.userId === this.props.ownUser.id &&
                                <button style={styles.menuBtn} onClick={() => this.deleteComment()}>
                                    Delete Comment
                                </button>}

                                {this.props.comment.userId !== this.props.ownUser.id &&
                                <button style={styles.menuBtn} onClick={() => this.reportComment()}>
                                    Report Comment
                                </button>}
                            </div>
                        </Transition>
                    </button>
                </div>
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
            }
        }
        return styles
    }
}
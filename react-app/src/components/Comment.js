import React from 'react';
import { Image } from 'semantic-ui-react';

export default class Comment extends React.Component {
    render() {
        const dark = this.props.darkTheme
        const styles = this.getStyles(dark)
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
            }
        }
        return styles
    }
}
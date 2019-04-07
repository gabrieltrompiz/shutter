import React from 'react'
import { Image } from 'semantic-ui-react';

export default class FriendContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.friend
    }

    handleClick = () => {
        this.props.changeUser(this.state);
        this.props.changeView('OtherUserProfile');
    }

    render() {
        const source = 'http://localhost:8080/files?type=avatar&file=' + this.state.username + '.png'
        return(
            <div style={styles.container} onClick={() => this.handleClick()}>
                <Image
                    src={source}
                    style={{ width: 60, height: 60, borderRadius: '100%' }} 
                />
                <div>
                    <p style={styles.name}>{this.state.name + " " + this.state.lastName}</p>
                    <p style={styles.username}>{"@" + this.state.username}</p>
                </div>
                
            </div>
        );
    }
}

const styles = { 
    container: { 
        width: '97%',
        height: 80, 
        marginLeft: '1.5%', 
        display: 'flex', 
        alignItems: 'center',
        cursor: 'pointer'
    }, 
    name: {
		fontFamily: 'Heebo',
		fontWeight: 'bolder',
		fontSize: 18,
		paddingLeft: 10,
        margin: 0
	},
	username: {
		fontFamily: 'Roboto',
		fontWeight: 'light',
		color: 'grey',
		paddingLeft: 10
	}
}



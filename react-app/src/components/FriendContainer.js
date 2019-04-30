import React from 'react'
import { Image } from 'semantic-ui-react';

export default class FriendContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.friend
    }

    handleClick = async () => {
        if(!this.props.showcase) {
            await this.props.changeUser(this.state);
            await this.props.changeView('OtherUserProfile');
        }
    }

    render() {
        const source = 'http://localhost:8080/files?type=avatar&file=' + this.state.username + '.png'
        const dark = this.props.darkTheme
        const styles = this.getStyles(dark)
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

    getStyles = (dark) => {
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
                margin: 0,
                color: dark ? 'white' : 'black'
            },
            username: {
                fontFamily: 'Roboto',
                fontWeight: 'light',
                color: dark ? '#8596A3' : 'grey',
                paddingLeft: 10
            }
        }
        return styles
    }
}




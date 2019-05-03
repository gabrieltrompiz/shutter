import React from 'react';
import { Image, Icon } from 'semantic-ui-react';
import {Container} from "semantic-ui-react";

export default class UserShowcase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { banned: !this.props.user.enabled};
    }

    banUser = async () => {
        let method = this.state.banned ? 'unbanUser': 'banUser';
        await fetch('http://localhost:8080/bans?method=' + method + '&&id=' + this.props.user.id, { credentials: 'include', method: 'POST' })
        .then(response => response.json())
        .then(response => {
            if (response.status === 200) {
                this.setState({ banned: !this.state.banned });
            } else console.log('cry');
        });
    };

    render() {
        const dark = this.props.darkTheme;
        const styles = this.getStyles(dark);
        const source = 'http://localhost:8080/files?type=avatar&file=' + this.props.user.username + '.png'
        return(
            <Container style={{ width: '100%', height: 'auto', backgroundColor: dark ? '#1c2938' : 'white', borderColor: dark ? '#1C2938' : '#DDDFE2',
            borderRadius: 5, borderWidth: 1.5, borderStyle: 'solid', breakInside: 'avoid', display: 'inline-block', position: 'relative', padding: 10, marginBottom: 10 }}>
                <div style={{ display: 'flex' }}>
                    <Image
                        src={source}
                        style={{ width: 40, height: 40, borderRadius: '100%' }}
                    />
                    <div style={{ paddingTop: 5 }}>
                        <span style={styles.name}>{this.props.user.name + " " + this.props.user.lastName}</span>
                        <span style={styles.username}>{"· @" + this.props.user.username}</span><br/>
                    </div>

                    <div style={{ width: 'fit-content', height: 40, color: this.state.banned ? 'green' : 'red', fontFamily: 'Roboto', cursor: 'pointer', 
                    position: 'absolute', right: 10, top: 18 }} onClick={() => this.banUser()}>
                        <Icon name={this.state.banned ? 'check'  :'delete'} />
                        {this.state.banned ? 'Unban' : 'Ban'}
                    </div>

                </div>
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


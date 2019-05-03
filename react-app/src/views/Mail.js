import React from 'react'
import {Divider, Icon, Input, Segment, TextArea} from "semantic-ui-react";
import {Form} from "semantic-ui-react/dist/commonjs/collections/Form";

export default class Mail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: '', username: ''};
    }

    handleMessage = (event, {name, value}) => {
        this.setState({ message: value })
    }

    handleUsernaame = (event, {name, value}) => {
        this.setState({ message: value })
    }

    render() {
        const styles = this.getStyles(this.props.darkTheme);
        const dark = this.props.darkTheme;
        return(
            <Segment raised style={{ width: '75%', height: '94vh', left: '20.5%', marginTop: '2.5vh', position: 'fixed',
                backgroundColor: dark ? '#15202B' : 'white' }}>
                <p style={styles.title}>Custom Mail</p>
                <Divider fitted style={{ marginTop: 2 }} />
                <Input placeholder='Username' style={{ width: '40%', height: 50, marginTop: 20, fontSize: 18, backgroundColor: dark ? '#15202B' : 'white', borderRadius: 5,
                    color: dark ? 'white' : 'black' }} onChange={this.handleMessage} autoComplete='off' maxLength={50} value={this.state.message}/>
                <TextArea onFocus= style={{ resize: 'none', width: '100%', height: 100, backgroundColor: 'transparent',
                    marginTop: '1.5vh', marginRight: '1vw', paddingLeft: '1vw', paddingTop: '1vh', fontFamily: 'Arial', fontSize: '22px', border: 'none', outline: 0,
                    color: dark ? '#8899A6' : 'white' ? '#728390' : 'black' }} onChange={this.handleInput} value={this.state.postText}/>
                <button style={{}}>Send Mail</button>

            </Segment>
        );
    }

    getStyles = (dark) => {
        const styles = {
            title: {
                fontFamily: 'Heebo',
                fontSize: 30,
                fontWeight: 'bolder',
                margin: 0,
                color: dark ? 'white' : 'black'
            },
            controller: {
                height: 75,
                width: '100%',
                marginTop: 5,
                borderRadius: 5,
                backgroundColor: 'transparent',
                fontSize: 18,
                fontFamily: 'Heebo',
                fontWeight: 'bold',
                color: dark ? 'white' : 'black',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginLeft: 20
            },
            button: {
                position: 'absolute',
                right: 40,
                outline: 0,
                cursor: 'pointer',
                backgroundColor: dark ? '#1c2938' : '#f0f0f0',
                border: 'none',
                borderRadius: 5,
                fontFamily: 'Heebo',
                fontWeight: 'bold',
                padding: 15,
                color: dark ? 'white' : 'black',
                fontSize: 16
            }
        }
        return styles
    }
}
import React from 'react'
import { Segment, Form, Image, Divider, Container, Message, Grid, Icon } from 'semantic-ui-react'
import Button from '../components/Button'
const background = require('../assets/WWF_logo1.png')

export default class LoginView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: '', password: '', errorUsername: false, errorPassword: false }
    }

    handleChange = (e) => { 
        this.setState({ [e.target.name]: e.target.value })
    }

    validateUsername = () => {
        const username = this.state.username
        if(username.length < 6 || username.length > 12) { return false }
        return true
    }

    validatePassword = () => {
        const password = this.state.password
        if(password.length < 8 || password.length > 16) { return false }
        return true
    }
    
    login = async() => {
        await this.setState({ errorUsername: !this.validateUsername(), errorPassword: !this.validatePassword() })
        if(this.state.errorUsername || this.state.errorPassword) { return }
        const body = {
            username: this.state.username,
            password: this.state.password
        }
        fetch('http://localhost:8080/login', { method: 'POST', body: JSON.stringify(body), credentials: 'include'})
        .then(response => response.json().then(data => console.log(data)))
    }

    render(){
        const list = []
        if(this.state.errorUsername) { list.push("Username must be between 6 and 12 characters.") }
        if(this.state.errorPassword) { list.push("Password must be between 8 and 16 characters.") }
        return(
            <Grid columns={2} divided style={{ height: 'inherit' }}>
                <Grid.Column style={{ textAlign: 'center', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', }}>
                    <div style={{ marginTop: '35vh' }}>
                        <Icon name="search" style={{ color: 'white', fontSize: 40 }} />
                        <span style={{ fontFamily: "Roboto", fontSize: 24, paddingLeft: 15, color: 'white', paddingBottom: 10 }}>Search your friends.</span>       
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <Icon name="users" style={{ color: 'white', fontSize: 40 }} />
                        <span style={{ fontFamily: "Roboto", fontSize: 24, paddingLeft: 15, color: 'white', paddingBottom: 10 }}>See what your friends are posting.</span>       
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <Icon name="comment outline" style={{ color: 'white', fontSize: 40 }} />
                        <span style={{ fontFamily: "Roboto", fontSize: 24, paddingLeft: 15, color: 'white', paddingBottom: 10 }}>Join the conversation.</span>       
                    </div>   
                </Grid.Column>
                <Grid.Column>
                    <Segment raised textAlign="center" compact style={{ margin: 'auto', marginTop: '20vh' }}>
                        <Image 
                            as="img" 
                            src={require('../assets/pandagram.png')}
                            style={{ width: 55, height: 55, borderRadius: 12, margin: 'auto', marginTop: 10 }}
                        />
                        <p style={{ fontFamily: 'Billabong', fontSize: 40 }}>Pandagram</p>
                        <Form style={{ marginTop: -30, marginLeft: 10, marginRight: 10, width: 300 }} size='large'>
                            <Form.Field required error={this.state.errorUsername}>
                                <input placeholder="Email or username" name="username" onChange={this.handleChange} autoComplete='off'></input>
                            </Form.Field>
                            <Form.Field required error={this.state.errorPassword}>
                                <input placeholder="Password" type="password" name="password" onChange={this.handleChange}></input>
                            </Form.Field>
                            <Container fluid>
                                <Button color="#ff5252" width='100%' height={34} onClick={this.login}>Log in</Button>
                            </Container>
                            <Divider horizontal>OR</Divider>
                            <Container fluid style={{ marginBottom: 20 }}>
                                <Button color="#F16E3F" width='100%' height={34} outlined>Sign up</Button>
                            </Container>
                            {(this.state.errorUsername || this.state.errorPassword) &&
                            <Message
                                negative size="mini"
                                list={list}
                            />
                            }
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}
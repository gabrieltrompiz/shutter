import React from 'react'
import { Segment, Image, Form, Container, Message, Divider, Transition } from 'semantic-ui-react'
import Button from './Button'

export default class LoginCard extends React.Component {
    constructor(props) {
        super(props)
         this.state = { username: '', password: '', errorUsername: false, errorPassword: false }
    }

    handleChange = (e) => { 
        this.setState({ [e.target.name]: e.target.value })
    }

    validateUsername = () => {
        const username = this.state.username
        if(username.length < 6) { return false }
        return true
    }

    validatePassword = () => {
        const password = this.state.password
        if(password.length < 8 || password.length > 18) { return false }
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

    render() {
        const list = []
        if(this.state.errorUsername) { list.push("Username must be between 6 and 12 characters.") }
        if(this.state.errorPassword) { list.push("Password must be between 8 and 18 characters.") }
        return(
            <Transition visible={this.props.visible} transitionOnMount unmountOnHide duration={350}>
                <Container>
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
                                <Button color="#F16E3F" width='100%' height={34} outlined onClick={() => this.props.changeCard('register')}>Sign up</Button>
                            </Container>
                            {(this.state.errorUsername || this.state.errorPassword) &&
                            <Message
                                negative size="mini"
                                list={list}
                            />
                            }
                        </Form>
                    </Segment>
                </Container>
            </Transition>
        );
    }
}
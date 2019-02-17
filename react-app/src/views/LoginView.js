import React from 'react'
import { Segment, Form, Image, Divider, Container } from 'semantic-ui-react'
import Button from '../components/Button'

export default class LoginView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: '', password: '' }
    }

    handleChange = (e) => { this.setState({ [e.target.name]: e.target.value })}
    
    login = () => {
        const body = {
            username: this.state.username,
            password: this.state.password
        }
        fetch('http://localhost:8080/login', { method: 'POST', body: JSON.stringify(body), credentials: 'include'})
        .then(response => response.json().then(data => console.log(data)))
    }

    render(){
        return(
            <Segment raised textAlign="center" compact padded="very" style={{ margin: 'auto' }}>
                <Image 
                    as="img" 
                    src={require('../assets/pandagram.png')}
                    style={{ width: 55, height: 55, borderRadius: 12, margin: 'auto', marginTop: -20 }}
                />
                <p style={{ fontFamily: 'Billabong', fontSize: 40 }}>Pandagram</p>
                <Form style={{ marginTop: -30, paddingLeft: 10, paddingRight: 10, width: 300 }} size='large'>
                    <Form.Field required>
                        <input placeholder="Email or username" name="username" onChange={this.handleChange} autoComplete='off'></input>
                    </Form.Field>
                    <Form.Field required>
                        <input placeholder="Password" type="password" name="password" onChange={this.handleChange}></input>
                    </Form.Field>
                    <Container fluid>
                        <Button color="#ff5252" width='inherit' height={34} onClick={this.login}>Log in</Button>
                    </Container>
                    <Divider horizontal>OR</Divider>
                    <Container fluid>
                        <Button color="#ff5252" width='inherit' height={34} outlined>Sign up</Button>
                    </Container>
                </Form>
            </Segment>
        );
    }
}
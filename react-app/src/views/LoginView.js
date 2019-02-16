import React from 'react'
import { Segment, Form, Image, Icon, Divider, Container } from 'semantic-ui-react'
import Button from '../components/Button'

export default class LoginView extends React.Component {
    
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
                        <input placeholder="Email or username"></input>
                    </Form.Field>
                    <Form.Field required>
                        <input placeholder="Password" type="password"></input>
                    </Form.Field>
                    <Container fluid>
                        <Button color="#ff5252" width='inherit' height={34} >Log in</Button>
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
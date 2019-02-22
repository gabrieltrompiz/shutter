import React from 'react'
import { Segment, Form, Container, Transition, Checkbox, Step, Input, Icon, Header } from 'semantic-ui-react'
import Button from './Button'

export default class RegisterCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { step: 0, pwdVisible: false, confVisible: false }
    }

    handleClickPwd = () => {
        this.setState({ pwdVisible: !this.state.pwdVisible })
    }

    handleClickConf = () => {
        this.setState({ confVisible: !this.state.confVisible })
    }

    render() {
        const iconPwd = this.state.pwdVisible ? 'unhide' : 'hide'
        const iconConf = this.state.confVisible ? 'unhide' : 'hide'
        const typePwd = this.state.pwdVisible ? 'text' : 'password'
        const typeConf = this.state.confVisible ? 'text' : 'password'
        return(
            <Transition visible={this.props.visible} transitionOnMount unmountOnHide duration={350}>
                <Container>
                    <Segment raised compact style={{ margin: 'auto', marginTop: '10vh' }}>
                        <p style={{ fontFamily: 'Billabong', fontSize: 35, textAlign: 'center' }}>Pandagram</p>
                        <Step.Group widths={3} size="mini" style={{ marginTop: -30 }}>
                            <Step icon="address card" title="Personal Information" description="Enter your personal information" 
                            active={this.state.step === 0} completed={this.state.step > 0}/>
                            <Step icon="user" title="Account Information" description="Fill account information" 
                            active={this.state.step === 1} disabled={this.state.step !== 1} completed={this.state.step > 1}/>
                            <Step icon="info" title="Confirm" description="Verify account details" 
                            active={this.state.step === 2} disabled={this.state.step !== 2} completed={this.state.step > 2} />      
                        </Step.Group>
                        {this.state.step === 0 && 
                        <Form style={{ marginLeft: 10, marginRight: 10, width: '97%' }} size='large'>
                            <Form.Group widths='equal'> 
                                <Form.Field error={this.state.errorUsername} placeholder="First name" onChange={this.handleChange} 
                                control={Input} label="First name"/>
                                <Form.Field error={this.state.errorUsername} placeholder="Last name" onChange={this.handleChange} 
                                control={Input} label="Last name"/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field error={this.state.errorUsername} placeholder="Birthday" onChange={this.handleChange} 
                                control={Input} label="Birthday" type="date"/>
                                <Form.Select label='Gender' options={options} placeholder='Gender' />
                            </Form.Group>
                            {/* <Form.Field control={Checkbox} label='I agree to the Terms and Conditions' /> */}
                        </Form>}
                        {this.state.step === 1 &&
                        <Form style={{ marginLeft: 10, marginRight: 10, width: '97%' }} size='large'>
                            <Form.Group widths='equal'>
                                <Form.Field error={this.state.errorUsername} placeholder="Username" onChange={this.handleChange} 
                                control={Input} label="Username" icon='at' iconPosition="left"/>
                                <Form.Field error={this.state.errorUsername} placeholder="Email" onChange={this.handleChange} 
                                control={Input} label="Email" type='email'/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field error={this.state.errorUsername} placeholder="Password" onChange={this.handleChange} 
                                control={Input} label="Password" type={typePwd} action={{ icon: iconPwd, onClick: this.handleClickPwd }}/>
                                <Form.Field error={this.state.errorUsername} placeholder="Confirm password" onChange={this.handleChange} 
                                control={Input} label="Confirm password" type={typeConf} action={{ icon: iconConf, onClick: this.handleClickConf }}/>
                            </Form.Group>
                        </Form>}
                        <Container fluid style={{ marginBottom: 20, marginTop: 20 }}>
                            {this.state.step === 0 && 
                            <span style={{ marginRight: '60%' }}>
                                <Button color="#ff5252" width='20%' height={34} outlined onClick={() => this.props.changeCard('login')}>Back</Button>
                            </span>}
                            {this.state.step !== 0 &&
                            <span style={{ marginRight: '60%' }}>
                                <Button color="#ff5252" width='20%' height={34} outlined onClick={() => this.setState({ step: this.state.step - 1 })}>Back</Button>
                            </span>}
                            <Button color="#F16E3F" width='20%' height={34} onClick={() => this.setState({ step: this.state.step + 1 })}>Continue</Button>
                        </Container>
                    </Segment>
                </Container>
            </Transition>
        );
    }
}

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

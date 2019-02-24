import React from 'react'
import { Segment, Form, Container, Transition, Step, Input } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import Button from './Button'

export default class RegisterCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { step: 0, pwdVisible: false, confVisible: false, firstname: '', lastname: '', birthday: '',
        gender: '', username: '', email: '', password: '', passwordConf: '' }
        this.handleInput = this.handleInput.bind(this)
        this.validator = require('email-validator')
    }

    handleClickPwd = () => {
        this.setState({ pwdVisible: !this.state.pwdVisible })
    }

    handleClickConf = () => {
        this.setState({ confVisible: !this.state.confVisible })
    }

    handleInput = (event, {name, value}) => {
        this.setState({ [name]: value })
    }

    render() {
        const iconPwd = this.state.pwdVisible ? 'unhide' : 'hide'
        const iconConf = this.state.confVisible ? 'unhide' : 'hide'
        const typePwd = this.state.pwdVisible ? 'text' : 'password'
        const typeConf = this.state.confVisible ? 'text' : 'password'
        const today = new Date()
        const maxDate = today.getDate() + '-' + (parseInt(today.getMonth(), 10) + 1) + '-' + (parseInt(today.getFullYear(), 10) - 12) // Get current date in format dd-mm-yyyy - 12 years
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
                        <Form style={{ marginLeft: 10, marginRight: 10, width: '97%' }} size='large' autoComplete='off'>
                            <Form.Group widths='equal'> 
                                <Form.Field placeholder="First name" onChange={this.handleInput} 
                                control={Input} label="First name" name='firstname' value={this.state.firstname}/>
                                <Form.Field placeholder="Last name" onChange={this.handleInput} 
                                control={Input} label="Last name" name='lastname' value={this.state.lastname}/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field label="Birthday" control={DateInput} value={this.state.birthday} iconPosition='left' 
                                onChange={this.handleInput} name='birthday' closable placeholder='Click to select a date' maxDate={maxDate} initialDate={maxDate}/>
                                <Form.Select label='Gender' options={options} placeholder='Gender' name='gender' onChange={this.handleInput} value={this.state.gender}/>
                            </Form.Group>
                            {/* <Form.Field control={Checkbox} label='I agree to the Terms and Conditions' /> */}
                        </Form>}
                        {this.state.step === 1 &&
                        <Form style={{ marginLeft: 10, marginRight: 10, width: '97%' }} size='large'>
                            <Form.Group widths='equal'>
                                <Form.Field placeholder="Username" onChange={this.handleInput} action={{ icon: 'check' }}
                                control={Input} label="Username" icon='at' iconPosition="left" name='username'/>
                                <Form.Field placeholder="Email" onChange={this.handleInput} 
                                control={Input} label="Email" type='email' name='email'/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field placeholder="Password" onChange={this.handleInput} 
                                control={Input} label="Password" type={typePwd} action={{ icon: iconPwd, onClick: this.handleClickPwd }} name='password'/>
                                <Form.Field placeholder="Confirm password" onChange={this.handleInput} name='passwordConf'
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

import React from 'react'
import { Segment, Form, Container, Transition, Step, Input } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import Button from './Button'

export default class RegisterCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { step: 0, pwdVisible: false, confVisible: false, firstname: '', lastname: '', birthday: '',
        gender: '', username: '', email: '', password: '', passwordConf: '', errorFirstname: false, errorLastname: false, errorBirthday: false, errorGender: false,
        errorUsername: false, errorEmail: false,  errorPwd: false, errorPwdConf: false, usernameAvailable: true, emailAvailable: true }
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

    checkUsername = async () => {
        if(this.state.errorUsername) { return; }
        const username = { username: this.state.username }
        await fetch('http://localhost:8080/checkUsername', { method: 'POST', body: JSON.stringify(username) })
        .then(response => {
            if(response.status === 200) { 
                this.setState({ usernameAvailable: true });   
            }
            else { 
                this.setState({ errorUsername: true, usernameAvailable: false });
            }
        })
    }

    checkEmail = async () => {
        if(this.state.errorEmail) { return false; }
        const email = { email: this.state.email }
        await fetch('http://localhost:8080/checkEmail', { method: 'POST', body: JSON.stringify(email) })
        .then(response => {
            if(response.status === 200) { 
                this.setState({ emailAvailable: true }) 
            }
            else {
                this.setState({ errorEmail: true, emailAvailable: false })
            }
        })
    }

    checkInput = async () => {
        const usernameRegex = /^(?=.{6,18}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
        const { firstname, lastname, birthday, gender, username, email, password, passwordConf } = this.state
        if(this.state.step === 0) {
            await this.setState({ errorFirstname: firstname === '', errorLastname: lastname === '', errorBirthday: birthday === '', errorGender: gender === ''})
            if(!this.state.errorFirstname && !this.state.errorLastname && !this.state.errorBirthday && !this.state.errorGender) {
                this.setState({ step: 1 })
            }
            return;
        }
        if(this.state.step === 1) {
            await this.setState({ errorUsername: !usernameRegex.test(username), errorEmail: !this.validator.validate(email), errorPwd: password.length < 8, 
            errorPwdConf: (password !== passwordConf || passwordConf === '') })
            await this.checkUsername()
            await this.checkEmail()
            if(!this.state.errorUsername && !this.state.errorEmail && !this.state.errorPwd && !this.state.errorPwdConf && this.state.usernameAvailable && this.state.emailAvailable) {
                this.setState({ step: 2 })
            }
            return;
        }
    }

    register = () => {

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
                                <Form.Field placeholder="First name" onChange={this.handleInput} autoComplete='off' error={this.state.errorFirstname}
                                control={Input} label="First name" name='firstname' value={this.state.firstname} maxLength={40}/>
                                <Form.Field placeholder="Last name" onChange={this.handleInput} autoComplete='off' error={this.state.errorLastname}
                                control={Input} label="Last name" name='lastname' value={this.state.lastname} maxLength={40}/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field label="Birthday" control={DateInput} value={this.state.birthday} iconPosition='left' error={this.state.errorBirthday}
                                onChange={this.handleInput} name='birthday' closable placeholder='Click to select a date' maxDate={maxDate} initialDate='01-01-2000'/>
                                <Form.Select label='Gender' options={options} placeholder='Gender' name='gender' onChange={this.handleInput} 
                                value={this.state.gender} error={this.state.errorGender}/>
                            </Form.Group>
                            {/* <Form.Field control={Checkbox} label='I agree to the Terms and Conditions' /> */}
                        </Form>}
                        {this.state.step === 1 &&
                        <Form style={{ marginLeft: 10, marginRight: 10, width: '97%' }} size='large'>
                            <Form.Group widths='equal'>
                                <Form.Field placeholder="Username" onChange={this.handleInput} autoComplete='off' control={Input} label="Username" 
                                icon='at' iconPosition="left" name='username' maxLength={18} error={this.state.errorUsername}/>
                                <Form.Field placeholder="Email" onChange={this.handleInput} autoComplete='off' control={Input} label="Email" 
                                name='email' error={this.state.errorEmail}/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field placeholder="Password" onChange={this.handleInput} maxLength={30} error={this.state.errorPwd}
                                control={Input} label="Password" type={typePwd} action={{ icon: iconPwd, onClick: this.handleClickPwd }} name='password'/>
                                <Form.Field placeholder="Confirm password" onChange={this.handleInput} name='passwordConf' maxLength={30} error={this.state.errorPwdConf}
                                control={Input} label="Confirm password" type={typeConf} action={{ icon: iconConf, onClick: this.handleClickConf }} name="passwordConf"/>
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
                            {this.state.step !== 2 &&
                            <Button color="#F16E3F" width='20%' height={34} onClick={() => this.checkInput()}>Continue</Button>}
                            {this.state.step === 2 &&
                            <Button color="#F16E3F" width='20%' height={34} onClick={() => this.register()}>Sign up</Button>}
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

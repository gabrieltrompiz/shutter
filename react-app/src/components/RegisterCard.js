import React from 'react'
import { Segment, Form, Container, Transition, Step, Input, Message, Header, Grid, Divider, Dimmer, Loader } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import Button from './Button'

export default class RegisterCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.intialState
        this.validator = require('email-validator')
    }

    get intialState() {
        return {
            step: 0, pwdVisible: false, confVisible: false, firstname: '', lastname: '', birthday: '',
            gender: '', username: '', email: '', password: '', passwordConf: '', errorFirstname: false, errorLastname: false, errorBirthday: false, errorGender: false,
            errorUsername: false, errorEmail: false,  errorPwd: false, errorPwdConf: false, usernameAvailable: true, emailAvailable: true, loading: false, errorRegister: false
        }
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
        const username = this.state.username
        await fetch('http://localhost:8080/checkUsername?user=' + username)
        .then(response => {
            if(response.status === 200) { 
                this.setState({ usernameAvailable: true });   
            }
            else { 
                this.setState({ usernameAvailable: false });
            }
        })
        .catch(() => { 
            this.setState({ usernameAvailable: false })
        })
    }

    checkEmail = async () => {
        if(this.state.errorEmail) { return false; }
        const email = this.state.email
        await fetch('http://localhost:8080/checkEmail?email=' + email)
        .then(response => {
            if(response.status === 200) { 
                this.setState({ emailAvailable: true }) 
            }
            else {
                this.setState({ emailAvailable: false })
            }
        })
        .catch(() => {
            this.setState({ emailAvailable: false })
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

    register = async () => {
        this.setState({ loading: true })
        const body = {
            username: this.state.username,
            lowercaseUsername: this.state.username.toLowerCase(),
            password: this.state.password,
            name: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            birthday: new Date(this.state.birthday),
            creationTime: Date.now(),
            avatar: './avatar.png',
            typeId: 1,
            sex: this.state.gender === 'Male',
            enabled: true
        }
        await fetch('http://localhost:8080/register', { method: 'POST', body: JSON.stringify(body), credentials: 'include' })
        .then(response => response.json())
        .then(json => {
            if(json.status === 200) {
                this.props.handleUser(json.data).then(() => this.props.handleLoggedIn(true))
            }
            else {
                this.setState({ errorRegister: true })
            }
        })
        .catch(() => {
            this.setState({ errorRegister: true })
        })
        this.setState({ loading: false })
    }

    render() {
        const iconPwd = this.state.pwdVisible ? 'unhide' : 'hide'
        const iconConf = this.state.confVisible ? 'unhide' : 'hide'
        const typePwd = this.state.pwdVisible ? 'text' : 'password'
        const typeConf = this.state.confVisible ? 'text' : 'password'
        const today = new Date()
        const maxDate = (parseInt(today.getFullYear(), 10) - 12) + '-' + (parseInt(today.getMonth(), 10) + 1) + '-' + today.getDate()// Get current date in format dd-mm-yyyy - 12 years
        const errorList = []
        if(this.state.step === 0) {
            if(this.state.errorFirstname) { errorList.push('Enter your first name.') }
            if(this.state.errorLastname) { errorList.push('Enter your last name.') }
            if(this.state.errorBirthday) { errorList.push('Enter a valid birthday.') }
            if(this.state.errorGender) { errorList.push('Specify a gender.') }
        }
        if(this.state.step === 1) {
            if(this.state.errorUsername) { errorList.push('Username must be between 6 and 12 characters and cannot contain special characters.') }
            if(!this.state.usernameAvailable) { errorList.push('Username already in use.') }
            if(this.state.errorEmail) { errorList.push('Enter a valid email.') }
            if(!this.state.emailAvailable) { errorList.push('Email already in use.') }
            if(this.state.errorPwd) { errorList.push('Password must be between 8 and 18 characters.') }
            if(this.state.errorPwdConf) { errorList.push('Password confirmation doesn\'t match.') }
        }
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
                                onChange={this.handleInput} name='birthday' closable placeholder='Click to select a date' maxDate={maxDate} initialDate='2000-01-01'
                                onKeyDown={(e) => e.preventDefault()} dateFormat="YYYY-MM-DD"/>
                                <Form.Select label='Gender' options={options} placeholder='Gender' name='gender' onChange={this.handleInput} 
                                value={this.state.gender} error={this.state.errorGender}/>
                            </Form.Group>
                            {/* <Form.Field control={Checkbox} label='I agree to the Terms and Conditions' /> */}
                        </Form>}
                        {this.state.step === 1 &&
                        <Form style={{ marginLeft: 10, marginRight: 10, width: '97%' }} size='large'>
                            <Form.Group widths='equal'>
                                <Form.Field placeholder="Username" onChange={this.handleInput} autoComplete='off' control={Input} label="Username" 
                                icon='at' iconPosition="left" name='username' maxLength={18} error={this.state.errorUsername || !this.state.usernameAvailable}/>
                                <Form.Field placeholder="Email" onChange={this.handleInput} autoComplete='off' control={Input} label="Email" 
                                name='email' error={this.state.errorEmail || !this.state.emailAvailable}/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field placeholder="Password" onChange={this.handleInput} maxLength={30} error={this.state.errorPwd}
                                control={Input} label="Password" type={typePwd} action={{ icon: iconPwd, onClick: this.handleClickPwd }} name='password'/>
                                <Form.Field placeholder="Confirm password" onChange={this.handleInput} name='passwordConf' maxLength={30} error={this.state.errorPwdConf}
                                control={Input} label="Confirm password" type={typeConf} action={{ icon: iconConf, onClick: this.handleClickConf }}/>
                            </Form.Group>
                        </Form>}
                        {this.state.step === 2 && 
                        <Grid columns={3} style={{ paddingLeft: 20, paddingRight: 20, marginTop: 2, width: 'inherit' }}>
                        <Dimmer active={this.state.loading} inverted>
                            <Loader />
                        </Dimmer>
                            <Grid.Column>
                                <Header as='h3' style={{ marginBottom: 2 }}>First name</Header>
                                <span style={{ fontSize: 16, paddingLeft: 5 }}>{this.state.firstname}</span>
                                <Header as='h3' style={{ marginBottom: 2 }}>Gender</Header>
                                <span style={{ fontSize: 16, paddingLeft: 5 }}>{this.state.gender}</span>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h3' style={{ marginBottom: 2 }}>Last name</Header>
                                <span style={{ fontSize: 16, paddingLeft: 5 }}>{this.state.lastname}</span>
                                <Header as='h3' style={{ marginBottom: 2 }}>Username</Header>
                                <span style={{ fontSize: 16, paddingLeft: 5 }}>{this.state.username}</span>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h3' style={{ marginBottom: 2 }}>Birthday</Header>
                                <span style={{ fontSize: 16, paddingLeft: 5 }}>{this.state.birthday}</span>
                                <Header as='h3' style={{ marginBottom: 2 }}>Email</Header>
                                <span style={{ fontSize: 16, paddingLeft: 5 }}>{this.state.email}</span>
                            </Grid.Column>
                        </Grid>}
                        {this.state.step === 2 && <Divider />}
                        {(this.state.errorFirstname || this.state.errorLastname || this.state.errorBirthday || this.state.errorGender || this.state.errorUsername ||
                        this.state.errorEmail || this.state.errorPwd || this.state.errorPwdConf || !this.state.usernameAvailable || !this.state.emailAvailable) && errorList.length !== 0 &&
                        <Message error list={errorList} /> }
                        {this.state.errorRegister && 
                        <Message error>There was an error while registering you. Please try again later and if the error persists contact support.</Message>}
                        <Container fluid style={{ marginBottom: 20, marginTop: 20 }}>
                            {this.state.step === 0 && 
                            <span style={{ marginRight: '60%' }}>
                                <Button color="#ff5252" width='20%' height={34} outlined onClick={() => { this.setState(this.intialState); this.props.changeCard('login') } }>Back</Button>
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
  { key: 'm', text: 'Male', value: 'Male' },
  { key: 'f', text: 'Female', value: 'Female' },
]

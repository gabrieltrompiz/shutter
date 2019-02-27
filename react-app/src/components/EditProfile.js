import React from 'react';
import {Segment, Container, Image, Header, Form} from 'semantic-ui-react';
import Button from './Button';

export default class EditProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.validator = require('email-validator')
	}

	get intialState() {
        return {
            pwdVisible: false, confVisible: false, firstname: '', lastname: '', birthday: '',
            gender: '', username: '', email: '', password: '', passwordConf: '', errorFirstname: false, errorLastname: false, errorBirthday: false, errorGender: false,
            errorUsername: false, errorEmail: false,  errorPwd: false, errorPwdConf: false, usernameAvailable: true, emailAvailable: true, loading: false, errorEdit: false
        }
    }

	checkUsername = async() => {
		if (this.state.errorUsername) return;
		const username = { username: this.state.username };
		await fetch('http://localhost:8080/checkUsername', { method: 'POST' })
		.then(response => {
            if(response.status === 200) { 
                this.setState({ usernameAvailable: true });   
            }
            else { 
                this.setState({ usernameAvailable: false });
            }
        });
	}

	checkEmail = async () => {
		if (this.state.errorEmail) return;
		const email = { email: this.state.email };
		await fetch('http://localhost:8080/checkEmail', { method: 'POST' })
		.then(response => {
            if(response.status === 200) { 
                this.setState({ emailAvailable: true }) 
            }
            else {
                this.setState({ emailAvailable: false })
            }
        });
	}

	checkInput = async(evt) => {
		const usernameRegex = /^(?=.{6,18}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
		const { firstname, lastname, birthday, gender, username, email, password, passwordConf } = this.state;
		await this.setState({errorFirstname: firstname === '', errorLastname: lastname === '', errorBirthday: birthday === '', errorGender: gender === '',
			errorUsername: !usernameRegex.test(username), errorEmail: !this.validator.validate(email), errorPwd: password.length < 8,
			errorPwdConf: (password !== passwordConf || passwordConf === '')})
		await this.checkUsername()
        await this.checkEmail()
        if(!this.state.errorFirstname && !this.state.errorLastname && !this.state.errorBirthday && !this.state.errorGender
        	&& !this.state.errorUsername && !this.state.errorEmail && !this.state.errorPwd && !this.state.errorPwdConf && this.state.usernameAvailable && this.state.emailAvailable)
        	await this.edit();
	}

	edit = async () => {
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
        await fetch('http://localhost:8080/edit', {method: 'POST', body: JSON.stringify(body), credentials: 'include'})
        .then((res) => res.json().then(
        	json => {if (json.status === 200) console.log('XD')
    				else this.setState ({errorEdit: true})}))
    }

	render() {
		return(
				<Container fluid style={{display: 'flex', height: '90vh'}}>
					<div>
						<Button color='#c00000' width={70} height={35} onClick={this.cancel()}>Cancel</Button>
						<Image
							src={require('../assets/pandagram2.png')}
							style={{ width: 160, height: 160, borderRadius: '100%', marginTop: '2vw', marginLeft: '0.8vw' }}
						/>
					</div>
					<div style={{paddingLeft: '10vw', height: 'inherit', width: '30vw'}}>
						<Header as='h2' style={{paddingLeft: '3.2vw'}}>Edit Profile</Header>
							<Form>
								<Form.Input fluid label='Username'/>
								<Form.Input fluid label='Name'/>
								<Form.Input fluid label='Last Name'/>
								<Form.Input fluid label='Email'/>
							</Form>
						<div style={{ width: 100, height: 45, marginTop: '25vh', marginLeft: '5.5vw' }}>
							<Button color='#00b300' width={120} height={42} onclick={this.confirm()}>Confirm</Button>
						</div>
					</div>
				</Container>
			);
	}
}
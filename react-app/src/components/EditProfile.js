import React from 'react';
import {Segment, Container, Image, Header, Form, Input, Divider, Message} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react'
import Button from './Button';

export default class EditProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.validator = require('email-validator')
	}

	get initialState() {
        return {
            pwdVisible: false, confVisible: false, firstname: this.props.user.name, lastname: this.props.user.lastName, birthday: new Date(this.props.user.birthday),
            gender: this.props.user.sex, username: this.props.user.username, email: this.props.user.email, password: '', passwordConf: '', errorFirstname: false, errorLastname: false, errorBirthday: false, errorGender: false,
            errorUsername: false, errorEmail: false,  errorPwd: false, errorPwdConf: false, usernameAvailable: true, emailAvailable: true, loading: false, errorEdit: false
        }
    }

	handleClickPwd = () => {
        this.setState({ pwdVisible: !this.state.pwdVisible })
    }

	handleInput = (event, {name, value}) => {
		if(name === 'gender') {
			this.setState({ gender: value === 'Male'})
		}
		else {
			this.setState({ [name]: value })
		}
    }

	checkUsername = async() => {
		if (this.state.errorUsername) return;
		const username = { username: this.state.username };
		await fetch('http://localhost:8080/checkUsername?user=' + username)
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

	checkInput = async(evt) => {
		
		const { firstname, lastname, birthday, gender, username, email, password } = this.state;
		await this.setState({errorFirstname: firstname === '', errorLastname: lastname === '', errorBirthday: birthday === '', errorGender: gender === '',
		errorEmail: !this.validator.validate(email), errorPwd: password.length < 8 })
		if(this.props.user.username !== this.state.username) {
			await this.checkUsername()
		}
		if(this.props.user.email !== this.state.email) {
			await this.checkEmail()
		}
        if(!this.state.errorFirstname && !this.state.errorLastname && !this.state.errorBirthday && !this.state.errorGender
        	&& !this.state.errorUsername && !this.state.errorEmail && !this.state.errorPwd && this.state.usernameAvailable && this.state.emailAvailable)
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
        await fetch('http://localhost:8080/edit', {method: 'PUT', body: JSON.stringify(body), credentials: 'include'})
        .then((res) => res.json().then(
        	json => {
				if (json.status === 200) 
					this.props.changeUser(json.data)
    			else 
					this.setState ({ errorEdit: true })
			}
		))
		.catch(() => {
			this.setState({ errorEdit: true })
		})
    }

	render() {
		const iconPwd = this.state.pwdVisible ? 'unhide' : 'hide'
        const typePwd = this.state.pwdVisible ? 'text' : 'password'
		const today = new Date()
		const maxDate = today.getDate() + '-' + (parseInt(today.getMonth(), 10) + 1) + '-' + (parseInt(today.getFullYear(), 10) - 12) // Get current date in format dd-mm-yyyy - 12 years
		const errorList = []

		return(
				<Container fluid style={{display: 'flex', height: '90vh'}}>
					<div>
						<Button color='#FF5252' width={70} height={35} onClick={() => this.props.changeView('Profile')}>Cancel</Button>
						<Image
							src={require('../assets/pandagram2.png')}
							style={{ width: 160, height: 160, borderRadius: '100%', marginTop: '2vw', marginLeft: '0.8vw' }}
						/>
					</div>
					<div style={{paddingLeft: '10vw', height: 'inherit', width: '30vw'}}>
						<Header as='h2' style={{paddingLeft: '3.2vw'}}>Edit Profile</Header>
						<Form size='large' autoComplete='off'>
							<Form.Group widths='equal'>
								<Form.Field placeholder="First name" onChange={this.handleInput} autoComplete='off' error={this.state.errorFirstname}
								control={Input} label="First name" name='firstname' value={this.state.firstname} maxLength={40}/>
								<Form.Field placeholder="Last name" onChange={this.handleInput} autoComplete='off' error={this.state.errorLastname}
								control={Input} label="Last name" name='lastname' value={this.state.lastname} maxLength={40}/>
							</Form.Group>
							<Form.Field placeholder="Email" onChange={this.handleInput} autoComplete='off' control={Input} label="Email" 
							name='email' error={this.state.errorEmail || !this.state.emailAvailable} value={this.state.email}/>
							<Form.Select label='Gender' options={options} placeholder='Gender' name='gender' onChange={this.handleInput} 
							value={this.state.gender ? 'Male' : 'Female'} error={this.state.errorGender}/>
							<Form.Field label="Birthday" control={DateInput} value={this.state.birthday} iconPosition='left' error={this.state.errorBirthday}
							onChange={this.handleInput} name='birthday' closable placeholder='Click to select a date' maxDate={maxDate} initialDate='2000-01-1'
							onKeyDown={(e) => e.preventDefault()} dateFormat="YYYY-MM-DD" />
							<Divider  style={{ marginTop: 28 }}/>
							<Form.Field placeholder="Password" required onChange={this.handleInput} maxLength={30} error={this.state.errorPwd}
							control={Input} label="Password" type={typePwd} action={{ icon: iconPwd, onClick: this.handleClickPwd }} name='password'/>
							<div style={{ textAlign: 'center', width: 'inherit' }}>
								<Button color='#00b300' width={120} height={42} onClick={() => this.checkInput()}>Confirm</Button>
							</div>
						</Form>
					</div>
					{(this.state.errorFirstname || this.state.errorLastname || this.state.errorBirthday || this.state.errorGender ||
					this.state.errorEmail || this.state.errorPwd || !this.state.emailAvailable) && errorList.length !== 0 &&
					<Message error list={errorList} /> }
				</Container>
			);
	}
}

const options = [
  { key: 'm', text: 'Male', value: 'Male' },
  { key: 'f', text: 'Female', value: 'Female' },
]
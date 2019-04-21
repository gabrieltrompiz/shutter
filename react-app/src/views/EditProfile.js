import React from 'react';
import { Container, Image, Header, Form, Input, Divider, Segment } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react'
import Button from '../components/Button';

export default class EditProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.validator = require('email-validator')
	}

	get initialState() {
		const date = new Date(this.props.user.birthday)
		const birthday = (parseInt(date.getFullYear(), 10)) + '-' + (parseInt(date.getMonth(), 10) + 1) + '-' + date.getDate()
        return {
            pwdVisible: false, confVisible: false, firstname: this.props.user.name, lastname: this.props.user.lastName, birthday: birthday,
            gender: this.props.user.sex, username: this.props.user.username, email: this.props.user.email, password: '', passwordConf: '', errorFirstname: false, errorLastname: false, errorBirthday: false, errorGender: false,
            errorUsername: false, errorEmail: false,  errorPwd: false, errorPwdConf: false, usernameAvailable: true, emailAvailable: true, loading: false, errorEdit: false, file: null
        }
    }

	handleClickPwd = (e) => {
        this.setState({ pwdVisible: !this.state.pwdVisible })
		e.preventDefault()
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

	checkInput = async (evt) => {		
		const { firstname, lastname, birthday, gender, username, email, password } = this.state;
		await this.setState({errorFirstname: firstname === '', errorLastname: lastname === '', errorBirthday: birthday === '', errorGender: gender === '',
		errorEmail: !this.validator.validate(email), errorPwd: password.length < 8 })
		if(this.props.user.username !== username) {
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
			id: this.props.user.id,
            username: this.state.username,
            lowercaseUsername: this.state.username.toLowerCase(),
            password: this.state.password,
            name: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            birthday: new Date(this.state.birthday),
            avatar: './avatar.png',
            typeId: 1,
            sex: this.state.gender === 'Male',
            enabled: true
        }
        await fetch('http://localhost:8080/edit', { method: 'PUT', body: JSON.stringify(body), credentials: 'include' })
        .then((res) => res.json().then(
        	json => {
				if (json.status === 200) 
					this.props.changeUser(body)
    			else 
					this.setState ({ errorEdit: true })
			}
		))
		.catch(() => {
			this.setState({ errorEdit: true })
		})
		if(this.state.file !== null) {
			const formData = new FormData()
			formData.append('file', this.state.file)
			await fetch('http://localhost:8080/files', { method: 'PUT', credentials: 'include', body: formData })
		}
		this.props.changeView('Profile')
    }

	uploadFiles = (e) => {
		this.setState({ file: e.target.files[0] }, () => {
			this.uploadPhoto.value = ""
		})
	}

	render() {
		const iconPwd = this.state.pwdVisible ? 'unhide' : 'hide'
        const typePwd = this.state.pwdVisible ? 'text' : 'password'
		const today = new Date()
		const maxDate = (parseInt(today.getFullYear(), 10) - 12) + '-' + (parseInt(today.getMonth(), 10) + 1) + '-' + today.getDate() // Get current date in format dd-mm-yyyy - 12 years
		const errorList = []
		const source = this.state.file === null ? 'http://localhost:8080/files?type=avatar&file=' + this.props.user.lowercaseUsername + ".png" : URL.createObjectURL(this.state.file)
		const dark = this.props.darkTheme
		return(
			<Segment raised style={{ marginTop: '2.5vh', height: '95vh', backgroundColor: dark ? '#15202B' : 'white' }}>
				<div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
					<Button color='#FF5252' width={70} height={35} onClick={() => this.props.changeView('Profile')} style={{ alignSelf: 'flex-start' }}>Cancel</Button>
					<Header as='h2' style={{ marginTop: 0, marginBottom: 0, marginLeft: '35%', color: dark ? 'white' : 'black' }}>Edit Profile</Header>
				</div>
				<Divider />
				<Container fluid style={{ display: 'flex', height: '85vh' }}>
					<div style={{ width: '20%' }}>
						<Image
							src={source}
							style={{ width: 160, height: 160, borderRadius: '100%', margin: '0 auto', marginTop: 10 }}
						/>
						<input type="file" accept="image/*" style={{ display: 'none' }} ref={(ref) => this.uploadPhoto = ref} onChange={(e) => this.uploadFiles(e)}/>
						{this.state.file === null && <button id='editBtn' onClick={() => this.uploadPhoto.click()}>Change Avatar</button>}
						{this.state.file && 
						<button id='deleteBtn' onClick={() => this.setState({ file: null })} style={{ alignSelf: 'flex-end', marginRight: 10 }}>Reset Avatar</button>}
					</div>
					<div style={{ height: 'inherit', width: '30%', paddingLeft: '5%' }}>
						<Form size='large' autoComplete='off' style={{ color: dark ? 'white' : 'black' }}>
							<Form.Group widths='equal' style={{ color: dark ? 'white' : 'black' }}>
								<Form.Field placeholder="First name" onChange={this.handleInput} autoComplete='off' error={this.state.errorFirstname}
								control={Input} label="First name" name='firstname' value={this.state.firstname} maxLength={40} style={{ backgroundColor: dark ? '#1C2938' : 'white',
								borderRadius: 5, color: dark ? 'white' : 'black' }} />
								<Form.Field placeholder="Last name" onChange={this.handleInput} autoComplete='off' error={this.state.errorLastname} style={{ backgroundColor: dark ? '#1C2938' : 'white',
								borderRadius: 5, color: dark ? 'white' : 'black' }} control={Input} label="Last name" name='lastname' value={this.state.lastname} maxLength={40}/>
							</Form.Group>
							<Form.Field placeholder="Email" onChange={this.handleInput} autoComplete='off' control={Input} label="Email" name='email' 
							error={this.state.errorEmail || !this.state.emailAvailable} value={this.state.email} style={{ color: dark ? 'white' : 'black', backgroundColor: dark ? '#1C2938' : 'white' }} />
							<Form.Select label='Gender' options={options} placeholder='Gender' name='gender' onChange={this.handleInput} 
							value={this.state.gender ? 'Male' : 'Female'} error={this.state.errorGender} style={{ color: dark ? 'white' : 'black', backgroundColor: dark ? '#1C2938' : 'white', border: dark ? '0.5px solid transparent' : '' }} />
							<Form.Field label="Birthday" control={DateInput} value={this.state.birthday} iconPosition='left' error={this.state.errorBirthday} style={{ color: dark ? 'white' : 'black', borderRadius: 5,
							backgroundColor: dark ? '#1C2938' : 'white' }} onChange={this.handleInput} name='birthday' closable placeholder='Click to select a date' maxDate={maxDate} initialDate='2000-01-01'
							onKeyDown={(e) => e.preventDefault()} dateFormat="YYYY-MM-DD"/>
							<Divider  style={{ marginTop: 28 }}/>
							<Form.Field placeholder="Password" required onChange={this.handleInput} maxLength={30} error={this.state.errorPwd} style={{ color: dark ? 'white' : 'black',
							backgroundColor: dark ? '#1C2938' : 'white', borderRadius: 5 }} control={Input} label="Password" type={typePwd} 
							action={{ icon: iconPwd, onClick: this.handleClickPwd, style: { color: dark ? 'white' : '', backgroundColor: dark ? '#1C2938' : '' } }} name='password'/>
							<div style={{ textAlign: 'center', width: 'inherit' }}>
								<Button color='#00b300' width={120} height={42} onClick={() => this.checkInput()}>Confirm</Button>
							</div>
						</Form>
					</div>
					{(this.state.errorFirstname || this.state.errorLastname || this.state.errorBirthday || this.state.errorGender ||
					this.state.errorEmail || this.state.errorPwd || !this.state.emailAvailable) && errorList.length !== 0 &&
					// <Message error list={errorList} />
					<div style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>errores</div> }
				</Container>
			</Segment>
			);
	}
}

const options = [
  { key: 'm', text: 'Male', value: 'Male' },
  { key: 'f', text: 'Female', value: 'Female' },
]
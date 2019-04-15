import React from 'react';
import { TextArea, Container, Image, Divider, Icon, Dimmer, Loader } from 'semantic-ui-react';
import ReactAudioPlayer from 'react-audio-player'
import ReactPlayer from 'react-player';
import Slider from 'react-slick'

export default class Poster extends React.Component {
	constructor(props) {
		super(props);
		this.state = { typePost: 1, postText: 'What\'s on your mind, ' + this.props.user.name + '?', files: [], loading: false, empty: true }
	}

	handleInput = (event, {name, value}) => {
		this.setState({ postText: value, empty: false })
	}

	checkFocus = () => {
		if(this.state.postText === 'What\'s on your mind, ' + this.props.user.name + '?') {
			this.setState({ postText: '', empty: true })
		}
	}

	checkFocusOut = () => {
		if(this.state.postText.trim() === '') {
			this.setState({ postText: 'What\'s on your mind, ' + this.props.user.name + '?', empty: true  })
		}
	}

	post = async () => {
		this.setState({ loading: true })
		await new Promise((resolve) => setTimeout(resolve, 500)) // TODO: se quita en produccion, es solo para probar el loading
		const body = {
			typePost: this.state.typePost,
			postText: !this.state.empty ? this.state.postText : ''
		}
		let id = -1;
		await fetch('http://localhost:8080/posts?', { method: 'POST', credentials: 'include', body: JSON.stringify(body) })
		.then(response => response.json())
		.then(response => {
			if(response.status === 200) {
				id = response.data
			}		
		})
		if(id !== -1) {
			let url = 'http://localhost:8080/files?typePost=' + this.state.typePost + '&id=' + id 
			let body = new FormData()
			this.state.files.forEach(file => {
				body.append('files[]', file)
			})
			await fetch(url, { method: 'POST', credentials: 'include', body: body })
			.then(response => response.json()) 
			.then(response => {
				this.setState({ files: [], typePost: 1, postText: 'What\'s on your mind, ' + this.props.user.name + '?', empty: true }, () => this.props.updateFeed())		
			})
		}	
		this.setState({ loading: false })
	}

	uploadFiles = (e, type) => {
		this.setState({ typePost: type, files: [...e.target.files] }, () => {
			this.uploadPhoto.value = ""
			this.uploadAudio.value = ""
			this.uploadVideo.value = ""
		})
	}

	render() {
		const source = 'http://localhost:8080/files?type=avatar&file=' + this.props.user.username + '.png'
		const disabled = this.state.files.length === 0 ? true : false;
		const dark = this.props.darkTheme
		const empty = this.state.empty
		const settings = {
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			arrows: true
		};
		return(
			<Container style={{ width: 'auto', maxHeight: 'auto', marginTop: '2.5vh', backgroundColor: dark ? '#1c2938' : 'white', borderColor: dark ? '#1c2938' : '#DDDFE2', 
			borderRadius: 5, borderWidth: 1.5, borderStyle: 'solid', marginBottom: '1.5vh' }}>
				<div style={{ display: 'flex' }}>
					<Image
						src={source}
						style={{ width: 80, height: 80, borderRadius: '100%', marginTop: '1.5vw', marginLeft: '1.5vw' }}
					/>
					<TextArea onFocus={() => this.checkFocus()} onBlur={() => this.checkFocusOut()} style={{ resize: 'none', width: '100%', height: 100, backgroundColor: 'transparent',
			        marginTop: '1.5vh', marginRight: '1vw', paddingLeft: '1vw', paddingTop: '1vh', fontFamily: 'Arial', fontSize: '22px', border: 'none', outline: 0,
					color: dark ? empty ? '#8899A6' : 'white' : empty ? '#728390' : 'black' }} onChange={this.handleInput} value={this.state.postText}/>
				</div>			
				<Divider style={{ marginLeft: 12, marginRight: 12 }}/>
				<div style={{ display: 'flex', width: '100%', paddingLeft: 15 }}>
					<input type="file" accept="image/*" style={{ display: 'none' }} ref={(ref) => this.uploadPhoto = ref} multiple onChange={(e) => this.uploadFiles(e, 2)}/>
					<button className='posterButtons' onClick={() => this.uploadPhoto.click()}>
						<Icon name='photo' style={{ color: 'white' }}/>Photo
					</button>
					<input type='file' accept='video/*' style={{ display: 'none' }} ref={(ref) => this.uploadVideo = ref} onChange={(e) => this.uploadFiles(e, 3)} />
					<button className='posterButtons' onClick={() => this.uploadVideo.click()}>
						<Icon name='video' style={{ color: 'white' }}/>Video
					</button>
					<input type='file' accept='audio/*' style={{ display: 'none' }} ref={(ref) => this.uploadAudio = ref} onChange={(e) => this.uploadFiles(e, 4)} />
					<button className='posterButtons' onClick={() => this.uploadAudio.click()}>
						<Icon name='file audio' style={{ color: 'white' }}/>Audio
					</button>
					<div style={{ width: '35%' }}></div>
					<button id='postBtn' onClick={() => this.post()} disabled={disabled && empty}>
						Post <Icon name='send' style={{ color: 'white' }}/>
					</button>
				</div>
				{this.state.files.length > 0 &&
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
						{this.state.typePost !== 2 && this.state.files.map(file => {
							const fileObj = URL.createObjectURL(file)
							if(this.state.typePost === 3) { return <ReactPlayer url={fileObj} controls style={{ backgroundColor: 'black' }} key={file.name}/> }
							else return <ReactAudioPlayer src={fileObj} controls style={{ marginLeft: 50, marginRight: 50, marginTop: 10 }} key={file.name}/> 
						})}
						{this.state.typePost === 2 &&
						<div style={{ paddingTop: 10, paddingBottom: 40, paddingLeft: 40, paddingRight: 40, maxWidth: '100%' }}>
							<Slider {...settings}>
								{this.state.files.map((file, i) => {
									const fileObj = URL.createObjectURL(file)
									return <div><Image src={fileObj} key={i} style={{ margin: '0 auto' }}></Image></div>
								})} 
							</Slider>
						</div>}
					</div>
					<button className='posterButtons' onClick={() => this.setState({ files: [] })} style={{ alignSelf: 'flex-end', marginRight: 10 }}>Delete Files</button>
				</div>}
				<Loader inline='centered' active={this.state.loading} inverted={dark}>
					<span style={{ color: dark ? 'white' : '' }}>Posting</span>
				</Loader>
			</Container>
			);
	}
}

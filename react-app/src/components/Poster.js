import React from 'react';
import { TextArea, Container, Image, Divider, Icon } from 'semantic-ui-react';
import ReactAudioPlayer from 'react-audio-player'
import ReactPlayer from 'react-player';

export default class Poster extends React.Component {
	constructor(props) {
		super(props);
		this.state = { typePost: 1, postText: '', files: [] }
	}

	handleInput = (event, {name, value}) => {
		this.setState({ postText: value })
	}

	post = async () => {
		const body = {
			typePost: this.state.typePost,
			postText: this.state.postText
		}
		await fetch('http://localhost:8080/posts?', { method: 'POST', credentials: 'include', body: JSON.stringify(body) })
		.then(response => response.json())
		.then(response => {
			if(response.status !== 200) {
				return;
			}
		})
		let url = 'http://localhost:8080/files?typePost=' + this.state.typePost + '&id='
<<<<<<< Updated upstream
		this.state.files.forEach((file, index) => {
			fetch('http://localhost:8080')
		})
=======
>>>>>>> Stashed changes
	}

	uploadFiles = (e, type) => {
		this.setState({ typePost: type, files: [...e.target.files] })
	}

	render() {
		const source = 'http://localhost:8080/files?type=avatar&file=' + this.props.user.username + '.png'
		return(
			<Container style={{ width: 'auto', maxHeight: 'auto', marginTop: '2.5vh', backgroundColor: 'white', borderColor: '#DDDFE2', 
			borderRadius: 5, borderWidth: 1.5, borderStyle: 'solid', marginBottom: '1.5vh' }}>
				<div style={{ display: 'flex' }}>
					<Image
						src={source}
						style={{ width: 80, height: 80, borderRadius: '100%', marginTop: '1.5vw', marginLeft: '1.5vw' }}
					/>
					<TextArea placeholder={'What\'s on your mind, ' + this.props.user.name + '?'} style={{ resize: 'none', width: '100%', height: 100,
			        marginTop: '1.5vh', marginRight: '1vw', paddingLeft: '1vw', paddingTop: '1vh', fontFamily: 'Arial', fontSize: '22px', border: 'none', outline: 0,
					lineHeight: 3 }} onChange={this.handleInput} value={this.state.postText}/>
				</div>			
				<Divider style={{ marginLeft: 12, marginRight: 12 }}/>
				<div style={{ display: 'flex', width: '100%', paddingLeft: 15 }}>
					<input type="file" accept="image/*" style={{ display: 'none' }} ref={(ref) => this.uploadPhoto = ref} multiple onChange={(e) => this.uploadFiles(e, 2)}/>
					<button className='posterButtons' onClick={() => this.uploadPhoto.click()}>
						<Icon name='photo' style={{ color: 'white' }}/>Photo
					</button>
					<input type='file' accept='video/*' style={{ display: 'none' }} ref={(ref) => this.uploadVideo = ref} multiple onChange={(e) => this.uploadFiles(e, 3)} />
					<button className='posterButtons' onClick={() => this.uploadVideo.click()}>
						<Icon name='video' style={{ color: 'white' }}/>Video
					</button>
					<input type='file' accept='audio/*' style={{ display: 'none' }} ref={(ref) => this.uploadAudio = ref} multiple onChange={(e) => this.uploadFiles(e, 4)} />
					<button className='posterButtons' onClick={() => this.uploadAudio.click()}>
						<Icon name='file audio' style={{ color: 'white' }}/>Audio
					</button>
					<div style={{ width: '35%' }}></div>
					<button id='postBtn' onClick={() => this.post()}>
						Post <Icon name='send' style={{ color: 'white' }}/>
					</button>
				</div>
				{this.state.files.length > 0 &&
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
						{this.state.files.map(file => {
							const fileObj = URL.createObjectURL(file)
							if(this.state.typePost === 2) { return <Image src={fileObj} style={{ maxWidth: 'auto', maxHeight: 100, padding: 20 }} /> }
							else if(this.state.typePost === 3) { return <ReactPlayer url={fileObj} controls style={{ backgroundColor: 'black' }}/> }
							else return <ReactAudioPlayer src={fileObj} controls style={{ marginLeft: 50, marginRight: 50, marginTop: 10 }}/> 
						})}
					</div>
					<button className='posterButtons' onClick={() => this.setState({ files: [] })} style={{ alignSelf: 'flex-end', marginRight: 10 }}>Delete Files</button>
				</div>}
			</Container>
			);
	}
}

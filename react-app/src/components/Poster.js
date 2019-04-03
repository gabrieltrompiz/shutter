import React from 'react';
import { TextArea, Container, Image, Divider, Icon } from 'semantic-ui-react';
import Button from './Button.js';

export default class Poster extends React.Component {
	constructor(props) {
		super(props);
		this.state = {media: false}
	}

	render() {
		const source = 'http://localhost:8080/files?type=avatar&file=' + this.props.user.username + '.png'
		return(
			<Container style={{ width: 'auto', height: 'auto', marginTop: '2.5vh', backgroundColor: 'white', borderColor: '#DDDFE2', 
			borderRadius: 5, borderWidth: 1.5, borderStyle: 'solid', marginBottom: '1.5vh' }}>
				<div style={{ display: 'flex' }}>
					<Image
						src={source}
						style={{ width: 80, height: 80, borderRadius: '100%', marginTop: '1.5vw', marginLeft: '1.5vw' }}
					/>
					<TextArea placeholder={'What\'s on your mind, ' + this.props.user.name + '?'} style={{ resize: 'none', width: '100%', height: 100, paddingTop: 80,
			        marginTop: '1.5vh', marginRight: '1vw', paddingLeft: '1vw', paddingTop: '1vh', fontFamily: 'Arial', fontSize: '22px', border: 'none', outline: 0,
					lineHeight: 3 }}/>
				</div>			
				<Divider style={{ marginLeft: 12, marginRight: 12 }}/>
				<div style={{ display: 'flex', width: '100%', paddingLeft: 15 }}>
					<button className='posterButtons'>
						<Icon name='photo' style={{ color: 'white' }}/>Photo
					</button>
					<button className='posterButtons'>
						<Icon name='photo' style={{ color: 'white' }}/>Video
					</button>
					<button className='posterButtons'>
						<Icon name='file audio' style={{ color: 'white' }}/>Audio
					</button>
					<div style={{ width: '35%' }}></div>
					<button id='postBtn'>
						Post <Icon name='send' style={{ color: 'white' }}/>
					</button>
				</div>
				<div>
					{/*Este div va a ser pa cuando el coño suba una foto/video, aquí se muestran
				las miniaturas. Obviamente no lo he hecho XD. Se supone que cuando se suba algo,
				debe aparecer al lado izquierdo, tomando espacio del textArea y con overflow.*/}
				</div>
			</Container>
			);
	}
}

import React from 'react';
import { TextArea, Container, Image } from 'semantic-ui-react';
import Button from './Button.js';

export default class Poster extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<Container style={{ width: '60vw', height: '30vh', backgroundColor: 'blue', display: 'flex'}}>
				{/*TextArea, MiniProfile pic, opciones adicionales(subir foto, video), boton de salir, boton de post*/ /*leftPadding*/}
				<div style={{width: '11vw'}}>
					<Image
						src={require('../assets/pandagram2.png')}
						style={{ width: 80, height: 80, borderRadius: '100%', marginTop: '2vh', marginLeft: '1vw' }}
					/>
					<Button marginLeft='0.8vw' marginTop='1vh'>Lorem Ipsum</Button>
					<Button marginLeft='0.8vw' marginTop='1vh'>Lorem Ipsum</Button>
					<Button marginLeft='0.8vw' marginTop='1vh'>Lorem Ipsum</Button>
				</div>
				<TextArea placeholder='Whats on your mind' style={{ resize: 'none', width: 'inherit', 
				borderRadius: '20px', marginTop: '2vh', marginBottom: '2vh', marginRight: '1vw', paddingLeft: '1vw',
				fontFamily: 'Arial', fontSize: '22px' }}/>
				<div>
					{/*Este div va a ser pa cuando el coño suba una foto/video, aquí se muestran
				las miniaturas. Obviamente no lo he hecho XD. Se supone que cuando se suba algo,
				debe aparecer al lado izquierdo, tomando espacio del textArea y con overflow.*/}
				</div>
			</Container>
			);
	}
}
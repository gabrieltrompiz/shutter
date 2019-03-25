import React from 'react';
import { TextArea, Container, Image } from 'semantic-ui-react';
import Button from './Button.js';

export default class Poster extends React.Component {
	constructor(props) {
		super(props);
		this.state = {media: false}
	}

	render() {
		return(
			<Container style={{ width: '70vw', height: '30vh', backgroundColor: 'rgb(240, 240, 240)', display: 'flex'}}>
				{/*TextArea, MiniProfile pic, opciones adicionales(subir foto, video), boton de salir, boton de post*/ /*leftPadding*/}
				<div style={{width: '14vw'}}>
					<Image
						src={require('../assets/pandagram2.png')}
						style={{ width: 80, height: 80, borderRadius: '100%', marginTop: '2vh', marginLeft: '2.5vw' }}
					/>
					<Button outlined marginLeft='1.8vw' marginRight='1vw' marginTop='1vh' fontFamily='Arial' 
					fontSize='12px' width='10vw'>Pictures</Button>
					<Button outlined marginLeft='1.8vw' marginTop='1vh' fontFamily='Arial' 
					fontSize='12px' width='10vw'>Video</Button>
				</div>
				<div style={{ width: '55vw', height: 'inherit' }}>
					<TextArea placeholder='Whats on your mind...' style={{ resize: 'none', width: 'inherit', height: '23vh',
					borderRadius: '20px', marginTop: '2vh', /*marginBottom: '2vh',*/ marginRight: '1vw', paddingLeft: '1vw',
					paddingTop: '1vh', fontFamily: 'Arial', fontSize: '22px',  }}/>
					<Button outlined fontFamily='Arial' fontSize='12px' width='10vw'
					>Post</Button>
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
import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import Button from './Button.js';

export default class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.post;
	}

	render() {
		const source = 'http://localhost:8080/files?type=avatar&file=' + this.state.user + '.png'
		return(
			<Container style={{ width: 'auto', height: 'auto', marginTop: '2.5vh', display: 'flow-root', backgroundColor: 'white', borderColor: '#DDDFE2', 
			borderRadius: 5, borderWidth: 1.5, borderStyle: 'solid' }}>
				<div style={{display: 'flex'}}>
					<Image
						src={source}
						style={{borderRadius: '100%', width: 65, height: 65, marginTop: '2vh', marginLeft: '1vw'}}
					/>
					<div style={{marginLeft: '1vw'}}>
						<p style={{margin: 0, paddingTop: '2.5vh'}}>{this.state.name}</p>
						<p style={{fontSize: '13px'}}>{this.state.date}</p>
					</div>
				{<button style={{backgroundColor: 'transparent', cursor: 'pointer', border: 'none', height: '5vh', marginLeft: 'auto'}}>...</button> /* Que ladilla */}
				</div>
				<div style={{marginLeft: '5vw', marginRight: '2vw', marginTop: '2vh', marginBottom: '2vh'}}>
					<p>{this.state.msg}</p>
				</div>
				<div>
					{/* -Para cada archivo que contenga content- */}
				</div>
			<p style={{ paddingLeft: '1vw', margin: 0}}>{'Gabriel Trompussy and 31 others' /* Obviamente aquí va un switchito */}</p>
			<div style={{display: 'flex', marginBottom: '0.6vh'}}>
				<Button changeRadius border= 'none' width= '32.7%' marginLeft= '0.3%' marginRight= '0.3%' borderRadius= '50px'>Likes</Button>
				<Button changeRadius border= 'none' width= '32.7%' marginLeft= '0.3%' marginRight= '0.3%' borderRadius= '50px'>Comments</Button>
				<Button changeRadius border= 'none' width= '32.7%' marginLeft= '0.3%' marginRight= '0.3%' borderRadius= '50px'>Share</Button>
			</div>
			</Container>
			);
	}
}
/*
<button style={{ backgroundColor: 'rgb(230, 230, 230)', border: 'none', width: '32.7%', marginLeft: '0.3%', marginRight: '0.3%', borderRadius: '15px' }}>Likes</button>
<button style={{ backgroundColor: 'rgb(230, 230, 230)', border: 'none', width: '32.7%', marginLeft: '0.3%', marginRight: '0.3%', borderRadius: '15px' }}>Comment</button>
<button style={{ backgroundColor: 'rgb(230, 230, 230)', border: 'none', width: '32.7%', marginLeft: '0.3%', marginRight: '0.3%', borderRadius: '15px' }}>Share</button>
*/
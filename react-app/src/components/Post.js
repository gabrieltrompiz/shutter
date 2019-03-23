import React from 'react';
import { Container, Image } from 'semantic-ui-react';

export default class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = { profilePic: null, msg: 'Entré al baño y habían dos moscas cogiendo. Las maté pal sebillo porque si yo no cojo ellas tampoco',
		 content: null, name: 'Luis Petrella', date: '22 hrs', height: '30vh', likes: 0 };
	}

	render() {
		return(
			<Container style={{width: '65vw', height: 'auto', backgroundColor: 'white', marginTop: 0, display: 'flow-root', fontSize: '20px'}}>
				<div style={{display: 'flex'}}>
					<Image
						src={require('../assets/pandagram2.png')}
						style={{borderRadius: '100%', width: 65, height: 65, marginTop: '2vh', marginLeft: '1vw'}}
					/>
					<div style={{marginLeft: '1vw'}}>
						<p style={{margin: 0}}>{this.state.name}</p>
						<p style={{fontSize: '13px'}}>{this.state.date}</p>
					</div>
				{<button style={{border: 'none', height: '5vh', marginLeft: 'auto'}}>...</button> /* Que ladilla */}
				</div>
				<div style={{marginLeft: '5vw', marginRight: '2vw', marginTop: '2vh', marginBottom: '2vh'}}>
					<p>{this.state.msg}</p>
				</div>
				<div>
					{/* -Para cada archivo que contenga content- */}
				</div>
			<p style={{ paddingLeft: '1vw', margin: 0}}>{'Gabriel Trompussy and 31 others' /* Obviamente aquí va un switchito */}</p>
			<div style={{display: 'flex', marginBottom: '0.6vh'}}>
				<button style={{ backgroundColor: 'gray', border: 'none', width: '32.7%', marginLeft: '0.3%', marginRight: '0.3%', borderRadius: '5px' }}>Likes</button>
				<button style={{ backgroundColor: 'gray', border: 'none', width: '32.7%', marginLeft: '0.3%', marginRight: '0.3%', borderRadius: '5px' }}>Comment</button>
				<button style={{ backgroundColor: 'gray', border: 'none', width: '32.7%', marginLeft: '0.3%', marginRight: '0.3%', borderRadius: '5px' }}>Share</button>
			</div>
			</Container>
			);
	}
}
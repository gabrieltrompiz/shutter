import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import Button from './Button.js';

export default class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.post;
	}

	getTime = (date) => {
		let now = new Date();
		let postDate = new Date(date)
		console.log(now);
		console.log(postDate);

		if(now.getDate() === postDate.getDate()) {
			if(now.getHours() === postDate.getHours()) {
				if (now.getMinutes() === postDate.getMinutes())
					return (now.getSeconds() - postDate.getSeconds()) + 'seconds ago';
				return (now.getMinutes() - postDate.getMinutes()) + 'minutes ago';
			}
			else
				return (now.getHours() - postDate.getHours()) + ' hours ago';
		}

		else
			return postDate.getDate() +  '/' + (postDate.getMonth() + 1) + '/' + postDate.getFullYear();
	}

	render() {
		const source = 'http://localhost:8080/files?type=avatar&file=' + this.state.user.username + '.png'
		return(
			<Container style={{width: '70vw', height: 'auto', backgroundColor: 'white', marginTop: 0, display: 'flow-root', fontSize: '20px'}}>
				<div style={{display: 'flex'}}>
					<Image
						src={source}
						style={{borderRadius: '100%', width: 65, height: 65, marginTop: '2vh', marginLeft: '1vw'}}
					/>
					<div style={{marginLeft: '1vw'}}>
						<p style={{margin: 0, paddingTop: '2.5vh'}}>{'@' + this.state.user.username}</p>
						<p style={{fontSize: '13px'}}>{this.getTime(this.state.creationTime)}</p>
					</div>
				{<button style={{backgroundColor: 'transparent', cursor: 'pointer', border: 'none', height: '5vh', marginLeft: 'auto'}}>...</button> /* Que ladilla */}
				</div>
				<div style={{marginLeft: '5vw', marginRight: '2vw', marginTop: '2vh', marginBottom: '2vh'}}>
					<p>{this.state.postText}</p>
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
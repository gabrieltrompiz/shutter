import React from 'react';
import { Input, Image } from 'semantic-ui-react';
import UsersContainer from './UsersContainer.js'
export default class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = { recent: null}
	}

	search = async (name) => {
		//se settea el loading
		//await fetch(/*el nombre del endpoint*/'')
	}

	render() {
		return(
			<div style={{ width: 'inherit', height: 'inherit', backgroundColor: 'pink'}}>
				<Input placeholder='Search' style={{ width: '50vw', marginLeft: '10vw', marginTop: '2.5vh' }} 
				focus icon={{ name: 'search', circular: 'true'}} onclick={() => this.search('a')}
				onChange={this.handleInput} autoComplete='off' maxLength={50}/>
				<UsersContainer>
					{/* Búsquedas recientes */}
				</UsersContainer>
			</div>
		);
	}
}
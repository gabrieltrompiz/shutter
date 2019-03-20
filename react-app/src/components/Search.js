import React from 'react'
import { Input, Image } from 'semantic-ui-react'
export default class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = { recent: null}
	}

	search = (name) => {

	}

	render() {
		return(
			<div style={{backgroundColor: 'pink'}}>
				<Input placeholder='Search' focus loading icon={{ name: 'search', circular: 'true'}} onclick={() => this.search('a')}/>
				{/* Búsquedas recientes */}
			</div>
		);
	}
}
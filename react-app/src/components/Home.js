import React from 'react'

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return(
			<Container>
				<Poster/>
				{/*Lista de posts*/}
			</Container>
		);
	}
}
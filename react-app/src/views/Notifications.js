import React from 'react'
import Not from '../components/Not.js'

export default class Inbox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return(
			<div style={{ backgroundColor: 'purple', width: 'inherit', height: '100%', overflowY: 'scroll'}}>
				<Not/>
				<Not/>
				<Not/>
				<Not/>
				<Not/>
				<Not/>
				<Not/>
				<Not/>
				<Not/>
				<Not/>
				{/* Lista de notificaciones */}
			</div>
		);
	}
}
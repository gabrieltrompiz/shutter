import React from 'react';
import { Image } from 'semantic-ui-react';

export default class Not extends React.Component {
	constructor(props) {
		super(props);
		this.state = { date: '5 minutes ago', msg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'};
	}

	render() {
		return(
				<div style={{ backgroundColor: 'white', height: '135px', width: '100%', display: 'flex', border: '1px solid rgb(220, 220, 220)' }}>
					<div style={{width: '15%'}}>
						<Image
							src={require('../assets/pandagram2.png')}
							style={{ width: 60, height: 60, borderRadius: '100%', marginTop: '3vh', marginLeft: '2.5vw' }}
						/>
						<p style={{ marginLeft: '2.1vw', marginTop: '1.4vh', fontFamily: 'Arial', fontSize: '12px', width: 'fill', margin: 'none' }}>
							{this.state.date}
						</p>
					</div>
					
					<div style={{ width: 'inherit', fontFamily: 'Arial', fontSize: '18px', 
					paddingLeft: '2vw', paddingRight: '1vw', paddingTop: '4vh '}}>
						{this.state.msg}
					</div>
				</div>
			);
	}
}
//fontFamily: 'Arial', fontSize: '22px'
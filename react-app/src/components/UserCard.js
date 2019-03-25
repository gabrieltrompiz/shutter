import React from 'react';
import { Image } from 'semantic-ui-react';

export default class UserCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const source = "http://localhost:8080/files?type=avatar&file=" + this.props.user.username + ".png"
		return(
			<div style={styles.container}>
				{this.props.user.username !== null && <Image
					src={source}
					circular={true}
					style={{ width: 70, height: 70, margin: 'auto', marginTop: 16 }}
				/>}
				<p style={styles.username}>{this.props.user.username}</p>
				<p style={styles.name}>{this.props.user.name}</p>
			</div>
		);
	}
}

const styles = {
	container: {
		width: '22.5%',
		height: '100%',
		marginTop: 5,
		marginBottom: 5,
		marginRight: 10,
		marginLeft: 10,
		borderColor: '#F0F0F2',
        borderWidth: 1,
		borderStyle: 'solid',
        boxShadow: '0 0 37px -2px rgba(0,0,0,0.1)',
        borderRadius: 20,
		backgroundColor: 'white',
		textAlign: 'center'
	},
	username: {
		margin: 0,
		marginTop: 5,
		fontWeight: '700',
		fontSize: 16
	},
	name: {
		fontWeight: '100',
		fontSize: 16
	}
}
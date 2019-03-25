import React from 'react';
import {} from 'semantic-ui-react';

export default class UserCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return(
			<div style={styles.container}>
				AAAAA
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
        borderWidth: 2,
		borderStyle: 'solid',
        boxShadow: '0 2px 4px 0 rgba(34,36,38,.12)',
        borderRadius: 20,
		backgroundColor: 'white'
	}
}
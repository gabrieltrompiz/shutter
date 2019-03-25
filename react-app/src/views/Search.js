import React from 'react';
import { Input, Image, Grid } from 'semantic-ui-react';
import UsersContainer from '../components/UsersContainer.js'
import UserCard from '../components/UserCard.js';
export default class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = { recent: null}
	}

	//El problemita con este callback es que pa buscar busquedas recientes se necesita modificar la db creo
	componentDidMount = async () => {
		// fetch(/*getRecentSearch*/)
	}

	search = async (name) => {
		//se settea el loading
		//await fetch(/*el nombre del endpoint*/'')
	}

	render() {
		const user = { username: 'default', name: "Luis Patrulla" }
		return(
			<div style={{ width: 'inherit', height: '100%', backgroundColor: 'pink'}}>
				<Input placeholder='Search' style={{ width: '50vw', marginLeft: '10vw', marginTop: '2.5vh' }} 
				focus icon={{ name: 'search', circular: 'true'}} onClick={() => this.search('a')}
				onChange={this.handleInput} autoComplete='off' maxLength={50}/>
				<UsersContainer>
					<Grid columns={4} style={{ width: '100%', height: '30%', margin: 0, marginLeft: '0.75vw' }}>
						<Grid.Row>
							<UserCard user={user}/> {/* Este user va a estar en el state, posiblemente se guarde en localStorage no c */}
							<UserCard />
							<UserCard />
							<UserCard />
						</Grid.Row>
					</Grid>
				</UsersContainer>
			</div>
		);
	}
}
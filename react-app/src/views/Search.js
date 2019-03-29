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
		await fetch('http://localhost:8080/search?name=' + name + '&&list=general')
			.then(response => {
				if(response.status === 200) {
					this.setState = { users: response.data }
				} else
				console.log('cry');
			});
	}
	

	render() {
		const user = { username: 'gabtrompzi', name: "Gabriel Trompiz" }
		return(
			<div style={{ width: 'inherit', height: '100%' }}>
				<Input placeholder='Search' style={{ width: '50vw', marginLeft: '10vw', marginTop: '2.5vh' }} 
				focus icon={{ name: 'search', circular: 'true'}} onClick={() => this.search('a')}
				onChange={this.handleInput} autoComplete='off' maxLength={50}/>
				<Grid columns={4} style={{ width: '100%', height: '30%', margin: 0, marginLeft: '0.75vw' }}>
					<Grid.Row>
						<UserCard user={user}/> {/* Este user va a estar en el state, posiblemente se guarde en localStorage no c */}
						<UserCard user={user}/>
						<UserCard user={user}/>
						<UserCard user={user}/>
					</Grid.Row>
					<Grid.Row>
						<UserCard user={user}/> {/* Este user va a estar en el state, posiblemente se guarde en localStorage no c */}
						<UserCard user={user}/>
						<UserCard user={user}/>
						<UserCard user={user}/>
					</Grid.Row>
					<Grid.Row>
						<UserCard user={user}/> {/* Este user va a estar en el state, posiblemente se guarde en localStorage no c */}
						<UserCard user={user}/>
						<UserCard user={user}/>
						<UserCard user={user}/>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}
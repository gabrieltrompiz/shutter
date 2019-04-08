import React from 'react';
import { Input, Segment, Divider } from 'semantic-ui-react';
import UserCard from '../components/UserCard.js';
export default class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = { recent: [], results: [], search: '' }
	}

	componentDidMount = () => {
		this._retrieveState()
	}

	handleInput = (e, {name, value}) => {
		 // TODO: esto hay q cambiarlo, hace un fetch cada vez q cambia lo q escribis, deberia ser cuando le de a enter
		if(value.trim() !== '' && value.length > 2) { this.setState({ search: value }, () => this.search(value.trim().replace(/ +/g, ' '))) }
		else { this.setState({ results: [], search: value })}
	}

	 _retrieveState = async () => {
        let recent = await localStorage.getItem('RECENT-PANDAGRAM-' + this.props.user.username.toUpperCase())
        if(recent !== null) { this.setState({ recent: JSON.parse(recent) }) }
    }

	handleAddRecent = user => { // logica para agregar reciente, vainas q si ya esta pasa a primero y se rotan los demas y eso, maximo 9 recents, cuando esta full y se agrega otro se elimina el ultimo
		let recent = [...this.state.recent] // Creates clone of state array
        let exists = false;
        let index = -1;
        recent.forEach((item, i) => {
            if(user.usernname === item.username) { exists = true;  index = i }
        })
        if (exists && recent.length > 1) {
            for(let i = index; i > 0; i--) {
                recent[i] = recent[i - 1]
            }
            recent[0] = user
        }
        else if (recent.length === 0) { recent[0] = user }
        else if (!exists) {
            for(let i = recent.length - 1; i >= 0; i--) {
                recent[i + 1] = recent[i]
            }
            recent[0] = user
            if(recent.length === 9) { recent.pop() }
        }
        this.setState({ recent: recent }, () => {
            localStorage.setItem('RECENT-PANDAGRAM-' + this.props.user.username.toUpperCase(), JSON.stringify(this.state.recent))
        })
	}
	
	search = async (name) => {
		await fetch('http://localhost:8080/search?search=' + name + '&list=general')
			.then(response => response.json())
			.then(response => {
				if(response.status === 200) {
					response.data.map(user => {
						if(user.username === this.props.user.username) {
							response.data.pop(user)
						}
					})
					this.setState({ results: response.data })
				}
			})
	}
	

	render() {
		return(
			<div style={{ display: 'flex' }}>
				<div style={{ width: '57.5%', height: '100%' }}>
					<Input placeholder='Search' style={{ width: '80%', marginLeft: '10%', height: 40, fontSize: 18, marginTop: '2.5vh' }} 
					icon={{ name: 'search' }} onChange={this.handleInput} autoComplete='off' maxLength={50} value={this.state.search}/>
					<div style={styles.container}>
					{this.state.results.length === 0 && 
						<div style={styles.empty}>
							<i className="fas fa-search" style={styles.icon}></i>
							<span style={styles.text}>Use the search bar to find your friends.</span>
						</div>}
						{this.state.results.map(user => {
							if (this.props.user.username !== user.username)
								return <UserCard user={user} key={user.username} changeView={this.props.changeView}
								changeUser={this.props.changeUser} />
							return <UserCard user={user} key={user.username} />
						})}
					</div>
				</div>
				<Segment raised style={styles.recent}>
					<p style={styles.title}>Recent Search</p>
					<Divider fitted style={{ marginTop: 2}} />
					{/* aqui va un .map() de los recents */}
				</Segment>
			</div>
			
		);
	}
}

const styles = {
	container: {
		display: 'flex',
		width: '100%',
		height: '85vh',
		marginTop: 20,
		flexWrap: 'wrap',
		alignContent: 'flex-start',
	},
	empty: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		width: '100%',
		borderStyle: 'dashed',
		borderWidth: 2,
		borderColor: 'grey',
		borderRadius: 20,
		fontFamily: 'Heebo',
		color: 'grey',
		opacity: 0.8,
	},
	recent: {
		position: 'fixed',
		height: '94vh',
		width: '30%',
		left: '67.5%',
		marginTop: '2.5vh'
	},
	title: {
		fontFamily: 'Heebo',
		fontSize: 30,
		fontWeight: 'bolder',
		margin: 0
	},
	text: {
		color: 'grey', 
		opacity: 0.8,
		fontSize: 22,
		fontFamily: 'Heebo', 
		fontWeight: 'bolder',
		textAlign: 'center',
		lineHeight: 1.1,
		marginTop: 10
	},
	icon: {
		color: 'grey',
		fontSize: 30,
		opacity: 0.8
	}
}
import React from 'react'
import { Segment, Divider, Form, Icon } from 'semantic-ui-react';

export default class Stats extends React.Component {
    constructor(props) {
        super(props)
        this.state = { filter: 'posts', order: 'ByType', stats: {}, fetching: false }
    }

    componentDidMount = async () => {
        await this.fetchStats()
    }

    handleInput = (event, {name, value}) => {
        if(value === 'posts' && this.state.filter !== 'posts') { this.setState({ order: 'ByType' })}
        if(value === 'users' && this.state.filter !== 'users') { this.setState({ order: 'ByGenre' })}
        this.setState({ [name]: value })
    }

    fetchStats = async () => {
        await this.setState({ fetching: true })
        await fetch('http://localhost:8080/admin?stat=' + this.state.filter + this.state.order, { credentials: 'include' })
        .then(response => response.json())
        .then(response => {
            if(response.status === 200) {
                this.setState({ fetching: false, stats: response.data })
            }
        })
    }

    getOrder = () => {
        let optionsOrder = []
        if(this.state.filter === 'posts') {
            optionsOrder = [
                { key: 1, text: 'Type', value: 'ByType' },
                { key: 2, text: 'Most Likes', value: 'ByLikes' },
                { key: 3, text: 'Most Comments', value: 'ByComments' }
            ]
        } else {
            optionsOrder = [
                { key: 1, text: 'Genre', value: 'ByGenre' },
                { key: 2, text: 'Most Posts', value: 'ByPosts' },
                { key: 3, text: 'Most Friends', value: 'ByFriends' },
                { key: 4, text: 'Age', value: 'ByAge' },
            ]
        }

        return optionsOrder
    }

    render() {
        const dark = this.props.darkTheme
        const styles = this.getStyles(dark)
        const optionsOrder = this.getOrder()
        return(
            <Segment raised style={{ width: '75%', height: '94vh', left: '20.5%', marginTop: '2.5vh', position: 'fixed', backgroundColor: dark ? '#15202B' : 'white' }}>
				<p style={styles.title}>Statistics</p>
                <Divider fitted style={{ marginTop: 2 }} />
                <div style={styles.controller}>
                    <Icon name='filter' style={{ color: dark ? 'white' : 'black' }}/>
                    <span>Filter: </span>
                    <Form.Select options={optionsFilter} placeholder='Filter' name='filter' onChange={this.handleInput} value={this.state.filter} compact
                    style={{ color: dark ? 'white' : 'black', backgroundColor: dark ? '#1c2938' : '#f0f0f0', border: dark ? '0.5px solid transparent' : 'none', outline: 0, margin: 20, 
                    fontWeight: 'bold', fontFamily: 'Heebo', fontSize: 16, width: 150 }} /> 
                    <Icon name='sort' style={{ color: dark ? 'white' : 'black', marginLeft: 10 }} />
                    <span>Order By:</span>
                    <Form.Select options={optionsOrder} placeholder='Order' name='order' onChange={this.handleInput} value={this.state.order} compact
                    style={{ color: dark ? 'white' : 'black', backgroundColor: dark ? '#1c2938' : '#f0f0f0', border: dark ? '0.5px solid transparent' : 'none', outline: 0, margin: 20, 
                    fontWeight: 'bold', fontFamily: 'Heebo', fontSize: 16, width: 150 }} />
                    <button style={styles.button}>
                        <Icon name='refresh' />
                        Refresh
                    </button>
                </div>
                <Divider fitted />

            </Segment>
        );
    }

    getStyles = (dark) => {
        const styles = {
            title: {
                fontFamily: 'Heebo',
				fontSize: 30,
				fontWeight: 'bolder',
				margin: 0,
				color: dark ? 'white' : 'black'
            },
            controller: {
                height: 75, 
                width: '100%',
                marginTop: 5,
                borderRadius: 5,
                backgroundColor: 'transparent',
                fontSize: 18,
                fontFamily: 'Heebo',
                fontWeight: 'bold',
                color: dark ? 'white' : 'black',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginLeft: 20
            },
            button: {
                position: 'absolute',
                right: 40,
                outline: 0,
                cursor: 'pointer',
                backgroundColor: dark ? '#1c2938' : '#f0f0f0',
                border: 'none',
                borderRadius: 5,
                fontFamily: 'Heebo',
                fontWeight: 'bold',
                padding: 15,
                color: dark ? 'white' : 'black',
                fontSize: 16
            }
        }
        return styles
    }
}

const optionsFilter = [
  { key: 1, text: 'Posts', value: 'posts' },
  { key: 2, text: 'Users', value: 'users' },
]
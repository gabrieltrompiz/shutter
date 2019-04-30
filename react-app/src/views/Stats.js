import React from 'react'
import { Segment, Divider, Form, Icon, Dimmer, Loader } from 'semantic-ui-react';
import { LineChart, Tooltip, XAxis, YAxis, Legend, Line, CartesianGrid, ResponsiveContainer, PieChart, Pie, BarChart, Bar } from 'recharts'
import PostShowcase from '../components/PostShowcase';

export default class Stats extends React.Component {
    constructor(props) {
        super(props)
        this.state = { filter: 'posts', order: 'ByType', stats: null, fetching: false, data: [] }
    }

    componentWillMount = async () => {
        await this.fetchStats()
        this.serializeData()
    }

    handleInput = async (event, {name, value}) => {
        if(value === 'posts' && this.state.filter !== 'posts') { await this.setState({ order: 'ByType' })}
        if(value === 'users' && this.state.filter !== 'users') { await this.setState({ order: 'ByGenre' })}
        await this.fetchStats({ [name]: value }).then(() => this.setState({ [name]: value })).then(() => this.serializeData())
    }

    fetchStats = async (state = {}) => {
        const filter = typeof state.filter !== 'undefined' ? state.filter : this.state.filter
        const order = typeof state.order !== 'undefined' ? state.order : this.state.order
        this.setState({ fetching: true })
        await fetch('http://localhost:8080/admin?stat=' + filter + order, { credentials: 'include' })
        .then(response => response.json())
        .then(response => {
            if(response.status === 200) {
                this.setState({ stats: response.data, fetching: false })
            }
            else if(response.status === 403) {
                this.props.logout()
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

    serializeData = () => {
        this.setState({ data: [] })
        let data = []
        if((this.state.filter + this.state.order) === 'postsByType') {
            data = [
                { name: "Text Posts", quantity: this.state.stats.textPosts.length },
                { name: "Audio Posts", quantity: this.state.stats.audioPosts.length }, 
                { name: "Video Posts", quantity: this.state.stats.videoPosts.length },
                { name: "Image Posts", quantity: this.state.stats.imagePosts.length }
            ]
        }
        else if((this.state.filter + this.state.order) === 'postsByLikes') {
            this.state.stats.forEach(post => {
                data.push({
                    name: "Post " + post.idPost,
                    likes: post.likes.length,
                    post: post,
                    dark: this.props.darkTheme
                })
            })
        }
        else if((this.state.filter + this.state.order) === 'postsByComments') {
            this.state.stats.forEach(post => {
                data.push({
                    name: "Post " + post.idPost,
                    comments: post.comments.length,
                    post: post,
                    dark: this.props.darkTheme
                })
            })
        }
        else if((this.state.filter + this.state.order) === 'usersByGenre') {
            data = [
                { genre: "Male", quantity: this.state.stats.male.length, fill: 'blue' },
                { genre: "Female", quantity: this.state.stats.female.length, fill: 'pink' }
            ]
        }
        else if((this.state.filter + this.state.order) === 'usersByPosts') {
            Object.keys(this.state.stats).forEach(key => {
                data.push({
                    name: key,
                    posts: this.state.stats[key].length
                })
            })
        }
        else if((this.state.filter + this.state.order) === 'usersByFriends') {
            Object.keys(this.state.stats).forEach(key => {
                data.push({
                    name: key,
                    friends: this.state.stats[key].length
                })
            })
        }
        else if((this.state.filter + this.state.order) === 'usersByAge') {
            Object.keys(this.state.stats).forEach(key => {
                data.push({
                    name: key,
                    users: this.state.stats[key].length
                })
            })
        }
        this.setState({ data: data })
    }

    render() {
        const dark = this.props.darkTheme
        const styles = this.getStyles(dark)
        const optionsOrder = this.getOrder()
        const data = this.state.data
        const stat = this.state.filter + this.state.order
        return(
            <Segment raised style={{ width: '75%', height: '94vh', left: '20.5%', marginTop: '2.5vh', position: 'fixed', backgroundColor: dark ? '#15202B' : 'white' }}>
				<p style={styles.title}>Statistics</p>
                <Divider fitted style={{ marginTop: 2 }} />
                <div style={styles.controller}>
                    <Icon name='filter' style={{ color: dark ? 'white' : 'black' }}/>
                    <span>Filter: </span>
                    <Form.Select options={optionsFilter} placeholder='Filter' name='filter' onChange={this.handleInput} value={this.state.filter} compact
                    style={{ color: dark ? 'white' : 'black', backgroundColor: dark ? '#1c2938' : '#f0f0f0', border: dark ? '0.5px solid transparent' : 'none', outline: 0, margin: 20, 
                    fontWeight: 'bold', fontFamily: 'Heebo', fontSize: 16, width: 175 }} /> 
                    <Icon name='sort' style={{ color: dark ? 'white' : 'black', marginLeft: 10 }} />
                    <span>Order By:</span>
                    <Form.Select options={optionsOrder} placeholder='Order' name='order' onChange={this.handleInput} value={this.state.order} compact
                    style={{ color: dark ? 'white' : 'black', backgroundColor: dark ? '#1c2938' : '#f0f0f0', border: dark ? '0.5px solid transparent' : 'none', outline: 0, margin: 20, 
                    fontWeight: 'bold', fontFamily: 'Heebo', fontSize: 16, width: 175 }} />
                    <button style={styles.button} onClick={() => this.fetchStats().then(() => this.serializeData())}>
                        <Icon name='refresh' />
                        Refresh
                    </button>
                </div>
                <Divider fitted />
                <Dimmer active={this.state.fetching} style={{ opacity: 0.5 }}>
                    <Loader inverted active={this.state.fetching} style={{ opacity: '1 !important' }}>Fetching...</Loader>
                </Dimmer>
                <p style={styles.subtitle}>
                    {this.state.filter.charAt(0).toUpperCase() + this.state.filter.slice(1, this.state.filter.length) + " " 
                    + this.state.order.slice(0, 2).toLowerCase() + " " + this.state.order.slice(2, this.state.order.length)}
                    </p>
                {stat === 'postsByType' && 
                <ResponsiveContainer width='95%' height='60%'>
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#8899A6' : 'grey'}/>
                        <XAxis dataKey="name" stroke={dark ? '#8899A6' : 'grey'} />
                        <YAxis stroke={dark ? '#8899A6' : 'grey'}/>
                        <Tooltip contentStyle={{ color: dark ? 'white' : 'black', backgroundColor: dark ? '#1c2938' : '#f0f0f0', borderColor: 'transparent' }} />
                        <Legend wrapperStyle={{ color: dark ? '#8899A6' : 'grey' }} />
                        <Line type='monotone' dataKey="quantity" stroke={!dark ? '#ff5252' : '#537fa9' } strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>}
                {stat === 'postsByLikes' &&
                <ResponsiveContainer width='95%' height='60%'>
                    <BarChart data={data} margin={{ right: 0 }}>
                        <CartesianGrid stroke={dark ? '#8899A6' : 'grey'}/>
                        <XAxis dataKey="name" stroke={dark ? '#8899A6' : 'grey'} />
                        <YAxis stroke={dark ? '#8899A6' : 'grey'}/>
                        <Tooltip contentStyle={{ color: dark ? 'white' : 'black', backgroundColor: dark ? '#1c2938' : '#f0f0f0', borderColor: 'transparent' }} 
                        content={<CustomTooltip />}/>
                        <Legend wrapperStyle={{ color: dark ? '#8899A6' : 'grey' }} />
                        <Bar dataKey="likes" fill={!dark ? '#ff5252' : '#537fa9' } />
                    </BarChart>
                </ResponsiveContainer>}
                {stat === 'postsByComments' &&
                <ResponsiveContainer width='95%' height='60%'>
                    <BarChart data={data} margin={{ right: 0 }}>
                        <CartesianGrid stroke={dark ? '#8899A6' : 'grey'}/>
                        <XAxis dataKey="name" stroke={dark ? '#8899A6' : 'grey'} />
                        <YAxis stroke={dark ? '#8899A6' : 'grey'}/>
                        <Tooltip contentStyle={{ color: dark ? 'white' : 'black', backgroundColor: dark ? '#1c2938' : '#f0f0f0', borderColor: 'transparent' }} 
                        content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ color: dark ? '#8899A6' : 'grey' }} />
                        <Bar dataKey="comments" fill={!dark ? '#ff5252' : '#537fa9' } />
                    </BarChart>
                </ResponsiveContainer>}        
                {stat === 'usersByGenre' &&
                <ResponsiveContainer width='95%' height='60%'>
                    <PieChart>
                        <Pie data={data} dataKey="quantity" nameKey="genre" cx="50%" cy="50%" outerRadius="100" legendType='circle' strokeWidth={2} stroke='transparent' animationDuration={1000}/>
                        <Tooltip contentStyle={{ backgroundColor: dark ? '#1c2938' : '#f0f0f0', borderColor: 'transparent' }} 
                        itemStyle={{ color: dark ? 'white' : 'black' }} />
                        <Legend wrapperStyle={{ color: dark ? '#8899A6' : 'grey' }} />
                    </PieChart>
                </ResponsiveContainer>}
                {stat === 'usersByPosts' &&
                <ResponsiveContainer width='95%' height='60%'>
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#8899A6' : 'grey'}/>
                        <XAxis dataKey="name" stroke={dark ? '#8899A6' : 'grey'} />
                        <YAxis stroke={dark ? '#8899A6' : 'grey'}/>
                        <Tooltip contentStyle={{ color: dark ? 'white' : 'black', backgroundColor: dark ? '#1c2938' : '#f0f0f0', borderColor: 'transparent' }} />
                        <Legend wrapperStyle={{ color: dark ? '#8899A6' : 'grey' }} />
                        <Line type='monotone' dataKey="posts" stroke={!dark ? '#ff5252' : '#537fa9' } strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>}
                {stat === 'usersByFriends' &&
                <ResponsiveContainer width='95%' height='60%'>
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#8899A6' : 'grey'}/>
                        <XAxis dataKey="name" stroke={dark ? '#8899A6' : 'grey'} />
                        <YAxis stroke={dark ? '#8899A6' : 'grey'}/>
                        <Tooltip contentStyle={{ color: dark ? 'white' : 'black', backgroundColor: dark ? '#1c2938' : '#f0f0f0', borderColor: 'transparent' }} />
                        <Legend wrapperStyle={{ color: dark ? '#8899A6' : 'grey' }} />
                        <Line type='monotone' dataKey="friends" stroke={!dark ? '#ff5252' : '#537fa9' } strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>}
                {stat === 'usersByAge' &&
                <ResponsiveContainer width='60%' height={250}>
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#8899A6' : 'grey'}/>
                        <XAxis dataKey="name" stroke={dark ? '#8899A6' : 'grey'} />
                        <YAxis stroke={dark ? '#8899A6' : 'grey'}/>
                        <Tooltip contentStyle={{ color: dark ? 'white' : 'black', backgroundColor: dark ? '#1c2938' : '#f0f0f0', borderColor: 'transparent' }} />
                        <Legend wrapperStyle={{ color: dark ? '#8899A6' : 'grey' }} />
                        <Line type='monotone' dataKey="users" stroke={!dark ? '#ff5252' : '#537fa9' } strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>}
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
            },
            subtitle: {
                color: dark ? 'white' : 'black',
                opacity: 0.9,
                fontSize: 22,
                fontFamily: 'Heebo',
                fontWeight: 'bold',
                margin: 10
            }
        }
        return styles
    }
}

const optionsFilter = [
  { key: 1, text: 'Posts', value: 'posts' },
  { key: 2, text: 'Users', value: 'users' },
]

const CustomTooltip = ({ active, payload, label }) => {
    if(active) {
        return(
            <div style={{ boxSizing: 'border-box', width: 'fit-content', padding: 20 }}>
                <PostShowcase post={payload[0].payload.post} darkTheme={payload[0].payload.dark} />
            </div>
        )
    }
    return null;
}
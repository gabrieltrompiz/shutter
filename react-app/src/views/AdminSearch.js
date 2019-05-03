import React from 'react';
import { Segment, Divider, Form, Icon, Input } from 'semantic-ui-react';
import UserShowcase from '../components/UserShowcase.js';
import PostShowcase from '../components/PostShowcase.js';
import Comment from '../components/Comment.js';

export default class AdminSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filter: 'users', search: '', results: [] }
    };

    handleForm = (event, {name, value}) => {
        this.setState({ filter: value, results: [] })
    };

    handleInput = async (event, {name, value}) => {
        this.setState({ search: value });

        if(value.length >= 1) {
            await fetch('http://localhost:8080/adminSearch?search=' + value + '&filter=' + this.state.filter, {credentials: 'include'})
            .then(response => response.json())
            .then(response => {
                if(response.status === 200) {
                    this.setState({ results: response.data })
                }
            });
        } else {
            this.setState({ results: [] })
        }
    };

    deleteComment = async (id) => {
        await fetch('http://localhost:8080/bans?method=comment&id=' + id, { credentials: 'include', method: 'POST' })
        .then(response => response.json())
        .then(response => {
            if (response.status === 200) {
                console.log('borrar el comment de aqui')
            } else console.log('cry');
        });
    };

    deletePost = async (id) => {
        await fetch('http://localhost:8080/bans?method=post&id=' + id, { credentials: 'include', method: 'POST' })
        .then(response => response.json())
        .then(response => {
            if (response.status === 200) {
                console.log('borrar el post de aqui');
            } else console.log('cry');
        });
        this.handleInput('xd', { name: 'xd', value: this.state.search })
    }

    render() {
        const styles = this.getStyles(this.props.darkTheme);
        const dark = this.props.darkTheme;
        return (
            <Segment raised style={{ width: '75%', height: '94vh', left: '20.5%', marginTop: '2.5vh', position: 'fixed', backgroundColor: dark ? '#15202B' : 'white' }}>
                <p style={styles.title}>Search</p>
                <Divider fitted style={{ marginTop: 2 }} />
                <div style={styles.controller}>
                    <Icon name='filter' style={{ color: dark ? 'white' : 'black' }}/>
                    <span>Filter: </span>
                    <Form.Select options={optionsFilter} placeholder='Filter' name='filter' onChange={this.handleForm} value={this.state.filter} compact
                    style={{ color: dark ? 'white' : 'black', backgroundColor: dark ? '#1c2938' : '#f0f0f0', border: dark ? '0.5px solid transparent' : 'none', outline: 0, margin: 20,
                    fontWeight: 'bold', fontFamily: 'Heebo', fontSize: 16, width: 150 }} />
                    <Input placeholder='Search' style={{ width: '60%', height: 40, fontSize: 18, backgroundColor: dark ? '#1c2938' : 'white', borderRadius: 5,
                    color: dark ? 'white' : 'black' }} onChange={this.handleInput} autoComplete='off' maxLength={50} value={this.state.search}/>
                </div>
                <Divider fitted />

                <div>
                    {this.state.filter === 'users' &&
                    this.state.results.map((user, key) => {
                        return <UserShowcase user={user} key={key} darkTheme={this.props.darkTheme} />
                    })}

                    {this.state.filter === 'posts' &&
                    this.state.results.map((post, key) => {
                        return <PostShowcase post={post} key={key} delete={this.deletePost}
                             deletable={true} darkTheme={this.props.darkTheme} />
                    })}

                    {this.state.filter === 'comments' &&
                    this.state.results.map((comment, key) => {
                        return <Comment comment={comment} ownUser={comment.user} key={key} admin={true}
                            delete={this.deleteComment} darkTheme={this.props.darkTheme} search />
                    })}
                </div>


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
    { key: 1, text: 'Users', value: 'users'},
    { key: 2, text: 'Posts', value: 'posts' },
    { key: 3, text: 'Comments', value: 'comments' },
]

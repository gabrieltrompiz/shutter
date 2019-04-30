import React from 'react';
import { Segment, Divider, Form, Icon, Input } from 'semantic-ui-react';
import UserCard from '../components/UserCard.js';
import Post from '../components/Post.js';
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

        await fetch('http://localhost:8080/search?adminSearch=' + name + '&filter=' + this.state.filter)
            .then(response => response.json())
            .then(response => {
                if(response.status === 200) {
                    this.setState({ results: response.data })
                }
            });
    };

    showResults = () => {
        switch(this.state.filter) {
            case 'users':
                this.state.results.map((user, key) => {
                    return <UserCard user={user} key={key} />
                });
                break;

            case 'posts':
                this.state.results.map((post, key) => {
                    return <Post post={post} key={key} />
                });
                break;

            case 'comments':
                this.state.results.map((comment, key) => {
                    return <Comment comment={comment} key={key} />
                });
                break;

            default:
                return null;
        }
    };

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
                    <Input placeholder='Search' style={{ width: '43%', height: 40, fontSize: 18, backgroundColor: dark ? '#15202B' : 'white', borderRadius: 5,
                        color: dark ? 'white' : 'black' }} onChange={this.handleInput} autoComplete='off' maxLength={50} value={this.state.search}/>
                    <button style={styles.button}>
                        <Icon name='refresh' />
                        Refresh
                    </button>
                </div>
                <Divider fitted />

                <div>
                    {this.showResults()}
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

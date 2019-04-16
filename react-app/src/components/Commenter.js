import React from 'react';
import { Image, TextArea, Icon } from 'semantic-ui-react';

export default class Comment extends React.Component {
	constructor(props) {
        super(props);
        this.state = { commentText: '', files: [] }
    }

    handleSend = async () => {
        if(this.state.commentText.trim() !== '') {
            let body = {
                commentText: this.state.commentText,
                commentUrl: '',
                postId: this.props.postId
            };

            console.log(this.props.postId);

            await fetch('http://localhost:8080/comments', {method: 'POST', body: JSON.stringify(body), credentials: 'include' })
                .then(response => response.json())
                .then(response => {
                    if(response.status === 200) {
                        this.setState({ commentText: '', files: [] });
                        this.props.comment(response.data);
                    } else {
                        console.log('cry');
                    }
                });
        }
    }

    handleUploadComment = async () => {
        console.log(this.state.commentText);
    }

    handleInput = (event, {name, value}) => {
        this.setState({ commentText: value })
    }

    resetCommenter = () => {

    }

    render() {
        const dark = this.props.darkTheme;
        return(
            <div style={{ display: 'flex', width: 'inherit', height: 'auto' }}>
                <Image
                    src={'http://localhost:8080/files?type=avatar&file=' + this.props.user.username + '.png'}
                    style={{ width: 35, height: 35, borderRadius: '100%', marginLeft: '0.8%' }}
                />
                <TextArea style={{ resize: 'none', width: '80%', marginLeft: '1%', marginRight: '1%', height: '100%', 
                border: 'none', borderRadius: '15px', paddingLeft: '10px', paddingRight: '10px', paddingTop: '5px',
                 backgroundColor: 'transparent', outline: 0, transition: '0.4s' }} onChange={this.handleInput}/>
                <button style={buttonStyle} onClick={() => this.handleUploadComment()}><Icon name='photo' style={{ color: 'white' }}/></button>
                <button style={buttonStyle} onClick={() => this.handleSend()}><Icon name='send' style={{ color: 'white' }}/></button>
            </div>
        )
    }
}

//PASAR ESTO A CLASE XDDDDDDDDDDDDDDDDDDDDDDDDDd
let buttonStyle = {
    border: 'none',
    height: '4vh',
    width: '3vw',
    marginLeft: '1%',
    backgroundColor: 'transparent',
    outline: 0,
    cursor: 'pointer',
    padding: 0
};
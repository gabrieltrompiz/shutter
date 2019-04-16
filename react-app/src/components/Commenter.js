import React from 'react';
import { Image, TextArea, Icon } from 'semantic-ui-react';

export default class Comment extends React.Component {
	constructor(props) {
        super(props);
        this.state = { commentText: '' }
    }

    handleComment = async () => {

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
                 backgroundColor: 'transparent', outline: 0, transition: '0.4s' }}/>
                <button style={buttonStyle}>{/* Send */} B1</button>
                <button style={buttonStyle}>{/* Attach file */} B2</button>
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
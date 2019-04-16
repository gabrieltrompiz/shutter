import React from 'react';
import { Image } from 'semantic-ui-react';

export default class Comment extends React.Component {
	constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={{ height: 'auto' }}>
                <div style={{ display: 'flex' }}>
                    <Image
                        src={'http://localhost:8080/files?type=avatar&file=' + this.props.comment.user.username + '.png'}
                        style={{ width: 35, height: 35, borderRadius: '100%' }}
                    />
                    <div>
                        <b>{this.props.comment.user.name}</b>
                        <b>{this.props.comment.user.lastName}</b>
                        <b>{this.props.comment.user.username}</b>
                        {/* Nombre y Apellido, \n Username, \n Date */}
                    </div>
                </div>

                <div>
                    <label style={{ marginLeft: '8%' }}>{this.props.comment.commentText}</label>
                </div>
            </div>
        )
    }
}
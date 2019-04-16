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
                        src={require('../assets/pandagram.png')}
                        style={{ width: 35, height: 35, borderRadius: '100%' }}
                    />
                    <div>
                        
                    </div>
                </div>

                <div>
                    <label>XDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD</label>
                </div>
            </div>
        )
    }
}
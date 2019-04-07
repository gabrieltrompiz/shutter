import React from 'react'
import { Image } from 'semantic-ui-react';

export default class PosterFile extends React.Component {
    render() {
        return(
            <div>
                <Image 
                    src={this.props.src}
                    style={this.props.style}
                />
            </div>
        );
    }
}
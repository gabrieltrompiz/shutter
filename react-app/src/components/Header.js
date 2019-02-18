import React from 'react'
import { Menu, Container } from 'semantic-ui-react'

export default class Header extends React.Component {
    render() {
        return(
            
            <Menu pointing secondary inverted size="big" widths="3" style={{ backgroundColor: '#FF5252' }}>
                <Menu.Item name="home" active as="a"/>
            </Menu>
            
        );
    }
}


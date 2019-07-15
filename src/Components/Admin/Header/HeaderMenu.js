import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {admin, repositories, followers, followings} from '../../../Routing/Routes'

export default class HeaderMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            as={Link}
            to={admin}
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to={repositories}
            name='repositories'
            active={activeItem === 'repositories'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to={followers}
            name='followers'
            active={activeItem === 'followers'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to={followings}
            name='following'
            active={activeItem === 'following'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
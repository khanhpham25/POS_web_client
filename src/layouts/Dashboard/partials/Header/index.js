import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Layout, Button, Menu, Icon, Dropdown } from 'antd';

const { Header } = Layout;

class AppHeader extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item key='0'>
          <a href='#'><Icon type='profile' />&nbsp;&nbsp;Profile</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key='3' >
          <div onClick={this.signOut.bind(this)}>
            <Icon type='logout' />&nbsp;&nbsp;
            Sign Out
          </div>
        </Menu.Item>
      </Menu>
    );

    const currentUser = JSON.parse(localStorage.user);

    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className='header-menu'>
          <Menu
            theme='light'
            mode='horizontal'
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key='1'>
              <NavLink to='/sale' className='nav-text'>
                <Icon type='shopping-cart' />
                Sale
              </NavLink>
            </Menu.Item>
            <Menu.Item key='2'>
              <Dropdown overlay={menu} trigger={['click']}>
                <a className='ant-dropdown-link' href='#'>
                  {currentUser.name.charAt(0).toUpperCase() + currentUser.name.slice(1)} <Icon type='down' />
                </a>
              </Dropdown>
            </Menu.Item>
          </Menu>
        </div>
      </Header>
    );
  }

  signOut(event) {
    event.preventDefault();
    localStorage.clear();
    this.props.history.push('/login');
  }
}

export default withRouter(AppHeader);

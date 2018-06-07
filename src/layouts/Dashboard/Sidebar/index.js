import React, { Component, Fragment } from 'react';

import { Link, NavLink, withRouter } from 'react-router-dom';
// creates a beautiful scrollbar
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Sidebar extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  componentDidUpdate() {
    //this.refs.mainPanel.scrollTop = 0;
  }
  render() {
    //co the chua chay bang cach vut onclick cho link set menu item selected

    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        breakpoint='xl'
        collapsedWidth={80}
      >

        <NavLink to='/' className='nav-text'>
          <div className='logo' >
            <div className='mini-logo' ><b>P</b><b>O</b><b>S</b></div>
            <div className='full-logo' ><b>Point Of Sale</b></div>
          </div>
        </NavLink>
        <Menu theme='dark' mode='inline'
          selectedKeys={[this.props.location.pathname]}
        >
          <Menu.Item key='/'>
            <NavLink to='/' className='nav-text'>
              <Icon type='bars' />&nbsp;&nbsp;&nbsp;
              <span>Overall</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key='/products'>
            <NavLink to='/products' className='nav-text'>
              <Icon type='tags' />&nbsp;&nbsp;&nbsp;
              <span>Products</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key='/customers'>
            <NavLink to='/customers' className='nav-text'>
              <Icon type='user' />&nbsp;&nbsp;&nbsp;
              <span>Customers</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key='/providers'>
            <NavLink to='/providers' className='nav-text'>
              <Icon type='user' />&nbsp;&nbsp;&nbsp;
              <span>Providers</span>
            </NavLink>
          </Menu.Item>
          <SubMenu
            key='sub1'
            title={<span><Icon type='user' /><span>User</span></span>}
          >
            <Menu.Item key='3'>Tom</Menu.Item>
            <Menu.Item key='4'>Bill</Menu.Item>
            <Menu.Item key='5'>Alex</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(Sidebar);

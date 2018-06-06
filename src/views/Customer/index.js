import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import CustomerList from './partials/CustomerList';

const { Content } = Layout;

class CustomerContainer extends Component {
  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Users</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <CustomerList />
        </div>
      </Content>
    );
  }
}

export default CustomerContainer;

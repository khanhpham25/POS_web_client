import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import ProviderList from './partials/ProviderList';

const { Content } = Layout;

class ProviderContainer extends Component {
  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Providers</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <ProviderList />
        </div>
      </Content>
    );
  }
}

export default ProviderContainer;

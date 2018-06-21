import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import ReceiptList from './partials/ReceiptList';

const { Content } = Layout;

class ReceiptContainer extends Component {
  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Receipts</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <ReceiptList />
        </div>
      </Content>
    );
  }
}

export default ReceiptContainer;

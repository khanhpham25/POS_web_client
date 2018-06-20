import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import InventoryNoteList from './partials/InventoryNoteList';

const { Content } = Layout;

class InventoryNoteContainer extends Component {
  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Inventory Notes</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <InventoryNoteList />
        </div>
      </Content>
    );
  }
}

export default InventoryNoteContainer;

import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import ProductList from './partials/ProductList';

const { Content } = Layout;

class ProductContainer extends Component {
  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Product</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}
          className='product-page-container' >
          <ProductList />
        </div>
      </Content>
    );
  }
}

export default ProductContainer;

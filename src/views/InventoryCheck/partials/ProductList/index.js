import React, { Component } from 'react';
import { Row, Col, List } from 'antd';

import ProductItem from './ProducItem';

class ProductList extends Component {
  render() {
    const { data, onQuantityChange, onRemoveItemFromList } = this.props;
    let source = [...data];

    source = source.filter(s => !s._destroy);

    return (
      <div>
        <div className='inventory-list-header' >
          <Row type='flex' gutter={8} className='inventory-row'
            style={{ width: '100%' }}>
            <Col lg={1} className='inventory-col' >
              <strong>STT</strong>
            </Col>
            <Col lg={1} className='inventory-col' >
              &nbsp;
            </Col>
            <Col lg={3} className='inventory-col' >
              <strong>Code</strong>
            </Col>
            <Col lg={9} className='inventory-col' >
              <strong>Product Name</strong>
            </Col>
            <Col lg={2} className='inventory-col' >
              <strong>In Stock</strong>
            </Col>
            <Col lg={3} className='inventory-col' >
              <strong>Real Quantity</strong>
            </Col>
            <Col lg={2} className='inventory-col' >
              <strong>Amount Deviation</strong>
            </Col>
            <Col lg={3} className='inventory-col' >
              <strong>Price Deviation</strong>
            </Col>
          </Row>
        </div>
        <List
          size='large'
          dataSource={source.reverse()}
          renderItem={item => (<List.Item><ProductItem data={item} onQuantityChange={onQuantityChange} onRemoveItemFromList={onRemoveItemFromList} /></List.Item>)}
        />
      </div>
    );
  }
}

export default ProductList;

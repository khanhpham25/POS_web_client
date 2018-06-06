import React, { Component } from 'react';
import { Row, Col, InputNumber, Icon } from 'antd';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ProductItem extends Component {

  onNumberInputChange = (value) => {
    const { onQuantityChange, data } = this.props;

    onQuantityChange(value, data.id);
  }

  onRemoveItem = () => {
    const { onRemoveItemFromList, data } = this.props;

    onRemoveItemFromList(data.id);
  }

  render() {
    const { data } = this.props;

    return (
      <Row type='flex' gutter={8} className='product-item'
        style={{ width: '100%' }}>
        <Col lg={1} >
          {data.index + 1}
        </Col>
        <Col lg={1} >
          <Icon type='close' className='delete-product-item' onClick={this.onRemoveItem} />
        </Col>
        <Col lg={3} >
          {!data.code || data.code == 'null' ? `TBDC${10000 + data.id}` : data.code}
        </Col>
        <Col lg={5} >
          {data.name}
        </Col>
        <Col lg={7}></Col>
        <Col lg={2} >
          <InputNumber className='product-quantity-input' value={data.quantity}
            onChange={this.onNumberInputChange} />
        </Col>
        <Col lg={3} >
          <div className='product-item-unit-price' >
            {data.sale_price}
          </div>
        </Col>
        <Col lg={2} >
          <div className='product-item-total' >
            {data.quantity * data.sale_price}
          </div>
        </Col>
      </Row>
    );
  }
}

export default ProductItem;

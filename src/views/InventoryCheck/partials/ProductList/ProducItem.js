import React, { Component } from 'react';
import { Row, Col, InputNumber, Icon, notification } from 'antd';

class ProductItem extends Component {

  onNumberInputChange = (value) => {
    const { onQuantityChange, data } = this.props;

    if (value < 0) {
    } else if (!((typeof value === "number") && Math.floor(value) === value)) {
    } else {
      onQuantityChange(value, data.id);
    }
  }

  onRemoveItem = () => {
    const { onRemoveItemFromList, data } = this.props;

    onRemoveItemFromList(data.id);
  }

  render() {
    const { data } = this.props;
    const deviation = parseInt(data.real_amount) - parseInt(data.stock_count);

    return (
      <Row type='flex' gutter={8} className='check-item'
        style={{ width: '100%' }}>
        <Col lg={1} >
          {data.index + 1}
        </Col>
        <Col lg={1} >
          <Icon type='close' className='delete-check-item' onClick={this.onRemoveItem} />
        </Col>
        <Col lg={3} >
          {!data.code || data.code == 'null' ? `TBDC${10000 + data.id}` : data.code}
        </Col>
        <Col lg={9} >
          {data.name}
        </Col>
        <Col lg={2} >
          <div className='check-item-unit-price' >
            {data.stock_count}
          </div>
        </Col>
        <Col lg={3} >
          <InputNumber className='check-quantity-input' value={parseInt(data.real_amount)}
            onChange={this.onNumberInputChange} min={1} />
        </Col>
        <Col lg={2} >
          <div className='check-item-unit-price' >
            {deviation}
          </div>
        </Col>
        <Col lg={3} >
          <div className='check-item-total' >
            {deviation * data.initial_cost}
          </div>
        </Col>
      </Row>
    );
  }
}

export default ProductItem;

import React, { Component } from 'react';
import { Row, Col, Input, Icon } from 'antd';

import productImg from 'assets/img/24.png';

class ProductOption extends Component {
  render() {
    const { data } = this.props;

    return (
      <Row type='flex' gutter={8}>
        <Col lg={4} >
          <img src={productImg} width={70} height={70} />
        </Col>
        <Col lg={20} >
          <Row type='flex' >
            <Col lg={24} >
              <strong>{data.name}</strong>
            </Col>
            <Col lg={8} >
              {!data.code || data.code == 'null' ? `TBDC${10000 + data.id}` : data.code}
            </Col>
            <Col lg={16}>
              Price: {data.sale_price}
            </Col>
            <Col lg={24} >
              In Stock: {data.stock_count}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default ProductOption;

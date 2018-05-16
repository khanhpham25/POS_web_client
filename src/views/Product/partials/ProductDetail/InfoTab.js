import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Form, Divider, Button, Icon } from 'antd';
import ProductModal from '../ProductModal';

import productImg from 'assets/img/24.png';

const FormItem = Form.Item;

class InfoTab extends Component {
  constructor() {
    super();

    this.state = {
      isProductModalVisible: false
    }
  }

  render() {
    const { product, categories } = this.props;
    const { isProductModalVisible } = this.state;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };

    return (
      <div>
        <h2>{product.name}</h2>
        <Row type='flex' gutter={24}>
          <Col lg={8}>
            <img src={productImg} />
          </Col>
          <Col lg={8}>
            <Form layout='vertical'>
              <FormItem label='Code:' {...formItemLayout} >
                <strong>{`TBDC${10000 + product.id}`}</strong>
              </FormItem>
              <FormItem label='Category:' {...formItemLayout}>
                {product.category.name}
              </FormItem>

              <FormItem label='Sale Price:' {...formItemLayout}>
                {product.sale_price}
              </FormItem>

              <FormItem label='Initial Cost:' {...formItemLayout}>
                {product.initial_cost}
              </FormItem>
            </Form>
          </Col>
          <Col lg={8}>
            <Form layout='vertical'>
              <FormItem label='Status:' {...formItemLayout} >
                {product.is_selling ? 'Selling' : 'Stop selling'}
              </FormItem>

              <FormItem label='Description:' {...formItemLayout} >

              </FormItem>
            </Form>
          </Col>
        </Row>
        <Row type='flex' justify='end' gutter={16}>
          <Col lg={2}>
            <Button type='primary' onClick={this.showProductModal.bind(this)}>
              <Icon type='edit' />
              Update Info
            </Button>
          </Col>
          <Col lg={2}>
            <Button type='danger'>
              <Icon type='close' />
              Stop Selling
            </Button>
          </Col>
          <Col lg={2}>
            <Button type='danger'>
              <Icon type='delete' />
              Delete
            </Button>
          </Col>
        </Row>

        <ProductModal title='Update Product Info'
          product={product} categories={categories}
          visible={isProductModalVisible}
          onClose={this.hideProductModal.bind(this)} />
      </div>
    );
  }

  showProductModal(event) {
    //show product thi gui request lay du lieu product de edit ve
    this.setState({
      isProductModalVisible: true,
    });
  }

  hideProductModal(event) {
    this.setState({
      isProductModalVisible: false,
    });
  }
}

export default InfoTab;

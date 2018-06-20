import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Form, Divider, Button, Icon } from 'antd';
import ProductModal from '../ProductModal';
import { convertToHTML, convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import swal from 'sweetalert';

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

    let editorState;

    if (product.description) {
      editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(product.description)));
    } else {
      editorState = EditorState.createEmpty();
    }

    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };

    let updateStatusBtn = (<Button className='allow-btn' onClick={this.updatetStatus.bind(this, true)} >
      <Icon type='play-circle-o' />
      Allow Selling
      </Button>);

    if (product.is_selling == 1) {
      updateStatusBtn = (<Button type='danger' onClick={this.updatetStatus.bind(this, false)} >
        <Icon type='minus-circle-o' />
        Stop Selling
      </Button>);
    }

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
                <strong>{product.code}</strong>
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
                {product.is_selling == 1 ? 'Selling' : 'Stop selling'}
              </FormItem>

              <FormItem label='Description:' {...formItemLayout} >
                <div dangerouslySetInnerHTML={{ __html: content }} />
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
            {updateStatusBtn}
          </Col>
          <Col lg={2}>
            <Button type='danger' onClick={this.removeProduct.bind(this)} >
              <Icon type='delete' />
              Delete
            </Button>
          </Col>
        </Row>
        <ProductModal title='Update Product Info' action='update'
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

  updatetStatus(status, event) {
    const { updateProductStatus, product } = this.props;

    swal({
      title: `Confirmation`,
      text: `You want to ${status ? 'continue' : 'stop'}  selling this product?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willConfirm => {
      if (willConfirm) updateProductStatus(product.id, status);
    });
  }

  removeProduct() {
    swal({
      title: `Delete Product`,
      text: `Do you want to delete this product?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willConfirm => {
      if (willConfirm) this.props.deleteProduct(this.props.product.id);
    });
  }
}

export default InfoTab;

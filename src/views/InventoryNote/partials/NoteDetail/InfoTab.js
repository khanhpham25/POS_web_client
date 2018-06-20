import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Form, Divider, Button, Icon } from 'antd';
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
    const { note } = this.props;
    const { isProductModalVisible } = this.state;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };

    return (
      <div>
        <Row type='flex' gutter={24}>
          <Col lg={8}>
            <Form layout='vertical'>
              <FormItem label='Code:'  >
                <strong>{note.code}</strong>
              </FormItem>
              <FormItem label='Creator:' >
                {note.creator.name}
              </FormItem>


            </Form>
          </Col>
          <Col lg={8}>
            <Form layout='vertical'>
              <FormItem label='Inventory Date:' >
                {note.inventory_date}
              </FormItem>
              <FormItem label='Balance Date:' >
                {note.balance_date}
              </FormItem>
            </Form>
          </Col>
          <Col lg={8} >
            <FormItem label='Status:'  >
              {note.status == 1 ? 'Inventory Balanced' : 'Temporary Note'}
            </FormItem>
            <FormItem label='Description:'  >
              {note.description}
            </FormItem>
          </Col>
        </Row>
        <Row type='flex' justify='end' gutter={16}>

        </Row>
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

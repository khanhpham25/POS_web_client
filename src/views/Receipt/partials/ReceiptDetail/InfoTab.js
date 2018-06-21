import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Form, Divider, Button, Icon } from 'antd';
import { convertToHTML, convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import swal from 'sweetalert';
import moment from 'moment';

const FormItem = Form.Item;

class InfoTab extends Component {
  constructor() {
    super();

    this.state = {
      isProductModalVisible: false
    }
  }

  render() {
    const { receipt } = this.props;
    const { isProductModalVisible } = this.state;

    // const formItemLayout = {
    //   labelCol: { span: 4 },
    //   wrapperCol: { span: 8 },
    // };

    const formItemLayout = {
      labelCol: {
        sm: { span: 24 },
        xxl: { span: 5 }
      },
      wrapperCol: {
        sm: { span: 24 },
        xxl: { span: 19 }
      },
    };

    let receiptDetailsItem = null;

    receiptDetailsItem = receipt.receipt_details.map((receipt, index) => {
      return (
        <Row type='flex' gutter={8} className='inventory-show-items' key={index}
          style={{ width: '100%' }}>
          <Col lg={3} className='inventory-show-item' >
            <span>{receipt.product.code}</span>
          </Col>
          <Col lg={9} className='inventory-show-item' >
            <span>{receipt.product.name}</span>
          </Col>
          <Col lg={2} className='inventory-show-item' >
            <span>{receipt.quantity}</span>
          </Col>
          <Col lg={3} className='inventory-show-item' >
            <span>{receipt.unit_price}</span>
          </Col>
          <Col lg={3} className='inventory-show-item' >
            <span>{receipt.product.sale_price}</span>
          </Col>
          <Col lg={4} className='inventory-show-item' >
            <span>{receipt.unit_price * receipt.quantity}</span>
          </Col>
        </Row>
      )
    });

    return (
      <div>
        <Row type='flex' gutter={8}>
          <Col lg={8}>
            <Form layout='vertical'>
              <FormItem {...formItemLayout} label='Code:'  >
                <strong>{receipt.code}</strong>
              </FormItem>
              <FormItem {...formItemLayout} label='Customer:' >
                {receipt.customer ? receipt.customer.name : 'Free Individual'}
              </FormItem>
            </Form>
          </Col>
          <Col lg={8}>
            <Form layout='vertical'>
              <FormItem {...formItemLayout} label='Datetime:' >
                {receipt.date_time ? moment(receipt.date_time).format('MM-DD-YYYY HH:mm') : ''}
              </FormItem>
              <FormItem {...formItemLayout} label='Seller:' >
                {receipt.creator.name}
              </FormItem>
            </Form>
          </Col>
          <Col lg={8} >
            <FormItem {...formItemLayout} label='Status:'  >
              Completed
            </FormItem>
            <FormItem {...formItemLayout} label='Note:'  >
              {receipt.note}
            </FormItem>
          </Col>
        </Row>
        <Row type='flex' gutter={8} className='inventory-show-row'
          style={{ width: '100%' }}>

          <Col lg={3} className='inventory-show-col' >
            <strong>Product Code</strong>
          </Col>
          <Col lg={9} className='inventory-show-col' >
            <strong>Product Name</strong>
          </Col>
          <Col lg={2} className='inventory-show-col' >
            <strong>Quantity</strong>
          </Col>
          <Col lg={3} className='inventory-show-col' >
            <strong>Unit Price</strong>
          </Col>
          <Col lg={3} className='inventory-show-col' >
            <strong>Sale Price</strong>
          </Col>
          <Col lg={4} className='inventory-show-col' >
            <strong>Total</strong>
          </Col>
        </Row>
        {receiptDetailsItem}
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

  updateInventNoteInfo() {
    const { setSelectedTempInventNote, note } = this.props;

    setSelectedTempInventNote(note);
  }
}

export default InfoTab;

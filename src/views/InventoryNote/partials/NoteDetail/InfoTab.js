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
    const { note } = this.props;
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

    let inventoryNoteDetailsItem = null;
    let noteUpdateBtn = null;

    inventoryNoteDetailsItem = note.inventory_note_details.map((note_d, index) => {
      return (
        <Row type='flex' gutter={8} className='inventory-show-items' key={index}
          style={{ width: '100%' }}>
          <Col lg={1} className='inventory-show-item' >
            <span>{index + 1}</span>
          </Col>
          <Col lg={3} className='inventory-show-item' >
            <span>{note_d.product.code}</span>
          </Col>
          <Col lg={9} className='inventory-show-item' >
            <span>{note_d.product.name}</span>
          </Col>
          <Col lg={2} className='inventory-show-item' >
            <span>{note_d.in_stock}</span>
          </Col>
          <Col lg={2} className='inventory-show-item' >
            <span>{note_d.real_quantity}</span>
          </Col>
          <Col lg={3} className='inventory-show-item' >
            <span>{note_d.in_stock}</span>
          </Col>
          <Col lg={4} className='inventory-show-item' >
            <span>{note_d.price_deviation}</span>
          </Col>
        </Row>
      )
    });

    if (note.status == "0") {
      noteUpdateBtn = (<Row type='flex' justify='end' gutter={16}>
        <Col lg={2} md={2} pull={2} >
          <Button type='primary' onClick={this.updateInventNoteInfo.bind(this)}>
            <Icon type='edit' />
            Update Note
            </Button>
        </Col>
      </Row>);
    }

    return (
      <div>
        <Row type='flex' gutter={8}>
          <Col lg={8}>
            <Form layout='vertical'>
              <FormItem {...formItemLayout} label='Code:'  >
                <strong>{note.code}</strong>
              </FormItem>
              <FormItem {...formItemLayout} label='Creator:' >
                {note.creator.name}
              </FormItem>
            </Form>
          </Col>
          <Col lg={8}>
            <Form layout='vertical'>
              <FormItem {...formItemLayout} label='Inventory Date:' >
                {note.inventory_date ? moment(note.inventory_date).format('MM-DD-YYYY HH:mm') : ''}
              </FormItem>
              <FormItem {...formItemLayout} label='Balance Date:' >
                {note.balance_date ? moment(note.balance_date).format('MM-DD-YYYY HH:mm') : ''}
              </FormItem>
            </Form>
          </Col>
          <Col lg={8} >
            <FormItem {...formItemLayout} label='Status:'  >
              {note.status == 1 ? 'Inventory Balanced' : 'Temporary Note'}
            </FormItem>
            <FormItem {...formItemLayout} label='Description:'  >
              {note.description}
            </FormItem>
          </Col>
        </Row>
        <Row type='flex' gutter={8} className='inventory-show-row'
          style={{ width: '100%' }}>
          <Col lg={1} className='inventory-show-col' >
            <strong>STT</strong>
          </Col>
          <Col lg={3} className='inventory-show-col' >
            <strong>Code</strong>
          </Col>
          <Col lg={9} className='inventory-show-col' >
            <strong>Product Name</strong>
          </Col>
          <Col lg={2} className='inventory-show-col' >
            <strong>In Stock</strong>
          </Col>
          <Col lg={2} className='inventory-show-col' >
            <strong>Real Quantity</strong>
          </Col>
          <Col lg={3} className='inventory-show-col' >
            <strong>Amount Deviation</strong>
          </Col>
          <Col lg={4} className='inventory-show-col' >
            <strong>Price Deviation</strong>
          </Col>
        </Row>
        {inventoryNoteDetailsItem}
        {noteUpdateBtn}
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

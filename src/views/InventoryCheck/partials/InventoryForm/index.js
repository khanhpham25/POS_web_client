import _ from 'lodash';
import React, { Component } from 'react';
import {
  Form, Input, Tooltip, Icon, Row, Col, Button, Select, InputNumber,
  DatePicker, TimePicker, AutoComplete, Tabs, Popover, notification
} from 'antd';
import moment from 'moment';
import swal from 'sweetalert';

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class InventoryForm extends Component {

  render() {
    const { data, payment_methods, onPaymentTypeChange } = this.props;

    const formItemLayout = {
      labelCol: {
        sm: { span: 3 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };

    const receiptInfoLayout = {
      labelCol: {
        sm: 12
      },
      wrapperCol: {
        sm: 12
      },
    };

    const currentUser = JSON.parse(localStorage.user);

    let totalProduct = 0;
    let totalInStock = 0;

    if (data.checkingProducts.length > 0) {
      data.checkingProducts.map(product => {
        totalProduct += product.real_amount;
        totalInStock += product.stock_count;
      });
    }

    return (
      <div className='receipt-main-content' >
        <div className='col-right-content1' >
          <div className='col-right-inside' >
            <Form layout='inline' >
              <FormItem label='Seller' >
                <span>{currentUser.name.charAt(0).toUpperCase() + currentUser.name.slice(1)}</span>
              </FormItem>
              <div className='receipt-date' >
                <FormItem label='DatePicker' >
                  <DatePicker showTime format='YYYY-MM-DD HH:mm:ss'
                    value={moment(data.inventoryForm.date_time)} disabled={true}
                    onChange={this.onDateChange.bind(this)} />
                </FormItem>
              </div>
            </Form >


            <Row type='flex' className='receipt-info-row' >
              <Col lg={12} >
                <span>Total Real Amount</span>
              </Col>
              <Col lg={7} >
                <div className='receipt-info-total-product' >{totalProduct}</div>
              </Col>
            </Row>

            <Row type='flex' className='receipt-info-row' >
              <Col lg={12} >
                <span>Total In Stock</span>
              </Col>
              <Col lg={7} >
                <div className='receipt-info-total-product' >{totalInStock}</div>
              </Col>
            </Row>

          </div>
          <div className='col-right-inside' >
            <div className='note-wrap'>
              <Form className='receipt-note' >
                <FormItem label='Note' >
                  <TextArea name='note' placeholder='Note' autosize={{ minRows: 2, maxRows: 6 }}
                    onChange={this.onInputChange.bind(this)} value={data.inventoryForm.note} />
                </FormItem>
              </Form>
            </div>
          </div>

        </div>

        <Row type='flex' className='complete-btn-container' gutter={16} >
          <Col lg={12} >
            <a className='save-btn' onClick={this.saveTemp.bind(this)} >
              <Icon type='save' id='checkout-btn' />&nbsp;
              Save Temporarily
            </a>
          </Col>
          <Col lg={12} >
            <a className='complete-btn' onClick={this.completeInventory.bind(this)} >
              <Icon type='shopping-cart' id='complete-btn' />&nbsp;
              Complete
            </a>
          </Col>
        </Row>
      </div >
    );
  }

  saveTemp() {
    const { saveTemporarily, data } = this.props

    if (data.checkingProducts.length > 0) {
      saveTemporarily(data);
    } else {
      const args = {
        message: 'Inventory Check failed',
        description: 'There is no product selected in the list',
        duration: 4,
        placement: 'bottomRight',
        style: {
          background: '#db4e65',
          color: '#fff',
          marginBottom: '125px'
        }
      };
      notification.open(args);
    }
  }

  completeInventory() {
    const { completeInventoryCheck, data } = this.props

    if (data.checkingProducts.length > 0) {
      swal({
        title: `Balancing The Inventory`,
        text: 'This action will change the quantity in stock of each product in the list. \n Do you want to continue?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then(willConfirm => {
        if (willConfirm) completeInventoryCheck(data);
      });
    } else {
      const args = {
        message: 'Inventory Check failed',
        description: 'There is no product selected in the list',
        duration: 4,
        placement: 'bottomRight',
        style: {
          background: '#db4e65',
          color: '#fff',
          marginBottom: '125px'
        }
      };
      notification.open(args);
    }
  }

  onInputChange(event) {
    this.props.onNoteInputChange(event.target.name, event.target.value);
  }

  onDateChange(timeMoment, timeString) {
    this.props.onNoteInputChange('date_time', timeString);
  }
}

export default InventoryForm;

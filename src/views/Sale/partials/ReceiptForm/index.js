import _ from 'lodash';
import React, { Component } from 'react';
import {
  Form, Input, Tooltip, Icon, Row, Col, Button, Select, InputNumber,
  DatePicker, TimePicker, AutoComplete, Tabs, Popover, message
} from 'antd';
import moment from 'moment';
import swal from 'sweetalert';

import PaymentMethodSelector from '../PaymentMethodSelector';

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class ReceiptForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      paymentMethodVisible: false
    }
  }

  onSelect = (value) => {
    const { onSelectCustomer, customers } = this.props;

    onSelectCustomer(value, customers);
  }

  renderOption = (item) => {
    return (
      <Option key={item.id} text={item.name}>
        {item.name}
      </Option>
    );
  }

  onCustomerChange = (value) => {
    this.props.onCustomerInputChange(value);
  }

  searchResult = (query) => {
    let searchQuery = _.words(query);
    let isNameIncluding;
    let foundQuery;
    let dataSource = [...this.props.customers];
    searchQuery = [...new Set(searchQuery)];

    return dataSource.filter(data => {
      isNameIncluding = false;
      foundQuery = 0;

      searchQuery.forEach(value => {
        if (data.name.toLowerCase().includes(value.toLowerCase())) {
          foundQuery++;
        } else {
          return;
        }
      });

      if (foundQuery == searchQuery.length) isNameIncluding = true;

      return isNameIncluding;
    });
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: value ? this.searchResult(value) : [],
    });
  }

  render() {
    const { dataSource } = this.state;
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
    let totalPrice = 0;
    let customer_payment_info = null;
    let customerChange = 0;

    if (data.boughtProducts.length > 0) {
      data.boughtProducts.map(product => {
        totalProduct += product.quantity;
        totalPrice += (product.quantity * product.sale_price);
      });

      customer_payment_info = (
        <Row type='flex' className='receipt-info-row' >
          <Col lg={12} >
            <span>Customer Payment</span><br />
            <small>{data.receipt.payment_type.name}</small>
          </Col>
          <Col lg={12} >
            <Popover
              content={<PaymentMethodSelector data={payment_methods}
                currentPaymentType={data.receipt.payment_type}
                onPaymentTypeChange={onPaymentTypeChange} />}
              title='Payment Type'
              trigger='click'
              visible={this.state.paymentMethodVisible}
              onVisibleChange={this.handleVisibleChange.bind(this)}
            >
              <Icon type='credit-card' className='payment-method' />
            </Popover>
            <Input className='customer-payment-input' value={data.receipt.customer_payment}
              name='customer_payment' type='number' onChange={this.onInputChange.bind(this)} />
          </Col>
        </Row>
      );

      customerChange = data.receipt.customer_payment - totalPrice;
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
                    value={moment(data.receipt.date_time)} disabled={true}
                    onChange={this.onDateChange.bind(this)} />
                </FormItem>
              </div>
            </Form >
            <Form className='form-receipt' >
              <FormItem label='Customer' {...formItemLayout} >
                <AutoComplete
                  className='global-search'
                  size='large'
                  dataSource={dataSource.map(this.renderOption)}
                  style={{ width: 245 }}
                  onSelect={this.onSelect}
                  onSearch={this.handleSearch}
                  placeholder='Find customer'
                  optionLabelProp='text'
                  onChange={this.onCustomerChange}
                >
                  <Input
                    suffix={(
                      <Button className='search-btn' size='large' type='primary'>
                        <Icon type='search' />
                      </Button>
                    )}
                  />
                </AutoComplete>
                <Button type='default' className='receipt-add-customer-btn'>
                  <Icon type='plus' />
                </Button>
              </FormItem>
            </Form>

            <Tabs type='card' className='receipt-info'>
              <TabPane tab='Receipt Info' key='1'>
                <Row type='flex' className='receipt-info-row' >
                  <Col lg={12} >
                    <span>Number of Product</span>
                  </Col>
                  <Col lg={7} >
                    <div className='receipt-info-total-product' >{totalProduct}</div>
                  </Col>
                </Row>
                <Row type='flex' className='receipt-info-row' >
                  <Col lg={12} >
                    <strong>Total</strong>
                  </Col>
                  <Col lg={7} >
                    <div className='receipt-total' >{totalPrice}</div>
                  </Col>
                </Row>
                {customer_payment_info}
                <Row type='flex' className='receipt-info-row' >
                  <Col lg={12} >
                    <span>Customer's Change</span>
                  </Col>
                  <Col lg={7} >
                    <div className='receipt-info-customer-change' >{customerChange}</div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>

          </div>
          <div className='col-right-inside' >
            <div className='note-wrap'>
              <Form className='receipt-note' >
                <FormItem label='Note' >
                  <TextArea name='note' placeholder='Note' autosize={{ minRows: 2, maxRows: 6 }}
                    onChange={this.onInputChange.bind(this)} value={data.receipt.note} />
                </FormItem>
              </Form>
            </div>
          </div>

        </div>


        <Row type='flex' className='checkout-btn-container' >
          <Col lg={24} >
            <a className='checkout-btn' onClick={this.onCheckout.bind(this)} >
              <Icon type='shopping-cart' />&nbsp;
              Pay
            </a>
          </Col>
        </Row>
      </div >
    );
  }

  onCheckout() {
    const { createReceipt, data } = this.props

    let totalPrice = 0;

    if (data.boughtProducts.length > 0) {
      data.boughtProducts.map(product => {
        totalPrice += (product.quantity * product.sale_price);
      });

      if (data.receipt.customer_payment >= totalPrice) {
        createReceipt(data);
      } else {
        swal({
          title: `Saving Receipt`,
          text: `Customer's payment is not enough! Do you want to continue?`,
          icon: 'error',
          buttons: true,
          dangerMode: true,
        }).then(willConfirm => {
          if (willConfirm) createReceipt(data);
        });
      }
    } else {
      message.config({
        top: 100,
        duration: 3
      });
      message.error('No product is selected');
    }
  }

  handleVisibleChange(paymentMethodVisible) {
    this.setState({ paymentMethodVisible });
  }

  onInputChange(event) {
    this.props.onReceiptInputChange(event.target.name, event.target.value);
  }

  onDateChange(timeMoment, timeString) {
    this.props.onReceiptInputChange('date_time', timeString);
  }
}

export default ReceiptForm;

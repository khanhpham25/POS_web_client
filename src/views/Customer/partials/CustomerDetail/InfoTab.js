import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Form, Divider, Button, Icon } from 'antd';
import CustomerModal from '../CustomerModal';

import customerImg from 'assets/img/24.png';

const FormItem = Form.Item;

class InfoTab extends Component {
  constructor() {
    super();

    this.state = {
      isCustomerModalVisible: false
    };
  }

  render() {
    const { customer, customerTypes } = this.props;
    const { isCustomerModalVisible } = this.state;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 }
    };

    return (
      <div>
        <h2>{customer.name}</h2>
        <Row type='flex' gutter={16}>
          <Col lg={8} md={8}>
            <img src={customerImg} />
          </Col>
          <Col lg={8} md={8}>
            <Form layout='vertical'>
              <FormItem label='Code:' {...formItemLayout}>
                <strong>{`TBDC${10000 + customer.id}`}</strong>
              </FormItem>

              <FormItem label='Customer type:' {...formItemLayout}>
                {customer.customer_type.name}
              </FormItem>
            </Form>
          </Col>
        </Row>

        <Row type='flex' justify='end' gutter={16}>
          <Col lg={2} md={2}>
            <Button type='primary' onClick={this.showCustomertModal.bind(this)}>
              <Icon type='edit' />
              Update Info
            </Button>
          </Col>
          <Col lg={2} md={2}>
            <Button type='danger'>
              <Icon type='close' />
              Stop Selling
            </Button>
          </Col>
          <Col lg={2} md={2}>
            <Button type='danger'>
              <Icon type='delete' />
              Delete
            </Button>
          </Col>
        </Row>

        <CustomerModal title='Update customer info'
          customer={customer} customerTypes={customerTypes}
          visible={isCustomerModalVisible}
          onClose={this.hideCustomerModal.bind(this)} />
      </div>
    );
  }

  showCustomertModal(event) {
    this.setState({
      isCustomerModalVisible: true
    });
  }

  hideCustomerModal(event) {
    this.setState({
      isCustomerModalVisible: false
    });
  }
}

export default InfoTab;

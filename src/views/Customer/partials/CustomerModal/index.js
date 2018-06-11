import React, { Component } from 'react';
import { Modal, Tabs, Icon, Button } from 'antd';
import ModalInfoTab from './ModalInfoTab';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateCustomer, createCustomer } from '../../actions';

const TabPane = Tabs.TabPane;

class CustomerModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: props.customer
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.customer.id !== prevState.customer.id) {
      return {
        customer: nextProps.customer
      };
    }
    return prevState;
  }

  render() {
    const { title, visible, customerTypes, action } = this.props;
    const { customer } = this.state;

    return (
      <Modal
        maskClosable={false}
        title={title}
        visible={visible}
        onOk={this.handleOk.bind(this)}
        onCancel={this.handleCancel.bind(this)}
        width={932}
        footer={[
          <Button key='back' onClick={this.handleCancel.bind(this)}>
            <Icon type='close-circle-o' />
            Close
          </Button>,
          <Button key='submit' type='primary' onClick={this.handleOk.bind(this)}>
            <Icon type='save' />
            Update
          </Button>,
        ]}
      >
        <Tabs defaultActiveKey='1' >
          <TabPane tab='Info' key='1'>
            <ModalInfoTab customer={customer} customerTypes={customerTypes}
              onCustomerChange={this.onCustomerChange.bind(this)} action={action}
              onCustomerTypeChange={this.onCustomerTypeChange.bind(this)} />
          </TabPane>
          <TabPane tab='Description' key='2'>
            <p>Coming soon...</p>
          </TabPane>
        </Tabs>
      </Modal>
    );
  }

  handleOk(event) {
    if (this.props.action === 'create') {
      this.props.createCustomer(this.state.customer);
    } else {
      this.props.updateCustomer(this.state.customer);
    }
    this.props.onClose();
  }

  handleCancel(event) {
    this.props.onClose();
  }

  onCustomerChange(name, value) {
    let changedCustomer = Object.assign({}, this.state.customer);

    Object.assign(changedCustomer, { [name]: value });
    this.setState({
      customer: changedCustomer
    });
  }

  onCustomerTypeChange(value) {
    let changedCustomer = Object.assign({}, this.state.customer);

    Object.assign(changedCustomer.customer_type, { id: value });
    this.setState({
      customer: changedCustomer
    });
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCustomer, createCustomer
}, dispatch);

export default connect(null, mapDispatchToProps)(CustomerModal);

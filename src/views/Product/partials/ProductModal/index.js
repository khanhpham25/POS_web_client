import React, { Component } from 'react';
import { Modal, Tabs, Icon, Button } from 'antd';
import ModalInfoTab from './ModalInfoTab';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateProduct, createProduct } from '../../actions';

const TabPane = Tabs.TabPane;

class ProductModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: props.product
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      product: nextProps.product,
    }
  }

  render() {
    const { title, visible, categories, action } = this.props;
    const { product } = this.state;

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
            Cancel
          </Button>,
          <Button key='submit' type='primary' onClick={this.handleOk.bind(this)}>
            <Icon type='save' />
            Save
          </Button>,
        ]}
      >
        <Tabs defaultActiveKey='1' >
          <TabPane tab='Info' key='1'>
            <ModalInfoTab product={product} categories={categories} action={action}
              onProductChange={this.onProductChange.bind(this)}
              onCategoryChange={this.onCategoryChange.bind(this)}
              afterCreateCategory={this.afterCreateCategory.bind(this)}
              onNumberChange={this.onNumberChange.bind(this)}
            />
          </TabPane>
          <TabPane tab='Description' key='2'>

          </TabPane>
        </Tabs>
      </Modal>
    );
  }

  handleOk(event) {
    if (this.props.action == 'create') {
      this.props.createProduct(this.state.product);
    } else {
      this.props.updateProduct(this.state.product);
    }
    this.props.onClose();
  }

  handleCancel(event) {

    this.props.onClose();
  }

  onProductChange(name, value) {
    let changedProduct = Object.assign({}, this.state.product);

    Object.assign(changedProduct, { [name]: value });
    this.setState({
      product: changedProduct
    });
  }

  onCategoryChange(value) {
    let changedProduct = Object.assign({}, this.state.product);

    Object.assign(changedProduct.category, { id: value });
    this.setState({
      product: changedProduct
    });
  }

  onNumberChange(name, value) {
    let changedProduct = Object.assign({}, this.state.product);

    Object.assign(changedProduct, { [name]: value });
    this.setState({
      product: changedProduct
    });
  }

  afterCreateCategory(category) {
    let changedProduct = Object.assign({}, this.state.product);

    Object.assign(changedProduct.category, { id: category.id });
    this.setState({
      product: changedProduct
    });
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createProduct,
  updateProduct
}, dispatch);

export default connect(null, mapDispatchToProps)(ProductModal);

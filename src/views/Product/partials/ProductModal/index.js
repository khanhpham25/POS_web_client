import React, { Component } from 'react';
import { Modal, Tabs, Icon, Button } from 'antd';
import ModalInfoTab from './ModalInfoTab';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateProduct } from '../../actions';

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
    const { title, visible, categories } = this.props;
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
            Return
          </Button>,
          <Button key='submit' type='primary' onClick={this.handleOk.bind(this)}>
            <Icon type='save' />
            Submit
          </Button>,
        ]}
      >
        <Tabs defaultActiveKey='1' >
          <TabPane tab='Info' key='1'>
            <ModalInfoTab product={product} categories={categories}
              onProductChange={this.onProductChange.bind(this)}
              onCategoryChange={this.onCategoryChange.bind(this)} />
          </TabPane>
          <TabPane tab='Description' key='2'>

          </TabPane>
        </Tabs>
      </Modal>
    );
  }

  handleOk(event) {
    this.props.updateProduct(this.state.product);
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
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateProduct
}, dispatch);

export default connect(null, mapDispatchToProps)(ProductModal);

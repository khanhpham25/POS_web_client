import React, { Component } from 'react';
import { Form, Input, Modal, Tabs, Icon, Button } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios';

import { updateCategories } from '../../actions';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class CategoryModal extends Component {
  constructor() {
    super();

    this.state = {
      name: ''
    }
  }

  render() {
    const { visible } = this.props;
    const { name } = this.state;

    return (
      <Modal
        maskClosable={false}
        title='Add category'
        visible={visible}
        onOk={this.handleOk.bind(this)}
        onCancel={this.handleCancel.bind(this)}
        width={420}
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
        <FormItem label='Name' >
          <Input name='name' value={name} onChange={this.onInputChange.bind(this)} />
        </FormItem>
      </Modal>
    );
  }

  handleOk(event) {
    let url = process.env.REACT_APP_HOST + 'categories';
    let formData = new FormData();

    formData.append(`category[name]`, this.state.name);

    axios({
      url, method: 'POST', data: formData,
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      this.props.afterCreateCategory(response.data.data.category);
      this.props.updateCategories(response.data.data.category)
      this.props.onClose();

      this.setState({ name: '' })
    }).catch(error => {
      console.log(error);
    });
  }

  handleCancel(event) {

    this.props.onClose();
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCategories
}, dispatch);

export default connect(null, mapDispatchToProps)(CategoryModal);

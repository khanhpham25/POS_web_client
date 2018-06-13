import React, { Component } from 'react';
import { Modal, Tabs, Icon, Button } from 'antd';
import ModalInfoTab from './ModalInfoTab';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateUser, createUser } from '../../actions';

const TabPane = Tabs.TabPane;

class UserModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user.id !== prevState.user.id) {
      return {
        user: nextProps.user
      };
    }
  }

  render() {
    const { title, visible, action, roles } = this.props;
    const { user } = this.state;

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
            <ModalInfoTab user={user} roles={roles}
              onUserChange={this.onUserChange.bind(this)} action={action} />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }

  handleOk(event) {
    if (this.props.action === 'create') {
      this.props.createUser(this.state.user);
    } else {
      this.props.updateUser(this.state.user);
    }
    this.props.onClose();
  }

  handleCancel(event) {
    this.props.onClose();
  }

  onUserChange(name, value) {
    let changedUser = Object.assign({}, this.state.user);

    Object.assign(changedUser, { [name]: value });
    this.setState({
      user: changedUser
    });
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUser, createUser
}, dispatch);

export default connect(null, mapDispatchToProps)(UserModal);

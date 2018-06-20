import React, { Component } from 'react';
import { Modal, Tabs, Icon, Button } from 'antd';
import ModalInfoTab from './ModalInfoTab';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateProvider, createProvider } from '../../actions';

const TabPane = Tabs.TabPane;

class ProviderModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      provider: props.provider
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.provider.id !== prevState.provider.id) {
      return {
        provider: nextProps.provider
      };
    }

    return prevState;
  }

  render() {
    const { title, visible, action } = this.props;
    const { provider } = this.state;

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
            <ModalInfoTab provider={provider}
              onProviderChange={this.onProviderChange.bind(this)} action={action} />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }

  handleOk(event) {
    if (this.props.action === 'create') {
      this.props.createProvider(this.state.provider);
    } else {
      this.props.updateProvider(this.state.provider);
    }
    this.props.onClose();
  }

  handleCancel(event) {
    this.props.onClose();
  }

  onProviderChange(name, value) {
    let changedProvider = Object.assign({}, this.state.provider);

    Object.assign(changedProvider, { [name]: value });
    this.setState({
      provider: changedProvider
    });
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateProvider, createProvider
}, dispatch);

export default connect(null, mapDispatchToProps)(ProviderModal);

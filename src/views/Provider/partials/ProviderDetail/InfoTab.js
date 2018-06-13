import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Form, Divider, Button, Icon } from 'antd';

import { deleteProvider } from '../../actions';
import ProviderModal from '../ProviderModal';

import providerImg from 'assets/img/24.png';

const FormItem = Form.Item;

class InfoTab extends Component {
  constructor() {
    super();

    this.state = {
      isProviderModalVisible: false
    };
  }

  render() {
    const { provider } = this.props;
    const { isProviderModalVisible } = this.state;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 }
    };

    return (
      <div>
        <h2>{provider.name}</h2>
        <Row type='flex' gutter={16}>
          <Col lg={8} md={8}>
            <img src={providerImg} />
          </Col>
          <Col lg={8} md={8}>
            <Form layout='vertical'>
              <FormItem label='Code:' {...formItemLayout}>
                <strong>{`TBDC${10000 + provider.id}`}</strong>
              </FormItem>

              <FormItem label='Phone:' {...formItemLayout}>
                {provider.phone}
              </FormItem>

              <FormItem label='Email:' {...formItemLayout}>
                {provider.email}
              </FormItem>

              <FormItem label='Address:' {...formItemLayout}>
                {provider.adress}
              </FormItem>

              <FormItem label='Tax code:' {...formItemLayout}>
                {provider.tax_code}
              </FormItem>

              <FormItem label='Note:' {...formItemLayout}>
                {provider.note}
              </FormItem>
            </Form>
          </Col>
        </Row>

        <Row type='flex' justify='end' gutter={16}>
          <Col lg={2} md={2}>
            <Button type='primary' onClick={this.showProviderModal.bind(this)}>
              <Icon type='edit' />
              Update Info
            </Button>
          </Col>
          <Col lg={2} md={2}>
            <Button type='danger' onClick={this.handleDeleteProvider.bind(this, provider.id)}>
              <Icon type='delete' />
              Delete
            </Button>
          </Col>
        </Row>

        <ProviderModal title='Update provider info'
          provider={provider}
          visible={isProviderModalVisible}
          onClose={this.hideProviderModal.bind(this)} />
      </div>
    );
  }

  handleDeleteProvider(provider_id, event) {
    if (window.confirm('Are you sure ?')) {
      this.props.deleteProvider(provider_id);
    }
  }

  showProviderModal(event) {
    this.setState({
      isProviderModalVisible: true
    });
  }

  hideProviderModal(event) {
    this.setState({
      isProviderModalVisible: false
    });
  }
}

export default connect(null, { deleteProvider })(InfoTab);

import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Select } from 'antd';
import providerImg from 'assets/img/24.png';

const FormItem = Form.Item;
const Option = Select.Option;

class ModalInfoTab extends Component {
  render() {
    const { provider, action } = this.props;
    // const formItemLayout = {
    //   labelCol: { span: 4 },
    //   wrapperCol: { span: 8 },
    // };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    let codeInput = (
      <FormItem
        {...formItemLayout}
        label={(
          <span>
            Code&nbsp;
            <Tooltip title='Provider code is a unique information'>
              <Icon type='question-circle-o' />
            </Tooltip>
          </span>
        )}
      >
        <Input name='code'
          value={!provider.code || provider.code == 'null' ? `TBDC${10000 + provider.id}` : provider.code}
          onChange={this.onInputChange.bind(this)} />
      </FormItem>
    );

    return (
      <div>
        <Row type='flex' gutter={24}>
          <Col lg={12}>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Code&nbsp;
                  <Tooltip title='Provider Code is a unique information'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='code'
                value={provider.code || provider.code == 'null' ? `TBDC${10000 + provider.id}` : provider.code}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Name&nbsp;
                  <Tooltip title='Name is the name of the provider'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='name' value={provider.name}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Phone&nbsp;
                  <Tooltip title='Phone provider'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='phone' value={provider.phone}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Email&nbsp;
                  <Tooltip title='Email provider'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='email' value={provider.email}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Address&nbsp;
                  <Tooltip title='Address provider'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='address' value={provider.address}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Tax code&nbsp;
                  <Tooltip title='Tax code provider'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='tax_code' value={provider.tax_code}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>
          </Col>
          <Col lg={12}>
            <img src={providerImg} />
          </Col>
        </Row>
      </div>
    );
  }

  onInputChange(event) {
    this.props.onProviderChange(event.target.name, event.target.value);
  }
}

export default ModalInfoTab;

import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Row, Col, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class ModalInfoTab extends Component {
  render() {
    const { user, action } = this.props;
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

    return (
      <div>
        <Row type='flex' gutter={24}>
          <Col lg={12}>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Name&nbsp;
                  <Tooltip title='User name is a unique information'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='name'
                value={user.name ? user.name : ''}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Email&nbsp;
                  <Tooltip title='Email is the email of the user'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='email' value={user.email}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Phone&nbsp;
                  <Tooltip title='Phone user'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='phone' value={user.phone}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>

          </Col>
          <Col lg={12}>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Address&nbsp;
                  <Tooltip title='Address user'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='address' value={user.address}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Status&nbsp;
                  <Tooltip title='Status user'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='status' value={user.status}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>
          </Col>
        </Row>
      </div>
    );
  }

  onInputChange(event) {
    this.props.onUserChange(event.target.name, event.target.value);
  }
}

export default ModalInfoTab;

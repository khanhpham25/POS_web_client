import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Select } from 'antd';
import customerImg from 'assets/img/24.png';

const FormItem = Form.Item;
const Option = Select.Option;

class ModalInfoTab extends Component {
  render() {
    const { customer, customerTypes, action } = this.props;
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
            <Tooltip title='Customer code is a unique information'>
              <Icon type='question-circle-o' />
            </Tooltip>
          </span>
        )}
      >
        <Input name='code'
          value={!customer.code || customer.code == 'null' ? `TBDC${10000 + customer.id}` : customer.code}
          onChange={this.onInputChange.bind(this)} />
      </FormItem>);

    let options = null;

    options = customerTypes.map(cusType => {
      return (
        <Option value={cusType.id} key={cusType.id} >{cusType.name}</Option>
      );
    });

    return (
      <div>
        <Row type='flex' gutter={24}>
          <Col lg={12}>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Code&nbsp;
                  <Tooltip title='Customer Code is a unique information'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='code'
                value={customer.code || customer.code == 'null' ? `TBDC${10000 + customer.id}` : customer.code}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Name&nbsp;
                  <Tooltip title='Name is the name of the customer'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='name' value={customer.name}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Customer types&nbsp;
                  <Tooltip title='Choose type for customer'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Select
                showSearch
                style={{ width: 230 }}
                placeholder='Select a customer type'
                optionFilterProp='children'
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                value={customer.customer_type.id}
                onChange={this.onSelectChange.bind(this)}
              >
                <Option value='' >--- Select customer type</Option>
                {options}
              </Select>
              &nbsp;&nbsp;
              <Button type='default' >
                <Icon type='plus' />
              </Button>
            </FormItem>
          </Col>
          <Col lg={12}>
            <img src={customerImg} />
          </Col>
        </Row>
      </div>
    );
  }

  onInputChange(event) {
    this.props.onCustomerChange(event.target.name, event.target.value);
  }

  onSelectChange(value) {
    this.props.onCustomerTypeChange(value);
  }
}

export default ModalInfoTab;

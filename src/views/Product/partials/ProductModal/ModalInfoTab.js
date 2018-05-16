import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Select } from 'antd';
import productImg from 'assets/img/24.png';

const FormItem = Form.Item;
const Option = Select.Option;

class ModalInfoTab extends Component {
  render() {
    const { product, categories } = this.props;
    // const formItemLayout = {
    //   labelCol: { span: 4 },
    //   wrapperCol: { span: 8 },
    // };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    let options = null;

    options = categories.map(category => {
      return (
        <Option value={category.id} key={category.id} >{category.name}</Option>
      )
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
                  <Tooltip title='Product Code is a unique information'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='code'
                value={product.code || product.code == 'null' ? `TBDC${10000 + product.id}` : product.code}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Name&nbsp;
                  <Tooltip title='Name is the name of the product'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='name' value={product.name}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Category&nbsp;
                  <Tooltip title='Choose category for the product'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Select
                showSearch
                style={{ width: 230 }}
                placeholder='Select a category'
                optionFilterProp='children'
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                value={product.category.id}
                onChange={this.onSelectChange.bind(this)}
              >
                <Option value='' >--- Select category</Option>
                {options}
              </Select>
              &nbsp;&nbsp;
              <Button type='default' >
                <Icon type='plus' />
              </Button>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='Sale Price'
            >
              <Input name='sale_price' value={product.sale_price}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  In Stock&nbsp;
                  <Tooltip title='The number of product in stock (Updating will automatically create Stock Card)'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              <Input name='stock_count' value={product.stock_count}
                onChange={this.onInputChange.bind(this)} />
            </FormItem>
          </Col>
          <Col lg={12}>
            <img src={productImg} />
          </Col>
        </Row>
      </div>
    );
  }

  onInputChange(event) {
    this.props.onProductChange(event.target.name, event.target.value);
  }

  onSelectChange(value) {
    this.props.onCategoryChange(value);
  }
}

export default ModalInfoTab;

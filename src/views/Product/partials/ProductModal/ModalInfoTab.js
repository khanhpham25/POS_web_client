import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Row, Col, Upload, Button, Select, InputNumber } from 'antd';
import CategoryModal from '../CategoryModal';

// import productImg from 'assets/img/24.png';
const FormItem = Form.Item;
const Option = Select.Option;
const uploadButton = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);
class ModalInfoTab extends Component {
  constructor() {
    super();

    this.state = {
      isCategoryModalVisible: false
    }
  }


  render() {
    const { product, categories, action } = this.props;
    const { isCategoryModalVisible } = this.state;
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

    let initialPriceInput;
    let codeInput = (
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
          value={!product.code || product.code == 'null' ? `TBDC${10000 + product.id}` : product.code}
          onChange={this.onInputChange.bind(this)} />
      </FormItem>);
    let options = null;

    options = categories.map(category => {
      return (
        <Option value={category.id} key={category.id} >{category.name}</Option>
      )
    });

    if (action == 'create') {
      initialPriceInput = (
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Initial Cost&nbsp;
              <Tooltip title='Initial Cost is used to caculate profit of a product'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          )}
        >
          <InputNumber name='initial_cost' value={product.initial_cost}
            onChange={this.onInputNumberChange.bind(this, 'initial_cost')} />
        </FormItem>);
      codeInput = null;
    }

    return (
      <div>
        <Row type='flex' gutter={24}>
          <Col lg={12}>
            {codeInput}
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
              <Button type='default' onClick={this.showCategoryModal.bind(this)} >
                <Icon type='plus' />
              </Button>
            </FormItem>
            {initialPriceInput}
            <FormItem {...formItemLayout} label='Sale Price' >
              <InputNumber name='sale_price' value={product.sale_price}
                onChange={this.onInputNumberChange.bind(this, 'sale_price')} />
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
              <InputNumber name='stock_count' value={product.stock_count}
                onChange={this.onInputNumberChange.bind(this, 'stock_count')} />
            </FormItem>
          </Col>
          <Col lg={12}>
            {/* <Upload
              action="/products"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload> */}
          </Col>
        </Row>

        <CategoryModal visible={isCategoryModalVisible}
          afterCreateCategory={this.props.afterCreateCategory}
          onClose={this.hideCategoryModal.bind(this)} />
      </div>
    );
  }

  showCategoryModal(event) {
    //show product thi gui request lay du lieu product de edit ve
    this.setState({
      isCategoryModalVisible: true,
    });
  }

  hideCategoryModal(event) {
    this.setState({
      isCategoryModalVisible: false,
    });
  }

  onInputChange(event) {
    this.props.onProductChange(event.target.name, event.target.value);
  }

  onSelectChange(value) {
    this.props.onCategoryChange(value);
  }

  onInputNumberChange(name, value) {
    this.props.onNumberChange(name, value);
  }
}

export default ModalInfoTab;

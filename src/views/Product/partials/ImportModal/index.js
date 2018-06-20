import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Icon, Button, Upload, message, Row, Col, Divider, Radio } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const RadioGroup = Radio.Group;

class ProductImportModal extends Component {
  constructor() {
    super();

    this.state = {
      fileList: [],
      uploading: false,
    }
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const { updateStockCount } = this.props;
    const formData = new FormData();
    formData.append('update_stock_count', updateStockCount);
    fileList.forEach((file) => {
      formData.append('file', file);
    });

    this.setState({
      uploading: true,
    });

    axios({
      url: `${process.env.REACT_APP_HOST}imports/products`,
      method: 'post',
      headers: {
        'AUTH-TOKEN': localStorage.token,
      },
      data: formData,
    }).then(response => {
      this.setState({
        fileList: [],
        uploading: false,
      });
      message.success('upload successfully.');
      this.props.onClose();
      this.props.getProducts();
    }).catch(error => {
      this.setState({
        uploading: false,
      });
      console.log(error)
      message.error('upload failed.');
    });
  }

  onChange = (event) => {
    const { onImportOptionChange } = this.props;
    onImportOptionChange(event.target.value);
  }

  render() {
    const { visible, updateStockCount } = this.props;
    const { fileList, uploading } = this.state;
    const uploadOptions = {
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [file],
        }));
        return false;
      },
      fileList,
    };

    let uploadBtn = null;

    if (fileList.length > 0) {
      uploadBtn = (<div>
        <Divider />
        <Button type='primary' loading={uploading} onClick={this.handleUpload} >
          Upload
        </Button>
      </div>);
    }

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      marginBottom: '5px'
    };

    return (
      <Modal
        maskClosable={false}
        title='Import Product from File'
        visible={visible}
        onOk={this.handleOk.bind(this)}
        onCancel={this.handleCancel.bind(this)}
        width={600}
        footer={[]}
      >
        <Row type='flex' >
          <Col lg={24} >
            <a href={`${process.env.REACT_APP_HOST}exports/products/import_template`} > Get Sample Excel File </a>
          </Col>
          <Divider />
          <Col lg={24} >
            <RadioGroup onChange={this.onChange} value={updateStockCount} >
              <Radio style={radioStyle} value={0}>Update product information (Except for stock count)</Radio>
              <Radio style={radioStyle} value={1}>Update product information (Inventory Note will be created)</Radio>
            </RadioGroup>
          </Col>
        </Row>

        <Divider />

        <Row type='flex' >
          <Col lg={24} >
            <Upload {...uploadOptions} fileList={fileList} >
              <Button>
                <Icon type="upload" /> Select File
              </Button>
            </Upload>
            {uploadBtn}
          </Col>
        </Row>
      </Modal>
    );
  }

  handleOk(event) {
    this.props.updateCustomer(this.state.customer);
    this.props.onClose();
  }

  handleCancel(event) {
    this.props.onClose();
  }
}

export default ProductImportModal;

import React, { Component } from 'react';
import {
  Form, Input, Tooltip, Icon, Row, Col, Upload, Button, Select, InputNumber, Card
} from 'antd';
import CategoryModal from '../CategoryModal';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

// import productImg from 'assets/img/24.png';
const FormItem = Form.Item;
const Option = Select.Option;
class ModalInfoTab extends Component {
  constructor(props) {
    super(props);

    let editorState;

    if (props.product.description) {
      editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(props.product.description)));
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = {
      product: props.product,
      editorState
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.product.id != prevState.product.id) {
      let editorState;

      if (nextProps.product.description) {
        editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(nextProps.product.description)));
      } else {
        editorState = EditorState.createEmpty();
      }

      return { editorState, product: nextProps.product }
    }

    return null;
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   let editorState;

  //   if (nextProps.description) {
  //     editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(nextProps.description)))
  //   } else {
  //     editorState = EditorState.createEmpty();
  //   }

  //   return { editorState }
  // }

  handleChange = editorState => {
    this.setState({editorState})

    this.props.onDescriptionChange(editorState);
  }

  render() {
    const { editorState } = this.state;

    return (
      <div>
        <Row type='flex' gutter={24}>
          <Col lg={24}>
            {/* <Card title='Detail Description' style={{ width: '100%' }}>
              <TodaySaleResult data={data.todaySaleResult} />
            </Card> */}
            <div style={{ minHeight: 315 }} >
              <Editor
                editorState={editorState}
                toolbarClassName='toolbarClassName'
                wrapperClassName='wrapperClassName'
                editorClassName='editorClassName'
                onEditorStateChange={this.handleChange}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ModalInfoTab;

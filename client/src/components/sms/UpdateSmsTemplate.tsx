import React, { Component, Fragment } from "react";
import { Form, Icon, Input, Modal } from "antd";
import { connect } from "react-redux";
import api from "../../api";
import { bindActionCreators } from "redux";
import { afterUpdateTemplate } from "../../actions/sms";

const formItemLayout = {
  labelCol: {
    xs: { span: 22 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 26 },
    sm: { span: 18 }
  }
};

class UpdateSmsTemplate extends Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { afterUpdateTemplate } = this.props;
        api
          .updateSmsTemplate({ ...values, id: this.props.id })
          .then(response => {
            this.setState({ visible: false });
            return response;
          })
          .then(afterUpdateTemplate);
      }
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { template, description } = this.props;
    return (
      <Fragment>
        <Icon type="edit" onClick={this.showModal} />
        <Modal
          title="Update SMS Template"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleOk}>
            <Form.Item label="Template" {...formItemLayout}>
              {getFieldDecorator("template", {
                initialValue: template,
                rules: [
                  {
                    type: "string",
                    required: true,
                    message: "Input template"
                  }
                ]
              })(<Input.TextArea prefix={<Icon type="snippets" />} />)}
            </Form.Item>
            <Form.Item label="Description" {...formItemLayout}>
              {getFieldDecorator("description", {
                initialValue: description,
                rules: [{ type: "string" }]
              })(<Input prefix={<Icon type="info-circle" />} />)}
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      afterUpdateTemplate
    },
    dispatch
  );
export default connect(
  state => state,
  mapDispatchToProps
)(Form.create()(UpdateSmsTemplate));

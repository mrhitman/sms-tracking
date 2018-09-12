import React, { Component, Fragment } from "react";
import { Form, Icon, Input, Button, Modal } from "antd";
import { actions } from "../constants";
import { connect } from "react-redux";
import api from "../api";

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

class NewSmsTemplate extends Component {
  state = {
    visible: false,
    title: "Add SMS Template",
    values: {
      template: "",
      description: ""
    }
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { afterCreateTemplate } = this.props;
        api
          .createSmsTemplate(values)
          .then(response => {
            this.setState({ visible: false });
            return response;
          })
          .then(afterCreateTemplate);
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
    return (
      <Fragment>
        <Button type="primary" icon="plus-circle" onClick={this.showModal}>
          Add
        </Button>
        <Modal
          title={this.state.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleOk}>
            <Form.Item label="Template" {...formItemLayout}>
              {getFieldDecorator("template", {
                rules: [
                  {
                    type: "string",
                    required: true,
                    message: "Input template"
                  }
                ]
              })(
                <Input.TextArea
                  prefix={<Icon type="snippets" />}
                  value={this.state.values.template}
                />
              )}
            </Form.Item>
            <Form.Item label="Description" {...formItemLayout}>
              {getFieldDecorator("description", {
                rules: [{ type: "string" }]
              })(
                <Input
                  prefix={<Icon type="info-circle" />}
                  value={this.state.values.description}
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  afterCreateTemplate: payload => {
    dispatch({ type: actions.sms_template_create, payload: payload.data });
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(NewSmsTemplate));

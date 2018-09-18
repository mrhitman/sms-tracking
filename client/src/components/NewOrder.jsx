import React, { Component, Fragment } from "react";
import { Form, Icon, Input, Button, Modal, Select } from "antd";
import { actions } from "../constants";
import { connect } from "react-redux";
import api from "../api";

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

class NewOrder extends Component {
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
        const { afterCreateOrder } = this.props;
        api
          .createOrder(values)
          .then(response => {
            this.setState({ visible: false });
            return response;
          })
          .then(afterCreateOrder);
      }
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  componentDidMount() {
    const { getTemplates } = this.props;
    api.getSmsTemplates().then(getTemplates);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Button type="primary" icon="plus-circle" onClick={this.showModal}>
          Add
        </Button>
        <Modal
          title="Add order"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleOk}>
            <Form.Item label="phone" {...formItemLayout}>
              {getFieldDecorator("phone", {
                rules: [
                  {
                    type: "string",
                    required: true,
                    message: "Input phone number"
                  }
                ]
              })(<Input prefix={<Icon type="phone" />} />)}
            </Form.Item>
            <Form.Item label="ttn" {...formItemLayout}>
              {getFieldDecorator("ttn", {
                rules: [
                  { type: "string", required: true, message: "Input ttn" }
                ]
              })(<Input prefix={<Icon type="schedule" />} />)}
            </Form.Item>
            <Form.Item label="Remind sms template" {...formItemLayout}>
              {getFieldDecorator("remind_sms_template_id")(
                <Select>
                  {this.props.sms_template.toJS().map(template => (
                    <Select.Option value={template.id}>
                      {template.template}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="On send template" {...formItemLayout}>
              {getFieldDecorator("on_send_sms_template_id")(
                <Select>
                  {this.props.sms_template.toJS().map(template => (
                    <Select.Option value={template.id}>
                      {`${template.template} ${template.id} `}
                    </Select.Option>
                  ))}
                </Select>
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
  afterCreateOrder: payload => {
    dispatch({ type: actions.order_create, payload: payload.data });
  },
  getTemplates: payload => {
    dispatch({ type: actions.sms_templates_get, payload: payload.data });
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(NewOrder));

import api from "../../api";
import Layout from "../Layout";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Button, Form, Input, Row, Select } from "antd";
import { connect } from "react-redux";
import { getTemplates } from "../../actions/sms";
import { getUser } from "../../actions/user";
import { SmsTemplate } from "src/reducers/sms-template";
import { User } from "../../reducers/user";
import { WrappedFormUtils } from "antd/lib/form/Form";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 }
};
const rowStyle = { margin: 6 };

type UserProps = {
  getUser: Function;
  getTemplates: Function;
  form: WrappedFormUtils;
  user: User;
  sms_template: SmsTemplate;
};
class UpdateUser extends Component<UserProps> {
  componentDidMount() {
    const { getUser, getTemplates } = this.props;
    api
      .getUser()
      .then(getUser)
      .then(() => api.getSmsTemplates())
      .then(getTemplates);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { getUser } = this.props;
    this.props.form.validateFields((err, values) => {
      api.updateUser(values).then(getUser);
    });
  };

  render() {
    const { user } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <FormItem>
          {getFieldDecorator("id", {
            initialValue: user.get("id"),
            rules: [{ required: true }]
          })(<Input type="hidden" />)}
        </FormItem>
        <Row style={rowStyle}>
          <FormItem label="Name" {...formItemLayout}>
            {getFieldDecorator("name", {
              initialValue: user.get("name"),
              rules: [{ required: true }]
            })(<Input />)}
          </FormItem>
        </Row>
        <Row style={rowStyle}>
          <FormItem label="Email" {...formItemLayout}>
            {getFieldDecorator("email", {
              initialValue: user.get("email"),
              rules: [{ required: true }]
            })(<Input />)}
          </FormItem>
        </Row>
        <Row style={rowStyle}>
          <FormItem label="Phone" {...formItemLayout}>
            {getFieldDecorator("phone", {
              initialValue: user.get("phone"),
              rules: [{ required: true }]
            })(<Input />)}
          </FormItem>
        </Row>
        <Row style={rowStyle}>
          <FormItem label="Default remind SMS Template" {...formItemLayout}>
            {getFieldDecorator("default_remind_sms_template_id", {
              initialValue: user.get("default_remind_sms_template_id"),
              rules: [{ required: true }]
            })(
              <Select>
                {this.props.sms_template.toJS().map(template => (
                  <Select.Option value={template.id}>
                    {template.template}
                  </Select.Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Row>
        <Row style={rowStyle}>
          <FormItem label="Default on send SMS Template" {...formItemLayout}>
            {getFieldDecorator("default_on_send_sms_template_id", {
              initialValue: user.get("default_on_send_sms_template_id"),
              rules: [{ required: true }]
            })(
              <Select>
                {this.props.sms_template.toJS().map(template => (
                  <Select.Option value={template.id}>
                    {template.template}
                  </Select.Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Row>
        <FormItem>
          <Button type="primary" onClick={this.handleSubmit}>
            Update
          </Button>
        </FormItem>
      </Layout>
    );
  }
}

const mapDispatchToState = dispatch =>
  bindActionCreators(
    {
      getUser,
      getTemplates
    },
    dispatch
  );

export default connect(
  state => state,
  mapDispatchToState
)(Form.create()(UpdateUser));

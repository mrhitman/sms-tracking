import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./Layout";
import { Row, Form, Input, Button, Select } from "antd";
import { actions } from "../constants";
import api from "../api";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 }
};
const rowStyle = { margin: 6 };

class User extends Component {
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
        <FormItem type="hidden">
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
        {console.log(user)}
        <Row style={rowStyle}>
          <FormItem label="Default SMS Template" {...formItemLayout}>
            {getFieldDecorator("default_sms_template_id", {
              initialValue: user.get("default_sms_template_id"),
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

const mapStateToProps = state => state;
const mapDispatchToState = dispatch => ({
  getUser: payload => {
    dispatch({ type: actions.user_get, payload: payload.data });
  },
  getTemplates: payload => {
    dispatch({ type: actions.sms_templates_get, payload: payload.data });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToState
)(Form.create()(User));

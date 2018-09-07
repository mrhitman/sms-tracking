import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./Layout";
import { Col, Row, Form, Input, Button } from "antd";
import { actions } from "../constants";
import api from "../api";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 12 }
};
const rowStyle = { margin: 6 };

class User extends Component {
  componentDidMount() {
    const { getUser, user } = this.props;
    api.getUser(user.id).then(getUser);
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
        <Row style={rowStyle}>
          <FormItem label="NovaPoshta key" {...formItemLayout}>
            {getFieldDecorator("novaposhta_key", {
              initialValue: user.get("novaposhta_key"),
              rules: [{ required: true }]
            })(<Input type="password" />)}
          </FormItem>
        </Row>
        <Row style={rowStyle}>
          <FormItem label="bsg token" {...formItemLayout}>
            {getFieldDecorator("bsg_token", {
              initialValue: user.get("bsg_token"),
              rules: [{ required: true }]
            })(<Input type="password" />)}
          </FormItem>
        </Row>
        <Row style={rowStyle}>
          <FormItem label="Alpha name" {...formItemLayout}>
            {getFieldDecorator("alpha_name", {
              initialValue: user.get("alpha_name"),
              rules: [{ required: true }]
            })(<Input />)}
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToState
)(Form.create()(User));

import React, { Component } from "react";
import { Checkbox, Form, Icon, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as axios from "axios";
import { actions } from "../constants";

const FormItem = Form.Item;
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { login } = this.props;
        axios.post("/user/login", values).then(login);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <Link className="login-form-forgot" to="/reset-password">
            Forgot password
          </Link>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  login: payload => {
    dispatch({ type: actions.user_login, payload: payload.data });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));

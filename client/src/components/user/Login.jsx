import React, { Component } from "react";
import { Alert, Checkbox, Form, Icon, Input, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import api from "../../api";
import { bindActionCreators } from "redux";
import { login } from "../../actions/user";

const FormItem = Form.Item;
class Login extends Component {
  state = {
    error: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { login } = this.props;
        api
          .login(values)
          .then(login)
          .catch(() => {
            this.setState({ error: true });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {user.get("id") && <Redirect to="/" />}
        {this.state.error && (
          <Alert type="error" message="Inocorrect user email or password" />
        )}
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default connect(
  state => state,
  mapDispatchToProps
)(Form.create()(Login));

import React, { Component } from "react";
import { Alert, Form, Icon, Input, Button } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import api from "../../api";
import { bindActionCreators } from "redux";
import { create } from "../../actions/user";

const FormItem = Form.Item;
class Register extends Component {
  state = {
    registered: false,
    errors: []
  };

  handleSubmit = e => {
    this.setState({
      errors: []
    });
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { create } = this.props;
        api
          .createUser(values)
          .then(create)
          .then(r => {
            this.setState({ registered: true });
          })
          .catch(error => {
            this.setState({
              errors: [].concat(error.response.data)
            });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="register-form">
        {this.state.registered && <Redirect to="/login" />}
        {this.state.errors.map(e => (
          <Alert message={e} type="error" />
        ))}
        <FormItem>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input your name" }]
          })(
            <Input
              prefix={
                <Icon type="profile" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Name"
            />
          )}
        </FormItem>
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
          {getFieldDecorator("phone", {
            rules: [{ required: true, message: "Please input your phone" }]
          })(
            <Input
              prefix={
                <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Phone"
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
          {getFieldDecorator("repeat-password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Repeat password"
            />
          )}
        </FormItem>
        <Button
          type="primary"
          htmlType="submit"
          className="register-form-button"
        >
          Register
        </Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      create
    },
    dispatch
  );

export default connect(
  state => state,
  mapDispatchToProps
)(Form.create()(Register));

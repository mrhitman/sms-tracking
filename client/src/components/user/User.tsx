import api from "../../api";
import Layout from "../Layout";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Button, Col, Row } from "antd";
import { connect } from "react-redux";
import { getUser } from "../../actions/user";
import { Link } from "react-router-dom";
import { User as UserClass } from "../../reducers/user";

const rowStyle = { margin: 8 };

type UserProps = {
  getUser: Function;
  user: UserClass;
};

class User extends Component<UserProps> {
  componentDidMount() {
    const { getUser } = this.props;
    api.getUser().then(getUser);
  }

  render() {
    const { user } = this.props;
    return (
      <Layout>
        <Row style={rowStyle}>
          <Col span={3}>Name:</Col>
          <Col span={12}>{user.get("name")}</Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={3}>Email:</Col>
          <Col span={12}>{user.get("email")}</Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={3}>Phone:</Col>
          <Col span={12}>{user.get("phone")}</Col>
        </Row>
        {console.log(user.toJS())}
        <Row style={rowStyle}>
          <Col span={3}>Default remind sms template:</Col>
          <Col span={12}>{user.get("default_remind_sms_template")}</Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={3}>Default on send sms template:</Col>
          <Col span={12}>{user.get("default_on_send_sms_template")}</Col>
        </Row>
        <Link to="/update-profile">
          <Button style={{ margin: 20 }}>Update</Button>
        </Link>
      </Layout>
    );
  }
}

const mapDispatchToState = dispatch =>
  bindActionCreators(
    {
      getUser
    },
    dispatch
  );

export default connect(
  state => state,
  mapDispatchToState
)(User);

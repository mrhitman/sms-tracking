import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../Layout";
import { Col, Row, Button } from "antd";
import api from "../../api";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getUser } from "../../actions/user";

const rowStyle = { margin: 8 };

class User extends Component {
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

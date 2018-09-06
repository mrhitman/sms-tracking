import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./Layout";
import { Col, Row, Button } from "antd";
import { actions } from "../constants";
import * as axios from "axios";
import { Link } from "react-router-dom";

const rowStyle = { margin: 8 };

class User extends Component {
  componentDidMount() {
    const { getUser, user } = this.props;
    axios.get(`/user/${user.get("id")}`).then(getUser);
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
        <Row style={rowStyle}>
          <Col span={3}>Alpha name:</Col>
          <Col span={12}>{user.get("alpha_name")}</Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={3}>Default sms template:</Col>
          <Col span={12}>{user.get("default_sms_template")}</Col>
        </Row>
        <Link to="/update-profile">
          <Button style={{ margin: 20 }}>Update</Button>
        </Link>
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
)(User);

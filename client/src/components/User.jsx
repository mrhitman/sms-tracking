import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./Layout";
import { Col, Row } from "antd";
import { actions } from "../constants";
import * as axios from "axios";

const rowStyle = { margin: 6 };

class User extends Component {
  componentDidMount() {
    const { getUser } = this.props;
    axios.get("/user/1").then(getUser);
  }

  render() {
    const { user } = this.props;
    return (
      <Layout>
        <Row style={rowStyle}>
          <Col span={3}>Name:</Col>
          <Col span={6}>{user.get("name")}</Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={3}>Email:</Col>
          <Col span={6}>{user.get("email")}</Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={3}>Phone:</Col>
          <Col span={6}>{user.get("phone")}</Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={3}>NovaPoshta key:</Col>
          <Col span={6}>{user.get("novaposhta_key")}</Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={3}>bsg token:</Col>
          <Col span={6}>{user.get("bsg_token")}</Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={3}>Alpha name:</Col>
          <Col span={6}>{user.get("alpha_name")}</Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={3}>Default sms template:</Col>
          <Col span={6}>{user.get("default_sms_template")}</Col>
        </Row>
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

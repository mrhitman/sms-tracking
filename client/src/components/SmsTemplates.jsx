import React, { Component } from "react";
import { Table } from "antd";
import { connect } from "react-redux";
import * as axios from "axios";
import { actions } from "../constants";
import Layout from "./Layout";

class SmsTemplates extends Component {
  render() {
    return (
      <Layout>
        <div>templates</div>
      </Layout>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToState = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToState
)(SmsTemplates);

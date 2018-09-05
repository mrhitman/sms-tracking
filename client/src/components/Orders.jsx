import React, { Component } from "react";
import { Table } from "antd";
import { connect } from "react-redux";
import * as axios from "axios";
import { actions } from "../constants";
import Layout from "./Layout";

class Orders extends Component {
  columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id
    },
    {
      title: "Phone",
      dataIndex: "phone"
    },
    {
      title: "ttn",
      dataIndex: "ttn"
    },
    {
      title: "sms_template",
      dataIndex: "sms_template"
    },
    {
      title: "status",
      dataIndex: "status"
    },
    {
      title: "last_sms_sent",
      dataIndex: "last_sms_sent"
    },
    {
      title: "created_at",
      dataIndex: "created_at"
    }
  ];

  componentDidMount() {
    const { getOrders } = this.props;
    axios.get("/order/1").then(getOrders);
  }

  render() {
    return (
      <Layout>
        <Table columns={this.columns} dataSource={this.props.order.toJS()} />
      </Layout>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToState = dispatch => ({
  getOrders: payload => {
    dispatch({ type: actions.orders_get, payload: payload.data });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToState
)(Orders);

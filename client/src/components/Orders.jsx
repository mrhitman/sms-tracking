import React, { Component } from "react";
import { Table, Icon } from "antd";
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
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (text, record) => {
        return (
          <a href="javascript:;">
            {record.status === "in_progress" && (
              <Icon
                type={"pause-circle"}
                onClick={() => this.handlePause(record.id)}
              />
            )}
            {record.status === "paused" && (
              <Icon
                type={"right-circle"}
                onClick={() => this.handleUnpause(record.id)}
              />
            )}
          </a>
        );
      }
    }
  ];

  handlePause(id) {
    const { pause } = this.props;
    axios.post("/order/pause", { id }).then(pause);
  }

  handleUnpause(id) {
    const { unpause } = this.props;
    axios.post("/order/unpause", { id }).then(unpause);
  }

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
  },
  pause: payload => {
    dispatch({ type: actions.orders_pause, payload: payload.data });
  },
  unpause: payload => {
    dispatch({ type: actions.orders_unpause, payload: payload.data });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToState
)(Orders);
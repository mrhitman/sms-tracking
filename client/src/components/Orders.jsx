import React, { Component } from "react";
import { Table, Icon, Button, Upload, Popconfirm } from "antd";
import { connect } from "react-redux";
import api from "../api";
import { actions } from "../constants";
import Layout from "./Layout";
import NewOrder from "./NewOrder";

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
      title: "SMS remind template",
      dataIndex: "remind_template"
    },
    {
      title: "SMS on send template",
      dataIndex: "on_send_template"
    },
    {
      title: "Status",
      dataIndex: "status"
    },
    {
      title: "Last sms sent",
      dataIndex: "last_sms_sent"
    },
    {
      title: "Created at",
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
                type="pause-circle"
                onClick={() => this.handlePause(record.id)}
              />
            )}
            {record.status === "paused" && (
              <Icon
                type="right-circle"
                onClick={() => this.handleUnpause(record.id)}
              />
            )}
            <Icon type="dashboard" onClick={() => this.handleTrack(record.id)} />
            <Icon type="mail" onClick={() => this.handleSendSms(record.id)} />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.id)}
            >
              <Icon type="delete" />
            </Popconfirm>
          </a>
        );
      }
    }
  ];

  handlePause(id) {
    const { pause } = this.props;
    api.pauseOrder({ id }).then(pause);
  }

  handleUnpause(id) {
    const { unpause } = this.props;
    api.unpauseOrder({ id }).then(unpause);
  }

  handleDelete(id) {
    const { deleteOrder } = this.props;
    api.deleteOrder({ id }).then(deleteOrder);
  }

  handleTrack(id) {
    api.trackOrder(id);
  }

  handleSendSms(id) {
    api.sendSmsOrder({ id });
  }

  componentDidMount() {
    const { getOrders, user } = this.props;
    api.getOrders(user.get("id")).then(getOrders);
  }

  render() {
    return (
      <Layout>
        <Button.Group style={{ margin: 20 }}>
          <NewOrder />
        </Button.Group>
        <Upload
          name="data"
          accept="*.csv|*.json|*.xls"
          beforeUpload={file => {
            api.loadOrders("csv", file);
            return false;
          }}
        >
          <Button type="primary" icon="download">
            Load csv
          </Button>
        </Upload>
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
  },
  deleteOrder: payload => {
    dispatch({ type: actions.order_delete, payload: payload.data });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToState
)(Orders);

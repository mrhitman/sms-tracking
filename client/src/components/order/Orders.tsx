import * as moment from "moment";
import api from "../../api";
import DeliveryInfo from "./DeliveryInfo";
import Layout from "../Layout";
import NewOrder from "./NewOrder";
import OrderTimeline from "./OrderTimeline";
import React, { Component } from "react";
import SmsHistory from "../sms/SmsHistory";
import { bindActionCreators } from "redux";
import { Button, Col, Icon, Popconfirm, Row, Table, Upload } from "antd";
import { connect } from "react-redux";
import { deleteOrder, getOrders, pause, unpause } from "../../actions/order";
import { Order } from "../../reducers/order";
import { User } from "../../reducers/user";

type OrdersProps = {
  pause: Function;
  unpause: Function;
  deleteOrder: Function;
  getOrders: Function;
  user: User;
  order: Order;
};
type OrdersState = {
  loading: boolean;
};
class Orders extends Component<OrdersProps, OrdersState> {
  state = {
    loading: true
  };

  columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id
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
      dataIndex: "last_sms_sent",
      render: text =>
        parseInt(text) === 0 ? "None" : moment.unix(text).format("L hh:mm")
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      render: text => moment.unix(text).format("L hh:mm")
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (text, record) => {
        return (
          <a href="javascript:;">
            {record.status === "in_progress" && (
              <Icon
                title="Pause order"
                type="pause-circle"
                onClick={() => this.handlePause(record.id)}
              />
            )}
            {record.status === "paused" && (
              <Icon
                title="Unpause order"
                type="right-circle"
                onClick={() => this.handleUnpause(record.id)}
              />
            )}
            <DeliveryInfo id={record.id} />
            <Icon
              title="Send sms to order owner"
              type="mail"
              onClick={() => this.handleSendSms(record.id)}
            />
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

  handlePause(id: number) {
    const { pause } = this.props;
    api.pauseOrder({ id }).then(pause);
  }

  handleUnpause(id: number) {
    const { unpause } = this.props;
    api.unpauseOrder({ id }).then(unpause);
  }

  handleDelete(id: number) {
    const { deleteOrder } = this.props;
    api.deleteOrder({ id }).then(deleteOrder);
  }

  handleTrack(id: number) {
    api.trackOrder(id);
  }

  handleSendSms(id: number) {
    api.sendSmsOrder({ id });
  }

  componentDidMount() {
    const { getOrders } = this.props;
    this.setState({ loading: true });
    api
      .getOrders()
      .then(getOrders)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
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
        <Table
          loading={this.state.loading}
          columns={this.columns}
          expandedRowRender={row => (
            <Row>
              <Col span={16}>
                <SmsHistory row={row} />
              </Col>
              <Col span={7}>
                <OrderTimeline row={row} />
              </Col>
            </Row>
          )}
          dataSource={this.props.order.toJS()}
        />
      </Layout>
    );
  }
}

const mapDispatchToState = dispatch =>
  bindActionCreators(
    {
      getOrders,
      pause,
      unpause,
      deleteOrder
    },
    dispatch
  );

export default connect(
  state => state,
  mapDispatchToState
)(Orders);

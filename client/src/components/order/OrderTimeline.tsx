import * as moment from "moment";
import api from "../../api";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Card, Timeline } from "antd";
import { connect } from "react-redux";
import { getHistory } from "../../actions/order";
import { History } from "../../reducers/history";
import { Order } from "../../reducers/order";
import { State } from "../../reducers";

type OrderTimelineProps = {
  readonly getHistory: Function;
  readonly history: History;
  readonly row: Order;
};
type OrderTimelineState = {
  loading: boolean;
};
class OrderTimeline extends Component<OrderTimelineProps, OrderTimelineState> {
  state = {
    loading: false
  };

  componentDidMount() {
    const { getHistory, row } = this.props;
    this.setState({ loading: true });
    api
      .getOrderHistory(row.id)
      .then(getHistory)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { history, row } = this.props;
    const id = row.get("id") || 0;
    return (
      <Card loading={this.state.loading}>
        <h3>Order timeline:</h3>
        <Timeline>
          {history.get(id, []).map((item: History) => {
            return (
              <Timeline.Item>
                {moment.unix(item.created_at).format("L hh:mm")}: {item.status}
              </Timeline.Item>
            );
          })}
        </Timeline>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getHistory
    },
    dispatch
  );

export default connect(
  (state: State) => state,
  mapDispatchToProps
)(OrderTimeline as any);

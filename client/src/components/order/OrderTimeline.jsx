import React, { Component } from "react";
import { Timeline, Card } from "antd";
import { connect } from "react-redux";
import { actions } from "../../constants";
import api from "../../api";
import * as moment from "moment";

class OrderTimeline extends Component {
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
    return (
      <Card loading={this.state.loadingd}>
        <h3>Order timeline:</h3>
        <Timeline>
          {history.get(row.id, []).map(item => {
            return (
              <Timeline.Item>
                {moment.unix(item.created_at).format()}: {item.status}
              </Timeline.Item>
            );
          })}
        </Timeline>
      </Card>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  getHistory: payload => {
    dispatch({ type: actions.order_get_history, payload: payload.data });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTimeline);

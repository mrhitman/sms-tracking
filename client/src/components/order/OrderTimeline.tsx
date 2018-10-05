import React, { Component } from "react";
import { Timeline, Card } from "antd";
import { connect } from "react-redux";
import api from "../../api";
import * as moment from "moment";
import { bindActionCreators } from "redux";
import { getHistory } from "../../actions/order";

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
  state => state,
  mapDispatchToProps
)(OrderTimeline);

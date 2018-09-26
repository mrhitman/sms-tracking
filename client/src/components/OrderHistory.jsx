import React, { Component, Fragment } from "react";
import { Timeline } from "antd";
import { connect } from "react-redux";
import { actions } from "../constants";
import api from "../api";
import * as moment from "moment";

class OrderHistory extends Component {
  componentDidMount() {
    const { getHistory, row } = this.props;
    api.getOrderHistory(row.id).then(getHistory);
  }

  render() {
    const { history, row } = this.props;
    return (
      <Fragment>
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
      </Fragment>
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
)(OrderHistory);

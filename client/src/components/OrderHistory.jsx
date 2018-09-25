import React, { Component, Fragment } from "react";
import { Timeline, Modal } from "antd";
import { connect } from "react-redux";
import { actions } from "../constants";
import api from "../api";

class OrderHistory extends Component {
  componentDidMount() {
    const { getHistory, row } = this.props;
    api.getOrderHistory(row.id).then(getHistory);
  }

  render() {
    const { history, row } = this.props;
    // console.log(history.toJS());
    return (
      <Fragment>
        <h3>Order timeline:</h3>
        <Timeline>
          {history.get(row.id, []).map(item => {
            return (
              <Timeline.Item>
                {item.status} - {item.created_at}
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

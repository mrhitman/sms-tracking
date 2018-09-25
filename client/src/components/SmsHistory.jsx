import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { actions } from "../constants";
import { List } from "antd";
import api from "../api";
import * as moment from "moment";

class SmsHistory extends Component {
  componentDidMount() {
    const { getHistory, row } = this.props;
    api.getSms(row.id).then(getHistory);
  }

  render() {
    const order = this.props.row;
    const sms = this.props.sms.get(order.id);
    return (
      <Fragment>
        <h3>Sended sms's</h3>
        <List
          itemLayout="horizontal"
          dataSource={sms}
          bordered
          size="small"
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={`${item.status} ${moment.unix(item.send_time).format()}`}
                description={item.sms_raw}
              />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  getHistory: payload => {
    dispatch({ type: actions.order_get_sms, payload: payload.data });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SmsHistory);

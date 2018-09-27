import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../constants";
import { List, Card } from "antd";
import api from "../../api";
import * as moment from "moment";

class SmsHistory extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    const { getHistory, row } = this.props;
    this.setState({
      loading: true
    });
    api
      .getSms(row.id)
      .then(getHistory)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const order = this.props.row;
    const sms = this.props.sms.get(order.id);
    return (
      <Card loading={this.state.loading}>
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
      </Card>
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

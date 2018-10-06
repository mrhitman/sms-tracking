import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Card } from "antd";
import api from "../../api";
import * as moment from "moment";
import { bindActionCreators, Dispatch } from "redux";
import { getHistory } from "../../actions/sms";

interface SmsHistory {
  getHistory: Function;
  sms: any;
  row: any;
}

class SmsHistory extends Component<SmsHistory> {
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
                title={`${item.status} ${moment
                  .unix(item.send_time)
                  .format("L hh:mm")}`}
                description={item.sms_raw}
              />
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getHistory
    },
    dispatch
  );

export default connect(
  state => state,
  mapDispatchToProps
)(SmsHistory);

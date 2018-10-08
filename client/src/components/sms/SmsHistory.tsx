import * as moment from "moment";
import api from "../../api";
import React, { Component } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { Card, List } from "antd";
import { connect } from "react-redux";
import { getHistory } from "../../actions/sms";

type SmsHistoryProps = {
  getHistory: Function;
  sms: any;
  row: any;
};
type SmsHistoryState = {
  loading: boolean;
};

class SmsHistory extends Component<SmsHistoryProps, SmsHistoryState> {
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

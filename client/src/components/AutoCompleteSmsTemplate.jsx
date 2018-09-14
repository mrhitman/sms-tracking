import React, { Component } from "react";
import { AutoComplete, Icon } from "antd";
import api from "../api";

class AutoCompleteSmsTemplate extends Component {
  state = {
    smsList: []
  };

  componentWillMount() {
    api.getSmsTemplates().then(result => {
      this.setState({
        smsList: result.data.map(item => item.template)
      });
    });
  }
  render() {
    return (
      <AutoComplete
        dataSource={this.state.smsList}
        prefix={<Icon type="schedule" />}
      />
    );
  }
}

export default AutoCompleteSmsTemplate;

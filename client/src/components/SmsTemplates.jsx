import React, { Component, Fragment } from "react";
import { Table, Icon, Popconfirm, Input } from "antd";
import { connect } from "react-redux";
import api from "../api";
import { actions } from "../constants";
import Layout from "./Layout";

class SmsTemplates extends Component {
  state = {
    editing: false
  };

  columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id
    },
    {
      title: "Template",
      dataIndex: "template",
      render: (text, record) => {
        return (
          <Fragment>
            <Input.TextArea size="small" value={text} autosize />
            <div>Text length: {text.length}</div>
          </Fragment>
        );
      }
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: 100,
      render: (text, record) => {
        return this.props.sms_template.size >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => this.handleDelete(record.id)}
          >
            <a href="javascript:;">
              <Icon type="delete" />
            </a>
          </Popconfirm>
        ) : null;
      }
    }
  ];

  handleDelete(id) {
    const { deleteTemplate } = this.props;
    api.deleteSmsTemplate({ id }).then(deleteTemplate);
  }

  componentDidMount() {
    const { getTemplates, user } = this.props;
    api.getSmsTemplates(user.get("id")).then(getTemplates);
  }

  render() {
    return (
      <Layout>
        <Table
          columns={this.columns}
          dataSource={this.props.sms_template.toJS()}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToState = dispatch => ({
  getTemplates: payload => {
    dispatch({ type: actions.sms_templates_get, payload: payload.data });
  },
  deleteTemplate: payload => {
    dispatch({ type: actions.sms_templates_delete, payload: payload.data });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToState
)(SmsTemplates);

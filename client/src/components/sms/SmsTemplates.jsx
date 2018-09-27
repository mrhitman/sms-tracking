import React, { Component } from "react";
import { Table, Icon, Popconfirm, Button } from "antd";
import { connect } from "react-redux";
import api from "../../api";
import { actions } from "../../constants";
import Layout from "../Layout";
import NewSmsTemplate from "./NewSmsTemplate";
import UpdateSmsTemplate from "./UpdateSmsTemplate";

class SmsTemplates extends Component {
  columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id
    },
    {
      title: "Template",
      dataIndex: "template"
    },
    {
      title: "Description",
      dataIndex: "description"
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: 100,
      render: (text, record) => {
        return (
          <a href="javascript:;">
            <UpdateSmsTemplate {...record} />
            {this.props.sms_template.size >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.id)}
              >
                <Icon type="delete" />
              </Popconfirm>
            ) : null}
          </a>
        );
      }
    }
  ];

  handleAdd() {
    const { createTemplate } = this.props;
    api.createSmsTemplate({}).then(createTemplate);
  }

  handleDelete(id) {
    const { deleteTemplate } = this.props;
    api.deleteSmsTemplate({ id }).then(deleteTemplate);
  }

  handleSave(row) {
    const { updateTemplate } = this.props;
    api.updateSmsTemplate(row).then(updateTemplate);
  }

  componentDidMount() {
    const { getTemplates } = this.props;
    api.getSmsTemplates().then(getTemplates);
  }

  render() {
    return (
      <Layout>
        <Button.Group style={{ margin: 20 }}>
          <NewSmsTemplate />
        </Button.Group>
        <Table
          bordered
          dataSource={this.props.sms_template.toJS()}
          columns={this.columns}
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
  createTemplate: payload => {
    dispatch({ type: actions.sms_template_create, payload: payload.data });
  },
  updateTemplate: payload => {
    dispatch({ type: actions.sms_template_update, payload: payload.data });
  },
  deleteTemplate: payload => {
    dispatch({ type: actions.sms_template_delete, payload: payload.data });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToState
)(SmsTemplates);

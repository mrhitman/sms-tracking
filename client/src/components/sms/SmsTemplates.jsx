import React, { Component } from "react";
import { Table, Icon, Popconfirm, Button } from "antd";
import { connect } from "react-redux";
import api from "../../api";
import Layout from "../Layout";
import NewSmsTemplate from "./NewSmsTemplate";
import UpdateSmsTemplate from "./UpdateSmsTemplate";
import { bindActionCreators } from "redux";
import {
  afterCreateTemplate,
  afterUpdateTemplate,
  afterDeleteTemplate,
  getTemplates
} from "../../actions/sms";

class SmsTemplates extends Component {
  state = {
    loading: false
  };

  columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: 80,
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
    const { afterCreateTemplate } = this.props;
    api.createSmsTemplate({}).then(afterCreateTemplate);
  }

  handleDelete(id) {
    const { afterDeleteTemplate } = this.props;
    api.deleteSmsTemplate({ id }).then(afterDeleteTemplate);
  }

  handleSave(row) {
    const { afterUpdateTemplate } = this.props;
    api.updateSmsTemplate(row).then(afterUpdateTemplate);
  }

  componentDidMount() {
    const { getTemplates } = this.props;
    this.setState({ loading: true });
    api
      .getSmsTemplates()
      .then(getTemplates)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <Layout>
        <Button.Group style={{ margin: 20 }}>
          <NewSmsTemplate />
        </Button.Group>
        <Table
          loading={this.state.loading}
          bordered
          dataSource={this.props.sms_template.toJS()}
          columns={this.columns}
        />
      </Layout>
    );
  }
}

const mapDispatchToState = dispatch =>
  bindActionCreators(
    {
      getTemplates,
      afterCreateTemplate,
      afterUpdateTemplate,
      afterDeleteTemplate
    },
    dispatch
  );

export default connect(
  state => state,
  mapDispatchToState
)(SmsTemplates);

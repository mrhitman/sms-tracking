import React, { Component, Fragment } from "react";
import { Table, Icon, Popconfirm, Input, Button, Form } from "antd";
import { connect } from "react-redux";
import api from "../api";
import { actions } from "../constants";
import Layout from "./Layout";
import NewSmsTemplate from "./NewSmsTemplate";

const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  state = {
    editing: false
  };

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener("click", this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener("click", this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  handleClickOutside = e => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  };

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return editing ? (
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title} is required.`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(
                    <Input
                      ref={node => (this.input = node)}
                      onPressEnter={this.save}
                    />
                  )}
                </FormItem>
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  style={{ paddingRight: 24 }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

class SmsTemplates extends Component {
  columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id
    },
    {
      title: "Template",
      dataIndex: "template",
      editable: true
    },
    {
      title: "Description",
      dataIndex: "description",
      editable: true,
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
    const { getTemplates, user } = this.props;
    api.getSmsTemplates(user.get("id")).then(getTemplates);
  }

  render() {
    const dataSource = this.props.sms_template.toJS();
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave.bind(this)
        })
      };
    });
    return (
      <Layout>
        <Button.Group style={{ margin: 20 }}>
          <NewSmsTemplate />
        </Button.Group>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
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

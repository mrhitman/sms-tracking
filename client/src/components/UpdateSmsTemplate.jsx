import React from "react";
import api from "../api";
import NewSmsTemplate from "./NewSmsTemplate";

class UpdateSmsTemplate extends NewSmsTemplate {
  state = {
    ...parent.state,
    title: "Update SMS Template"
  };

  handleOk = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { afterUpdateTemplate } = this.props;
        api
          .updateSmsTemplate(values)
          .then(response => {
            this.setState({ visible: false });
            return response;
          })
          .then(afterUpdateTemplate);
      }
    });
  };
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  afterUpdateTemplate: payload => {
    dispatch({ type: actions.sms_template_update, payload: payload.data });
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(UpdateSmsTemplate));

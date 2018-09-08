import { Record, List } from "immutable";
import { actions } from "../constants";

const SmsTemplate = Record({
  id: "",
  template: "",
  description: "",
});

const initialState = List();

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.sms_templates_get:
      const templates = action.payload;
      return List(templates.map(template => new SmsTemplate(template)));
    case actions.sms_template_delete:
      return state.delete(
        state.findIndex(item => item.id == action.payload.id)
      );
    default:
      return state;
  }
};

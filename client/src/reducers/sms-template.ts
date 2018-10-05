import { Record, List } from "immutable";
import { actions } from "../constants";

const SmsTemplate = Record({
  id: "",
  template: "",
  description: ""
});

const initialState = List();

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.sms_templates_get:
      const templates = action.payload;
      return List(
        templates.map(
          template =>
            new SmsTemplate({
              ...template,
              description: template.description || ""
            })
        )
      );
    case actions.sms_template_create:
      return state.push(new SmsTemplate(action.payload));
    case actions.sms_template_update:
      return state.update(
        state.findIndex(item => item.id == action.payload.id),
        item =>
          item
            .set("template", action.payload.template)
            .set("description", action.payload.description || "")
      );
    case actions.sms_template_delete:
      return state.delete(
        state.findIndex(item => item.id == action.payload.id)
      );
    default:
      return state;
  }
};

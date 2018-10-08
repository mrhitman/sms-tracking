import { Action } from "./index";
import { actions } from "../constants";
import { List, Record } from "immutable";

const SmsTemplateRecord = Record({
  id: null,
  template: "",
  description: ""
});
export class SmsTemplate extends SmsTemplateRecord {
  id: number;
  template: string;
  description: string;
}

const initialState = List();

export default (state = initialState, action: Action) => {
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
        state.findIndex((item: SmsTemplate) => item.id == action.payload.id),
        (item: SmsTemplate) =>
          item
            .set("template", action.payload.template)
            .set("description", action.payload.description || "")
      );
    case actions.sms_template_delete:
      return state.delete(
        state.findIndex((item: SmsTemplate) => item.id == action.payload.id)
      );
    default:
      return state;
  }
};

import { actions } from "../constants";

export const afterCreateTemplate = payload => ({
  type: actions.sms_template_create,
  payload: payload.data
});
export const getHistory = payload => ({
  type: actions.order_get_sms,
  payload: payload.data
});
export const getTemplates = payload => ({
  type: actions.sms_templates_get,
  payload: payload.data
});
export const afterUpdateTemplate = payload => ({
  type: actions.sms_template_update,
  payload: payload.data
});
export const afterDeleteTemplate = payload => ({
  type: actions.sms_template_delete,
  payload: payload.data
});

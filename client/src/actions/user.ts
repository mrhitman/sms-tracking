import { actions } from "../constants";

export const login = payload => ({
  type: actions.user_login,
  payload: payload.data
});
export const logout = () => ({ type: actions.user_logout });
export const getUser = payload => ({
  type: actions.user_get,
  payload: payload.data
});
export const getTemplates = payload => ({
  type: actions.sms_templates_get,
  payload: payload.data
});
export const create = payload => ({
  type: actions.user_create,
  payload: payload.data
});

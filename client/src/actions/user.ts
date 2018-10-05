import { actions } from "../constants";

export const login = (payload: any) => ({
  type: actions.user_login,
  payload: payload.data
});
export const logout = () => ({ type: actions.user_logout });
export const getUser = (payload: any) => ({
  type: actions.user_get,
  payload: payload.data
});
export const getTemplates = (payload: any) => ({
  type: actions.sms_templates_get,
  payload: payload.data
});
export const create = (payload: any) => ({
  type: actions.user_create,
  payload: payload.data
});

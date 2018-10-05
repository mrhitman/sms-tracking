import { actions } from "../constants";

export const afterCreateOrder = payload => ({
  type: actions.order_create,
  payload: payload.data
});
export const getTemplates = payload => ({
  type: actions.sms_templates_get,
  payload: payload.data
});
export const getOrders = payload => ({
  type: actions.orders_get,
  payload: payload.data
});
export const pause = payload => ({
  type: actions.orders_pause,
  payload: payload.data
});
export const unpause = payload => ({
  type: actions.orders_unpause,
  payload: payload.data
});
export const deleteOrder = payload => ({
  type: actions.order_delete,
  payload: payload.data
});
export const getHistory = payload => ({
  type: actions.order_get_history,
  payload: payload.data
});

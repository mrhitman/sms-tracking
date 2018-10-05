import { actions } from "../constants";

export const afterCreateOrder = (payload: any) => ({
  type: actions.order_create,
  payload: payload.data
});
export const getTemplates = (payload: any) => ({
  type: actions.sms_templates_get,
  payload: payload.data
});
export const getOrders = (payload: any) => ({
  type: actions.orders_get,
  payload: payload.data
});
export const pause = (payload: any) => ({
  type: actions.orders_pause,
  payload: payload.data
});
export const unpause = (payload: any) => ({
  type: actions.orders_unpause,
  payload: payload.data
});
export const deleteOrder = (payload: any) => ({
  type: actions.order_delete,
  payload: payload.data
});
export const getHistory = (payload: any) => ({
  type: actions.order_get_history,
  payload: payload.data
});

import history from "./history";
import order, { Order } from "./order";
import sms, { Sms } from "./sms";
import sms_template, { SmsTemplate } from "./sms-template";
import user, { User } from "./user";
import { combineReducers } from "redux";

export type Action = {
  payload?: any;
  type: string;
};
export type State = {
  user: User;
  order: Order;
  sms: Sms;
  sms_template: SmsTemplate;
  history: History;
};
export default combineReducers({
  user,
  order,
  sms,
  sms_template,
  history
});

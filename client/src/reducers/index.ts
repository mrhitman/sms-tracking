import history from "./history";
import order from "./order";
import sms from "./sms";
import sms_template from "./sms-template";
import user from "./user";
import { combineReducers } from "redux";
export interface Action {
  payload?: any;
  type: string;
}

export default combineReducers({
  user,
  order,
  sms,
  sms_template,
  history
});

import { combineReducers } from "redux";
import user from "./user";
import order from "./order";
import sms from "./sms";
import sms_template from "./sms-template";
import history from "./history";

export default combineReducers({
  user,
  order,
  sms,
  sms_template,
  history
});

import { Record } from "immutable";
import { actions } from "../constants";
import * as decode from "jwt-decode";

const localToken = localStorage.getItem("token");
const User = Record({
  id: localToken ? decode(localToken).id : null,
  name: "",
  email: "",
  phone: "",
  default_remind_sms_template_id: undefined,
  default_remind_sms_template: "",
  default_on_send_sms_template_id: undefined,
  default_on_send_sms_template: "",
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken")
});

const initialState = new User();

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.user_logout:
      localStorage.clear();
      return new User();
    case actions.user_login:
      const { token, refreshToken, user } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      return new User({ ...user, token, refreshToken });
    case actions.user_get:
      return new User(action.payload);
    default:
      return state;
  }
};

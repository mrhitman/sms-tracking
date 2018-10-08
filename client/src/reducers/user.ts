import * as decode from "jwt-decode";
import { Action } from "./index";
import { actions } from "../constants";
import { Record } from "immutable";

const localToken = localStorage.getItem("token");

const UserRecord = Record({
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

export class User extends UserRecord {
  id: number | null;
  name: string;
  email: string;
  phone: string;
  default_remind_sms_template_id: number;
  default_remind_sms_template: string;
  default_on_send_sms_template_id: number;
  default_on_send_sms_template: string;
  token: string;
  refreshToken: string;
}

const initialState = new User();

export default (state = initialState, action: Action) => {
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

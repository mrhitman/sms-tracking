import { Record } from "immutable";
import { actions } from "../constants";
import * as decode from "jwt-decode";

const User = Record({
  id: decode(localStorage.getItem("token")).id || null,
  name: "",
  email: "",
  phone: "",
  novaposhta_key: "",
  bsg_token: "",
  alpha_name: "",
  default_sms_template: "",
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
      const { token, refreshToken } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      return state.set("token", token).set("refreshToken", refreshToken);
    case actions.user_get:
      return new User(action.payload);
    default:
      return state;
  }
};

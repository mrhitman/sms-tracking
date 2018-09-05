import { Record } from "immutable";
import { actions } from "../constants";

const User = Record({
  id: "",
  name: "",
  email: "",
  phone: "",
  novaposhta_key: "",
  bsg_token: "",
  alpha_name: "",
  default_sms_template: ""
});

const initialState = new User();

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.user_get:
      return new User(action.payload);
    default:
      return state;
  }
};

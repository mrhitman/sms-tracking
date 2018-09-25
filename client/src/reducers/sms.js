import { Map, Record, List } from "immutable";
import { actions } from "../constants";

const Sms = Record({
  status: "",
  send_time: "",
  sms_raw: ""
});

const initialState = Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.order_get_sms:
      const sms = action.payload;
      if (sms.length) {
        return state.set(sms[0].order_id, List(sms.map(item => new Sms(item))));
      }
      return state;
    default:
      return state;
  }
};

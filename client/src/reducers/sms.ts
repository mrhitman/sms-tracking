import { Action } from "./index";
import { actions } from "../constants";
import { List, Map, Record } from "immutable";

const SmsRecord = Record({
  status: "",
  send_time: "",
  sms_raw: ""
});

export class Sms extends SmsRecord {
  status: string;
  send_time: number;
  sms_raw: string;
}

const initialState = Map();

export default (state = initialState, action: Action) => {
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

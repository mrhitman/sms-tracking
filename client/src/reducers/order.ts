import { Action } from "./index";
import { actions } from "../constants";
import { List, Record } from "immutable";

const OrderRecord = Record({
  id: null,
  phone: "",
  ttn: "",
  remind_template: "",
  on_send_template: "",
  remind_sms_template_id: "",
  on_send_sms_template_id: "",
  status: "",
  last_sms_sent: "",
  created_at: ""
});

export class Order extends OrderRecord {
  id: number;
  phone: string;
  ttn: string;
  remind_template: string;
  on_send_template: string;
  remind_sms_template_id: number;
  on_send_sms_template_id: number;
  status: string;
  last_sms_sent: number;
  created_at: number;
}

const initialState = List();

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case actions.orders_get:
      const orders = action.payload;
      return List(
        orders.map(
          order =>
            new Order({
              ...order,
              remind_template: order.remind_template
                ? order.remind_template.template
                : "",
              on_send_template: order.on_send_template
                ? order.on_send_template.template
                : ""
            })
        )
      );
    case actions.order_create:
      return state.push(new Order(action.payload));
    case actions.order_delete:
      return state.delete(
        state.findIndex((order: Order) => order.id == action.payload.id)
      );
    case actions.orders_pause:
    case actions.orders_unpause:
      return state.update(
        state.findIndex((item: Order) => item.id == action.payload.id),
        (item: Order) => item.set("status", action.payload.status)
      );
    default:
      return state;
  }
};

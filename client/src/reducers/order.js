import { Record, List } from "immutable";
import { actions } from "../constants";

const Order = Record({
  id: "",
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

const initialState = List();

export default (state = initialState, action) => {
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
        state.findIndex(order => order.id == action.payload.id)
      );
    case actions.orders_pause:
    case actions.orders_unpause:
      return state.update(
        state.findIndex(item => item.id == action.payload.id),
        item => item.set("status", action.payload.status)
      );
    default:
      return state;
  }
};

import { Map, Record } from "immutable";
import { actions } from "../constants";
import Action from "./action";

const HistoryRecord = Record({
  id: undefined,
  status: "",
  data: "",
  created_at: undefined
});
export class History extends HistoryRecord {
  id: number;
  status: string;
  data: string;
  created_at: number;
}
const initialState = Map();

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case actions.order_get_history:
      const history = action.payload;
      if (history.length) {
        return state.set(
          history[0].order_id,
          history.map((item: History) => new History(item))
        );
      }
      return state;
    default:
      return state;
  }
};

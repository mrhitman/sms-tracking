import "antd/dist/antd.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import App from "./components/App";
import User from "./components/User";
import Orders from "./components/Orders";
import SmsTemplates from "./components/SmsTemplates";
import reducer from "./reducers";
import UpdateUser from "./components/UpdateUser";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/profile" component={User} />
        <Route path="/update-profile" component={UpdateUser} />
        <Route path="/orders" component={Orders} />
        <Route path="/sms-templates" component={SmsTemplates} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

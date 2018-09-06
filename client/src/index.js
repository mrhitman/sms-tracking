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
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/profile" component={User} />
        <Route path="/update-profile" component={UpdateUser} />
        <Route path="/orders" component={Orders} />
        <Route path="/sms-templates" component={SmsTemplates} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/reset-password" component={Logout} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

import "antd/dist/antd.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import User from "./components/user/User";
import Orders from "./components/order/Orders";
import SmsTemplates from "./components/sms/SmsTemplates";
import reducer from "./reducers";
import UpdateUser from "./components/user/UpdateUser";
import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import Register from "./components/user/Register";

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
        <Route exact path="/" component={Orders} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

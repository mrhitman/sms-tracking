import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import Orders from "./components/order/Orders";
import React from "react";
import ReactDOM from "react-dom";
import reducer from "./reducers";
import Register from "./components/user/Register";
import SmsTemplates from "./components/sms/SmsTemplates";
import UpdateUser from "./components/user/UpdateUser";
import User from "./components/user/User";
import { createStore } from "redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import "antd/dist/antd.css";

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

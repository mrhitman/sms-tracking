import React, { Fragment } from "react";
import Layout from "./Layout";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";
import User from "./user/User";
import Orders from "./order/Orders";
import SmsTemplates from "./sms/SmsTemplates";
import reducer from "../reducers";
import UpdateUser from "./user/UpdateUser";
import Login from "./user/Login";
import Logout from "./user/Logout";
import Register from "./user/Register";

const store = createStore(reducer);
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route path="/profile" component={User} />
          <Route path="/update-profile" component={UpdateUser} />
          <Route path="/orders" component={Orders} />
          <Route path="/sms-templates" component={SmsTemplates} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/reset-password" component={Logout} />
          <Route exact path="/" component={Orders} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

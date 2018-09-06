import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { actions } from "../constants";
import { connect } from "react-redux";
import * as axios from "axios";

class Logout extends Component {
  logout() {
    const { logout } = this.props;
    axios.post("/user/logout").then(logout);
  }

  render() {
    return <Redirect to="/login" />;
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch({ action: actions.user_logout });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

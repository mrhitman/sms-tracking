import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { actions } from "../constants";
import { connect } from "react-redux";
import api from "../api";

class Logout extends Component {
  componentDidMount() {
    const { logout } = this.props;
    api.logout().then(logout);
  }

  render() {
    return <Redirect to="/login" />;
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch({ type: actions.user_logout });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

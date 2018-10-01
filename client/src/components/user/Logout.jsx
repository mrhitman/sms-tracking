import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import api from "../../api";
import { bindActionCreators } from "redux";
import { logout } from "../../actions/user";

class Logout extends Component {
  UNSAFE_componentWillMount() {
    api.logout().then(this.props.logout);
  }

  render() {
    const authorized = !!this.props.user.id;
    if (!authorized) {
      return <Redirect to="/login" />;
    }
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  );

export default connect(
  state => state,
  mapDispatchToProps
)(Logout);

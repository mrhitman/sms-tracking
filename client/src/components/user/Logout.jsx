import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import api from "../../api";
import { bindActionCreators } from "redux";
import { logout } from "../../actions/user";

class Logout extends Component {
  componentDidMount() {
    const { logout } = this.props;
    api.logout().then(logout);
  }

  render() {
    const authorized = !!this.props.user.id;
    if (!authorized) {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

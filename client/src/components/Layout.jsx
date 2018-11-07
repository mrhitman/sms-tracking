import React, { PureComponent } from "react";
import { Layout } from "antd";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LeftMenu from "./LeftMenu";

const { Header, Sider, Content } = Layout;
const ContentStyle = {
  margin: "24px 16px",
  padding: 24,
  background: "#fff",
  minHeight: "86vh",
  overflowY: "auto"
};
class BaseLayout extends PureComponent {
  render() {
    const { user } = this.props;
    return (
      <Layout>
        {!!user.get("id") === false && <Redirect to="/login" />}
        <Sider trigger={null}>
          <div className="logo" />
          <LeftMenu />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={ContentStyle}>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  state => state,
  () => ({})
)(BaseLayout);

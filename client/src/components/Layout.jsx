import React, { PureComponent } from "react";
import { Layout, Avatar } from "antd";
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
        <Header style={{ background: "#fff", padding: 0 }}>
          <Avatar style={{ float: "right", margin: "18px" }} />
        </Header>
        <Layout>
          <Sider theme="light" width="40" />
          <LeftMenu />
          <Content style={ContentStyle}>{this.props.children}</Content>
          <Sider theme="light" />
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  state => state,
  () => ({})
)(BaseLayout);

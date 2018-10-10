import React, { PureComponent, Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { User } from "src/reducers/user";

const { Header, Sider, Content } = Layout;

type BaseLayoutProps = {
  user?: User
};
class BaseLayout extends PureComponent<BaseLayoutProps> {
  render() {
    const { user } = this.props;
    return (
      <Layout>
        {!!user.get("id") === false && <Redirect to="/login" />}
        <Sider trigger={null}>
          <div className="logo" />
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="dashboard" />
                <span>Orders</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/profile">
                <Icon type="user" />
                <span>Profile</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3" style={{ display: "none" }}>
              <Link to="/orders">
                <Icon type="database" />
                <span>Orders</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/sms-templates">
                <Icon type="message" />
                <span>SMS Templates</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/logout">
                <Icon type="logout" />
                <span>Logout</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content
            style={{
              background: "#fff",
              margin: "24px 16px",
              minHeight: "86vh",
              overflowY: "auto",
              padding: 24
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  state => state,
  () => ({})
)(BaseLayout);

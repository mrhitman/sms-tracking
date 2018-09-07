import React, { PureComponent } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const { Header, Sider, Content } = Layout;

class BaseLayout extends PureComponent {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { user } = this.props;
    return (
      <Layout>
        {!user.get("id") && <Redirect to="/login" />}
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
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
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: "86vh"
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseLayout);

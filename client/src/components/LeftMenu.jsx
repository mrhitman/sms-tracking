import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link, Redirect } from "react-router-dom";

const LeftMenu = () => {
  return (
    <Menu theme="ligth" mode="inline" style={{ width: "200px" }}>
      <Menu.Item key="orders">
        <Link to="/">
          <Icon type="dashboard" />
          <span>Orders</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="profile">
        <Link to="/profile">
          <Icon type="user" />
          <span>Profile</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="templates">
        <Link to="/sms-templates">
          <Icon type="message" />
          <span>SMS Templates</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="payments">
        <Link to="/orders">
          <Icon type="wallet" />
          <span>Payments</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;

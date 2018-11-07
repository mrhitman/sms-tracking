import React, { PureComponent } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link, Redirect } from "react-router-dom";

const LeftMenu = () => {
  return (
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
      <hr/>
      <Menu.Item key="5">
        <Link to="/logout">
          <Icon type="logout" />
          <span>Logout</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;

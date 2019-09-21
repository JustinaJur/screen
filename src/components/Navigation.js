import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

class Navigation extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item>{<NavLink to="/">Administration</NavLink>}</Menu.Item>
        <Menu.Item>{<NavLink to="/Screen">Screen</NavLink>}</Menu.Item>
        <Menu.Item>{<NavLink to="/Doctor">Doctor's page</NavLink>}</Menu.Item>
        <Menu.Item>{<NavLink to="/Client">Client's page</NavLink>}</Menu.Item>
      </Menu>
    );
  }
}

export default Navigation;

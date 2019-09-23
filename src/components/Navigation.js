import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Modal } from "semantic-ui-react";

import Screen from "../pages/Screen";

class Navigation extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item>{<NavLink to="/">Administration</NavLink>}</Menu.Item>
        <Modal
          trigger={
            <Menu.Item>{<NavLink to="/Screen">Screen</NavLink>} </Menu.Item>
          }
        >
          <div className="c-screen">
            <Modal.Content className="c-screen">
              <Screen />
            </Modal.Content>
          </div>
        </Modal>

        <Menu.Item>{<NavLink to="/Doctor">Doctor's page</NavLink>}</Menu.Item>
        <Menu.Item>{<NavLink to="/Client">Client's page</NavLink>}</Menu.Item>
      </Menu>
    );
  }
}

export default Navigation;

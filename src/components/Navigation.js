import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Navigation = props => {
  return (
    <Menu>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Administration</NavLink>
          </li>
          <li>
            <NavLink to="/Screen">Screen</NavLink>
          </li>
          <li>
            <NavLink to="/Doctor">Doctor's page</NavLink>
          </li>
          <li>
            <NavLink to="/Client">Client's page</NavLink>
          </li>
        </ul>
      </nav>
    </Menu>
  );
};

export default Navigation;

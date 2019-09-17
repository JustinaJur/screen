import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = props => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Administration</NavLink>
        </li>
        <li>
          <NavLink to="/Screen">Screen</NavLink>
        </li>
        <li>
          <NavLink to="/Private">Private</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

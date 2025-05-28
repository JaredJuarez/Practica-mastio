import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // Importamos el CSS para el Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <NavLink to="/" activeClassName="active-link">
            Project 1
          </NavLink>
        </li>
        <li>
          <NavLink to="/project2" activeClassName="active-link">
            Project 2
          </NavLink>
        </li>
        <li>
          <NavLink to="/project3" activeClassName="active-link">
            Project 3
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
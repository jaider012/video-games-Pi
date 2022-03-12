import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "./formulario/Searchbar";
import "../css/navbar.css";
import icongame from "../img/icongame2.png";
const NavBar = () => {
  return (
    <div className="fijar">
      <nav className="nav">
        <Link className="brand" to="/">
          <img src={icongame} alt="icongame"></img>
        </Link>
        <Searchbar />
        <ul className="nav-menu">
          <li className="nav-item">
            <Link className="nav-link" to="/create">
              agregar
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

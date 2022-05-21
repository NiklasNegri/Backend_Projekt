import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function NavbarLoggedOut() {
  return (
    <nav>
      <ul>
      <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarLoggedOut;
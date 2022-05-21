import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavbarLoggedIn() {

  const navigate = useNavigate();

  return (
    <nav>
      <ul>
      <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/booking">Booking</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/home" onClick={logout}>Logout</Link>
        </li>
      </ul>
    </nav>
  );

  function logout() {
    localStorage.clear();
    navigate('/home');
    window.location.reload();
  }
}

export default NavbarLoggedIn;
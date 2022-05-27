import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';

function NavbarLoggedIn() {

  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);

  const [navbar, setNavbar] = useState([]);

  useEffect(() => {
    determineRole();
  }, []);

  return (
    <div>
    { navbar }
    </div>
  );

  function determineRole() {
    if (parsedUser.role === "Admin") {
      setNavbar([
        <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>Schemabokare</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="home">Home</Nav.Link>
                <Nav.Link as={Link} to="admin">Admin</Nav.Link>
                <Nav.Link as={Link} to="profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="home" onClick={logout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </div>
      ])
    }

    else {
      setNavbar([
        <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>Schemabokare</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="home">Home</Nav.Link>
                <Nav.Link as={Link} to="createbooking">Create Booking</Nav.Link>
                <Nav.Link as={Link} to="bookinghistory">Booking History</Nav.Link>
                <Nav.Link as={Link} to="profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="home" onClick={logout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </div>])
    }
  }

  function logout() {
    localStorage.clear();
    navigate('/home');
    window.location.reload();
  }
}

export default NavbarLoggedIn;
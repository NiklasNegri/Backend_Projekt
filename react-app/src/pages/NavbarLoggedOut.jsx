import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';

function NavbarLoggedOut() {
  return (
    <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>Schemabokare</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="home">Home</Nav.Link>
                <Nav.Link as={Link} to="register">Register</Nav.Link>
                <Nav.Link as={Link} to="login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </div>
  );
}

export default NavbarLoggedOut;
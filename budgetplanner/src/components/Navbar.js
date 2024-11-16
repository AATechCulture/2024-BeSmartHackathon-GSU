import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom"; // For determining the active route
import "../styles/navbar.css";

const AppNavbar = () => {
  const location = useLocation(); // Get the current route

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="navbar">
      <Container>
        {/* Brand Name/Logo */}
        <Navbar.Brand href="/">sAIve</Navbar.Brand>

        {/* Hamburger Menu (For Mobile) */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" active={location.pathname === "/"}>
              Overview
            </Nav.Link>
            <Nav.Link href="/budgeting" active={location.pathname === "/budgeting"}>
              Budget
            </Nav.Link>
            <Nav.Link href="/investment" active={location.pathname === "/investment"}>
              Investment
            </Nav.Link>
            <Nav.Link href="/SignUp" active={location.pathname === "/SignUp"}>
              SignUp
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

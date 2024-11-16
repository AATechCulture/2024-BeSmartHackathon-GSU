import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'; // For determining the active route
import '../styles/navbar.css';


const AppNavbar = () => {
  const location = useLocation(); // Get the current route

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className='navbar'>
      <Container>
        {/* Brand Name/Logo */}
        <Navbar.Brand href="/">sAIve</Navbar.Brand>

        {/* Hamburger Menu (For Mobile) */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" active={location.pathname === '/'}>
              Overview
            </Nav.Link>
            <Nav.Link href="/budget" active={location.pathname === '/budget'}>
              Budget
            </Nav.Link>
            <Nav.Link href="/Investment" active={location.pathname === '/Investment'}>
              Investment
            </Nav.Link>
            {/*<Nav.Link href="/reports" active={location.pathname === '/reports'}>
              Reports
            </Nav.Link>*/}

            {/* Profile Dropdown */}
            <NavDropdown title="Profile" id="nav-dropdown">
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

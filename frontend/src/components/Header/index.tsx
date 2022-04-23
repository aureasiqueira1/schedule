import React from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.css';

const Header: React.FC = () => {
  return (
    <Navbar className="navbar" expand="lg">
      <Container className="title-navbar">

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item as={Link} className="title-agenda" to="/">Agenda</Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header({ language, handleLanguageChange }) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/">{language === "en" ? "React Site" : "Strona React"}</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/about">{language === "en" ? "About" : "O mnie"}</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/contact">
              {language === "en" ? "Contact" : "Kontakt"}
            </Link>
          </Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title={language.toUpperCase()} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleLanguageChange} value="en">
              EN
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLanguageChange} value="pl">
              PL
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link>
            <Link to="/login">
              {language === "en" ? "Log In" : "Zaloguj się"}
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
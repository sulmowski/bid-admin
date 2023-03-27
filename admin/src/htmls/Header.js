import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">{t("header.home")}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#about">{t("header.about")}</Nav.Link>
        </Nav>
        <NavDropdown title={t("header.contact")} id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">{t("header.contact.email")}</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.2">{t("header.contact.phone")}</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
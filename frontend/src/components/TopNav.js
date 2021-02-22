import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class TopNav extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-2">
        <Container>
          <Link to="/">
            <Navbar.Brand>TwahiFoundation</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/">Home</Link>
              <Link to="/blogpage">News</Link>

              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">Projects</Nav.Link>
              <Nav.Link href="#">Events</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export { TopNav };

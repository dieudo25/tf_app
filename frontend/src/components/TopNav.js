import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

class TopNav extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-2">
        <Container>
          <Navbar.Brand href="#">TwahiFoundation</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">News</Nav.Link>
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

import React from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import { MenuItem } from "./MenuItem";
class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get(`/api/blog/menu-item/`).then((res) => {
      this.setState({
        menu: res.data.results,
        loading: false,
      });
    });
  }

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
              <ul>
                {this.state.menu.map((item) => (
                  <li>
                    <MenuItem item={item} key={item.id} />
                  </li>
                ))}
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export { TopNav };

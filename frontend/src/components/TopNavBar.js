import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  width: 1170px;
  margin: auto;
  height: 60px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
`;
const Logo = styled.div`
  width: fit-content;
  float: left;
  color: #fff;
`;

const LogoTitle = styled.h2`
  font-family: "Catamaran", sans-serif;
  font-weight: 900;
`;
const Menu = styled.div`
  width: 80%;
  float: right;
`;
const MenuList = styled.ul`
  float: right;
  list-style: none;
`;
const MenuListItem = styled.li`
  display: inline-block;
`;
const MenuListItemLink = {
  display: "inline-block",
  textDecoration: "none",
  color: "#fff",
  padding: "15px",
  fontFamily: "'Catamaran', sans-serif",
  fontWeight: "900",
};

class TopNavBar extends React.Component {
  render() {
    return (
      <Nav>
        <Logo className="logo">
          <LogoTitle>
            <Link style={MenuListItemLink} to="/">
              TwahiFoundation
            </Link>
          </LogoTitle>
        </Logo>
        <Menu className="menu">
          <MenuList>
            <MenuListItem>
              <Link style={MenuListItemLink} to="/">
                Home
              </Link>
            </MenuListItem>
            <MenuListItem>
              <Link style={MenuListItemLink} to="/blogpage">
                News
              </Link>
            </MenuListItem>
            <MenuListItem>
              <Link style={MenuListItemLink} to="/">
                About
              </Link>
            </MenuListItem>
            <MenuListItem>
              <Link style={MenuListItemLink} to="/">
                Projects
              </Link>
            </MenuListItem>
            <MenuListItem>
              <Link style={MenuListItemLink} to="/">
                Events
              </Link>
            </MenuListItem>
            <MenuListItem>
              <Link style={MenuListItemLink} to="/">
                Contact
              </Link>
            </MenuListItem>
          </MenuList>
        </Menu>
      </Nav>
    );
  }
}

export { TopNavBar };

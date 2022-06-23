import React from "react";
import { Navbar, Container, NavDropdown, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../images/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { clearState, logout } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";

const NavB = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(clearState());
    navigate("/");
  };

  const onLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const onSignup = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="nav-bar">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <img
              src={logo}
              alt="logo"
              className=" img-fluid float-left logo"></img>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/find-jobs">
                <Nav.Link>Find Jobs</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/post-jobs">
                <Nav.Link>Post Jobs</Nav.Link>
              </LinkContainer>
              <Button onClick={onLogin}>Sign In</Button>
              <Button onClick={onSignup}>Sign Up</Button>
            </Nav>
            <NavDropdown title="" id="collasible-nav-dropdown">
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin-panel">
                <NavDropdown.Item>Settings</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/">
                <Button onClick={onLogout}>Logout</Button>
              </LinkContainer>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavB;

import React from 'react';
import './Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';

function Header(props) {
  const {isLoggedIn} = props;

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
          <Navbar.Brand href="/">RoadTrips</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn  
                ?<>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/">Change username</NavDropdown.Item>
                  <NavDropdown.Item href="/">Change password</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/login">Logout</Nav.Link>
                </>
                :<>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              }

              

            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>


  )
}

export default Header
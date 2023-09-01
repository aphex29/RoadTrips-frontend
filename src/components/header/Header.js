import React from 'react';
import './Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { useUser } from '../UserContext';

function Header() {
  const {isLoggedIn,userInfo} = useUser();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
          <Navbar.Brand href="/">RoadTrips</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn  

                ?<>
                <Nav.Link href={"/profile/"+userInfo.username}>Profile</Nav.Link>
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/">Change username</NavDropdown.Item>
                  <NavDropdown.Item href="/">Change password</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={()=> {const val = {};
                                        localStorage.setItem('user',JSON.stringify(val)); 
                                        localStorage.setItem('logged',false)}} href="/login">Logout</Nav.Link>
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
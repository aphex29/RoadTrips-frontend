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
    <section className="nav_container">
    <Navbar expand="lg" className="sticky-top">
      <Container>
          <Navbar.Brand href="/"><span>RoadTrips</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn  

                ?<>
                <Nav.Link href={"/profile/"+userInfo.username}><span>Trips</span></Nav.Link>
                <NavDropdown title="Settings" id="basic-nav-dropdown" style={{"color":"white"}}>
                  <NavDropdown.Item href="/">Change username</NavDropdown.Item>
                  <NavDropdown.Item href="/">Change password</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={()=> {const val = {};
                                        localStorage.setItem('user',JSON.stringify(val)); 
                                        localStorage.setItem('logged',false)}} href="/login"><span>Logout</span></Nav.Link>              
                </>

                :<>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              }         
            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
    </section>
  )
}

export default Header
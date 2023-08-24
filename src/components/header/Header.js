import React from 'react'

import {Nav, Navbar, Button, Alert, Breadcrumb, Container} from 'react-bootstrap';
function Header() {

  return (
    <Navbar className="bg-dark" expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{color:"white"}}>RoadTrips</Navbar.Brand>
        <Navbar.Brand href="/login" style={{color:"white"}}>Logout</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
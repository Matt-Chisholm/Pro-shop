import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { faShoppingCart, faUser } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>ProShop</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'></Navbar.Collapse>
          <Nav className='ml-auto'>
            <Nav.Link href='/cart'>
              <faShoppingCart /> Cart
            </Nav.Link>
            <Nav.Link href='/login'>
              <faUser /> Sign In
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

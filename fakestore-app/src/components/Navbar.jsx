import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import lunelleCombo from '../assets/lunelle_combo-light.png';
import './NavbarCustom.css';
import { useCart } from '../context/useCart';
import { FaShoppingCart } from 'react-icons/fa';

const NavbarCustom = () => {
  const { cartItems } = useCart();
  return (
    <Navbar className="custom-navbar px-3" fixed="top" expand="md">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={lunelleCombo}
            alt="Lunelle Logo"
            height="40"
            className="navbar-logo-full"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Shop Products</Nav.Link>
            <Nav.Link as={Link} to="/products/new">Add Products</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="cart-link position-relative ms-3">
              <FaShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarCustom;

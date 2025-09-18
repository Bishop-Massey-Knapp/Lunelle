import React from 'react';
import { useCart } from '../context/useCart';
import NavbarCustom from './Navbar.jsx';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const Cart = () => {
  const { cartItems } = useCart();
  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <>
      <NavbarCustom />
      <Container className="mt-5 mb-5 cart-container">
        <h2 className="mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <Row className="g-4 mb-4">
              {cartItems.map((item, idx) => (
                <Col md={6} lg={4} key={idx}>
                  <Card className="mb-3">
                    <Card.Img variant="top" src={item.image} style={{height: '120px', objectFit: 'contain'}} />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>${item.price?.toFixed(2)}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <h4 className="mb-3">Total: ${total.toFixed(2)}</h4>
            <Button className="enchant-btn-glow" onClick={() => alert('Checkout complete! (Fake checkout)')}>Checkout</Button>
          </>
        )}
      </Container>
    </>
  );
};

export default Cart;

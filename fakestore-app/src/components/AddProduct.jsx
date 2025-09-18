import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavbarCustom from './Navbar.jsx';
import './Products.css';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('jewelery');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        navigate('/');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [navigate]);

  const handleExit = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post('https://fakestoreapi.com/products', {
        title,
        price: parseFloat(price),
        description,
        category,
        image: 'https://placehold.co/300x300?text=Lumelle' // placeholder image
      });
      setSuccess(true);
      setTitle('');
      setPrice('');
      setDescription('');
      setCategory('jewelery');
    } catch {
      setError('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarCustom />
      <Container className="mt-5 mb-5 position-relative" style={{ width: '80vw', maxWidth: '80vw' }}>
        <Row className="justify-content-center">
          <Col xs={12}>
            <div ref={formRef}>
              <Button className="exit-btn-glow position-absolute top-0 end-0 m-3" onClick={handleExit} aria-label="Exit" style={{zIndex:2}}>
                &times;
              </Button>
              <div className="product-details-card mystical-glow p-4">
                <h2 className="welcome-header mb-4">Add a Magical Product</h2>
                {success && <Alert variant="success">Product created successfully!</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label className="product-title">Product Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} required className="mystical-input" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label className="product-title">Price</Form.Label>
                    <Form.Control type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required className="mystical-input" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label className="product-title">Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} required className="mystical-input" />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formCategory">
                    <Form.Label className="product-title">Category</Form.Label>
                    <Form.Select value={category} onChange={e => setCategory(e.target.value)} className="mystical-input">
                      <option value="jewelery">Jewelery</option>
                      <option value="women's clothing">Women's Clothing</option>
                    </Form.Select>
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button className="enchant-btn-glow px-5" type="submit" disabled={loading}>
                      {loading ? <Spinner size="sm" animation="border" /> : 'Create Product'}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddProduct;

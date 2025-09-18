import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import { useCart } from '../context/useCart';
import { FaEdit } from 'react-icons/fa';
import EditProductModal from './EditProductModal.jsx';
import './Products.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        navigate('/products');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [navigate]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    alert('Added to cart!');
  };


  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleProductUpdate = (updated) => {
    setProduct(updated);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '60vh' }}>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5 position-relative">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div ref={cardRef} className="position-relative">
            <Button
              variant="link"
              className="edit-brush-btn position-absolute top-0 start-0 m-3 p-1"
              style={{zIndex:2}}
              onClick={handleEditClick}
              aria-label="Edit Product"
            >
              <FaEdit size={22} color="#3f5eab" />
            </Button>
            <Card className="product-details-card mystical-glow p-3">
              <Card.Img variant="top" src={product.image} alt={product.title} className="product-img mb-3" />
              <Card.Body>
                <Card.Title className="product-title mb-3 two-line-ellipsis">{product.title}</Card.Title>
                <Card.Text className="product-desc mb-2">{product.description}</Card.Text>
                <Card.Text className="product-category mb-2"><strong>Category:</strong> {product.category}</Card.Text>
                <Card.Text className="product-price mb-4">${product.price.toFixed(2)}</Card.Text>
                <div className="d-flex justify-content-center button-row" style={{gap: '0.75rem'}}>
                  <Button
                    className="enchant-btn-glow"
                    style={added ? { background: '#213163', border: 'none' } : {}}
                    onClick={handleAddToCart}
                    disabled={added}
                  >
                    {added ? 'Added!' : 'Add to Cart'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
            <EditProductModal
              show={showModal}
              onHide={handleModalClose}
              product={product} // always pass the current product, not editedProduct
              onUpdate={handleProductUpdate}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;

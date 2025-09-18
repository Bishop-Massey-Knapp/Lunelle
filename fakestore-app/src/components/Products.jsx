import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Spinner, Alert, Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import NavbarCustom from './Navbar.jsx';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        const filtered = res.data.filter(
          p => p.category === 'jewelery' || p.category === "women's clothing"
        );
        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleDeleteClick = (product) => {
    setDeleteTarget(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`https://fakestoreapi.com/products/${deleteTarget.id}`);
      setProducts(products.filter(p => p.id !== deleteTarget.id));
      setShowDeleteModal(false);
      setDeleteTarget(null);
    } catch {
      alert('Failed to delete product.');
    }
    setDeleteLoading(false);
  };

  if (loading) {
    return (
      <>
        <NavbarCustom />
        <Container className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '60vh' }}>
          <Spinner animation="border" variant="primary" />
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavbarCustom />
        <Container className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '60vh' }}>
          <Alert variant="danger">{error}</Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavbarCustom />
      <Container className="mt-5 mb-5">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {products.map(product => (
            <Col key={product.id}>
              <Card className="product-card h-100">
                <Card.Img variant="top" src={product.image} alt={product.title} className="product-img" />
                <Card.Body>
                  <Card.Title className="product-title two-line-ellipsis">{product.title}</Card.Title>
                  <Card.Text className="product-price">${product.price.toFixed(2)}</Card.Text>
                  <div className="button-row d-flex justify-content-between align-items-center mt-2">
                    <Button
                      as={Link}
                      to={`/products/${product.id}`}
                      className="view-details-btn"
                    >
                      View Details
                    </Button>
                    <Button
                      className="delete-item-btn"
                      onClick={() => handleDeleteClick(product)}
                      disabled={deleteLoading}
                    >
                      Delete Item
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        contentClassName="delete-confirm-modal"
        backdropClassName="modal-backdrop"
      >
        <Modal.Body className="text-center">
          <div className="mb-3" style={{ fontWeight: 'bold', fontSize: '1.1rem', fontFamily: 'Quicksand' }}>
            Are you sure you want to delete{' '}
            <span style={{ color: '#ede4c2' }}>{deleteTarget?.title}</span>?
          </div>
          <Button
            className="delete-item-btn"
            onClick={handleDeleteConfirm}
            disabled={deleteLoading}
            style={{ marginRight: '1rem' }}
          >
            Delete
          </Button>
          <Button
            className="keep-btn"
            onClick={() => setShowDeleteModal(false)}
            disabled={deleteLoading}
          >
            Keep
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Products;

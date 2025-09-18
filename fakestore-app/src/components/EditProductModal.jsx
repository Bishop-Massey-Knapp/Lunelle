import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProductModal = ({ show, onHide, product, onUpdate }) => {
  const [title, setTitle] = useState(product?.title || '');
  const [price, setPrice] = useState(product?.price || '');
  const [description, setDescription] = useState(product?.description || '');
  const [category, setCategory] = useState(product?.category || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setTitle(product?.title || '');
    setPrice(product?.price || '');
    setDescription(product?.description || '');
    setCategory(product?.category || '');
    setSuccess(false);
    // Do NOT reset showDeleteConfirm, deleteLoading, or deleteSuccess here
  }, [product, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`https://fakestoreapi.com/products/${product.id}`, {
        title, price, description, category
      });
      setSuccess(true);
      onUpdate && onUpdate({ ...product, title, price, description, category });
    } catch {
      alert('Failed to update product.');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`https://fakestoreapi.com/products/${product.id}`);
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteLoading(false);
        setShowDeleteWindow(false);
        onHide();
        navigate('/products');
      }, 1200);
    } catch {
      setDeleteLoading(false);
      alert('Failed to delete product.');
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered backdrop="static" keyboard>
        <Modal.Header>
          <Modal.Title className="ms-3">Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control value={title} onChange={e => setTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" value={description} onChange={e => setDescription(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control value={category} onChange={e => setCategory(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            {success && <div className="mt-3 text-success">Product updated successfully!</div>}
          </Form>
          <hr />
        </Modal.Body>
      </Modal>
      <Modal show={showDeleteWindow} onHide={() => setShowDeleteWindow(false)} centered>
        <Modal.Header closeButton />
        <Modal.Body className="text-center">
          <div className="mb-3" style={{fontWeight:'bold',color:'#b71c1c',fontSize:'1.2rem'}}>
            Are you sure you want to Banish <span style={{color:'#191970'}}>{title}</span>?
          </div>
          <Button
            style={{ background: '#b71c1c', border: 'none', color: '#fff', fontWeight: 'bold', marginRight: '1rem' }}
            onClick={handleDelete}
            disabled={deleteLoading}
          >
            Banish
          </Button>
          <Button
            style={{ background: '#2ecc40', border: 'none', color: '#fff', fontWeight: 'bold' }}
            onClick={() => setShowDeleteWindow(false)}
            disabled={deleteLoading}
          >
            Keep
          </Button>
          {deleteSuccess && <div className="mt-3 text-success">Item banished! Redirecting...</div>}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProductModal;

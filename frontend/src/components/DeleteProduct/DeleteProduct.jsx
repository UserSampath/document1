import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const DeleteModal = ({ handleDeleteClose, showDelete ,handleDelete}) => {
    const handleDeleteButtonClick = async () => {
        try {
          await handleDelete(); // Call the handleDelete function provided as a prop
          handleDeleteClose(); // Close the modal
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };
  return (
    <div>   
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header>
          <Modal.Title style={{ margin: "auto", paddingLeft: "0px", fontSize: "30px" }}>
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this product?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDeleteButtonClick}>
              Delete
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteModal;

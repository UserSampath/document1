import React from 'react';
import Button from "../Button/Button";
import Modal from "react-bootstrap/Modal";

const ViewDoc = ({ show, setShow ,handleClose}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Documents</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Here is where you can view past documents.</p>
        <p>This modal doesn't have any input fields.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button type={"2"}
                                        text="Close"
                                        onClick={handleClose}>
          Close
        </Button>
        {/* You can add additional buttons or functionality here */}
      </Modal.Footer>
    </Modal>
  );
}

export default ViewDoc;

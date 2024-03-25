import React from "react";
import Button from "../Button/Button";
import Modal from "react-bootstrap/Modal";

const ViewDoc = ({ show, setShow, handleClose, userType }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Documents</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{userType}</p>
        <div style={{ width:"600px"}}>asas</div>
      </Modal.Body>
      <Modal.Footer>
        <Button type={"2"} text="Close" onClick={handleClose}>
          Close
        </Button>
        {/* You can add additional buttons or functionality here */}
      </Modal.Footer>
    </Modal>
  );
};

export default ViewDoc;

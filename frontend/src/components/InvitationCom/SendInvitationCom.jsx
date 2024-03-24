import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SendInvitationCom = ({ handleClose, show, setShow }) => {
  const [email, setEmail] = useState('');
  const [employeeStatus, setEmployeeStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !employeeStatus ) {
        toast.error("Please fill in all fields");
        return;
      }

      const requestEmail = {
        email: email,
        employeeStatus: employeeStatus,
      };
      
      const response = await axios.post(
        `${backendUrl}/docmentReq/createDocReq`, // Corrected URL
        requestEmail
      );
        console.log(response);
      if (response.status === 200) {
        toast.success('Invitation sent successfully!');
        setShow(false);
        setEmail("");
        setEmployeeStatus("");
      }
    } catch (error) {
      toast.error('Failed to send invitation.');
      console.error(error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formEmployeeStatus">
              <Form.Label>Employee Status</Form.Label>
              <Form.Control as="select" value={employeeStatus} onChange={(e) => setEmployeeStatus(e.target.value)}>
                <option value="">Select status</option>
                <option value="employee">Employee</option>
                <option value="nonEmployee">Non-Employee</option>
              </Form.Control>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SendInvitationCom;
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormGroup, FormCheck } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SendInvitationCom = ({ handleClose, show, setShow, updateInvitations }) => {
  const [email, setEmail] = useState('');
  const [employeeStatus, setEmployeeStatus] = useState('');
  const [selectedPDFs, setSelectedPDFs] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        if (employeeStatus) {
          const response = await axios.get(`${backendUrl}/document/getAllDocumentsWithFilter/${employeeStatus}`);
          console.log(response.data.result.result);
          if (response.status === 200) {
            setDocuments(response.data.result.result);
          } else {
            setError('Failed to fetch documents');
          }
        }
      } catch (error) {
        setError('Failed to fetch documents');
      }
    }

    fetchDocuments();
  }, [employeeStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !employeeStatus || selectedPDFs.length === 0) {
        toast.error("Please fill in all fields");
        return;
      }

      const requestEmail = {
        email: email,
        type: employeeStatus,
        documentIdList: selectedPDFs 
      };
      const response = await axios.post(
        `${backendUrl}/userDocument/createUserDocument`,
        requestEmail
      );
      if (response.status === 200) {
        toast.success('Invitation sent successfully!');
        setShow(false);
        setEmail("");
        setEmployeeStatus("");
        setSelectedPDFs([]);
        updateInvitations(response.data.result);
      } else if (response.status === 500) {
        console.log(response);
      }
    } catch (error) {
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPDFs(prevSelectedPDFs => [...prevSelectedPDFs, value]);
    } else {
      setSelectedPDFs(prevSelectedPDFs => prevSelectedPDFs.filter(pdf => pdf !== value));
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmployeeStatus">
              <Form.Label>Employee Status</Form.Label>
              <Form.Control
                as="select"
                value={employeeStatus}
                onChange={(e) => setEmployeeStatus(e.target.value)}>
                <option value="">Select status</option>
                <option value="employee">Employee</option>
                <option value="nonEmployee">Non-Employee</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formSelectedPDFs">
              {documents.length>0 && <Form.Label>Select Documents</Form.Label>}

              {documents.map((doc, index) => (
                <FormGroup key={index} controlId={`checkbox_${doc.id}`}>
                  <FormCheck
                    type="checkbox"
                    id={`checkbox_${doc.id}`}
                    label={doc.name}
                    value={doc.id}
                    onChange={handleCheckboxChange}
                  />
                </FormGroup>
              ))}
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

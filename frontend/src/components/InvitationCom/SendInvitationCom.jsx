import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SendInvitationCom = ({ handleClose, show, setShow, updateInvitations }) => {
  const [email, setEmail] = useState('');
  const [employeeStatus, setEmployeeStatus] = useState('');
  const [selectedPDFs, setSelectedPDFs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !employeeStatus || selectedPDFs.length === 0) {
        toast.error("Please fill in all fields");
        return;
      }

      const requestEmail = {
        email: email,
        employeeStatus: employeeStatus,
        selectedPDFs: selectedPDFs // Include selected PDFs in the request
      };
      const response = await axios.post(
        `${backendUrl}/docmentReq/createDocReq`,
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

  // Dummy PDF names
  const pdfNames = ['PDF 1', 'PDF 2', 'PDF 3'];

  // Render checkboxes based on selected employee status
  const renderPDFCheckboxes = () => {
    return pdfNames.map((pdf, index) => (
      <Form.Check
        key={index}
        type="checkbox"
        id={`pdf-checkbox-${index}`}
        label={pdf}
        onChange={(e) => handlePDFCheckboxChange(pdf, e.target.checked)}
        style={{marginTop: '10px'}}
      />
    ));
  };

  // Handle PDF checkbox change
  const handlePDFCheckboxChange = (pdf, isChecked) => {
    if (isChecked) {
      setSelectedPDFs((prevSelectedPDFs) => [...prevSelectedPDFs, pdf]);
    } else {
      setSelectedPDFs((prevSelectedPDFs) =>
        prevSelectedPDFs.filter((selectedPDF) => selectedPDF !== pdf)
      );
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

            {renderPDFCheckboxes()}

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

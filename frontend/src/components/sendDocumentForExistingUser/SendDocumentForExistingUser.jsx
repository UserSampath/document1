import React, { useState, useEffect } from "react";
import { Modal, Button, Form, FormGroup, FormCheck } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SendDocumentForExistingUser = ({
  handleClose,
  show,
  setShow,
  updateInvitations,
  userData,
}) => {
  const [email, setEmail] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [selectedPDFs, setSelectedPDFs] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await axios.get(
          `${backendUrl}/document/getAllDocumentsWithFilter/${userData.type}`
        );
        console.log(response.data.result.result);
        if (response.status === 200) {
          setDocuments(response.data.result.result);
        } else {
          setError("Failed to fetch documents");
        }
      } catch (error) {
        setError("Failed to fetch documents");
      }
    }

    if (userData && Object.keys(userData).length !== 0) {
      console.log(userData);
      fetchDocuments();
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}/userDocument/createUserDocumentForExistingUser`,
        {
          userId: userData.id,
          documentIdList: selectedPDFs,
        }
      );
      if (response.data.result.status) {
        console.log(response.data.result);
        toast.success("Document sent successfully!");

        if (response.data.result.result.alreadySentDocuments.length > 0) {
        toast.warning(
          `${response.data.result.result.alreadySentDocuments.length} document/s already sent to this user`
        );
          
        }
        setShow(false);
        setSelectedPDFs([]);
        updateInvitations(response.data.result.result);
      }
    } catch (error) {
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPDFs((prevSelectedPDFs) => [...prevSelectedPDFs, value]);
    } else {
      setSelectedPDFs((prevSelectedPDFs) =>
        prevSelectedPDFs.filter((pdf) => pdf !== value)
      );
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Documents</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSelectedPDFs">
              {documents.length > 0 && (
                <Form.Label>Select Documents</Form.Label>
              )}

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

export default SendDocumentForExistingUser;

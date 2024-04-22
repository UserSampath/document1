// UploadDoc.jsx
import React, { useState } from 'react';
import { Modal, Form, Button, FormCheck } from 'react-bootstrap';
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';
import { toast } from 'react-toastify';

const UploadDoc = ({ show, handleClose ,onUpload}) => {
  const [documentName, setDocumentName] = useState('');
  const [employeeFile, setEmployeeFile] = useState(null);
  const [isAttachments, setIsAttachments] = useState(false);
  const [documentType, setDocumentType] = useState("employee");

  const handleEmployeeFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("pdf", employeeFile);
      formData.append("name", documentName);
      formData.append("type", documentType);
      formData.append("is_need_attachment", isAttachments);

      const response = await axios.post("http://localhost:8000/document/createDocument", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.response_code === 200) {
        handleClose(); // Close the modal after successful upload
        setDocumentName("");
        setEmployeeFile(null);
        setIsAttachments(false);
        toast.success("Document uploaded successfully");
        if (onUpload) {
          onUpload(response.data.result); // Inform parent component about the upload
        }
      } else {
        toast.error("Failed to upload document");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to upload document");
    }
  };

  const handleEmployeeDocumentChange = (file) => {
    setEmployeeFile(file);
  };

  const handleDocumentNameChange = (event) => {
    setDocumentName(event.target.value);
  };

    const handleDocumentTypeChange = (event) => {
      setDocumentType(event.target.value);
    };

  const handleCheckboxChange = (event) => {
    setIsAttachments(event.target.checked);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="documentName">
            <Form.Label>Document Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter document name"
              value={documentName}
              onChange={handleDocumentNameChange}
            />
          </Form.Group>
          <Form.Group controlId="documentType">
            <Form.Label>Select Type</Form.Label>
            <Form.Control
              as="select"
              value={documentType}
              onChange={handleDocumentTypeChange}>
              <option value="employee">Employee</option>
              <option value="nonEmployee">Non-Employee</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="attachmentCheckbox">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}>
              <span style={{ marginRight: "10px" }}>Need Attachment</span>
              <FormCheck
                type="checkbox"
                checked={isAttachments}
                onChange={handleCheckboxChange}
              />
            </div>
          </Form.Group>
          <Form.Label>Upload Document</Form.Label>
          <FileUploader
            handleChange={handleEmployeeDocumentChange}
            name="file"
            types={["PDF"]}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEmployeeFileUpload}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadDoc;

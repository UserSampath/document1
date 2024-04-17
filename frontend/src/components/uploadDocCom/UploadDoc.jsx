import React, { useState } from 'react';
import { Modal, Form, Button, FormCheck } from 'react-bootstrap';
import { FileUploader } from "react-drag-drop-files";

const UploadDoc = ({show,setShow,handleClose}) => {
  const [documentName, setDocumentName] = useState('');
  const [hasAttachment, setHasAttachment] = useState(false);

  const handleNonEmployeeDocumentChange = (file) => {
    // handle file upload logic here
    console.log('File uploaded:', file);
  };


  const handleDocumentNameChange = (event) => {
    setDocumentName(event.target.value);
  };

  const handleAttachmentCheckboxChange = () => {
    setHasAttachment(!hasAttachment);
  };

  const fileTypes = []; // define your file types here

  return (
    <div>
      <Button variant="primary" onClick={setShow}>
        Upload Document
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Upload Document</Modal.Title>
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
            <div style={{marginTop:"10px",marginBottom:"10px"}}>
            <Form.Group controlId="attachmentCheckbox">
            <div
            label="Need Attachment"
            style={{ display: 'flex',  alignItems: 'center' }}
        >
            <span style={{ marginRight: '10px' }}>Need Attachment</span>
            <FormCheck />
        </div>
            </Form.Group>
            </div>
            <Form.Label>Upload Document</Form.Label>
            <FileUploader
              handleChange={handleNonEmployeeDocumentChange}
              name="file"
              types={fileTypes}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadDoc;

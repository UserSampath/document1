import React, { useState } from 'react';
import { Modal, Form, Button, FormCheck } from 'react-bootstrap';
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["PDF"];
import axios from 'axios';
import { toast } from 'react-toastify';

const UploadDoc = ({show,setShow,handleClose,onUpload}) => {
  const [documentName, setDocumentName] = useState('');
  const [employeeFile, setEmployeeFile] = useState(null);
  const [isAttachments, setIsAttachments] = useState(false); // Corrected state name


  const handleNonEmployeeFileUpload = async () => {
    // Include isAttachments in form data
     try {
       const formData = new FormData();
       formData.append("pdf", employeeFile);
       formData.append("name", documentName);
       formData.append("type", 'nonEmployee');
       formData.append("is_need_attachment", isAttachments);
       console.log(formData) 
       const response = await axios.post("http://localhost:8000/document/createDocument", formData, {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       });
       console.log(response);
       if (response.data.response_code == 200) {
         handleClose();
         setDocumentName("");
         setEmployeeFile(null);
         setIsAttachments(false);
         toast.success("Document upload successfully");
       } else {
         toast.error("Document not updated");
       }
     } catch (error) {
       console.error("Error:", error);
     }
   };



  const handleNonEmployeeDocumentChange = (file) => {
    // handle file upload logic here'
    setEmployeeFile(file);

    console.log('File uploaded:', file);
  };


  const handleDocumentNameChange = (event) => {
    setDocumentName(event.target.value);
  };


  const handleCheckboxChange = (event) => {
    setIsAttachments(event.target.checked);
  };

  // define your file types here

  return (
    <div>
      

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
            <Form.Group controlId="attachmentCheckbox">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '10px' }}>Need Attachment</span>
                <FormCheck
                  type="checkbox"
                  checked={isAttachments}
                  onChange={handleCheckboxChange}
                />
              </div>
            </Form.Group>
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
          <Button variant="primary" onClick={handleNonEmployeeFileUpload}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadDoc;

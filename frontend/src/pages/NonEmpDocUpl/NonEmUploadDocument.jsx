import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/Navbar";
import SideBar from "../../components/side/SideBar";
import Button from "../../components/Button/Button";
import { FileUploader } from "react-drag-drop-files";
import "./NonEmpUpload.css";
import ViewDoc from "../../components/ViewDoc/ViewDoc";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Pdf from "../../../image/Pdf.png";
import UploadDoc from "../../components/NonEmpuploadDocCom/UploadDoc";
import { Modal,  } from 'react-bootstrap';

const fileTypes = ["PDF"];

const NonEmUploadDocument = () => {
  const navigate = useNavigate();

  const pageNavi = () => {
    navigate("/UploadDocument");
  };

  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem("sideBarOpen") === "true"
  );
  const [nonEmployeeDocument, setNonEmployeeDocument] = useState([]);
  const [showUploadModal, setUploadShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);



  useEffect(() => {
    const getAllDocuments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/document/getAllDocumentsWithFilter/nonEmployee"
        );
        setNonEmployeeDocument(response.data.result.result)
      } catch (error) {
        console.log(error);
      }
    };
    getAllDocuments();
  }, []);

  
  const handleUploadClick = () => {
    setUploadShowModal(true);
  };
  const handleDeleteClick = (documentId) => {
    setDocumentToDelete(documentId);
    setShowDeleteModal(true);
  };
  

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/document/deleteDocumentById/${documentToDelete}`);
      if (response.status === 200) {
        toast.success("Document deleted successfully");
        setNonEmployeeDocument(nonEmployeeDocument.filter(doc => doc.id !== documentToDelete));
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Error deleting document");
    }
  };
  const handleDocumentUpload = (newDocument) => {
    setNonEmployeeDocument(prevDocuments => [...prevDocuments, newDocument]);
    setUploadShowModal(false); // Close the modal after successful upload
  };


  const renderNonEmployeeDocuments = () => {
    return nonEmployeeDocument.map((document) => (
      <div key={document.id} style={{ width: "1000px" }}>
        <div
      
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "30px",
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            marginTop: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <img src={Pdf} style={{ width: "60px", marginRight: "10px", fontSize: "40px" }} />
          <div style={{ flex: 1, textAlign: "center", alignItems: "center", gap: "5px", justifyContent: "center" }}>
            <p>{document.name}</p>
          </div>
          <div style={{ flex: 1, textAlign: "center", alignItems: "center", gap: "5px", justifyContent: "center" }}>
            <p>{document.is_need_attachment ? "Need Attachment" : "No Need Attachment"}</p>
          </div>
          <div style={{ marginLeft: "35px", display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              className="document_update_button"
              style={{
                backgroundColor: "#008000",
                borderRadius: "5px",
                transition: "0.5s ease-in-out",
                boxShadow: "#008000",
                textAlign: "center",
              }}
            >
              <div style={{ padding: "6px 12px", color: "white" }}> Update </div>
            </div>

            <div
              className="document_preview_button"
              style={{
                backgroundColor: "#3232f4",
                borderRadius: "5px",
                transition: "0.5s ease-in-out",
                boxShadow: "#3232f4",
                textAlign: "center",
              }}
            >
              <a href={document.src} target="_blank" rel="noreferrer" style={{ display: "block", color: "white", textDecoration: "none", padding: "6px 12px" }}>
                Preview
              </a>
            </div>

            <div
              className="document_delete_button"
              style={{
                backgroundColor: "#ff0000",
                borderRadius: "5px",
                transition: "0.5s ease-in-out",
                boxShadow: "#c23815",
                textAlign: "center",
              }}
              onClick={() => handleDeleteClick(document.id)}
            >
              <div style={{ padding: "6px 12px", color: "white" }}> Delete </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
    <SideBar setSidebarOpen={setSidebarOpen} selectedNav="Upload Document">
      <div>
        <NavBar sidebarOpen={sidebarOpen} />
        <div
          style={{
            transition: "padding-left 300ms",
            paddingTop: "50px",
            paddingLeft: sidebarOpen ? "240px" : "60px",
          }}
        >
          <div style={{ marginLeft: "65%", marginRight: "5%" ,display:"flex",gap:"5px" }}>
          <Button
                type={"2"}
                text="Upload documents"
                style={{ marginLeft: "10px" }}
                onClick={handleUploadClick}
                // Add margin between button and search bar
              />
            <Button
              type={"1"}
              text=" Employee document"
              style={{ marginLeft: "10px" }}
              onClick={pageNavi}
              // Add margin between button and search bar
            />
          </div>
          <div
            className="d-flex flex-wrap justify-content-center align-items-center"
            style={{
              margin: "30px 100px",
              padding: "50px 0px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
             <div >
       
        <div className="d-flex justify-content-center align-items-center ">
        <h4 style={{color: "#3232f4"}}> Non-Employee Documents</h4>
      </div>
      {renderNonEmployeeDocuments()}

            </div>
          </div>
        </div>
      </div>
    </SideBar>
    {/* Modal component */}
    {showDeleteModal && (
         <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
         <Modal.Header closeButton>
           <Modal.Title>Delete Document</Modal.Title>

         </Modal.Header>
         <Modal.Body>
           <p>Are you sure you want to delete this document?</p>
         </Modal.Body>
         <Modal.Footer>
          <div style={{display:"flex", gap:"5px"}}>
          <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </button>

          <button className="btn btn-danger" onClick={handleConfirmDelete}>
            Delete
          </button>
           </div>
         </Modal.Footer>
       </Modal>
      )}
     <UploadDoc
      show={showUploadModal}
      setShow={setUploadShowModal}
      handleClose={() => setUploadShowModal(false)}
      onUpload={handleDocumentUpload}

      />
  </div>
  );
};

export default NonEmUploadDocument;

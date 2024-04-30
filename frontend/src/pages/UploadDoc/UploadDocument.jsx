import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/Navbar";
import SideBar from "../../components/side/SideBar";
import Button from "../../components/Button/Button";
import { FileUploader } from "react-drag-drop-files";
import "./Upload.css";
import ViewDoc from "../../components/ViewDoc/ViewDoc";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ImFilePdf } from "react-icons/im";
import Pdf from "../../../image/Pdf.png";
import UploadDoc from "../../components/uploadDocCom/UploadDoc";
import { Modal } from "react-bootstrap";
import { IoDocumentAttachOutline } from "react-icons/io5";
import UpdateDoc from "../../components/updateDoc/UpdateDoc";
import { useAuth } from "../../utils/AuthContext";
const UploadDocument = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem("sideBarOpen") === "true"
  );
  const [employeeDocuments, setEmployeeDocuments] = useState([]);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUploadModal, setUploadShowModal] = useState(false);
  const [showUpdate, setUpdateShow] = useState(false);
  const [updatingDocId, setUpdatingDocId] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("employee"); //nonEmployee



    const token = JSON.parse(localStorage.getItem("token"));
    const { authUser } = useAuth();
    useEffect(() => {
      const authenticate = async () => {
        const isUserValid = await authUser(token);
        if (!isUserValid) {
          navigate("/login", { replace: true });
        }
      };
      authenticate();
    }, [authUser, token]);


    const getAllDocuments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/document/getAllDocumentsWithFilter/${selectedDocumentType}`
        );
        setEmployeeDocuments(response.data.result.result);
      } catch (error) {
        console.log(error);
      }
    };
  useEffect(() => {
  
    getAllDocuments();
  }, [selectedDocumentType]);

  const handleDeleteClick = (documentId) => {
    setDocumentToDelete(documentId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/document/deleteDocumentById/${documentToDelete}`
      );
      if (response.status === 200) {
        toast.success("Document deleted successfully");
        setEmployeeDocuments(
          employeeDocuments.filter((doc) => doc.id !== documentToDelete)
        );
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Error deleting document");
    }
  };

  const handleUploadClick = () => {
    setUploadShowModal(true);
  };

  const handleDocumentUpload = (newDocument) => {
    getAllDocuments();
  };
  const handleUploadSuccess = (newDocument) => {
    console.log("updated");
    getAllDocuments();
    setUpdateShow(false);
  };

  const renderEmployeeDocuments = () => {
    return;
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
            }}>
            <div className=" d-flex justify-content-end">
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  width: "200px",
                  marginRight: "3%",
                  marginTop: "10px",
                }}>
                <Button
                  type={"2"}
                  text="New document"
                  onClick={handleUploadClick}
                />
              </div>
            </div>

            <div
              className="d-flex flex-wrap justify-content-center align-items-center"
              style={{
                margin: "10px 3% 30px 3%",
                padding: "20px 0px 20px 0px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}>
              <div style={{ width: "100%" }}>
                <div className="d-flex justify-content-center align-items-center ">
                  <h4 style={{ color: "#3232f4" }}>Documents Management</h4>
                </div>

                <div className="d-flex justify-content-center align-items-center mb-2 ">
                  <div
                    className={`${
                      selectedDocumentType == "employee"
                        ? "selected-document-type"
                        : "non-selected-document-type"
                    }`}
                    onClick={() => {
                      setSelectedDocumentType("employee");
                    }}>
                    <div>employee Documents</div>
                  </div>
                  <div
                    className={`${
                      selectedDocumentType == "nonEmployee"
                        ? "selected-document-type"
                        : "non-selected-document-type"
                    }`}
                    onClick={() => {
                      setSelectedDocumentType("nonEmployee");
                    }}>
                    <div>non employee Documents</div>
                  </div>
                </div>
                {employeeDocuments.map((document) => (
                  <div key={document.id}>
                    <div
                      style={{ width: "100%" }}
                      className=" d-flex container-lg justify-content-center">
                      <div
                        style={{
                          width: "100%",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          padding: "10px",
                          display: "flex",
                          alignItems: "center",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          margin: "5px 0px",
                        }}>
                        <img
                          src={Pdf}
                          style={{
                            width: "60px",
                            marginRight: "10px",
                            fontSize: "40px",
                          }}
                        />
                        <div
                          style={{
                            flex: 1,

                            alignItems: "center",

                            justifyContent: "center",
                          }}>
                          <p className=" mt-3 ms-2">{document.name}</p>
                        </div>
                        <div
                          style={{
                            flex: 1,
                            textAlign: "center",
                            alignItems: "center",
                            gap: "5px",
                            justifyContent: "center",
                          }}>
                          <p className=" mt-3">
                            {document.is_need_attachment ? (
                              <>
                                <IoDocumentAttachOutline
                                  style={{ color: "gray" }}
                                  size={24}
                                />
                              </>
                            ) : (
                              <></>
                            )}
                          </p>
                        </div>
                        <div
                          style={{
                            marginLeft: "35px",
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                          }}>
                          <div
                            onClick={() => {
                              setUpdateShow(true);
                              setUpdatingDocId(document.id);
                            }}
                            className="document_update_button"
                            style={{
                              backgroundColor: "#008000",
                              borderRadius: "5px",
                              transition: "0.5s ease-in-out",
                              boxShadow: "#008000",
                              textAlign: "center",
                            }}>
                            <div
                              style={{ padding: "6px 12px", color: "white" }}>
                              {" "}
                              Update{" "}
                            </div>
                          </div>

                          <div
                            className="document_preview_button"
                            style={{
                              backgroundColor: "#3232f4",
                              borderRadius: "5px",
                              transition: "0.5s ease-in-out",
                              boxShadow: "#3232f4",
                              textAlign: "center",
                            }}>
                            <a
                              href={document.src}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display: "block",
                                color: "white",
                                textDecoration: "none",
                                padding: "6px 12px",
                              }}>
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
                            onClick={() => handleDeleteClick(document.id)}>
                            <div
                              style={{ padding: "6px 12px", color: "white" }}>
                              {" "}
                              Delete{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SideBar>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Document</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this document?</p>
          </Modal.Body>
          <Modal.Footer>
            <div style={{ display: "flex", gap: "5px" }}>
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>

              <button className="btn btn-danger" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* Modal component */}
      <UploadDoc
        show={showUploadModal}
        setShow={setUploadShowModal}
        handleClose={() => setUploadShowModal(false)}
        onUpload={handleDocumentUpload}
      />

      {showUpdate && (
        <>
          {" "}
          <UpdateDoc
            show={showUpdate}
            setShow={setUpdateShow}
            handleClose={() => setUpdateShow(false)}
            onUpload={handleUploadSuccess}
            id={updatingDocId}
          />
        </>
      )}
    </div>
  );
};

export default UploadDocument;

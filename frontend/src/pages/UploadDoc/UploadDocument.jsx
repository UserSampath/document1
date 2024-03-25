import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/Navbar";
import SideBar from "../../components/side/SideBar";
import Button from "../../components/Button/Button";
import { FileUploader } from "react-drag-drop-files";
import "./Upload.css";
import ViewDoc from "../../components/ViewDoc/ViewDoc";
import axios from "axios";
import { toast } from "react-toastify";
const fileTypes = ["PDF"];
const UploadDocument = () => {

  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem("sideBarOpen") === "true"
  );
  const [employeeFile, setEmployeeFile] = useState(null);
  const [nonEmployeeFile, setNonEmployeeFile] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState("");

  const [employeeDocumentSrc, setEmployeeDocumentSrc] = useState("");
  const [nonEmployeeDocumentSrc, setNonEmployeeDocumentSrc] = useState("");

  const handleEmployeeDocumentChange = (file) => {
    setEmployeeFile(file);
  };

  const handleNonEmployeeDocumentChange = (file) => {
    setNonEmployeeFile(file);
  };

  useEffect(() => {
    const getAllDocuments = async () => {
      await axios
        .get("http://localhost:8000/document/getAllDocuments")
        .then((response) => {
          if (response.data.result) {
            response.data.result.forEach((result) => {
              if (result.name == "employee") {
                setEmployeeDocumentSrc(result.src);
              }
              if (result.name == "nonEmployee") {
                setNonEmployeeDocumentSrc(result.src);
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllDocuments();
  }, []);

  // Function to handle file upload
  const handleEmployeeFileUpload = async (e) => {
    if (employeeFile) {
      const formData = new FormData();
      formData.append("pdf", employeeFile);
      formData.append("name", "employee");
      await axios
        .put("http://localhost:8000/document/updateDocument", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((Response) => {
          console.log(Response);
          if (Response.data.result.status) {
            toast.success("Document update success");
          } else {
            toast.error("Document not updated");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.warning("Please select a document");
    }
  };

  const handleNonEmployeeFileUpload = async (e) => {
    if (nonEmployeeFile) {
      const formData = new FormData();
      formData.append("pdf", nonEmployeeFile);
      formData.append("name", "nonEmployee");
      await axios
        .put("http://localhost:8000/document/updateDocument", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((Response) => {
          console.log(Response);
          if (Response.data.result.status) {
            toast.success("Document update success");
          } else {
            toast.error("Document not updated");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.warning("Please select a document");
    }
  };

  const onEmployeeDocumentClicked = () => {
        if (employeeDocumentSrc) {
          window.open(employeeDocumentSrc, "_blank");
        } else {
          toast.warning("Document not found");
        }
  };
    const onNonEmployeeDocumentClicked = () => {
        if (nonEmployeeDocumentSrc) {
            window.open(nonEmployeeDocumentSrc, "_blank");
        } else {
            toast.warning("Document not found")
        }
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
            <div
              className=" d-flex justify-content-center align-items-center"
              style={{
                margin: "40px 200px",
                padding: "50px 0px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}>
              <div>
                <div>
                  <h4 style={{ textAlign: "center", color: "#3232f4" }}>
                    Employee Document Update
                  </h4>
                  <div>
                    <FileUploader
                      handleChange={handleEmployeeDocumentChange}
                      name="file"
                      types={fileTypes}
                    />
                    <div className=" d-flex mt-3 justify-content-between">
                      <div
                        onClick={onEmployeeDocumentClicked}
                        className="document_view_button"
                        style={{
                          backgroundColor: "#2f9d10",
                          borderRadius: "5px",
                          transition: "0.2s ease-in-out",
                          boxShadow: "0 8px 10px rgba(0, 0, 0, 0.178)",
                        }}>
                        <div style={{ padding: "6px 12px", color: "white" }}>
                          {" "}
                          View Current Document
                        </div>
                      </div>
                      <div
                        onClick={handleEmployeeFileUpload}
                        className="document_update_button"
                        style={{
                          backgroundColor: "#6464ff",
                          borderRadius: "5px",
                          transition: "0.5s ease-in-out",
                          boxShadow: "0 8px 10px rgba(0, 0, 0, 0.178)",
                        }}>
                        <div style={{ padding: "6px 12px", color: "white" }}>
                          {" "}
                          Update
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" mt-5">
                  <h4 style={{ textAlign: "center", color: "#3232f4" }}>
                    Non-Employee Document Update
                  </h4>
                  <div>
                    <FileUploader
                      handleChange={handleNonEmployeeDocumentChange}
                      name="file"
                      types={fileTypes}
                    />
                    <div className=" d-flex mt-3 justify-content-between">
                      <div
                        onClick={onNonEmployeeDocumentClicked}
                        className="document_view_button"
                        style={{
                          backgroundColor: "#2f9d10",
                          borderRadius: "5px",
                          transition: "0.2s ease-in-out",
                          boxShadow: "0 8px 10px rgba(0, 0, 0, 0.178)",
                        }}>
                        <div style={{ padding: "6px 12px", color: "white" }}>
                          {" "}
                          View Current Document
                        </div>
                      </div>
                      <div
                        onClick={handleNonEmployeeFileUpload}
                        className="document_update_button"
                        style={{
                          backgroundColor: "#6464ff",
                          borderRadius: "5px",
                          transition: "0.5s ease-in-out",
                          boxShadow: "0 8px 10px rgba(0, 0, 0, 0.178)",
                        }}>
                        <div style={{ padding: "6px 12px", color: "white" }}>
                          {" "}
                          Update
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SideBar>
      {/* Modal component */}
      <ViewDoc
        userType={userType}
        show={showModal}
        setShow={setShowModal}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default UploadDocument;

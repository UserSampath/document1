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
const fileTypes = ["PDF"];
const UploadDocument = () => {
  const navigate = useNavigate();

  const pageNavi = ()=> {
    navigate("/nonEmUploadDocument");

  }

  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem("sideBarOpen") === "true"
  );
  const [employeeFile, setEmployeeFile] = useState(null);
  const [nonEmployeeFile, setNonEmployeeFile] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setUploadShowModal] = useState(false);

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


    
  
    const [pastEmployeeDocuments, setPastEmployeeDocuments] = useState([
      {
        id: 1,
        name: "Document 1",
        date: "2024-04-01",
        link:"https://www.pdf995.com/samples/pdf.pdf"
      },
      {
        id: 2,
        name: "Document 2",
        date: "2024-04-02",
        link:"https://www.pdf995.com/samples/pdf.pdf"

      },
      {
        id: 3,
        name: "Document 3",
        date: "2024-04-03",
        link:"https://www.pdf995.com/samples/pdf.pdf"

      },
    ]);
  
    const onDeleteDocument = (documentId) => {
      // Implement delete functionality here
    };
  
    const handleUploadClick = () => {
      setUploadShowModal(true);
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
            <div style={{ marginLeft: "65%", marginRight: "5%" ,display:"flex",gap:"5px"}}>
            <Button
                type={"2"}
                text="Upload documents"
                style={{ marginLeft: "10px" }}
                onClick={handleUploadClick}
                // Add margin between button and search bar
              />
              <Button
                type={"1"}
                text=" Non-Employee document"
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
          <h4 style={{color: "#3232f4"}}> Employee Documents</h4>
        </div>
        <div>
      {pastEmployeeDocuments.map((document) => (
        <div key={document.id} style={{ width: "1000px" }}>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "30px",
              display: "flex",
              alignItems: "center",
              marginBottom:"10px",
              marginTop:"10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Added box shadow
            }}
          >
            <img src={Pdf} style={{ width: "60px", marginRight: "10px",fontSize:"40px"}} />
            <div style={{ flex: 1, textAlign: "center" ,  
              alignItems: "center", gap:"5px",justifyContent:"center"}}>
              <p>{document.name}</p>
            </div>
                <div style={{ flex: 1, textAlign: "center" ,  
                  alignItems: "center", gap:"5px",justifyContent:"center"}}>
                  <p>Attachment Need</p>
                </div>
                <div style={{marginLeft:"35px",     display: "flex",
                  alignItems: "center", gap:"15px"}}>
                    <div
                        className="document_update_button"
                        style={{
                          backgroundColor: " #008000                         ",
                          borderRadius: "5px",
                          transition: "0.5s ease-in-out",
                          boxShadow: " #008000                         ",
                          textAlign: "center"
                        }}>
                        <div style={{ padding: "6px 12px", color: "white" }}>
                          {" "}
                          Update 
                        </div>
                      </div>

                      <div
                      className="document_preview_button"
                      style={{
                        backgroundColor: "#3232f4",
                        borderRadius: "5px",
                        transition: "0.5s ease-in-out",
                        boxShadow: "#3232f4",
                        textAlign: "center"
                      }}
                    >
                      <a
                        href={document.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{ display: "block", color: "white", textDecoration: "none", padding: "6px 12px" }}
                      >
                        Preview
                      </a>
                    </div>

                     <div
                        className="document_delete_button"
                        style={{
                          backgroundColor: "#ff0000                          ",
                          borderRadius: "5px",
                          transition: "0.5s ease-in-out",
                          boxShadow: "#ff0000                          ",
                          textAlign: "center"
                        }}>
                        <div style={{ padding: "6px 12px", color: "white" }}>
                          {" "}
                          Delete 
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
        </div>
      </SideBar>
      {/* Modal component */}
      <ViewDoc
        userType={userType}
        show={showModal}
        setShow={setShowModal}
        handleClose={() => setShowModal(false)}
      />
      <UploadDoc
      show={showUploadModal}
      setShow={setUploadShowModal}
      handleClose={() => setUploadShowModal(false)}
      />
    </div>
  );
};

export default UploadDocument;

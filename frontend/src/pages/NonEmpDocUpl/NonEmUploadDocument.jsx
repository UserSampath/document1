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

const fileTypes = ["PDF"];

const NonEmUploadDocument = () => {
  const navigate = useNavigate();

  const pageNavi = () => {
    navigate("/UploadDocument");
  };

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
      try {
        const response = await axios.get(
          "http://localhost:8000/document/getAllDocuments"
        );
        if (response.data.result) {
          response.data.result.forEach((result) => {
            if (result.name === "employee") {
              setEmployeeDocumentSrc(result.src);
            }
            if (result.name === "nonEmployee") {
              setNonEmployeeDocumentSrc(result.src);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllDocuments();
  }, []);

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
          <div style={{ marginLeft: "80%", marginRight: "5%" }}>
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
              margin: "40px 100px",
              padding: "50px 0px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
             <div >
           <div
          className="d-flex justify-content-center align-items-center"
          style={{
            padding: "30px 0px",
            backgroundColor: "#f0f0f0", // Change background color here
            borderRadius: "10px",
          }}
        >
          <div style={{ width: "48%" }}> {/* Adjust width as needed */}
            <h4 style={{ textAlign: "center", color: "#3232f4" }}>
              Non-Employee Document Update
            </h4>
            <div style={{marginTop:"20px"}}>
              <FileUploader
                handleChange={handleNonEmployeeDocumentChange}
                name="file"
                types={fileTypes}
              />
              <div style={{marginLeft:"200px",marginTop:"25px"}}>
                <div
                      className="document_update_button"
                      style={{
                        backgroundColor: "#6464ff",
                        borderRadius: "5px",
                        transition: "0.5s ease-in-out",
                        boxShadow: "0 8px 10px rgba(0, 0, 0, 0.178)",
                        textAlign: "center"
                      }}>
                      <div style={{ padding: "6px 12px", color: "white" }}>
                        {" "}
                        Upload
                      </div>
                    </div>
                    </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-3">
        <h4 style={{color: "#3232f4"}}> Non-Employee Documents</h4>
      </div>
      <div>
    {pastEmployeeDocuments.map((document) => (
      <div key={document.id} style={{ width: "800px" }}>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "25px",
            display: "flex",
            alignItems: "center",
            marginBottom:"10px",
            marginTop:"10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Added box shadow
          }}
        >
          <img src={Pdf} style={{ width: "50px", marginRight: "10px",fontSize:"40px"}} />
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
  </div>
  );
};

export default NonEmUploadDocument;
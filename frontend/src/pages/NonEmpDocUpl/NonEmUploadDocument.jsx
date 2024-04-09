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

  const dummyPDFs = [
    "https://www.pdf995.com/samples/pdf.pdf",
    "https://www.pdf995.com/samples/pdf.pdf",
    "https://www.pdf995.com/samples/pdf.pdf",
    "https://www.pdf995.com/samples/pdf.pdf",
    "https://www.pdf995.com/samples/pdf.pdf",
    "https://www.pdf995.com/samples/pdf.pdf",
    "https://www.pdf995.com/samples/pdf.pdf",
    "https://www.pdf995.com/samples/pdf.pdf",
    "https://www.pdf995.com/samples/pdf.pdf",

    // Add more actual PDF URLs as needed
  ];

  const chunkSize = 4; // Number of PDFs to display in each row

  // Splitting the dummyPDFs array into chunks
  const chunkedPDFs = [];
  for (let i = 0; i < dummyPDFs.length; i += chunkSize) {
    chunkedPDFs.push(dummyPDFs.slice(i, i + chunkSize));
  }

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
              margin: "1px 100px",
              padding: "50px 0px",
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
                <div style={{marginLeft:"250px",marginRight:"50px",marginTop:"25px"}}>
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
                          Update
                        </div>
                      </div>
                      </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-3">
          <h4 style={{color: "#3232f4"}}>Past Non-Employee Documents</h4>
        </div>
        <div style={{ marginLeft: "40px", marginRight: "40px" }}>
  <div className="d-flex flex-wrap mt-3 justify-content-between">
    {chunkedPDFs.map((chunk, index) => (
      <div key={index} className="row mb-3">
        {chunk.map((pdf, innerIndex) => (
          <div key={innerIndex} className={`col-md-${chunk.length === 1 ? '12' : '3'}`}>
            <div style={{ position: 'relative' }}>
              <embed
                style={{
                  width: "100%",
                  height: "300px", // Adjust the height as needed
                  border: "none",
                  cursor:'pointer'
                }}
                src={pdf}
                type="application/pdf"
              />
              <div style={{ position: 'absolute', bottom: 0, width: '100%', background: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', padding: '5px', display: 'none',cursor:'pointer' }}>
                {pdf.substring(pdf.lastIndexOf('/') + 1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    ))}
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

export default NonEmUploadDocument;

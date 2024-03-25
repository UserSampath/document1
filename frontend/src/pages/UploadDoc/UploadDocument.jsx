import React, { useState } from 'react';
import NavBar from "../../components/NavBar/Navbar";
import SideBar from "../../components/side/SideBar";
import Button from "../../components/Button/Button";
import { FileUploader } from "react-drag-drop-files";
import "./Upload.css";
import ViewDoc from '../../components/ViewDoc/ViewDoc';

const fileTypes = ["PDF"];

const UploadDocument = () => {
    const [sidebarOpen, setSidebarOpen] = useState(localStorage.getItem("sideBarOpen") === "true");
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false); // State for controlling modal visibility

    const handleChange = (file) => {
        setFile(file);
    };

    // Function to handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        console.log("Uploaded file:", file);
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
                            paddingLeft: sidebarOpen ? "240px" : "50px",
                        }}>
                        <div className='uploadData'>
                            <div className='empFiles'>
                                <h4>Employee Document Upload</h4>
                                <div className='uploader'>
                                    <FileUploader
                                        handleChange={handleChange}
                                        name="file"
                                        types={fileTypes}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                    <div className='buttonCon'>
                                        <Button
                                            type={"1"}
                                            text="Upload"
                                            onClick={() => {
                                                // Handle upload button click here if needed
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='empFiles'>
                                <h4>Non-Employee Document Upload</h4>
                                <div className='uploader'>
                                    <FileUploader
                                        handleChange={handleChange}
                                        name="file"
                                        types={fileTypes}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                    <div className='buttonCon'>
                                        <Button
                                            type={"1"}
                                            text="Upload"
                                            onClick={() => {
                                                // Handle upload button click here if needed
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Button to open modal */}
                            <div style={{ position: "fixed", top: "90px", right: "50px" }}>
                                <div className="view-past-documents">
                                    <Button
                                        type={"2"}
                                        text="View Past Documents"
                                        onClick={() => setShowModal(true)} // Toggle modal visibility
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SideBar>
            {/* Modal component */}
            <ViewDoc show={showModal} setShow={setShowModal} handleClose={() => setShowModal(false)} />
        </div>
    );
}

export default UploadDocument;

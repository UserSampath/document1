import React, { useState } from 'react';
import NavBar from "../../components/NavBar/Navbar";
import SideBar from "../../components/side/SideBar";
import Button from "../../components/Button/Button";
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios'; // Import axios for making HTTP requests
import ViewDoc from '../../components/ViewDoc/ViewDoc';
import "./Upload.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const fileTypes = ["PDF"];

const UploadDocument = () => {
    const [sidebarOpen, setSidebarOpen] = useState(localStorage.getItem("sideBarOpen") === "true");
    const [pdf, setPdf] = useState(null);
    const [name, setName] = useState('employee'); // Default to employee document type
    const [showModal, setShowModal] = useState(false); // State for controlling modal visibility

    const handleChange = (pdf) => {
        setPdf(pdf);
    };

    // Function to handle file upload
    const handleFileUpload = async () => {
        if (pdf) {
            const formData = new FormData();
            console.log(pdf);
            formData.append('pdf', pdf);
        
            formData.append('name', name); // Include document type in the form data
            console.log(formData);
            try {
                // Send POST request to backend endpoint
                const response = await axios.put(`${backendUrl}/document/updateDocument`, formData, );
                console.log(response);
                console.log('Upload successful:', response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
                // Handle error, e.g., show error  to user
            }
        } else {
            // Handle case where no file is selected
            console.error('No file selected');
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
                                                setName('employee'); // Set document type to employee
                                                handleFileUpload(); // Call handleFileUpload
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
                                                setName('nonEmployee'); // Set document type to non-employee
                                                handleFileUpload(); // Call handleFileUpload
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Button to open modal */}
                            <div style={{ position: "fixed", top: "150px", right: "50px" }}>
                                <div className="view-past-documents">
                                    <Button
                                        type={"2"}
                                        text="View Past Documents"
                                        onClick={() => setShowModal(true)} // Toggle modal visibility
                                    />
                                </div>
                            </div>

                            <div style={{ position: "fixed", top: "350px", right: "50px" }}>
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

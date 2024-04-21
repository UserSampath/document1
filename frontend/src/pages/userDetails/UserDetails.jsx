import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/Navbar";
import SideBar from "../../components/side/SideBar";
import "./userDetails.css";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import PdfViewCard from "../../components/pdfViewCard/PdfViewCard";

const UserDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem("sideBarOpen") == "true"
  );

  const { userId } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      await axios
        .get(`http://localhost:8000/user/getUserAllDataById/${userId}`)
        .then((res) => {
          console.log(res.data.result);
          setUserData(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUserData();
  }, [userId]);

  return (
    <div>
      <SideBar setSidebarOpen={setSidebarOpen} selectedNav="">
        <div>
          <NavBar sidebarOpen={sidebarOpen} />

          <div
            style={{
              transition: "padding-left 300ms",
              paddingTop: "50px",
              paddingLeft: sidebarOpen ? "240px" : "50px",
            }}>
            <div
              className=" d-flex  flex-column    "
              style={{
                padding: "10px 50px",
                borderRadius: "10px",
                backgroundColor: "white",
                minHeight: "200px",
                width: "95%",
                marginLeft: "2.6%",
              }}>
              <div className="d-flex justify-content-center ">
                <h2>User Details</h2>
              </div>
              <div style={{ fontSize: "18px" }}>
                {userData.type && (
                  <div className=" d-flex align-items-center gap-1">
                    <div
                      className=" d-flex align-items-center"
                      style={{ width: "120px" }}>
                      <GoDotFill />
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "#494949",
                          marginLeft: "5px",
                        }}>
                        User Type
                      </div>
                    </div>
                    <div style={{ fontWeight: "bold" }} className=" me-1">
                      :
                    </div>
                    {userData.type}
                  </div>
                )}

                {userData.firstName && (
                  <div className=" d-flex align-items-center gap-1">
                    <div
                      className=" d-flex align-items-center"
                      style={{ width: "120px" }}>
                      <GoDotFill />
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "#494949",
                          marginLeft: "5px",
                        }}>
                        First Name
                      </div>
                    </div>
                    <div style={{ fontWeight: "bold" }} className=" me-1">
                      :
                    </div>
                    {userData.firstName}
                  </div>
                )}

                {userData.lastName && (
                  <div className=" d-flex align-items-center gap-1">
                    <div
                      className=" d-flex align-items-center"
                      style={{ width: "120px" }}>
                      <GoDotFill />
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "#494949",
                          marginLeft: "5px",
                        }}>
                        Last Name
                      </div>
                    </div>
                    <div style={{ fontWeight: "bold" }} className=" me-1">
                      :
                    </div>
                    {userData.lastName}
                  </div>
                )}

                {userData.email && (
                  <div className=" d-flex align-items-center gap-1">
                    <div
                      className=" d-flex align-items-center"
                      style={{ width: "120px" }}>
                      <GoDotFill />
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "#494949",
                          marginLeft: "5px",
                        }}>
                        Email
                      </div>
                    </div>
                    <div style={{ fontWeight: "bold" }} className=" me-1">
                      :
                    </div>
                    {userData.email}
                  </div>
                )}

                {userData.phone && (
                  <div className=" d-flex align-items-center gap-1">
                    <div
                      className=" d-flex align-items-center"
                      style={{ width: "120px" }}>
                      <GoDotFill />
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "#494949",
                          marginLeft: "5px",
                        }}>
                        Phone
                      </div>
                    </div>
                    <div style={{ fontWeight: "bold" }} className=" me-1">
                      :
                    </div>
                    {userData.phone}
                  </div>
                )}

                {userData.reference_no && (
                  <div className=" d-flex align-items-center gap-1">
                    <div
                      className=" d-flex align-items-center"
                      style={{ width: "120px" }}>
                      <GoDotFill />
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "#494949",
                          marginLeft: "5px",
                        }}>
                        {userData.type == "employee"
                          ? "E Number"
                          : "NIC Number"}
                      </div>
                    </div>
                    <div style={{ fontWeight: "bold" }} className=" me-1">
                      :
                    </div>
                    {userData.reference_no}
                  </div>
                )}
              </div>

              {userData &&
                userData.Documents &&
                userData.Documents.filter(
                  (document) => document.UserDocument.is_agreed == true
                ).length > 0 && (
                  <div>
                    <div className=" d-flex justify-content-center align-items-center">
                      <h4>Accepted Documents</h4>
                    </div>
                  </div>
                )}

              {userData &&
                userData.Documents &&
                userData.Documents.filter(
                  (document) => document.UserDocument.is_agreed == true
                ).map((document, index) => {
                  return (
                    <div key={index}>
                      <PdfViewCard document={document} showAttachment={true} />
                    </div>
                  );
                })}

              {userData &&
                userData.Documents &&
                userData.Documents.filter(
                  (document) => document.UserDocument.is_agreed == false
                ).length > 0 && (
                  <div>
                    <div className=" d-flex justify-content-center align-items-center">
                      <h4>Pending Documents</h4>
                    </div>
                  </div>
                )}

              {userData &&
                userData.Documents &&
                userData.Documents.filter(
                  (document) => document.UserDocument.is_agreed == false
                ).map((document, index) => {
                  return (
                    <div key={index}>
                      <PdfViewCard document={document} showAttachment={false} />
                    </div>
                  );
                })}

              {/* 
              <PdfViewCard />
              <PdfViewCard /> */}
            </div>
          </div>
        </div>
      </SideBar>
    </div>
  );
};

export default UserDetails;

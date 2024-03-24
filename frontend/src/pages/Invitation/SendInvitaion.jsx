// SendInvitation.jsx
import React, { useState } from 'react';
import "./Invite.css";
import Button from "../../components/Button/Button";
import SendInvitationCom from '../../components/InvitationCom/SendInvitationCom';
import SideBar from "../../components/side/SideBar";
import NavBar from "../../components/NavBar/Navbar";
import InSearchBar from '../../components/InvitesSearchBar/InSearchBar';
import Invites from '../../components/Invites/Invites';

const SendInvitation = () => {
    const [show, setShow] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(
        localStorage.getItem("sideBarOpen") === "true"
    );
    const [searchText, setSearchText] = useState("");

    // Dummy user data
    const dummyUserData = [
        {
            id: 1,
            email: "john@example.com",
            EmployeeStatus:"employee",
            is_agreed: false
            
        },
        // Add more dummy user data as needed
    ];

    return (
        <div>
            <SideBar setSidebarOpen={setSidebarOpen} selectedNav="SendInvitation">
                <div>
                    <NavBar sidebarOpen={sidebarOpen} />
                    <div
                        style={{
                            transition: "padding-left 300ms",
                            paddingTop: "50px",
                            paddingLeft: sidebarOpen ? "240px" : "50px",
                        }}>
                        <div style={{ display: "flex", alignItems: "center", marginLeft: "65%", marginRight: "5%", gap: "50px" }}>
                            <InSearchBar
                                setSearchText={setSearchText}
                                searchText={searchText}
                            />

                            <Button
                                type={"1"}
                                text="send Invitation"
                                onClick={() => setShow(true)}
                                style={{ marginLeft: "0px" }} // Add margin between button and search bar
                            />
                        </div>

                        <div className="d-flex justify-content-center align-items-center">
                            <div
                                style={{
                                    marginBottom: "5px",
                                    width: "90%",
                                    borderRadius: "5px",
                                }}
                                className="bg-white mt-3 pb-1">
                                <div className="container-fluid mt-1">
                                    <div style={{ margin: "0px 10px 0px 30px" }}>
                                        <div
                                            className="row align-items-center container-fluid"
                                            style={{
                                                height: "35px",
                                                color: "#000000dd",
                                                fontWeight: "600",
                                                padding: "5px 0px 5px 0px",
                                                marginBottom: "5px",
                                            }}>
                                            <div className="col-4 ">
                                                <div style={{ paddingLeft: "45px" }}>Email</div>
                                            </div>
                                            <div className="col-4" style={{ paddingLeft: "15px" }}>
                                                Employee Status
                                            </div>
                                            <div className="col-4" style={{ paddingLeft: "10px" }}>
                                                Is Agreed{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Render Invites component with dummy user data */}
                                <Invites userData={dummyUserData} />
                            </div>
                        </div>
                    </div>
                </div>
            </SideBar>
            <SendInvitationCom
                show={show}
                setShow={setShow}
                handleClose={() => setShow(false)} />
        </div>
    );
};

export default SendInvitation;

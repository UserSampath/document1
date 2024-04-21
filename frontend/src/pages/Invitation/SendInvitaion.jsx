import React, { useState, useEffect } from 'react';
import "./Invite.css";
import Button from "../../components/Button/Button";
import SendInvitationCom from '../../components/InvitationCom/SendInvitationCom';
import SideBar from "../../components/side/SideBar";
import NavBar from "../../components/NavBar/Navbar";
import InSearchBar from '../../components/InvitesSearchBar/InSearchBar';
import Invites from '../../components/Invites/Invites';
import axios from "axios";
import Pagination from '../../components/pagination/Pagination';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SendInvitation = () => {
    const [show, setShow] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(
        localStorage.getItem("sideBarOpen") === "true"
    );
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    // Dummy user data


    useEffect(() => {
        setCurrentPage(1);
      }, [searchText]);
    
      useEffect(() => {
        fetchDocData();
      }, [searchText, currentPage]);


      const fetchDocData = async() =>{
        await axios
          .get(`${backendUrl}/user/getUsersByPageAndFilter`, {
            params: {
              limit: 10,
              page: currentPage,
              sortBy: "asc",
              keyword: searchText,
            },
          })
          .then((res) => {
            if (res.data.success) {
              setUsers(res.data.users);
              console.log(res.data.users)
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }


      

      const updateInvitations = (newInvitation) => {
        setUsers([newInvitation, ...users]);
      };

    return (
      <div>
        <SideBar setSidebarOpen={setSidebarOpen} selectedNav="Send Invitation">
          <div>
            <NavBar sidebarOpen={sidebarOpen} />
            <div
              style={{
                transition: "padding-left 300ms",
                paddingTop: "50px",
                paddingLeft: sidebarOpen ? "240px" : "50px",
              }}>
              <div className="d-flex justify-content-between">
                <div style={{ marginLeft: "85px", display: "flex" }}>
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={users.totalPages ? users.totalPages : 1}
                  />
                  <div
                    style={{
                      fontSize: "16px",
                      color: "gray",
                      paddingTop: "5px",
                    }}>
                    {users.totalPages !== 0
                      ? `${currentPage} of ${
                          users.totalPages ? users.totalPages : 1
                        } pages`
                      : "No ReqDoc available"}
                  </div>
                </div>
                <div
                  className="d-flex "
                  style={{ marginRight: "75px", gap: "25px" }}>
                  <div>
                    <InSearchBar
                      setSearchText={setSearchText}
                      searchText={searchText}
                    />
                  </div>
                  <div>
                    <Button
                      type={"1"}
                      text="send Invitation"
                      onClick={() => setShow(true)}
                      style={{ marginLeft: "10px" }} // Add margin between button and search bar
                    />
                  </div>
                </div>
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
                          padding: "5px 10px 5px 12px",
                          marginBottom: "5px",
                        }}>
                        <div className="col-3 ">
                          <div style={{}} className="">
                            Email
                          </div>
                        </div>
                        <div className="col-3 d-flex justify-content-center">
                          Employee Status
                        </div>
                        <div
                          className="col-3 d-flex justify-content-center"
                          style={{}}>
                          Pending Documents
                        </div>
                        <div
                          className="col-3 d-flex justify-content-center"
                          style={{}}>
                          Accepted Documents
                        </div>
                      </div>
                    </div>
                  </div>

                  {users.data?.map((user, index) => {
                    return (
                      <Invites
                        key={index}
                        user={user}
                        fetchDocData={fetchDocData}
                      />
                    );
                  })}

                  {/* Render Invites component with dummy user data */}
                </div>
              </div>
            </div>
          </div>
        </SideBar>
        <SendInvitationCom
          show={show}
          setShow={setShow}
          handleClose={() => setShow(false)}
          updateInvitations={updateInvitations} // Pass the function to update invitations
        />
      </div>
    );
};

export default SendInvitation;

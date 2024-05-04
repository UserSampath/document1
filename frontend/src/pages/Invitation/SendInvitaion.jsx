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
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from 'react-router-dom';
import Select from "react-dropdown-select";

const SendInvitation = () => {
    const [show, setShow] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(
        localStorage.getItem("sideBarOpen") === "true"
    );
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({})
  const [selectedUserType, setSelectedUserType] = useState([
    {
      id: 1,
      name: "All Users",
      value:""
    },
  ]);
  const navigate = useNavigate();


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


    useEffect(() => {
        setCurrentPage(1);
      }, [searchText]);
    
      useEffect(() => {
        fetchDocData();
      }, [searchText, currentPage, newUser,selectedUserType]);


  const fetchDocData = async () => {
        await axios
          .get(`${backendUrl}/user/getUsersByPageAndFilter`, {
            params: {
              limit: 9,
              page: currentPage,
              sortBy: "asc",
              keyword: searchText,
              type:
                selectedUserType[0].value 
            },
          })
          .then((res) => {
            if (res.data.success) {
              setUsers(res.data.users);
              console.log(res.data.users);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      const updateInvitations = (newInvitation) => {
       setNewUser(newInvitation)
      };
 const options = [
   {
     id: 1,
     name: "All Users",
     value: "",
   },
   {
     id: 2,
     name: "Non Employee",
     value: "nonEmployee",
   },
   {
     id: 3,
     name: "Employee",
     value: "employee",
   },
 ];
  
  const handleSelectUserType = (selectedOption) => {
    setSelectedUserType(selectedOption);
    console.log(selectedOption)
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
                  style={{ marginRight: "75px", gap: "10px" }}>
                  <div
                    style={{
                      width: "200px",
                      backgroundColor: "white",
                      height: "35px",
                    }}>
                    <Select
                      options={options}
                      labelField="name"
                      valueField="id"
                      values={selectedUserType}
                      dropdownHandle={true}
                      searchable={false}
                      color="#9fa2f7"
                      placeholder="User Type"
                      onChange={(selectedOption) =>
                        handleSelectUserType(selectedOption)
                      }
                    />
                  </div>

                  <div>
                    <InSearchBar
                      setSearchText={setSearchText}
                      searchText={searchText}
                    />
                  </div>
                  <div>
                    <Button
                      type={"1"}
                      text="send document for new user"
                      onClick={() => setShow(true)}
                      style={{ marginLeft: "10px" }}
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
          updateInvitations={updateInvitations}
        />
      </div>
    );
};

export default SendInvitation;

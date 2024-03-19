import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/Navbar";
import SideBar from "../../components/side/SideBar";
import UserDetails from "../../components/userDetails/UserDetails";
import SearchBar from "../../components/searchBar/SearchBar";
import "./userManagement.css";
import Pagination from "../../components/pagination/Pagination";
import axios from "axios";
import { useAuth } from "../../utils/AuthContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem("sideBarOpen") == "true"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);

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
    fetchUserData();
  }, [searchText, currentPage]);

  const fetchUserData = async () => {
    await axios
      .get(`${backendUrl}/user/getUserByPage`, {
        params: {
          limit: 10,
          page: currentPage,
          sortBy: "asc",
          keyword: searchText,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.users);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <SideBar setSidebarOpen={setSidebarOpen} selectedNav="User Management">
        <div>
          <NavBar sidebarOpen={sidebarOpen} />

          <div
            style={{
              transition: "padding-left 300ms",
              paddingTop: "50px",
              paddingLeft: sidebarOpen ? "240px" : "50px",
            }}>
            <div className="d-flex justify-content-center">
              <div
                style={{ width: "90%", padding: "8px 0px 10px 0px" }}
                className="d-flex justify-content-between">
                <div className=" d-flex justify-content-center align-items-center">
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
                      : "No users available"}
                  </div>
                </div>

                <div>
                  <SearchBar
                    setSearchText={setSearchText}
                    searchText={searchText}
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
                className="bg-white mt-1 pb-1">
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
                      <div className="col-3 ">
                        <div style={{ paddingLeft: "45px" }}>Name</div>
                      </div>
                      <div className="col-4" style={{ paddingLeft: "15px" }}>
                        Email
                      </div>
                      <div className="col-3" style={{ paddingLeft: "10px" }}>
                        Joined Date{" "}
                      </div>
                      <div className="col-1">Points</div>
                    </div>
                  </div>
                </div>
                {users.data?.map((user, index) => {
                  return (
                    <UserDetails
                      key={index}
                      user={user}
                      index={index}
                      fetchUserData={fetchUserData}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </SideBar>
    </div>
  );
};

export default UserManagement;

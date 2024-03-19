import NavBar from "../../components/NavBar/Navbar";
import SideBar from "../../components/side/SideBar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserDetails from "../../components/userDetails/UserDetails";
import "./orders.css";
import Pagination from "../../components/pagination/Pagination";
import axios from "axios";
import { useAuth } from "../../utils/AuthContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderDetails from "../../components/orderDetails/OrderDetails";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
const Orders = () => {
  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem("sideBarOpen") == "true"
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1]);

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
    fetchOrderData();
  }, [searchText, currentPage]);

  const fetchOrderData = async () => {
    // await axios
    //   .get(`${backendUrl}/user/getUserByPage`, {
    //     params: {
    //       limit: 10,
    //       page: currentPage,
    //       sortBy: "asc",
    //       keyword: searchText,
    //     },
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     if (res.data.success) {
    //       setUsers(res.data.users);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const [startDate, setStartDate] = useState();
  return (
    <div>
      <SideBar setSidebarOpen={setSidebarOpen} selectedNav="Orders">
        <div>
          <NavBar sidebarOpen={sidebarOpen} />
          <div>
            <div
              style={{
                transition: "padding-left 300ms",
                paddingTop: "50px",
                paddingLeft: sidebarOpen ? "240px" : "50px",
              }}>
              <div className="d-flex justify-content-center align-items-center">
                <div
                  style={{ width: "90%", padding: "8px 0px 10px 0px" }}
                  className="d-flex   align-items-end justify-content-between">
                  <div className=" d-flex justify-content-center align-items-center">
                    <Pagination
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      totalPages={12}
                    />
                    <div
                      style={{
                        fontSize: "16px",
                        color: "gray",
                        paddingTop: "5px",
                      }}>
                      {users.totalPages !== 0
                        ? `${currentPage} of ${12} pages`
                        : "No orders available"}
                    </div>
                  </div>
                  <div className="d-flex   align-items-center justify-content-between  gap-1">
                    <div>
                      <select
                        style={{ textAlign: "center" }}
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example">
                        <option selected>All products</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div>
                      <div>
                        <div style={{ marginBottom: ".5px" }}>
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            isClearable
                            placeholderText="select date"
                            className="date-picker"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <select
                        style={{ textAlign: "center" }}
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example">
                        <option>All</option>
                        <option value="1">Accepted</option>
                        <option selected value="2">
                          Not accepted
                        </option>
                      </select>
                    </div>
                    <div>
                      <div
                        style={{
                          padding: "3.7px 6px",
                          fontSize: "14px",
                          marginBottom: ".5px",
                          borderRadius: "3px",
                        }}
                        className=" d-flex justify-content-center align-items-center bg-white">
                        Reset
                      </div>
                    </div>
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
                        <div className="col-1" style={{ paddingLeft: "22px" }}>
                          Ref
                        </div>
                        <div className="col-3" style={{ paddingLeft: "22px" }}>
                          Products
                        </div>
                        <div className="col-2" style={{}}>
                          Qty
                        </div>
                        <div className="col-2" style={{}}>
                          price
                        </div>
                        <div className="col-3" style={{}}>
                          Location
                        </div>
                        <div className="col-1" style={{}}>
                          Accepted
                        </div>
                      </div>
                    </div>
                  </div>
                  {orders?.map((user, index) => {
                    return (
                      <OrderDetails
                        key={index}
                        order={user}
                        index={index}
                        fetchOrderData={fetchOrderData}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SideBar>
    </div>
  );
};

export default Orders;

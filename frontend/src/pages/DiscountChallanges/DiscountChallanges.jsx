import React, { useState, useEffect } from "react";
import axios from "axios"; // Don't forget to import axios
import NavBar from "../../components/NavBar/Navbar";
import SideBar from "../../components/side/SideBar";
import Button from "../../components/Button/Button";
import "./discountChallange.css";
import AddDiscountChallange from "../../components/DiscountChallangeCom/AddDiscountChallange/AddDiscountChallange";
import DiscountChallangeCard from "../../components/DiscountChallangeCom/DiscountChallangeDetails/DiscountChallangeCard";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const DiscountChallanges = () => {
  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem("sideBarOpen") === "true"
  );
  const [show, setShow] = useState(false);
  const [discountChallanges, setDiscountChallanges] = useState([]);
  const [filterOption, setFilterOption] = useState("all");

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
    fetchDiscountChallanges();
  }, [show]);

  const filterDiscountChallenges = () => {
    if (filterOption === "all") {
      return discountChallanges;
    } else {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1); // Get yesterday's date
      const filteredChallenges = discountChallanges.filter((challenge) => {
        const endDate = new Date(challenge.end_date);
        if (filterOption === "today") {
          return endDate.toDateString() === today.toDateString();
        } else if (filterOption === "past") {
          return endDate < yesterday;
        }
        return true;
      });
      return filteredChallenges;
    }
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };
  const fetchDiscountChallanges = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/discountChallenge/getAllDiscountChallenges`
      );
      console.log(response.data.result);
      setDiscountChallanges(response.data.result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteDiscountChallengeById = async (id) => {
    try {
      await axios.delete(
        `${backendUrl}/discountChallenge/deleteDiscountChallengeById/${id}`
      );
      // Assuming you want to refresh the list after deletion
      fetchDiscountChallanges();
    } catch (error) {
      console.error("Error deleting discount challenge:", error);
    }
  };

  const handleChallangeEditSubmit = (updatedDiscountChallangeData) => {
    // Find the index of the updated challenge in the array
    const updatedIndex = discountChallanges.findIndex(
      (challange) => challange.id === updatedDiscountChallangeData.id
    );

    // If found, update the state
    if (updatedIndex !== -1) {
      const updatedChallanges = [...discountChallanges];
      updatedChallanges[updatedIndex] = updatedDiscountChallangeData;
      setDiscountChallanges(updatedChallanges);
    }
  };

  return (
    <div>
      <SideBar setSidebarOpen={setSidebarOpen} selectedNav="DiscountChallanges">
        <div>
          <NavBar sidebarOpen={sidebarOpen} />
          <div
            style={{
              transition: "padding-left 300ms",
              paddingTop: "50px",
              paddingLeft: sidebarOpen ? "240px" : "0px",
            }}>
            <div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}>
                  <div className="dayFilter">
                    <select
                      value={filterOption}
                      onChange={handleFilterChange}
                      style={{ textAlign: "center" }}
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example">
                      <option value="all">All discount challenges</option>
                      <option value="today">Today discount challenges</option>
                      <option value="past">Past discount challenges</option>
                    </select>
                  </div>
                </div>
                <div className="AddChallangeButton">
                  <Button
                    type={"1"}
                    text="Add Discount Challange"
                    onClick={() => setShow(true)}
                  />
                </div>
              </div>
              <div className="challangeTable">
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
                          <div className="col-2">Title</div>
                          <div className="col-2">End Date</div>
                          <div className="col-1">Type</div>
                          <div className="col-1">Amount</div>
                          <div className="col-2">Target</div>
                          <div className="col-2">Discount Type</div>
                          <div className="col-1">points</div>
                          <div className="col-1">Activities</div>
                        </div>
                      </div>
                      {/* Render DiscountChallangeCard for each item in discountChallanges array */}
                      {filterDiscountChallenges().map((challange) => (
                        <DiscountChallangeCard
                          key={challange.id}
                          id={challange.id}
                          title={challange.title}
                          endDate={challange.end_date}
                          type={challange.type}
                          Amount={challange.amount}
                          Target={challange.target}
                          discountType={challange.discount_type}
                          discountAmount={challange.discount_amount}
                          handleDelete={() =>
                            deleteDiscountChallengeById(challange.id)
                          }
                          handleChallangeEditSubmit={handleChallangeEditSubmit}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SideBar>
      <AddDiscountChallange
        show={show}
        setShow={setShow}
        handleClose={() => setShow(false)}
      />
    </div>
  );
};

export default DiscountChallanges;

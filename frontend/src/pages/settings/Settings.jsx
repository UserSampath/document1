import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar/Navbar";
import SideBar from "../../components/side/SideBar";
import Form from "react-bootstrap/Form";
import Button from "../../components/Button/Button";
import "./settings.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import { MdError } from "react-icons/md";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem("sideBarOpen") === "true"
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [adminId, setAdminId] = useState(null);

  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  
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
    const fetchAdminId = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admin/getAdmin`);
        if (response.data && response.data.length > 0) {
          setAdminId(response.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching admin ID:", error);
      }
    };
    fetchAdminId();
  }, []);

  const handleChangePassword = async () => {
    if (!oldPassword) {
      setOldPasswordError("Enter your old password");
    } else if (!validator.isLength(oldPassword, { min: 8 })) {
      setOldPasswordError("Password must be at least 8 characters long");
    } else {
      setOldPasswordError(""); // Clear old password error if it exists and the field is not empty
    }

    if (!newPassword) {
      setNewPasswordError("Please enter a new password");
    } else if (!validator.isLength(newPassword, { min: 8 })) {
      setNewPasswordError("Password must be at least 8 characters long");
    } else {
      setNewPasswordError(""); // Clear new password error if it exists and the field is not empty
    }

    if (
      oldPassword &&
      newPassword &&
      oldPassword.length >= 8 &&
      newPassword.length >= 8
    ) {
      try {
        const AdminId = adminId;
        const response = await axios.post(
          `${backendUrl}/admin/ChangePassword/${AdminId}`,
          {
            oldPassword,
            newPassword,
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          setOldPassword("");
          setNewPassword("");
        } else if (response.data.response_code === 400) {
          toast.error(response.data.error);
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div>
      <SideBar setSidebarOpen={setSidebarOpen} selectedNav="Settings">
        <div>
          <NavBar sidebarOpen={sidebarOpen} />
          <div
            style={{
              transition: "padding-left 300ms",
              paddingTop: "50px",
              paddingLeft: sidebarOpen ? "240px" : "60px",
            }}>
            <div className="d-flex justify-content-center align-items-center">
              {" "}
              <div className="mainCard">
                <div className="showCard"></div>
                <div className="formData">
                  <Form>
                    <div className="d-flex justify-content-center align-items-center">
                      <div>
                        {" "}
                        <div
                          style={{
                            fontSize: "24px",
                            fontWeight: "600",
                            marginBottom: "20px",
                          }}>
                          Change Admin Password{" "}
                        </div>
                        <div className="InputDataLeft">
                          <Form.Group>
                            <Form.Label>Old Password:</Form.Label>
                            <Form.Control
                              type="password"
                              value={oldPassword}
                              style={{ width: "300px" }}
                              onChange={(e) => setOldPassword(e.target.value)}
                            />
                            {oldPasswordError && (
                              <div className="errorContainer">
                                <MdError className="errorIcon" />{" "}
                                <p className="errorText">{oldPasswordError}</p>
                              </div>
                            )}{" "}
                            {/* Display error icon and text */}
                          </Form.Group>
                        </div>
                        <div className="InputData">
                          <Form.Group>
                            <Form.Label>New Password:</Form.Label>
                            <Form.Control
                              type="password"
                              style={{ width: "300px" }}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                            {newPasswordError && (
                              <div className="errorContainer">
                                <MdError className="errorIcon" />{" "}
                                <p className="errorText">{newPasswordError}</p>
                              </div>
                            )}{" "}
                            {/* Display error icon and text */}
                          </Form.Group>
                        </div>
                        <div
                          style={{
                            marginTop: "20px",
                            width: "100px",
                            marginBottom: "50px",
                          }}>
                          <Button
                            text="Submit"
                            type={"1"}
                            onClick={handleChangePassword}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="change-password-submit-button"></div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SideBar>
    </div>
  );
};

export default Settings;

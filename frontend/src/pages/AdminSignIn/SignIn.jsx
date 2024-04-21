import React, { useState } from "react";
import "./SignIn.css";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdError } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import background from "../../../image/background.jpg";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const signInButtonClicked = async () => {
    if (!email) {
      setEmailError("Enter email");
    } else if (!validator.isEmail(email)) {
      setEmailError("Enter valid email");
    } else if (!password) {
      setPasswordError("Enter password");
    } else if (!validator.isLength(password, { min: 8 })) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      try {
        const response = await axios.post(`${backendUrl}/admin/login`, {
          email,
          password,
        });
        if (response.status === 200) {
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.result.token)
          );

          navigate("/");
        } else if (response.status === 500) {
          const errorMessage = response.data.error;
          toast.error(errorMessage);
        }
      } catch (error) {
        if (error.response) {
          //backend error
          toast.error(error.response.data.error);
        } else {
          console.error("Error:", error.message);
        }
      }
    }
  };

  return (
    <div className="signUpPage">
      <div className="boxContainer" >
        <div className="signInBox ">
          <div style={{ position: "absolute", left: "10px", top: "10px" }}>
            <img style={{ width: "40px " }} src="../../../image/Logo.png" />
          </div>
          <div className="centerSignIn">
            <div className="signInContainer">
              <div className="ContainerTextSign">
                <h2>Welcome to</h2>
                <h2> DMS Admin Panel</h2>
                <p>Log in to access your account. </p>
              </div>
              <div className="admindiv">
                <div className="adminLog">
                  <h2>ADMIN LOGIN</h2>
                </div>
                <Form>
                  <div className="inputBox">
                    <div className="inputData">
                      <Form.Label>Email</Form.Label>
                      <div className="inputWithIcon">
                        <Form.Control
                          type="text"
                          placeholder=" Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{ width: "300px" }} // Set the width here
                          onFocus={() => setEmailError("")}
                          name="email"
                        />
                        {emailError && (
                          <div className="errorContainer">
                            <MdError className="errorIcon" />{" "}
                            <p className="errorText">{emailError}</p>
                          </div>
                        )}{" "}
                        {/* Display error icon and text */}
                      </div>
                    </div>
                    <div className="inputPass">
                      <Form.Label>Password</Form.Label>
                      <div className="inputWithIcon">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={{ width: "300px" }} // Set the width here
                          onFocus={() => setPasswordError("")}
                          name="password"
                        />
                        {passwordError && (
                          <div className="errorContainer">
                            <MdError className="errorIcon" />{" "}
                            <p className="errorText">{passwordError}</p>
                          </div>
                        )}{" "}
                        {/* Display error icon and text */}
                      </div>
                    </div>
                    <div className="buttonsContainer">
                      <Button
                        onClick={signInButtonClicked}
                        type={"1"}
                        text="Sign In"
                      />
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="leftContainner">
          <h1 className="mainwWelcome">Welcome to</h1>
          <h1 className="mainwWelcome"> Document Management System</h1>
          <p className="mainwWelcome">Log in to access your account. </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default SignIn;

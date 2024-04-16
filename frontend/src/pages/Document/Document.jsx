import React, { useEffect, useState } from "react";
import "./document.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Document = () => {
  const { userId, documentId } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [src, setSrc] = useState("");
  const [agree, setAgree] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [referenceNoError, setReferenceNoError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getUserAndDocumentData = async () => {
      
      await axios.get(
        `http://localhost:8000/userDocument/getDocumentDataWithUser/${documentId}/${userId}`
      ).then(res => {
        console.log(res.data.result);
        if (!res.data.result.userDocument || !res.data.result.document || !res.data.result.user) {
          toast.error("cant find user and document");
        } else {
          setEmail(res.data.result.user.email);
          // Assuming res.data.result.user is the response object
          setFirstName(
            res.data.result.user.firstName !== null
              ? res.data.result.user.firstName
              : firstName
          );
          setLastName(
            res.data.result.user.lastName !== null
              ? res.data.result.user.lastName
              : lastName
          );
           setPhone(
             res.data.result.user.phone !== null
               ? res.data.result.user.phone
               : phone
          );
           setReferenceNo(
             res.data.result.user.reference_no !== null
               ? res.data.result.user.reference_no
               : referenceNo
          );
          
           setEmployeeStatus(
             res.data.result.user.type == "employee"
               ? "employee"
               : "nonEmployee"
          );
          
              setSrc(
                res.data.result.document.src !== null
                  ? res.data.result.document.src
                  :""
              );
        }

      }).catch(err => {
        console.log(err);
          toast.error(err.response.data.error);
      })
      
    };

    getUserAndDocumentData();
  }, [userId]);

  const submitDocument = async () => {
    if (!firstName) {
      setFirstNameError("First name is required");
    }
    if (!lastName) {
      setLastNameError("Last name is required");
    }
    if (!phone) {
      setPhoneError("Phone number is required");
    }
    if (!referenceNo) {
      if (employeeStatus == "employee") {
        setReferenceNoError("Employee number is required");
      } else {
        setReferenceNoError("NIC number is required");
      }
    }
    if (firstName && lastName && phone && referenceNo && agree) {
      await axios
        .post("http://localhost:8000/user/createUser", {
          request_id: userId,
          firstName,
          lastName,
          phone,
          reference_no: referenceNo,
        })
        .then((response) => {
          console.log(response.data.result);
          if (response.data.result.status) {
            toast.success("your data has submitted successfully");
          }
        })
        .catch((error) => {
          console.log(error.response.data.error);
          if (error.response.data.error) {
            toast.error(error.response.data.error);
          }
        });
    }
  };
  return (
    <div
      className="documentBackground"
      style={{
        minHeight: "100vh",
        paddingTop: "20px",
        paddingBottom: "40px",
      }}>
      <div className="container document_container">
        <div
          className=" pt-2 "
          style={{
            fontWeight: "600",
            fontSize: "30px",
            color: "#6464ff",
            textAlign: "center",
          }}>
          {employeeStatus && employeeStatus == "employee" ? (
            <div> Employee Document</div>
          ) : (
            <div> Non Employee Document</div>
          )}
        </div>

        <div className=" container d-flex justify-content-center">
          <div style={{ width: "460px" }}>
            <div className=" d-flex align-items-center mt-2">
              <div
                style={{
                  width: "60px",
                  fontWeight: "600",
                  color: "#333334",
                }}>
                Name
              </div>
              <div
                className="inputLine2"
                style={{
                  border: firstNameError ? "2px solid #f09b9b" : "none",
                }}>
                <div
                  className={
                    firstNameError && firstNameError != ""
                      ? "documentErrorMessageShow"
                      : "documentErrorMessageHide"
                  }>
                  {firstNameError && firstNameError}
                </div>
                <input
                  onFocus={() => setFirstNameError("")}
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  className="input"
                  type="text"
                  placeholder="First name"
                />
              </div>

              <div
                className="inputLine2 ms-2 "
                style={{
                  border: lastNameError ? "2px solid #f09b9b" : "none",
                }}>
                <div
                  className={
                    lastNameError && lastNameError != ""
                      ? "documentErrorMessageShow"
                      : "documentErrorMessageHide"
                  }>
                  {lastNameError && lastNameError}
                </div>
                <input
                  onFocus={() => setLastNameError("")}
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  className="input"
                  type="text"
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className=" d-flex align-items-center mt-2">
              <div
                style={{ width: "60px", fontWeight: "600", color: "#333334" }}>
                Email
              </div>
              <div className="inputLine2 inputLine3 email-input">
                <input
                  value={email}
                  className="input"
                  type={"email"}
                  readOnly
                />
              </div>
            </div>

            <div className=" d-flex align-items-center mt-2">
              <div
                style={{ width: "60px", fontWeight: "600", color: "#333334" }}>
                Phone
              </div>
              <div
                className="inputLine2 "
                style={{
                  border: phoneError ? "2px solid #f09b9b" : "none",
                  width: "405px",
                }}>
                <div
                  className={
                    phoneError && phoneError != ""
                      ? "documentErrorMessageShow"
                      : "documentErrorMessageHide"
                  }>
                  {phoneError && phoneError}
                </div>
                <input
                  onFocus={() => setPhoneError("")}
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  className="input"
                  type={"tel"}
                  placeholder="123-456-7890"
                />
              </div>
            </div>
            <div className=" d-flex align-items-center mt-2">
              <div
                style={{ width: "60px", fontWeight: "600", color: "#333334" }}>
                {employeeStatus && employeeStatus == "employee"
                  ? "E No"
                  : "NIC No"}
              </div>
              <div
                className="inputLine2 "
                style={{
                  border: referenceNoError ? "2px solid #f09b9b" : "none",
                  width: "405px",
                }}>
                <div
                  className={
                    referenceNoError && referenceNoError != ""
                      ? "documentErrorMessageShow"
                      : "documentErrorMessageHide"
                  }>
                  {referenceNoError && referenceNoError}
                </div>
                <input
                  onFocus={() => setReferenceNoError("")}
                  onChange={(e) => setReferenceNo(e.target.value)}
                  value={referenceNo}
                  className="input"
                  placeholder={
                    employeeStatus && employeeStatus == "employee"
                      ? "E No"
                      : "NIC No"
                  }
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className=" d-flex justify-content-center mt-3">
          <embed
            style={{ width: "80%", height: "700px", border: "none" }}
            src={src}
            type="application/pdf"
          />
        </div>

        <div className=" d-flex align-items-center mt-2 justify-content-center mb-5 pb-4 pt-3">
          <div className=" d-flex align-items-center">
            <div
              style={{
                color: "#424242",
                paddingRight: "10px",
                fontSize: "18px",
              }}>
              Agreed
            </div>

            <input
              onChange={(e) => setAgree(e.target.checked)}
              style={{ width: "16px", height: "16px" }}
              type="checkbox"
            />
            {firstName && lastName && phone && referenceNo && agree ? (
              <div
                onClick={submitDocument}
                className="document_submit_button"
                style={{
                  marginLeft: "20px",
                  backgroundColor: "#6464ff",
                  borderRadius: "5px",
                  transition: "0.5s ease-in-out",
                  boxShadow: "0 8px 10px rgba(0, 0, 0, 0.178)",
                }}>
                <div style={{ padding: "6px 12px", color: "white" }}>
                  {" "}
                  Submit
                </div>
              </div>
            ) : (
              <div
                onClick={submitDocument}
                className="notAllowedSubmitButton"
                style={{
                  marginLeft: "20px",
                  backgroundColor: "#5f5f62",
                  borderRadius: "5px",
                  transition: "0.5s ease-in-out",
                  boxShadow: "0 8px 10px rgba(0, 0, 0, 0.178)",
                }}>
                <div style={{ padding: "6px 12px", color: "white" }}>
                  {" "}
                  Submit
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;

import React, { useEffect, useState } from "react";
import "./document.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Document = () => {
  const { userId } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [src,setSrc]=useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      await axios
        .get(`http://localhost:8000/docmentReq/getByID/${userId}`)
        .then((response) => {
          if (!response.data.success) {
            navigate("/documentNotFound");
          }
          // console.log(response);
          setEmail(response.data.result.email);
          setEmployeeStatus(response.data.result.employeeStatus);
        })
        .catch((err) => {
          console.log(err);
          navigate("/documentNotFound");
        });
    };

    getUserData();
  }, [userId]);

  useEffect(() => {
    const getPdf = async () => {
      await axios
        .get(
          `http://localhost:8000/document/getDocumentByName/${employeeStatus}`
        )
        .then((response) => {
          if (response.data.success) {
            setSrc(response.data.result.src);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (employeeStatus) {
      getPdf();
    }
  }, [employeeStatus]);

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
                style={{ width: "60px", fontWeight: "600", color: "#333334" }}>
                Name
              </div>
              <div className="inputLine2">
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  className="input"
                  type="text"
                  placeholder="First name"
                />
              </div>

              <div className="inputLine2 ms-2">
                <input
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
              <div className="inputLine2 inputLine3">
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
              <div className="inputLine2 " style={{ width: "405px" }}>
                <input
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
              <div className="inputLine2 " style={{ width: "405px" }}>
                <input
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

            <input style={{ width: "16px", height: "16px" }} type="checkbox" />

            <div
              className="document_submit_button"
              style={{
                marginLeft: "20px",
                backgroundColor: "#6464ff",
                borderRadius: "5px",
                transition: "0.5s ease-in-out",
                boxShadow: "0 8px 10px rgba(0, 0, 0, 0.178)",
              }}>
              <div style={{ padding: "6px 12px", color: "white" }}> Submit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;

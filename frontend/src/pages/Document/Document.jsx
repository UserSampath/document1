import React from "react";
import backgroundImage from "./../../images/a.png";
import "./document.css";

const Document = () => {
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
            color: "#4f4f4f",
            textAlign: "center",
          }}>
          Document
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
                  // onFocus={onFocus}
                  // onChange={(e) => onChange(e.target.value)}
                  // value={value}
                  className="input"
                  // type={type}
                  placeholder="First name"
                />
              </div>

              <div className="inputLine2 ms-2">
                <input
                  // onFocus={onFocus}
                  // onChange={(e) => onChange(e.target.value)}
                  // value={value}
                  className="input"
                  // type={type}
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
                  value={"jane@example.com"}
                  className="input"
                  type={"email"}
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
                  // onFocus={onFocus}
                  // onChange={(e) => onChange(e.target.value)}

                  className="input"
                  type={"tel"}
                  placeholder="123-456-7890"
                />
              </div>
            </div>
            <div className=" d-flex align-items-center mt-2">
              <div
                style={{ width: "60px", fontWeight: "600", color: "#333334" }}>
                NIC No
              </div>
              <div className="inputLine2 " style={{ width: "405px" }}>
                <input
                  // onFocus={onFocus}
                  // onChange={(e) => onChange(e.target.value)}
                  // value={"jane@example.com"}
                  className="input"
                  placeholder="NIC Number"

                  // type={type}
                />
              </div>
            </div>
          </div>
        </div>

        <div className=" d-flex justify-content-center mt-3">
          <embed
            style={{ width: "80%", height: "700px", border: "none" }}
            src="https://res.cloudinary.com/deqpqbovu/image/upload/v1711290255/documents/1711290252097.pdf"
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

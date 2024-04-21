import React from "react";
import { useNavigate } from "react-router-dom";
const Invites = ({ user }) => {
  const navigate = useNavigate();

  const userClicked = async () => {
    navigate(`/userDetails/${user.id}`);
  }
  console.log(user)
    return (
      <div
        onClick={userClicked}
        className="container-fluid "
        style={{
          borderBottom: "1px solid #ececec",
        }}>
        <div style={{ margin: "0px 10px 0px 30px" }}>
          <div
            className="row align-items-center container-fluid userDetails-container"
            style={{
              height: "45px",
              color: "#353434dd",
            }}>
            <div className="col-3">
              <div style={{ fontSize: "16px" }} className="">
                {user.email}
              </div>{" "}
            </div>
            <div className="col-3">
              <div
                style={{ fontSize: "16px" }}
                className="d-flex justify-content-center">
                {user.type}
              </div>{" "}
            </div>
            <div className="col-3">
              <div
                style={{ fontSize: "16px", paddingLeft: "8px" }}
                className="d-flex justify-content-center">
                {user.Documents &&
                  user.Documents.filter(
                    (doc) => doc.UserDocument.is_agreed == false
                  ).length}
              </div>
            </div>
            <div className="col-3">
              <div
                style={{ fontSize: "16px", paddingLeft: "8px" }}
                className="d-flex justify-content-center">
                {user.Documents &&
                  user.Documents.filter(
                    (doc) => doc.UserDocument.is_agreed == true
                  ).length}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Invites;

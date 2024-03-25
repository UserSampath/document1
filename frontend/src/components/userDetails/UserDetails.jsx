import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import defaultPhoto from "../../images/Men.png";
import LoginMethodTag from "../loginMethodTag/LoginMethodTag";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserDetails = ({ user, fetchUserData }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const dataObject = new Date(user.createdAt);
  const formattedDate = dataObject.toLocaleDateString("en-US", options);
  const token = JSON.parse(localStorage.getItem("token"));

  const deleteUser = async () => {
    try {
      await axios.delete(`${backendUrl}/user/deleteUser/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUserData();
      setShowDeleteModal(false); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => console.log("user clicked")}
      className="container-fluid "
      style={{
        borderBottom: "1px solid #ececec",
      }}>
      <div className=" d-flex justify-content-center">
        <div
          className="row align-items-center container-fluid userDetails-container"
          style={{
            height: "45px",
            color: "#353434dd",
          }}>
          <div className="col-2 d-flex align-items-center">
            <img
              style={{
                height: "35px",
                width: "35px",
                marginRight: "10px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
              src={user.image ? user.image : defaultPhoto}
            />
            <div
              style={{
                fontSize: "16px",
              }}>{`${user.firstName} ${user.lastName}`}</div>
          </div>
          <div className="col-3">
            <div style={{ fontSize: "16px" }}>
              {" "}
              {user.documentRequest.email}
            </div>
          </div>
          <div className="col-2">
            <div style={{ fontSize: "16px" }}> {user.phone}</div>
          </div>
          <div className="col-1">
            <div style={{ fontSize: "16px" }}>
              {" "}
              {user.documentRequest.employeeStatus == "employee"
                ? "Yes"
                : "No"}
            </div>
          </div>
          <div className="col-2">
            <div style={{ fontSize: "16px" }}> {user.reference_no}</div>
          </div>

          <div className="col-2">
            <div style={{ fontSize: "16px" }}>{formattedDate}</div>
          </div>
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header>
          <Modal.Title
            style={{ margin: "auto", paddingLeft: "0px", fontSize: "30px" }}>
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserDetails;

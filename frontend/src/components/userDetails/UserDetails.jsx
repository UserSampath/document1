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
      <div style={{ margin: "0px 10px 0px 30px" }}>
        <div
          className="row align-items-center container-fluid userDetails-container"
          style={{
            height: "45px",
            color: "#353434dd",
          }}>
          <div className="col-3 d-flex align-items-center">
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
          <div className="col-4">
            <div style={{ fontSize: "16px" }}> {user.email}</div>
          </div>
          <div className="col-3">
            <div style={{ fontSize: "16px" }}>{formattedDate}</div>
          </div>
          <div className="col-1">
            <div style={{ fontSize: "16px", paddingLeft: "8px" }}>
              {user.points}
            </div>
          </div>
          <div
            className="col-1"
            style={{
              position: "relative",
              transition: "all 0.5s ease-in-out",
            }}>
            <div
              onClick={() => setShowDeleteModal(true)}
              className="d-flex align-items-center justify-content-center user-delete-button"
              style={{
                color: "red",
                backgroundColor: "#f2ddddcc",
                borderRadius: "5px",
                width: "30px",
                height: "30px",
                position: "absolute",
                right: "10px",
                top: "-14px",
                fontSize: "18px",
              }}>
              <MdDeleteOutline className="user-delete-button-icon" />
            </div>
          </div>
        </div>
      </div>
      
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header >
          <Modal.Title style={{ margin: "auto", paddingLeft: "0px", fontSize: "30px" }}>
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

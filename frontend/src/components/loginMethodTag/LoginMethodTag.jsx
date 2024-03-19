import React from 'react'
import { FaFacebookF } from "react-icons/fa6";
import { SlSocialTwitter } from "react-icons/sl";
import { IoLogoGoogleplus } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
const LoginMethodTag = ({ loginMethod }) => {
  return (
    <div>
      {loginMethod == "facebook" && (
        <div
          className="d-inline-block"
          style={{
            backgroundColor: "#e9ecff",
            padding: "2px 5px 2px 5px",
            borderRadius: "4px",
            color: "#4848f7",
          }}>
          <div className="d-flex align-items-center ">
            <FaFacebookF style={{ marginRight: "5px", fontSize: "14px" }} />
            <div style={{ fontSize: "14px" }}>Facebook</div>
          </div>
        </div>
      )}

      {loginMethod === "twitter" && (
        <div
          className="d-inline-block"
          style={{
            backgroundColor: "#e8f6ff",
            padding: "2px 5px 2px 5px",
            borderRadius: "4px",
            color: "#1da1f2",
          }}>
          <div className="d-flex align-items-center">
            <SlSocialTwitter
              style={{ marginRight: "5px", fontSize: "14px", color: "#1da1f2" }}
            />
            <div style={{ fontSize: "14px" }}>Twitter</div>
          </div>
        </div>
      )}

      {loginMethod === "google" && (
        <div
          className="d-inline-block"
          style={{
            backgroundColor: "#ffeaea",
            padding: "2px 5px 2px 5px",
            borderRadius: "4px",
            color: "#dd4b39",
          }}>
          <div className="d-flex align-items-center">
            <IoLogoGoogleplus
              style={{ marginRight: "5px", fontSize: "17px", color: "#dd4b39" }}
            />
            <div style={{ fontSize: "14px" }}>Google+</div>
          </div>
        </div>
      )}
      {loginMethod === "email" && (
        <div
          className="d-inline-block"
          style={{
            backgroundColor: "#e6ffe3",
            padding: "2px 5px 2px 5px",
            borderRadius: "4px",
            color: "#14a004",
          }}>
          <div className="d-flex align-items-center">
            <MdOutlineMailOutline
              style={{ marginRight: "5px", fontSize: "16px", color: "#14a004" }}
            />
            <div style={{ fontSize: "14px" }}>Email</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginMethodTag
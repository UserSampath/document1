import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
const OrderDetailsModel = () => {
  return (
    <div>
      <div>
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}>
          <div
            className="modal-dialog modal-lg .modal-dialog-scrollable"
            role="document"
            style={{ width: "700px", top: "50px", margin: "auto" }}>
            <div
              className="modal-content"
              style={{ border: "none", padding: "20px 30px" }}>
              <div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="d-flex align-items-center">
                    <FaArrowLeftLong
                      color="gray"
                      style={{ marginTop: "2px" }}
                    />
                    <div style={{ marginLeft: "6px" }}>Orders</div>
                  </div>

                  <div
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      textAlign: "center",
                      fontSize: "24px",
                      fontWeight: "600",
                    }}>
                    Order Details
                  </div>
                  <div style={{ width: "70px" }}></div>
                </div>
                {/* hed over */}

                <div style={{ fontWeight: "600", fontSize: "18px" }}>#122</div>
                <div
                  className="d-flex align-items-center"
                  style={{ fontSize: "13px" }}>
                  Date : 05 Nov 2024
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => console.log("Backdrop clicked")}
          className="modal-backdrop"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.354)",
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            pointerEvents: "auto", // Ensure the backdrop div is clickable
          }}></div>
      </div>
    </div>
  );
};

export default OrderDetailsModel;

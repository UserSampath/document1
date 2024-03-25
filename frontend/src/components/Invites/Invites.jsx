import React from "react";

const Invites = ({ DocReq }) => {
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
                    <div className="col-4">
                        <div style={{ fontSize: "16px" }}>{DocReq.email}</div> {/* Assuming 'email' is a property in DocReq */}
                    </div>
                    <div className="col-4">
                        <div style={{ fontSize: "16px" }}>{DocReq.employeeStatus}</div> {/* Assuming 'employeeStatus' is a property in DocReq */}
                    </div>
                    <div className="col-4">
                        <div style={{ fontSize: "16px", paddingLeft: "8px" }}>
                            {DocReq.isAgreed ? "Yes" : "No"} {/* Assuming 'isAgreed' is a boolean property in DocReq */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invites;

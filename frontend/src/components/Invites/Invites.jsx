import React from "react";

const Invites = ({ userData }) => {
    console.log(userData[0].email)
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
                        <div style={{ fontSize: "16px" }}> {userData[0].email}</div> {/* Corrected property name */}
                    </div>
                    <div className="col-4">
                        <div style={{ fontSize: "16px" }}>{userData[0].EmployeeStatus}</div> {/* Corrected property name */}
                    </div>
                    <div className="col-4">
                        <div style={{ fontSize: "16px", paddingLeft: "8px" }}>
                            {userData[0].is_agreed ? "Agreed" : "Not Agreed"} {/* Corrected property name */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Invites;

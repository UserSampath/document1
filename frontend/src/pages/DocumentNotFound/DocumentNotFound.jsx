import React, { useEffect, useState } from "react";
import "./DocumentNotFound.css";

const DocumentNotFound = () => {

  return (
    <div
      className="documentBackground d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        paddingTop: "20px",
        paddingBottom: "40px",
      }}>
      <div className=" d-flex justify-content-center align-items-center">
        <div
          className=" container document_container"
          style={{ padding: "100px 200px" }}>
          <h1 style={{ textAlign: "center" }}>Document Not Found</h1>
        </div>
      </div>
    </div>
  );
};

export default DocumentNotFound;

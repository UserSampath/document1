import React, { useEffect, useState } from "react";
import "./UserDocuments.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DocumentCard from "../../components/DocumentCard/DocumentCard";
const UserDocuments = () => {
  const { userId } = useParams();

  const navigate = useNavigate();
  return (
    <div
      className="documentBackground"
      style={{
        minHeight: "100vh",
        paddingTop: "20px",
        paddingBottom: "40px",
      }}>
      <h2 style={{ textAlign: "center" }}>Your Documents</h2>
      <div className="container document_container p-5">
        <div
          className=" d-flex  justify-content-center "
          style={{ flexWrap: "wrap" }}>
          <DocumentCard name={"Employee Details Document"} />
          <DocumentCard name={"Employee Document"} />
          <DocumentCard name={"Employee Details Document"} />
          <DocumentCard name={"Employee Details Document"} />
          <DocumentCard name={"Employee Details Document"} />
          <DocumentCard name={"Employee Details Document"} />
        </div>
      </div>
    </div>
  );
};

export default UserDocuments;

import React from "react";
import Pdf from "./../../images/pdf.png";
import { useNavigate } from "react-router-dom";
const DocumentCard = ({ document, userId }) => {
  const navigate = useNavigate();

  const clickedDocumentCard = () => {
    navigate(`/document/${userId}/${document.id}`);
  };

  return (
    <div
      className=" d-flex  justify-content-center pdf-Card  m-2"
      onClick={clickedDocumentCard}>
      <div className="  d-flex justify-content-center py-2">
        <div
          style={{
            width: "160px",
            display: "block",
          }}>
          <img
            src={Pdf}
            alt="pdf"
            style={{ width: "160px", height: "160px", display: "block" }}
          />
          <div
            className=""
            style={{
              textAlign: "center",
              wordWrap: "break-word",
              lineHeight: "1.1",
            }}>
            {document.name}
          </div>
        </div>
      </div>  
    </div>
  );
};

export default DocumentCard;

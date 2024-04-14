import React from "react";
import Pdf from "./../../images/pdf.png";
const DocumentCard = ({ name }) => {
  return (
    <div className=" d-flex  justify-content-center pdf-Card  m-2">
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
            {name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;

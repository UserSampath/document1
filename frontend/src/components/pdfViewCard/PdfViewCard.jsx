import React from 'react'
import pdfImage from "../../images/pdf.png";
import "./pdfViewCard.css"
const PdfViewCard = ({ document,showAttachment }) => {
    const clickedAttachmentButton = () => {
        if (document.UserDocument.attachment)
          window.open(document.UserDocument.attachment, "_blank");
    }
    
    const clickedDocumentName = () => {
        if (document.src)
          window.open(document.src, "_blank");
    }


  return (
    <div
      className="row container d-flex  align-items-center mb-1"
      style={{
        height: "50px",
        borderRadius: "5px",
        border: "2px solid #adadaddd",
      }}>
      <div
        className="col-9 d-flex align-items-center py-1"
        style={{ borderRadius: "5px" }}>
        <img
          style={{
            height: "40px",
            width: "40px",
            marginRight: "5px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={pdfImage}
        />
        <div
          className="pdfNameAccepted"
          onClick={clickedDocumentName}
          style={{
            fontSize: "18px",
          }}>
          {document.name && document.name}
        </div>
      </div>
      {document.is_need_attachment &&
        showAttachment &&(
          <div
            onClick={clickedAttachmentButton}
            className="col-3 d-flex align-items-center justify-content-center viewAttachmentAccepted"
            style={{ borderRadius: "5px" }}>
            <img
              style={{
                height: "30px",
                width: "30px",
                marginRight: "3px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
              src={pdfImage}
            />
            <div
              style={{
                fontSize: "16px",
              }}>
              View Attachment
            </div>
          </div>
        )}
    </div>
  );
};

export default PdfViewCard
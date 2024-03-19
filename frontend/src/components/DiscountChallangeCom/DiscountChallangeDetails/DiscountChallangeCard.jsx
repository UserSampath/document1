import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import EditDiscountChallange from "../EditDiscountChallange/EditDiscountChallange";
import DeleteDiscountChallange from "../DeleteDiscountChallange/DeleteDiscountChallange";

const DiscountChallangeCard = ({
  id,
  title,
  endDate,
  type,
  Amount,
  Target,
  discountAmount,
  discountType,
  handleDelete,
  handleChallangeEditSubmit,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const discountChallange = {
    id,
    title,
    endDate,
    type,
    Amount,
    Target,
    discountAmount,
    discountType,
  };

  const handleEditClick = () => {
    setShowEdit(true);
  };

  const handleDeleteClick = () => {
    setShowDelete(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div
      className="container-fluid"
      style={{
        borderBottom: "1px solid #ececec",
        padding: "10px 30px 0px 30px",
      }}>
      <div
        className="row align-items-center userDetails-container"
        style={{ height: "45px", color: "#353434dd" }}>
        <div className="col-2" style={{ fontSize: "16px" }}>
          {title}
        </div>
        <div className="col-2" style={{ fontSize: "16px" }}>
          {formatDate(endDate)}
        </div>
        <div className="col-1" style={{ fontSize: "16px" }}>
          {type}
        </div>
        <div className="col-1" style={{ fontSize: "16px" }}>
          {Amount}
        </div>
        <div className="col-2" style={{ fontSize: "16px" }}>
          {Target}
        </div>
        <div className="col-2 " style={{ fontSize: "16px" }}>
          {discountType}
        </div>
        <div className="col-1" style={{ fontSize: "16px" }}>
          {discountAmount !== null ? `$${discountAmount}` : null}
        </div>
        <div className="col-1 d-flex justify-content-between align-items-center">
          <div
            className="discountChallangeEdit"
            style={{
              fontSize: "18px",
              cursor: "pointer",
              color: "green",
              backgroundColor: "#f2ddddcc",
              padding: "2px 5px",
              borderRadius: "5px  ",
              width: "30px",
              marginRight: "5px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleEditClick}>
            <TiEdit />
          </div>
          <div
            className="discountChallangeDelete"
            style={{
              fontSize: "18px",
              cursor: "pointer",
              marginRight: "95px",
              color: "red",
              backgroundColor: "#f2ddddcc",
              padding: "2px 5px",
              borderRadius: "5px  ",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleDeleteClick}>
            <MdDeleteOutline />
          </div>
        </div>
      </div>
      <EditDiscountChallange
        handleClose={() => setShowEdit(false)}
        show={showEdit}
        discountChallange={discountChallange}
        handleChallangeEditSubmit={handleChallangeEditSubmit}
      />

      <DeleteDiscountChallange
        handleDeleteClose={() => setShowDelete(false)}
        showDelete={showDelete}
        handleDelete={handleDelete} // Ensure handleDelete is passed down
      />
    </div>
  );
};

export default DiscountChallangeCard;

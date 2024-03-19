import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const [pageNumber, setPageNumber] = useState(1);
  return (
    <div className="d-flex">
      <div>
        <ul
          className="pagination pagination-sm"
          style={{ margin: 0, marginBottom: 0, paddingTop: "5px" }}>
          <li className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}>
            <div
              onClick={() => setPageNumber(pageNumber - 1)}
              style={{ color: "black", userSelect: "none" }}
              className="page-link">
              <FaAngleLeft />
            </div>
          </li>
          <li
            className={`page-item ${
              pageNumber == currentPage ? "active" : ""
            }`}>
            <div
              onClick={() => setCurrentPage(pageNumber)}
              style={{ color: "black", userSelect: "none" }}
              className="page-link ">
              {pageNumber}
            </div>
          </li>
          {totalPages > 1 && (
            <li
              className={`page-item ${
                pageNumber + 1 == currentPage ? "active" : ""
              }`}>
              <div
                onClick={() => setCurrentPage(pageNumber + 1)}
                style={{ color: "black", userSelect: "none" }}
                className="page-link">
                {pageNumber + 1}
              </div>
            </li>
          )}
          {totalPages > 2 && (
            <li
              className={`page-item ${
                pageNumber + 2 == currentPage ? "active" : ""
              }`}>
              <div
                onClick={() => setCurrentPage(pageNumber + 2)}
                style={{ color: "black", userSelect: "none" }}
                className="page-link">
                {pageNumber + 2}
              </div>
            </li>
          )}

          {totalPages > 3 && (
            <li
              className={`page-item ${
                pageNumber + 3 == currentPage ? "active" : ""
              }`}>
              <div
                onClick={() => setCurrentPage(pageNumber + 3)}
                className="page-link"
                style={{ color: "black", userSelect: "none" }}>
                {pageNumber + 3}
              </div>
            </li>
          )}

          <li
            className={`page-item ${
              pageNumber + 4 > totalPages ? "disabled" : ""
            }`}>
            <div
              onClick={() => setPageNumber(pageNumber + 1)}
              style={{ color: "black", userSelect: "none" }}
              className="page-link">
              <FaAngleRight />
            </div>
          </li>
        </ul>
      </div>
      <div
        style={{
          marginTop: "11px",
          marginLeft: "8px",
          color: "#545454dd",
          fontSize: "16px",
        }}></div>
    </div>
  );
};

export default Pagination;

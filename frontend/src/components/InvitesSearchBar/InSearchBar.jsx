import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
const InSearchBar = (props) => {
  const [searchText, setSearchText] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      props.setSearchText(searchText);
    }
  };

  const searchClose = () => {
    setSearchText("");
    props.setSearchText("");
  };
  return (
    <div
      style={{
        width: "200px",
        backgroundColor: "#ffffff",
        borderRadius: "50px",
      }}
      className="d-flex align-items-center">
      <input
        style={{ width: "142px", height: "35px" }}
        type="text"
        className="form-control border-0 shadow-none bg-transparent"
        placeholder="Search users.."
        aria-describedby="btnGroupAddon2"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div>
        {searchText == "" ? (
          <div style={{ marginLeft: "26px" }}>
            <IoSearchOutline size={23} color="gray" />
          </div>
        ) : (
          <div className=" d-flex">
            {" "}
            <div
              onClick={searchClose}
              className=" d-flex justify-content-center align-items-center search-close-button"
              style={{
                cursor: "pointer",
                fontSize: "22px",
                borderRadius: "50%",
                height: "26px",
                padding: "2px",
              }}>
              <IoCloseOutline />
            </div>
            <div
              onClick={()=>props.setSearchText(searchText)}
              className=" d-flex justify-content-center align-items-center search-correct-button"
              style={{
                cursor: "pointer",
                fontSize: "22px",
                borderRadius: "50%",
                height: "26px",
                padding: "2px",
              }}>
              <IoCheckmark />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InSearchBar;

// SearchBar.js
import React, { useState } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

const SearchBar = ({ filterProducts }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
    filterProducts(text);
  };

  return (
    <div style={{ width: "250px", backgroundColor: "#ffffff", borderRadius: "50px" }} className="d-flex align-items-center">
      <input
        style={{ width: "220px", height: "40px" }}
        type="text"
        className="form-control border-0 shadow-none bg-transparent"
        placeholder="Search Products.."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div>
        {searchText === "" ? (
          <IoSearchOutline size={22} color="gray" />
        ) : (
          <IoCloseOutline onClick={() => handleSearch("")} size={24} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;

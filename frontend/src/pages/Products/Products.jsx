// Products.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar/Navbar";
import SideBar from "../../components/side/SideBar";
import SearchBar from "../../components/productsSearchBar/SearchBar";
import Button from "../../components/Button/Button";
import AddProduct from "../../components/AddProduct/AddProduct";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./product.css";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Products = () => {
  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem("sideBarOpen") === "true"
  );

  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("token"));
    const { authUser } = useAuth();
    useEffect(() => {
      const authenticate = async () => {
        const isUserValid = await authUser(token);
        if (!isUserValid) {
          navigate("/login", { replace: true });
        }
      };
      authenticate();
    }, [authUser, token]);

  useEffect(() => {
    fetchProducts();
  }, [show]);

  //get all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/product/getAllProduct`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setProducts(response.data.products);
      setFilteredProducts(response.data.products); // Initialize filteredProducts with all products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  //product delete part
  const handleDelete = (deletedProductId) => {
    fetchProducts();
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== deletedProductId)
    );
    setFilteredProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== deletedProductId)
    );
  };
  //product update part
  const updateProduct = () => {
    fetchProducts();
  };

  //product search added
  const filterProducts = (searchText) => {
    if (!products || products.length === 0) {
      setFilteredProducts([]);
      return;
    }
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <SideBar setSidebarOpen={setSidebarOpen} selectedNav="Products">
        <div>
          <NavBar sidebarOpen={sidebarOpen} />
          <div
            style={{
              transition: "padding-left 300ms",
              paddingTop: "50px",
              paddingLeft: sidebarOpen ? "240px" : "0px",
            }}>
            <div className="d-flex justify-content-center align-items-center">
              <SearchBar filterProducts={filterProducts} />
            </div>
            <div>
              <div className="buttonContainer">
                <Button
                  type={"1"}
                  text="Add Product"
                  onClick={() => setShow(true)}
                />
              </div>
              <div className="productList">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="productItem">
                    <ProductCard
                      product={product}
                      onDelete={handleDelete}
                      updateProduct={updateProduct}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SideBar>

      <AddProduct
        show={show}
        setShow={setShow}
        handleClose={() => setShow(false)}
        setProducts={setProducts}
        products={products}
      />
    </div>
  );
};

export default Products;

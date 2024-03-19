import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "../Button/Button";
import "./ProductCard.css";
import EditProduct from "../EditProduct/EditProduct";
import DeleteModal from "../DeleteProduct/DeleteProduct";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product, onDelete, updateProduct }) => {
  const { productName, description, image, price } = product;
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const handleEditClick = () => {
    setShowEdit(true);
  };
  const handleDeleteClick = () => {
    setShowDelete(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${backendUrl}/product/deleteProduct/${product.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product delete successfully!");
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
      toast.error(error);
    }
  };

  const handleEditSubmit = (updatedProductData) => {
    setUpdatedProduct(updatedProductData);
  };

  useEffect(() => {
    if (updatedProduct) {
      console.log("Product updated:", updatedProduct);
    }
  }, [updatedProduct]);

  return (
    <Card style={{ width: "250px", margin: "5px" }}>
      <div
        className=" d-flex justify-content-center align-items-center"
        style={{ height: "160px" }}>
        {" "}
        <Card.Img variant="top" src={image} className="ProductImage" />
      </div>
      <Card.Body
        className="product-card-body"
        style={{ padding: "0 10px 10px 10px", backgroundColor: "#d7ebf657" }}>
        <Card.Title>
          <div style={{ fontWeight: "600" }}>{productName}</div>
        </Card.Title>

        <Card.Text style={{ margin: "0" }}>
          <p className="description">{description}</p>
          <div style={{ fontWeight: "600", color: "gray" }}>$ {price}</div>
        </Card.Text>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "3px",
          }}>
          <div
            onClick={handleEditClick}
            className=" d-flex justify-content-center align-items-center product-edit-button"
            style={{
              border: "2px solid #22aa22a2",
              padding: "0px 20px",
              borderRadius: "50px",
              transition: "all 200ms linear",
              height: "40px",
              cursor: "pointer",
            }}>
            <div style={{ color: "green", fontWeight: "600" }}>Edit</div>
          </div>
          <div
            onClick={handleDeleteClick}
            className=" d-flex justify-content-center align-items-center product-delete-button"
            style={{
              border: "2px solid #ff300170",
              padding: "0px 20px",
              borderRadius: "50px",
              transition: "all 200ms linear",
              height: "40px",
              cursor: "pointer",
            }}>
            <div style={{ color: "red", fontWeight: "600" }}>Delete</div>
          </div>
        </div>
      </Card.Body>
      <EditProduct
        handleClose={() => setShowEdit(false)}
        show={showEdit}
        handleEditSubmit={handleEditSubmit}
        product={product}
        updateProduct={updateProduct}
      />
      <DeleteModal
        handleDeleteClose={() => setShowDelete(false)}
        showDelete={showDelete}
        productId={product.id}
        handleDelete={handleDelete}
        onDelete={onDelete}
      />
    </Card>
  );
};

export default ProductCard;

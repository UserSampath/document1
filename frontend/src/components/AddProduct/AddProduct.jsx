import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddProduct = ({
  handleClose,
  show,
  setShow,
  products = [],
  setProducts,
}) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !description || !image || !price) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      setLoading(true); // Set loading to true when form is submitted
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("price", price);
      const response = await axios.post(
        `${backendUrl}/product/createProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      if (response.status === 200) {
        const newProduct = response.data.result;
        setProducts([...products, newProduct]);
        setShow(false);
        handleClose();
        setProductName("");
        setDescription("");
        setImage(null);
        setPrice("");
        toast.success("Product added successfully!");
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false); // Reset loading status regardless of success or failure
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="addProductForm">
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <div style={{ marginTop: "20px" }}>
              {/* Conditionally render either the submit button or the loading spinner */}
              {loading ? (
                <Button
                  type={"1"}
                  text="Uploading...."
                  disabled
                  className="w-100">
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <Button
                  text="Submit"
                  type={"1"}
                  onClick={handleSubmit}
                  className="w-100"
                />
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddProduct;

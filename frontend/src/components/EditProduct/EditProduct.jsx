import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./EditProduct.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";
import { Spinner } from "react-bootstrap";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EditProduct = ({
  handleClose,
  show,
  product,
  handleEditSubmit,
  updateProduct,
}) => {
  const [productName, setProductName] = useState(product.productName);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(product.price);
  const [showImage, setShowImage] = useState(false);
  const [isNewImageSelected, setIsNewImageSelected] = useState(false); // Track if a new image is selected
  const [loading, setLoading] = useState(false); // State to track loading status

  useEffect(() => {
    if (product.image) {
      setShowImage(true);
    }
  }, [product.image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading to true when form is submitted

      let formData = new FormData();

      formData.append("productId", product.id);
      formData.append("productName", productName);
      formData.append("description", description);
      formData.append("price", price); // Append image only if it's not null and if a new image is selected
      if (image && isNewImageSelected) {
        formData.append("image", image);
      }

      const response = await axios.put(
        `${backendUrl}/product/updateProduct`,
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
        toast.success("Product updated successfully!");
        handleClose();
        handleEditSubmit(response.data.result);
        console.log(response.data.result);
        updateProduct();
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false); // Reset loading status regardless of success or failure
    }
  };

  // Function to handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setIsNewImageSelected(true); // Set isNewImageSelected to true when a new image is selected
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="editProductForm">
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
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          {showImage ? (
            <>
              <Form.Label>Image</Form.Label>
              <div
                className=" d-flex align-items-center justify-content-between"
                style={{
                  height: "60px",
                  backgroundColor: "#00000012",
                  margin: "0px 0px opx 10px",
                }}>
                {" "}
                <img
                  src={product.image}
                  alt=""
                  style={{
                    maxHeight: "60px",
                    maxWidth: "100px",
                    width: "auto",
                    marginLeft: "10px",
                    padding: "2px",
                  }}
                />
                <div
                  onClick={() => setShowImage(false)}
                  className="image-remove-icon d-flex align-items-center"
                  style={{
                    fontSize: "24px",
                    marginRight: "10px",
                    borderRadius: "20px",
                    padding: "1px",
                  }}>
                  <IoClose />
                </div>
              </div>
            </>
          ) : (
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                placeholder="Enter image "
                type="file"
                onChange={handleImageChange} // Use the handleImageChange function for image input
              />
            </Form.Group>
          )}

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <div className="editProductButton">
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
            )}{" "}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProduct;

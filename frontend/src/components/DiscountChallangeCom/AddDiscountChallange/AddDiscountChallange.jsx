import React, { useState } from "react";
import Button from "../../Button/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./addDiscountChallange.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddDiscountChallange = ({ handleClose, show, setShow }) => {
  const [challengeTitle, setChallengeTitle] = useState("");
  const [endDate, setEndDate] = useState("");
  const [challengeType, setChallengeType] = useState("");
  const [amount, setAmounts] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [discountType, setDiscountType] = useState(""); // New state for discount type
  const [discountAmount, setDiscountAmount] = useState("");
  const amounts = {
    step: [1000, 2500, 5000, 10000, 20000],
    calories: [1000, 2500, 5000, 10000, 20000],
    exercise: [1, 2, 3, 4, 5],
  };

  const handleChallengeTypeChange = (e) => {
    const selectedType = e.target.value;
    setChallengeType(selectedType);
    setAmounts(""); // Reset additional input value
  };

  const handleAmountsChange = (e) => {
    setAmounts(e.target.value);
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
    // Reset amount when changing discount type
    setDiscountAmount("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!challengeTitle || !endDate || !challengeType || !selectedMethod) {
        toast.error("Please fill in all fields");
        return;
      }

      // Check if selected date is not a previous day
      const currentDate = new Date();
      const selectedDate = new Date(endDate);
      if (selectedDate < currentDate) {
        toast.error("End date must be after today");
        return;
      }

      let discountAmountValue = discountAmount;
      if (discountType === "delivery") {
        // If discount type is "delivery", set discount amount to null
        discountAmountValue = null;
      }

      const discountChallange = {
        title: challengeTitle,
        end_date: endDate,
        type: challengeType,
        target: selectedMethod,
        amount: amount,
        discount_type: discountType,
        discount_amount: discountAmountValue,
      };
      console.log(discountChallange);
      const response = await axios.post(
        `${backendUrl}/discountChallenge/createDiscountChallenge`,
        discountChallange
      );

      if (response.status === 200) {
        toast.success("Discount challenge submitted successfully");
        setShow(false);
        setChallengeTitle("");
        setEndDate("");
        setChallengeType("");
        setAmounts("");
        setSelectedMethod("");
        setDiscountAmount("");
        setDiscountType(""); // Reset discount type to default after submission
      } else {
        toast.error("Failed to submit discount challenge");
      }
    } catch (error) {
      toast.error("Failed to submit discount challenge", error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Discount Challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="addDiscountChallangeForm">
            <Form.Group controlId="ChallangeTitle">
              <Form.Label>Challenge Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter challenge title"
                value={challengeTitle}
                onChange={(e) => setChallengeTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="EndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="ChallengeType">
              <Form.Label>Select Challenge Type</Form.Label>
              <Form.Control
                as="select"
                onChange={handleChallengeTypeChange}
                value={challengeType}>
                <option value="">Select...</option>
                <option value="step">Steps</option>
                <option value="calories">Calories</option>
                <option value="exercise">Exercise</option>
              </Form.Control>
            </Form.Group>
            {challengeType && (
              <Form.Group controlId="Amount">
                <Form.Label>Select Amount</Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleAmountsChange}
                  value={amount}>
                  <option value="">Select...</option>
                  {amounts[challengeType].map((input, index) => (
                    <option key={index} value={input}>
                      {input}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
            <Form.Group controlId="Method">
              <Form.Label>Choose User Method</Form.Label>
              <Form.Check
                type="radio"
                label="Premium"
                name="method"
                value="premium"
                checked={selectedMethod === "premium"}
                onChange={handleMethodChange}
              />
              <Form.Check
                type="radio"
                label="All Users"
                name="method"
                value="All"
                checked={selectedMethod === "All"}
                onChange={handleMethodChange}
              />
            </Form.Group>
            <Form.Group controlId="DiscountType">
              <Form.Label>Choose Discount Type</Form.Label>
              <Form.Check
                type="radio"
                label="Price"
                name="discountType"
                value="price"
                checked={discountType === "price"}
                onChange={handleDiscountTypeChange}
              />
              <Form.Check
                type="radio"
                label="Delivery"
                name="discountType"
                value="delivery"
                checked={discountType === "delivery"}
                onChange={handleDiscountTypeChange}
              />
            </Form.Group>
            {discountType === "price" && (
              <Form.Group controlId="DiscountAmount">
                <Form.Label>Enter Discount Amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter discount amount"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)} // Corrected typo here
                />
              </Form.Group>
            )}
            <div style={{ marginTop: "20px" }}>
              <Button text="Submit" type={"1"} onClick={handleSubmit} />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddDiscountChallange;

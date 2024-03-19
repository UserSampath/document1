import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "../../Button/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Don't forget to import axios
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EditDiscountChallange = ({ handleClose, show, discountChallange,handleChallangeEditSubmit, updatedDiscountChallange}) => {
  const [challengeTitle, setChallengeTitle] = useState(discountChallange.title);
  const [endDate, setEndDate] = useState(discountChallange.endDate.substring(0, 10));
  const [challengeType, setChallengeType] = useState(discountChallange.type);
  const [amount, setAmount] = useState(discountChallange.Amount); // use amount instead of amounts
  const [selectedMethod, setSelectedMethod] = useState(discountChallange.Target);
  const [discountType, setDiscountType] = useState(discountChallange.discountType); // New state for discount type
  const [ discountAmount,setDiscountAmount] = useState(discountChallange.discountAmount);
  const amounts = {
    step: [1000, 2500, 5000, 10000, 20000],
    calories: [1000, 2500, 5000, 10000, 20000],
    exercise: [1, 2, 3, 4, 5]
  };

  const handleChallengeTypeChange = (e) => {
    const selectedType = e.target.value;
    setChallengeType(selectedType);
  };

  const handleAmountsChange = (e) => {
    setAmount(e.target.value);
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
      if (!challengeTitle || !endDate || !challengeType || !amount || !selectedMethod) {
        toast.error("Please fill in all fields");
        return;
      }
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
      const response = await axios.put(`${backendUrl}/discountChallenge/updateDiscountChallenge`, {
        id: discountChallange.id,
        title: challengeTitle,
        end_date: endDate,
        type: challengeType,
        target: selectedMethod,
        amount: amount,
        discount_type:discountType,
        discount_amount:discountAmountValue
      });
      if(response.status ==200){
        toast.success("discount challenge submitted successfully");
        handleClose();
        handleChallangeEditSubmit(response.data.result.discountChallenge);

      }else{
        toast.error(response.data.error);
        	
      }

    } catch (error) {
      toast.error("can't save data ", error);
      console.log(error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Edit Discount Challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="addDiscountChallangeForm" >
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
                value={challengeType}
              >
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
                  value={amount}
                >
                  <option value="">Select...</option>
                  {amounts[challengeType].map((input, index) => (
                    <option key={index} value={input}>{input}</option>
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
  )
}

export default EditDiscountChallange;

import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import LoginMethodTag from "../loginMethodTag/LoginMethodTag";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import OrderDetailsModel from "../orderDetailsModel/OrderDetailsModel";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const OrderDetails = ({ order, fetchOrderData }) => {
  const navigate = useNavigate();

  const options = { year: "numeric", month: "long", day: "numeric" };
  const dataObject = new Date(order.createdAt);
  const formattedDate = dataObject.toLocaleDateString("en-US", options);

  const [isOrderClicked, setIsOrderClicked] = useState(false);
  const orderClicked = () => {
    setIsOrderClicked(true);
  };

  return (
    <>
      {isOrderClicked && <OrderDetailsModel />}

      <div
        onClick={orderClicked}
        className="container-fluid "
        style={{
          borderBottom: "1px solid #ececec",
        }}>
        <div style={{ margin: "0px 10px 0px 30px" }}>
          <div
            className="row align-items-center container-fluid userDetails-container"
            style={{
              height: "50px",
              color: "#353434dd",
            }}>
            <div className="col-1" style={{}}>
              #22
            </div>
            <div className="col-3" style={{}}>
              Product1, product2
            </div>
            <div className="col-2" style={{}}>
              3
            </div>
            <div className="col-2" style={{}}>
              130$
            </div>
            <div className="col-3" style={{}}>
              Rathnapura
            </div>
            <div className="col-1" style={{}}>
              <div
                onClick={(e) => e.stopPropagation()}
                className="sss d-flex justify-content-center">
                <input
                  className="form-check-input customx"
                  type="checkbox"
                  id="checkboxNoLabel"
                  value=""
                  aria-label="..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;

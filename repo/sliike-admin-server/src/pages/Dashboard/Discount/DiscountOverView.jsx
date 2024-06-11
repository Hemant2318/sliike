import Button from "components/form/Button/Button";
import { omit } from "lodash";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createDiscount, throwSuccess } from "store/globalSlice";
import DiscountSuccessMessage from "./DiscountSuccessMessage";
import { commonRoute } from "utils/constants";
import { useRef } from "react";

const DiscountOverView = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const formRef = useRef();
  const data = location.state;
  const {
    clientNames,
    clientIds,
    promotionTitle,
    description,
    isDiscPercentage,
    discount,
    discountCode,
    endDate,
    startDate,
  } = data;

  const handelApply = async () => {
    setBtnLoading(true);
    const payload = omit(data, ["placeholderText", "signText"]);
    const response = await dispatch(createDiscount(payload));
    if (response?.status === 201) {
      // dispatch(throwSuccess("Discount added successfully"));
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate(commonRoute.discount);
      }, 2000);
    }
    if (formRef.current) {
      formRef.current.resetForm();
    }
    setBtnLoading(false);
  };
  return showSuccessPopup ? (
    <DiscountSuccessMessage />
  ) : (
    <div className="cpt-24 cpe-24 cpb-24 cps-24 bg-white rounded">
      <div className="text-20-700 color-dashboard-primary cmb-50">
        Discount overview
      </div>
      <div
        className="d-flex justify-content-center"
        style={{
          maxWidth: "474px",
          margin: "0 auto",
        }}
      >
        <div
          className="text-center"
          style={{
            width: "100%",
          }}
        >
          <div className="text-20-700 color-dashboard-primary cmb-15">
            {isDiscPercentage === 0 ? `$${discount}` : `${discount}%`} Discount
          </div>
          <div className="text-13-500-21 color-black-80 cmb-24 text-center">
            {description}
            {/* You have been assigned a 20% discount for all services and beauty
            product purchases from 17th, Jul - 30th Aug. */}
          </div>
          <div
            className="text-17-600 color-dashboard-primary cmb-24 d-flex align-items-center justify-content-center"
            style={{
              height: "79px",
              borderRadius: "8px",
              backgroundColor: "rgba(19, 44, 78, 0.1)",
              border: "1px dashed rgba(19, 44, 78, 1)",
            }}
          >
            {clientNames}
          </div>
          <div className="text-15-500 color-black-80">Discount duration</div>
          <div className="text-17-700 color-dashboard-primary border-bottom cpb-24 cmb-40">
            {moment(startDate).format("DD MMM,YYYY")} -{" "}
            {moment(endDate).format("DD MMM,YYYY")}
          </div>
          <div className="text-15-600 color-blue-60">Discount code</div>
          <div className="text-17-700 color-dashboard-primary cmb-40">
            {discountCode}
          </div>
          <div>
            <Button
              btnText="APPLY DISCOUNT"
              btnStyle="PD"
              onClick={() => {
                handelApply();
              }}
              btnLoading={btnLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountOverView;

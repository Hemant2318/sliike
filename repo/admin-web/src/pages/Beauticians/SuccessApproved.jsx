import React from "react";
import { icons } from "utils/constants";
import "./SuccessApproved.scss";

const SuccessApproved = () => {
  return (
    <div id="success-approved-container">
      <div className="success-approved-box">
        <img
          src={icons.approvedIcon}
          alt="success-approved-icon"
          className="cmb-24"
        />
        <div className="text-20-700 color-black-100">
          Beautician Successfully Approved
        </div>
      </div>
    </div>
  );
};

export default SuccessApproved;

import React from "react";
import { icons } from "utils/constants";

const DiscountSuccessMessage = () => {
  return (
    <div
      className="bg-white"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "350px",
        height: "350px",
        marginTop: "130px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "auto",
      }}
    >
      <div className="text-center">
        <img src={icons.successRound} alt="round" />
        <div className="text-17-600 color-black-80">Discount assigned</div>
      </div>
    </div>
  );
};

export default DiscountSuccessMessage;

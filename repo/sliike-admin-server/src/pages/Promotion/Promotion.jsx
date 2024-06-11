import Button from "components/form/Button/Button";
import React, { useEffect, useState } from "react";
import { commonRoute, icons } from "utils/constants";
import CurrentPromo from "./CurrentPromo";
import PastPromo from "./PastPromo";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { objectToQueryParams } from "utils/helpers";
import { omit } from "lodash";
import { fetchPromotionList } from "store/globalSlice";

const Promotion = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("current");

  return (
    <>
      <div className="cmt-24 rounded cps-24 cpe-24 cpt-22 cpb-22 h-75">
        <div className="color-dashboard-primary text-20-700 cmb-25">
          Promotion
        </div>
        <div className="d-flex justify-content-between align-items-center pb-4 border-bottom">
          <div className="d-flex gap-4">
            <Button
              btnText="Current Promo"
              btnStyle={type === "current" ? "PD" : "BD"}
              className="rounded-pill"
              onClick={() => {
                setType("current");
              }}
            />
            <Button
              btnText="Past Promo"
              btnStyle={type === "past" ? "PD" : "BD"}
              className="rounded-pill"
              onClick={() => {
                setType("past");
              }}
            />
          </div>
          <div>
            <Button
              btnText="ADD PROMOTION"
              btnStyle="PD"
              iconType="L-Add"
              onClick={() => {
                navigate(commonRoute.addPromotion);
              }}
            />
          </div>
        </div>

        {type === "current" ? (
          <CurrentPromo type={type} />
        ) : (
          <PastPromo type={type} />
        )}
      </div>
    </>
  );
};

export default Promotion;

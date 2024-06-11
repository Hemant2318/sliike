import Button from "components/form/Button/Button";
import { omit } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addPromotion,
  fetchPromotionList,
  throwSuccess,
} from "store/globalSlice";
import { commonRoute, icons } from "utils/constants";
import { objectToQueryParams } from "utils/helpers";

const PromotionSummary = () => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [referalCode, setReferalCode] = useState();
  const dispatch = useDispatch();

  const location = useLocation();
  const data = location.state;
  // console.log("data", data);

  const generateReferenceCode = (num) => {
    const randomNum = Math.floor(Math.random() * 10000000000)
      .toString()
      .padStart(num, "0"); // Generate a random 6-digit number
    const temp = "#" + randomNum;
    data.refCode = temp;
    return temp;
  };

  const handlePublish = async () => {
    setBtnLoading(true);
    const payload = omit(data, [
      "dollar",
      "placeholderText",
      "signText",
      "percentage",
      "service_category",
    ]);
    // console.log("payload", payload);
    const response = await dispatch(addPromotion(payload));
    if (response?.status === 201) {
      dispatch(throwSuccess("Promotion added successfully"));
      navigate(commonRoute.promotions);
      // if (formRef.current) {
      //   formRef.current.resetForm();
      // }
    }
    setBtnLoading(false);
  };

  return (
    <div className="cmt-24 card-effect cps-24 cpt-24 cpb-24 rounded">
      <div className="text-20-700 color-dashboard-primary cmb-50">
        Promotion Summary
      </div>
      <div
        className="d-flex justify-content-center"
        style={{
          maxWidth: "474px",
          marginTop: 0,
          marginBottom: 0,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className="text-center">
          <div className="text-20-700 color-dashboard-primary cmb-15">
            {data?.promotionTitle}
          </div>
          <div className="text-15-500 color-dashboard-primary cmb-24">
            {data?.description}
          </div>
          <div
            className="cmb-24 d-flex align-items-center justify-content-center text-32-700 color-darkgreen"
            style={{
              height: "92px",
              backgroundColor: "#78D6F5",
              borderRadius: "8px",
            }}
          >
            {data?.isDiscPercentage === 0
              ? `$${data?.discount}`
              : `${data?.discount}%`}{" "}
            OFF
            {/* <img src={icons.promotionSummary} alt="promotion-summary" /> */}
          </div>
          <div className="text-15-600 color-blue-60 cmb-8">Promo Period</div>
          <div className="text-17-700 color-dashboard-primary border-bottom cpb-24 cmb-40">
            {`${moment(data?.startDate).format("DD MMM,YYYY")} - ${moment(
              data?.endDate
            ).format("DD MMM,YYYY")}`}
          </div>
          <div className="text-15-600 color-blue-60">Referral Code: </div>
          <div className="text-17-700 color-dashboard-primary cmb-40">
            <>{generateReferenceCode(10)}</>
          </div>
          <div>
            <Button
              btnText="PUBLISH"
              btnStyle="PD"
              onClick={() => {
                handlePublish();
              }}
              btnLoading={btnLoading}
              // onClick={() => {
              //   navigate(commonRoute.promotions);
              // }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionSummary;

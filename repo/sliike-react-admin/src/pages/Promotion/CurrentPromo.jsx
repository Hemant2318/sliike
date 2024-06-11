import Loader from "components/layouts/Loader/Loader";
import { omit } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentPromotion } from "store/globalSlice";
import { icons } from "utils/constants";
import { objectToQueryParams } from "utils/helpers";

const CurrentPromo = ({ type }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPromData, setCurrentPromData] = useState({
    promotionFor: "product",
    search: "",
    data: [],
    loading: true,
  });

  const getCurrentPromotion = async (obj) => {
    const queryParams = `${objectToQueryParams(
      omit(obj, ["loading", "data"])
    )}`;
    const response = await dispatch(fetchCurrentPromotion(queryParams));
    if (response?.status === 200) {
      setCurrentPromData((prev) => {
        return {
          ...prev,
          data: response?.data?.promotionList,
          loading: false,
        };
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCurrentPromotion(currentPromData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center cmt-40">
          <Loader size="md" />
        </div>
      ) : currentPromData?.data?.length ? (
        currentPromData?.data?.map((elem, index) => {
          const {
            promotionTitle,
            discount,
            isDiscPercentage,
            description,
            referenceCode,
            startDate,
            endDate,
          } = elem;
          return (
            <div
              className="promotion-coupon cmt-40 rounded bg-light-skyblue d-flex gap-3 box-shadow"
              key={index}
            >
              <div
                className="bg-lightblue text-24-700 rounded-start text-center d-flex flex-column justify-content-center align-items-center"
                style={{ width: "100px" }}
              >
                <div>
                  {isDiscPercentage === 0 ? `$${discount}` : `${discount}%`}
                </div>
                <div>OFF</div>
              </div>
              <div className="cpt-16 cpb-24">
                <div className="text-17-700 color-dashboard-primary cmb-8">
                  {promotionTitle}
                </div>
                <div className="d-flex gap-2 cmb-8">
                  <div className="text-15-500 color-blue-60">Promo Code:</div>
                  <div className="text-15-600 color-dashboard-primary">
                    {referenceCode}
                  </div>
                </div>
                <div className="text-13-500 color-dashboard-primary lh-base text-break w-75 cmb-8">
                  {description}
                </div>
                <div className="text-15-600 color-darkgreen">
                  {moment(startDate).format("DD MMM,YYYY")} -{" "}
                  {moment(endDate).format("DD MMM,YYYY")}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="d-flex justify-content-center align-items-center h-75 bg-white">
          <div>
            <div className="d-flex justify-content-center">
              <img
                src={icons.promotionBadge}
                alt="promotion-badge"
                className="cmb-24"
              />
            </div>
            <div className="text-20-700 color-dashboard-primary cmb-24 d-flex justify-content-center">
              You currently have no running promotions
            </div>
            {/* <div className="d-flex justify-content-center">
              <Button
                btnText="ADD PROMOTION"
                btnStyle="PD"
                iconType="L-Add"
                onClick={() => {
                  navigate(commonRoute.addPromotion);
                }}
              />
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentPromo;

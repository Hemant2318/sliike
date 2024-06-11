import UserProfileLayout from "components/layouts/UserProfileLayout";
import React from "react";
import { useLocation } from "react-router-dom";
import { icons } from "utils/constants";
import { titleCaseString } from "utils/helpers";

const EcomUserJourneyDetails = () => {
  const location = useLocation();
  const data = location.state;
  const {
    businessName,
    uid,
    screenStatus,
    totalProducts,
    stripe_id,
    taxProvinceDetails,
    logo,
  } = data;
  const businessDetails = screenStatus >= 4 ? 25 : 0;
  const addProduct = totalProducts >= 3 ? 25 : 0;
  const bankDetails = stripe_id !== null ? 25 : 0;
  const salesTax = taxProvinceDetails !== null ? 25 : 0;

  const status = businessDetails + addProduct + bankDetails + salesTax;
  const userInfo = [
    {
      title: "Business detail and location",
      subTitle: ["Business detail", "Business location"],
      status: businessDetails === 0 ? `0%` : `100%`,
      screenStatus: screenStatus,
    },
    {
      title: "Add products",
      subTitle: ["Add a minimum of 3 products"],
      status: addProduct === 0 ? `0%` : `100%`,
      screenStatus: addProduct,
    },

    {
      title: "Bank details",
      subTitle: ["Add bank details to Sliike platform."],
      status: bankDetails === 0 ? `0%` : `100%`,
      screenStatus: bankDetails,
    },

    {
      title: "Sales tax details",
      subTitle: ["Update the Sales Tax number on the Sliike platform"],
      status: salesTax === 0 ? `0%` : `100%`,
      screenStatus: salesTax,
    },
  ];
  return (
    <div className="bg-white cpt-24 cpe-24 cpb-24 cps-24 rounded">
      <div className="d-flex gap-3 cmb-25">
        <div className="profile-image">
          <UserProfileLayout isSquare text={businessName} url={logo} />
          {/* <img src={icons.defaultImage} alt="profile_image" /> */}
        </div>
        <div className="user-name-container">
          <div className="text-15-700 color-black-100">
            {titleCaseString(businessName)}
          </div>
          <div className="color-blue-60 text-13-500-21">{uid}</div>
        </div>
        <div className="for-border" />
        <div className="cps-20">
          <div className="text-13-500-21 color-black-80">Total progress</div>
          <div className="text-20-700 color-primaryOrange">{`${Math.round(
            status.toFixed(2)
          )}%`}</div>
        </div>
      </div>
      <div>
        <div className="text-15-700 black-100 cmb-25">Progress detail</div>

        <div className="row detail-block g-3">
          {userInfo?.map((elem, index) => {
            const { title, subTitle, status } = elem;
            return (
              <div className="col-md-4" key={index}>
                <div className="block-one p-3">
                  <div className="flex-grow-1">
                    <div className="text-15-700 color-black-100 cmb-20">
                      {title}
                    </div>
                    {subTitle?.map((childElem, childIndex) => {
                      return (
                        <div
                          className="d-flex gap-2 align-items-center cmb-10"
                          key={childIndex}
                        >
                          <img
                            src={
                              status !== `0%`
                                ? icons.roundRightSuccess
                                : icons.roundRightGray
                            }
                            alt="confirm"
                          />
                          <div className="text-13-500-21 color-black-80">
                            {childElem}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="text-13-500-21 black-80">Status:</span>
                    <span className="text-20-700 color-black-80">{status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EcomUserJourneyDetails;

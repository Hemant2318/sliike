import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import React from "react";
import { useLocation } from "react-router-dom";
import { icons } from "utils/constants";
import { titleCaseString } from "utils/helpers";
// import "./UsersJourney.scss";

const UsersJourneyDetails = () => {
  const location = useLocation();
  const data = location.state;

  const type = data?.userType;

  const {
    profileImage,
    businessName,
    firstName,
    lastName,
    uid,
    stripe_id,
    serviceCount,
    screenStatus,
    isLicensed,
    taxProvinceDetails,
    countInvitaion,
    addressValue,
    DOB,
    demography = 0,
    gender,
    unSuccessfulSearch,
    serviceType,
    favoriteService = 0,
  } = data;

  const businessDetails = screenStatus >= 4 ? 14.3 : 0;

  const businessHours = screenStatus === 7 ? 14.3 : 0;
  const license = isLicensed === 1 ? 14.3 : 0;
  const services = serviceCount >= 3 ? 14.3 : 0;
  const bankDetails = stripe_id !== null ? 14.3 : 0;
  const importCount = countInvitaion === 1 ? 14.3 : 0;
  const serviceTax = taxProvinceDetails !== null ? 14.3 : 0;

  const status =
    businessDetails +
    businessHours +
    license +
    services +
    bankDetails +
    importCount +
    serviceTax;

  const addValue = addressValue > 0 ? 14.3 : 0;
  const dobValue = DOB !== null ? 14.3 : 0;
  const demographyVal = demography === 1 ? 14.3 : 0;
  const genderVal = gender !== null ? 14.3 : 0;
  const unSuccessService = unSuccessfulSearch >= 3 ? 14.3 : 0;
  const unFinishBooking = serviceType?.length !== 0 ? 14.3 : 0;
  const favoriteServiceVal = favoriteService >= 2 ? 14.3 : 0;

  const clientStatus =
    addValue +
    dobValue +
    demographyVal +
    genderVal +
    unSuccessService +
    unFinishBooking +
    favoriteServiceVal;

  const beauticianArray = [
    {
      title: "Business detail and location",
      subTitle: ["Business detail", "Business location"],
      status: businessDetails === 0 ? `0%` : `100%`,
      screenStatus: screenStatus,
    },
    {
      title: "Professional license",
      subTitle: ["Upload license"],
      status: license === 0 ? `0%` : `100%`,
      screenStatus: license,
    },
    {
      title: "Add services",
      subTitle: ["Add a minimum of 3 services"],
      status: services === 0 ? `0%` : `100%`,
      screenStatus: services,
    },
    {
      title: "Business hours setup",
      subTitle: ["Set up all business days and hours"],
      status: businessHours === 0 ? `0%` : `100%`,
      screenStatus: businessHours,
    },
    {
      title: "Bank details",
      subTitle: ["Add bank details to Sliike platform."],
      status: bankDetails === 0 ? `0%` : `100%`,
      screenStatus: bankDetails,
    },
    {
      title: "Import clients",
      subTitle: ["Import clients from your contact list"],
      status: importCount === 0 ? `0%` : `100%`,
      screenStatus: importCount,
    },
    {
      title: "Sales tax details",
      subTitle: ["Update the Sales Tax number on the Sliike platform"],
      status: serviceTax === 0 ? `0%` : `100%`,
      screenStatus: serviceTax,
    },
  ];

  const clientArray = [
    {
      heading: "Profile progress detail",
      value: [
        {
          title: "Location settings",
          subTitle: ["Address", "City", "Province"],
          screenStatus: addValue,
          status: addValue === 0 ? `0%` : `100%`,
        },
        {
          title: "Date of birth settings",
          subTitle: ["Day/Month/Year"],
          screenStatus: dobValue,
          status: dobValue === 0 ? `0%` : `100%`,
        },
        {
          title: "Demographic",
          subTitle: ["Demographic selection"],
          screenStatus: demographyVal,
          status: demographyVal === 0 ? `0%` : `100%`,
        },
        {
          title: "Gender",
          subTitle: ["Gender settings"],
          screenStatus: genderVal,
          status: genderVal === 0 ? `0%` : `100%`,
        },
      ],
    },
    {
      heading: "Activity progress detail",
      value: [
        {
          title: "Number of Unsuccessful service search",
          subTitle: ["3 Unsuccessful search."],
          screenStatus: unSuccessService,
          status: unSuccessService === 0 ? `0%` : `100%`,
        },
        {
          title: "Unfinished bookings",
          subTitle: ["3 Unfinished bookings."],
          subChildTitle: ["Men’s Cut", "Hair treatment", "Hair coloring"],
          screenStatus: unFinishBooking,
          status: unFinishBooking === 0 ? `0%` : `100%`,
        },
        {
          title: "Number of favorites saved",
          subTitle: ["2 services saved to favorite."],
          subChildTitle: ["Hair Loc", "SPA"],
          screenStatus: favoriteServiceVal,
          status: favoriteServiceVal === 0 ? `0%` : `100%`,
        },
        // {
        //   title: "Beauty product purchase",
        //   subTitle: ["Add product to cart"],
        //   screenStatus: 4,
        //   status: "100%",
        // },
        // {
        //   title: "Shipping info",
        //   subTitle: [
        //     "Customer info",
        //     "Phone number",
        //     "Delivery address",
        //     "Apartment info",
        //     "Province",
        //     "Zip code",
        //   ],
        //   screenStatus: 4,
        //   status: "100%",
        // },
        // {
        //   title: "Add payment info",
        //   subTitle: ["Add all payment info"],
        //   screenStatus: 4,
        //   status: "100%",
        // },
        // {
        //   title: "Review order",
        //   subTitle: ["Review and place order"],
        //   screenStatus: 4,
        //   status: "100%",
        // },
      ],
    },
  ];
  return (
    <div className="bg-white cpt-24 cpe-24 cpb-24 cps-24 rounded">
      <div className="d-flex gap-3 cmb-25">
        <div className="profile-image">
          <UserProfileLayout
            isSquare
            // text={
            //   type === "Beautician"
            //     ? businessName
            //       ? `${businessName}`
            //       : "Business Name"
            //     : `${firstName} ${lastName}`
            // }
            url={profileImage}
          />
          {/* <img src={icons.defaultImage} alt="profile_image" /> */}
        </div>
        <div className="user-name-container">
          <div className="text-15-700 color-black-100">
            {type === "Beautician"
              ? data?.businessName
                ? titleCaseString(businessName)
                : "Business Name"
              : titleCaseString(`${firstName} ${lastName}`)}
          </div>
          <div className="color-blue-60 text-13-500-21">
            {type === "Beautician" ? `ID: ${uid}` : `ID: ${uid}`}
          </div>
        </div>
        <div className="for-border" />
        <div className="cps-20">
          <div className="text-13-500-21 color-black-80">Total progress</div>
          <div className="text-20-700 color-primaryOrange">
            {type === "Beautician"
              ? `${Math.round(status.toFixed(2))}%`
              : `${Math.round(clientStatus.toFixed(2))}%`}
          </div>
        </div>
      </div>
      <div>
        <div
          className={
            type === "Beautician"
              ? "text-15-700 black-100 cmb-25"
              : "text-15-700 black-100 cmb-15"
          }
        >
          Progress detail
        </div>

        {type === "Beautician" ? (
          <div className="row detail-block g-3">
            {beauticianArray?.map((elem, index) => {
              const { title, subTitle, status, screenStatus } = elem;
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
                      <span className="text-20-700 color-black-80">
                        {status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <div className="col-md-4">
              <div className="block-one p-3">
                <div className="flex-grow-1">
                  <div className="text-15-700 color-black-100 cmb-20">
                    Professional license
                  </div>
                  <div className="d-flex gap-2 align-items-center cmb-10">
                    <img src={icons.roundRightGray} alt="confirm" />
                    <div className="text-13-500-21 color-black-80">
                      Upload license
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 align-items-center">
                  <span className="text-13-500-21 black-80">Status:</span>
                  <span className="text-20-700 color-black-80">0%</span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="block-one p-3">
                <div className="flex-grow-1">
                  <div className="text-15-700 color-black-100 cmb-20">
                    Add services
                  </div>
                  <div className="d-flex gap-2 align-items-center cmb-10">
                    <img src={icons.roundRightSuccess} alt="confirm" />
                    <div className="text-13-500-21 color-black-80">
                      Add a minimum of 3 services
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 align-items-center">
                  <span className="text-13-500-21 black-80">Status:</span>
                  <span className="text-20-700 color-black-80">100%</span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="block-one p-3">
                <div className="flex-grow-1">
                  <div className="text-15-700 color-black-100 cmb-20">
                    Business hours setup
                  </div>
                  <div className="d-flex gap-2 align-items-center cmb-20">
                    <img src={icons.roundRightSuccess} alt="confirm" />
                    <div className="text-13-500-21 color-black-80">
                      Set up all business days and hours
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 align-items-center">
                  <span className="text-13-500-21 black-80">Status:</span>
                  <span className="text-20-700 color-black-80">100%</span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="block-one p-3">
                <div className="flex-grow-1">
                  <div className="text-15-700 color-black-100 cmb-20">
                    Bank details
                  </div>
                  <div className="d-flex gap-2 align-items-center cmb-20">
                    <img src={icons.roundRightSuccess} alt="confirm" />
                    <div className="text-13-500-21 color-black-80">
                      Add bank details to Sliike platform.
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 align-items-center">
                  <span className="text-13-500-21 black-80">Status:</span>
                  <span className="text-20-700 color-black-80">100%</span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="block-one p-3">
                <div className="flex-grow-1">
                  <div className="text-15-700 color-black-100 cmb-20">
                    Import clients
                  </div>
                  <div className="d-flex gap-2 align-items-center cmb-20">
                    <img src={icons.roundRightGray} alt="confirm" />
                    <div className="text-13-500-21 color-black-80">
                      Import clients from your contact list
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 align-items-center">
                  <span className="text-13-500-21 black-80">Status:</span>
                  <span className="text-20-700 color-black-80">0%</span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="block-one p-3">
                <div className="flex-grow-1">
                  <div className="text-15-700 color-black-100 cmb-20">
                    Sales tax details
                  </div>
                  <div className="d-flex gap-2 align-items-center cmb-20">
                    <img src={icons.roundRightSuccess} alt="confirm" />
                    <div className="text-13-500-21 color-black-80">
                      Update the Sales Tax number on the Sliike platform
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 align-items-center">
                  <span className="text-13-500-21 black-80">Status:</span>
                  <span className="text-20-700 color-black-80">100%</span>
                </div>
              </div>
            </div> */}
          </div>
        ) : (
          <>
            {clientArray?.map((e, i) => {
              const { heading, value } = e;
              return (
                <>
                  <div className="text-15-600 color-black-80 cmb-20" key={i}>
                    {heading}
                  </div>
                  <div className="row detail-block g-3 cmb-30">
                    {value?.map((elem, index) => {
                      const { title, screenStatus, status, subTitle } = elem;
                      return (
                        <div className="col-md-4" key={index}>
                          <div className="block-one p-3">
                            <div className="flex-grow-1">
                              <div className="text-15-700 color-black-100 cmb-20">
                                {title}
                              </div>

                              {subTitle?.map((o, p) => {
                                return (
                                  <div
                                    className="d-flex gap-2 align-items-center cmb-10"
                                    key={p}
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
                                      {o}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="d-flex gap-2 align-items-center">
                              <span className="text-13-500-21 black-80">
                                Status:
                              </span>
                              <span className="text-20-700 color-black-80">
                                {status}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}

            {/* <div className="text-15-600 color-black-80 cmb-20">
              Activity progress detail
            </div>
            <div className="row detail-block g-3 cmb-30">
              <div className="col-md-4">
                <div className="block-one p-3">
                  <div className="flex-grow-1">
                    <div className="text-15-700 color-black-100 cmb-20">
                      Number of Unsuccessful service search
                    </div>
                    <div className="d-flex gap-2 align-items-center cmb-10">
                      <img src={icons.roundRightGray} alt="confirm" />
                      <div className="text-13-500-21 color-black-80">
                        3 Unsuccessful search.
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="text-13-500-21 black-80">Status:</span>
                    <span className="text-20-700 color-black-80">0%</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="block-one p-3">
                  <div className="flex-grow-1">
                    <div className="text-15-700 color-black-100 cmb-20">
                      Unfinished bookings
                    </div>
                    <div className="d-flex gap-2 align-items-center cmb-5">
                      <img src={icons.roundRightGray} alt="confirm" />
                      <div className="text-13-500-21 color-black-80">
                        3 Unfinished bookings.
                      </div>
                    </div>
                    <ul className="text-13-500-21 color-black-60">
                      <li>Men’s Cut</li>
                      <li>Hair treatment</li>
                      <li>Hair coloring</li>
                    </ul>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="text-13-500-21 black-80">Status:</span>
                    <span className="text-20-700 color-black-80">0%</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="block-one p-3">
                  <div className="flex-grow-1">
                    <div className="text-15-700 color-black-100 cmb-20">
                      Number of favorites saved
                    </div>
                    <div className="d-flex gap-2 align-items-center cmb-5">
                      <img src={icons.roundRightGray} alt="confirm" />
                      <div className="text-13-500-21 color-black-80">
                        2 services saved to favorite.
                      </div>
                    </div>
                    <ul className="text-13-500-21 color-black-60">
                      <li>Hair Loc</li>
                      <li>SPA</li>
                    </ul>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="text-13-500-21 black-80">Status:</span>
                    <span className="text-20-700 color-black-80">0%</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="block-one p-3">
                  <div className="flex-grow-1">
                    <div className="text-15-700 color-black-100 cmb-20">
                      Beauty product purchase
                    </div>
                    <div className="d-flex gap-2 align-items-center cmb-10">
                      <img src={icons.roundRightSuccess} alt="confirm" />
                      <div className="text-13-500-21 color-black-80">
                        Add product to cart
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="text-13-500-21 black-80">Status:</span>
                    <span className="text-20-700 color-black-80">100%</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="block-one p-3">
                  <div className="flex-grow-1">
                    <div className="text-15-700 color-black-100 cmb-20">
                      Shipping info
                    </div>
                    <div className="d-flex gap-2 align-items-center cmb-10">
                      <img src={icons.roundRightSuccess} alt="confirm" />
                      <div className="text-13-500-21 color-black-80">
                        Customer info
                      </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center cmb-10">
                      <img src={icons.roundRightSuccess} alt="confirm" />
                      <div className="text-13-500-21 color-black-80">
                        Phone number
                      </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center cmb-10">
                      <img src={icons.roundRightSuccess} alt="confirm" />
                      <div className="text-13-500-21 color-black-80">
                        Delivery address
                      </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center cmb-10">
                      <img src={icons.roundRightSuccess} alt="confirm" />
                      <div className="text-13-500-21 color-black-80">
                        Apartment info
                      </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center cmb-10">
                      <img src={icons.roundRightSuccess} alt="confirm" />
                      <div className="text-13-500-21 color-black-80">
                        Province
                      </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center cmb-10">
                      <img src={icons.roundRightSuccess} alt="confirm" />
                      <div className="text-13-500-21 color-black-80">
                        Zip code
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="text-13-500-21 black-80">Status:</span>
                    <span className="text-20-700 color-black-80">100%</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="block-one p-3">
                  <div className="flex-grow-1">
                    <div className="text-15-700 color-black-100 cmb-20">
                      Add payment info
                    </div>
                    <div className="d-flex gap-2 align-items-center cmb-20">
                      <img src={icons.roundRightSuccess} alt="confirm" />
                      <div className="text-13-500-21 color-black-80">
                        Add all payment info
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="text-13-500-21 black-80">Status:</span>
                    <span className="text-20-700 color-black-80">100%</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="block-one p-3">
                  <div className="flex-grow-1">
                    <div className="text-15-700 color-black-100 cmb-20">
                      Review order
                    </div>
                    <div className="d-flex gap-2 align-items-center cmb-20">
                      <img src={icons.roundRightSuccess} alt="confirm" />
                      <div className="text-13-500-21 color-black-80">
                        Review and place order
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="text-13-500-21 black-80">Status:</span>
                    <span className="text-20-700 color-black-80">100%</span>
                  </div>
                </div>
              </div>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default UsersJourneyDetails;

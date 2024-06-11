import React, { useEffect, useState } from "react";
import { icons } from "utils/constants";
import "./ApprovalDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
// import Button from "components/form/Button/Button";
import { Modal } from "react-bootstrap";
import SuccessApproved from "./SuccessApproved";
import { getSingleBeautician } from "store/globalSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import Loader from "components/layouts/Loader/Loader";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import LicensePopup from "./LicensePopup/LicensePopup";

const ApprovalDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [isLicensePopup, setIsLicensePopup] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  // const [show, setShow] = useState(true);
  const [popupData, setPopupData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [beauticianData, setBeauticianData] = useState({});
  const {
    uid,
    profileImage,
    businessName,
    beauticianAddress,
    rating,
    createdAt,
    firstName,
    lastName,
    serviceCategory,
    taxProvinceDetails,
    planDetail,
    User,
    Employees,
    workHours,
    logo,
    workSpaceImgs,
    description,
    isLicensed,
    licenseImage,
    facebookUrl,
    instagramUrl,
    amenities,
  } = beauticianData || {};

  const fetchBeauticianData = async () => {
    const response = await dispatch(getSingleBeautician(params?.id));

    const beauticianData = response?.beautician[0];
    setBeauticianData(beauticianData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBeauticianData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="approval-details">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="md" />
        </div>
      ) : (
        <>
          <div className="details-container cmt-20">
            <div className="details-content-container cps-30 cpt-28 cpb-28 cpe-30">
              {isLicensePopup && (
                <LicensePopup
                  onHide={() => {
                    setIsLicensePopup(false);
                  }}
                  imag={imageUrl}
                />
              )}
              <div className="tattoo-container d-flex cmb-24">
                {logo ? (
                  <img
                    src={logo && logo}
                    alt="tattoo"
                    className="logo-image"
                    // className={logo ? "logo-image" : "no-logo"}
                    onError={(e) => {
                      e.target.src = icons.defaultImage;
                    }}
                  />
                ) : (
                  <img
                    src={icons.defaultImage}
                    alt="tattoo"
                    className="logo-image"
                  />
                )}
              </div>

              <div className="sub-tattoo-container d-flex gap-3 cmb-24">
                {workSpaceImgs?.map((el) => {
                  return (
                    <img src={el} alt="tattoo" className="sub-tattoo-images" />
                  );
                })}
              </div>
              <div className="d-flex justify-content-between cmb-20">
                <div className="beauty-places-container">
                  <div className="text-20-700 color-black-100 cmb-8">
                    {businessName ? businessName : "Business Name"}
                  </div>
                  <div className="text-11-500-18 color-blue-60 cmb-8">
                    ID: {uid}
                  </div>
                  <div className="d-flex gap-2 cmb-15">
                    <div className="location-icon-container">
                      <img src={icons.map} alt="map-icon" />
                    </div>
                    <div className="address color-black-80 text-15-500">
                      <div>{beauticianAddress[0]?.address}</div>
                      <div>{beauticianAddress[0]?.city}</div>
                      <div>{beauticianAddress[0]?.zipCode}</div>
                    </div>
                  </div>
                  <div className="cmb-15">
                    <div className="text-13-500 color-blue-60">
                      Category:{" "}
                      <div className="d-flex gap-3">
                        {serviceCategory?.map((e, ind) => {
                          return (
                            <div
                              className="text-13-500-21 color-gistColor bg-gistColor-light plan-info d-flex"
                              key={ind}
                            >
                              {e?.serviceCategoryName}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="register-info d-flex gap-3">
                    <div className="text-13-500 color-blue-60">
                      Reg date:{" "}
                      <div
                        className="text-13-500-21 color-dashboard-primary bg-dashboard-primary-light plan-info"
                        onClick={() => {
                          navigate("");
                        }}
                      >
                        {createdAt && moment(createdAt).format("DD-MM-YYYY")}
                      </div>
                    </div>
                    {planDetail?.[0] && (
                      <div className="text-13-500 color-blue-60">
                        Sliike plan:{" "}
                        <div className="text-13-500-21 color-white bg-blue plan-info">
                          {planDetail?.[0]?.name}
                        </div>
                      </div>
                    )}

                    <div className="text-13-500 color-blue-60">
                      Status:{" "}
                      <div className="text-13-500-21 color-success bg-success-light plan-info">
                        {User[0]?.isActiveBeautician === 1
                          ? "Active"
                          : "Inactive"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ratings-container">
                  <div className="d-flex gap-2 align-items-center cmb-15">
                    <div>
                      <img src={icons.starIcon} alt="star" />
                    </div>
                    <div className="text-15-500 color-black-100">
                      {rating && rating}
                      {/* (0 Likes) */}
                    </div>
                  </div>
                  {/* <div className="d-flex gap-2 justify-content-end">
                    <div>
                      <img src={icons.carIcon} alt="car-icon" />
                    </div>
                    <div className="text-15-500 color-black-80">Mobile</div>
                  </div> */}
                </div>
              </div>
              <div className="bottom-bdr cmb-20" />

              <div className="cmb-20 license-container">
                <div className="text-17-700-31 cmb-5">
                  License:{" "}
                  <span className="color-black-80 text-15-500">
                    {isLicensed === 1 ? "Yes" : "No"}
                  </span>
                </div>
                {isLicensed === 1 && (
                  <div
                    className="license-image-container"
                    onClick={() => {
                      setImageUrl(licenseImage);
                      setIsLicensePopup(true);
                    }}
                  >
                    <img
                      src={licenseImage}
                      alt="license"
                      className="fill-image pointer"
                    />
                  </div>
                )}
              </div>
              <div className="bottom-bdr cmb-20" />

              <div className="cmb-20 gst-hst-container">
                <div className="text-17-700-31 cmb-5">Sales Tax Numbers:</div>

                {taxProvinceDetails != null && (
                  <>
                    <div className="gst-hst-number-container">
                      <span className="color-black-60 text-15-500">
                        GST/HST:{" "}
                      </span>
                      <span className="color-black-100 text-15-500">
                        {taxProvinceDetails?.GSTNumber
                          ? taxProvinceDetails?.GSTNumber
                            ? taxProvinceDetails?.GSTNumber
                            : "-"
                          : taxProvinceDetails?.HSTNumber
                          ? taxProvinceDetails?.HSTNumber
                          : "-"}
                      </span>
                    </div>

                    <div className="gst-hst-number-container">
                      <span className="color-black-60 text-15-500">
                        QST/PST:{" "}
                      </span>
                      <span className="color-black-100 text-15-500">
                        {taxProvinceDetails?.QSTNumber
                          ? taxProvinceDetails?.QSTNumber
                            ? taxProvinceDetails?.QSTNumber
                            : "-"
                          : taxProvinceDetails?.PSTNumber
                          ? taxProvinceDetails?.PSTNumber
                          : "-"}
                      </span>
                    </div>
                  </>
                )}

                {/* <div className="gst-hst-number-container">
                  <span className="color-black-60 text-15-500">GST/HST: </span>
                  <span className="color-black-100 text-15-500">
                    110292548 RT0001
                  </span>
                </div>
                <div className="gst-hst-number-container">
                  <span className="color-black-60 text-15-500">QST/PST: </span>
                  <span className="color-black-100 text-15-500">
                    110292548 RT0001
                  </span>
                </div> */}
              </div>
              <div className="bottom-bdr cmb-20" />

              {/* <div className="cmb-20 button-container pt-4 pb-4">
            <div className="d-flex gap-3 justify-content-end">
              <Button btnText="CANCEL" btnStyle="BO" />
              <Button
                btnText="APPROVE"
                btnStyle="PD"
                onClick={() => {
                  setPopupData(true);
                }}
              />
            </div>
          </div> */}

              <div className="personal-details-container cmb-20">
                <div className="text-17-700-31 cmb-5">Personal Profile</div>
                <div className="d-flex gap-2 cmb-10">
                  <div className="color-black-60">First name:</div>
                  <div className="black-100">{firstName}</div>
                </div>
                <div className="d-flex gap-2 cmb-10">
                  <div className="color-black-60">Last name:</div>
                  <div className="black-100">{lastName}</div>
                </div>
                <div className="d-flex gap-2 cmb-10">
                  <div className="color-black-60">Email:</div>
                  <div className="color-black-100">{User[0]?.email}</div>
                </div>

                <div className="d-flex gap-2">
                  <div className="color-black-60">Mobile number:</div>
                  <div className="color-black-100">{User[0]?.phoneNumber}</div>
                </div>
              </div>
              <div className="bottom-bdr cmb-20" />

              <div className="Business-details-container cmb-20">
                <div className="text-17-700-31 cmb-5">Business Contact</div>
                <div className="d-flex align-items-center gap-2 cmb-10">
                  <div>
                    <img src={icons.cell} alt="cell-icon" />
                  </div>
                  <div className="black-100 text-15-500">
                    {User[0]?.phoneNumber}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2 cmb-10">
                  <div>
                    <img src={icons.email} alt="email-icon" />
                  </div>
                  <div className="color-blue text-15-500">{User[0]?.email}</div>
                </div>
              </div>
              <div className="bottom-bdr cmb-20" />

              <div className="staff-member-container cmb-20">
                <div className="text-17-700-31 cmb-5">Staff members</div>

                <div className="d-flex gap-4 row g-0 flex-wrap">
                  <div className="col-md-2 cmb-10 d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex">
                      <UserProfileLayout
                        isRounded
                        size="70"
                        url={profileImage}
                      />
                    </div>
                    <div className="black-100 text-15-600 d-flex gap-2">
                      <span>{firstName}</span>
                      <span>{lastName}</span>
                    </div>
                    <div className="black-60 text-15-500 d-flex justify-content-center">
                      Owner
                    </div>
                  </div>
                  {Employees?.map((o, i) => {
                    const { profileImage, firstName, lastName } = o;
                    return (
                      <div
                        className="cmb-10 d-flex flex-column align-items-center justify-content-center col-md-2"
                        key={i}
                      >
                        <div className="d-flex align-items-center">
                          <UserProfileLayout
                            isRounded
                            text={`${firstName} ${lastName}`}
                            size="70"
                            url={profileImage}
                          />
                        </div>
                        <div className="black-100 text-15-600 d-flex gap-2">
                          <span>{firstName}</span>
                          <span>{lastName}</span>
                        </div>
                        <div className="black-60 text-15-500 d-flex justify-content-center">
                          Artist
                        </div>
                      </div>
                    );
                  })}
                  {/* <div className="cmb-10">
                    <div className="d-flex">
                      <img src={icons.artist2} alt="artist2-icon" />
                    </div>
                    <div className="black-100 text-15-600">John Parker</div>
                    <div className="black-60 text-15-500 d-flex justify-content-center">
                      Artist
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="bottom-bdr cmb-20" />

              <div className="about-details-container cmb-20">
                <div className="text-17-700-31 cmb-5">
                  About Queens Beauty Palace
                </div>
                <div className="d-flex gap-4">
                  <div className="cmb-10">
                    <div className="black-80 text-15-500 d-flex">
                      {description && description}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-bdr cmb-20" />
              {workHours[0] && (
                <>
                  <div className="time-details-container cmb-20">
                    <div className="text-17-700-31 cmb-5">Opening Hours</div>
                    {workHours[0]?.dayDetails?.map((elems, indexes) => {
                      const { day, startTime, endTime, isOpen } = elems;
                      return (
                        <div
                          className="d-flex justify-content-between"
                          key={indexes}
                        >
                          <div className="text-15-500  color-blcak-60">
                            <div>{day}</div>
                            {/* <div>Monday - Friday</div> */}
                            {/* <div>Sarturday</div>
                        <div>Sarturday</div> */}
                          </div>

                          <div className="text-15-600 color-black text-end">
                            <div>
                              {isOpen === false
                                ? "Closed"
                                : `${startTime} ${
                                    startTime && endTime && " - "
                                  } ${endTime}`}
                            </div>
                            {/* <div>Closed</div> */}
                            {/* <div>Closed</div> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="bottom-bdr cmb-20" />
                </>
              )}

              <div className="social-media-container cmb-20">
                <div className="text-17-700-31 cmb-5">Social Media Link</div>
                <div className="d-flex gap-4">
                  <div
                    className="cmb-10 pointer"
                    onClick={() => {
                      window.open(
                        instagramUrl,
                        "_blank"
                        // "noopener,noreferrer"
                      );
                    }}
                  >
                    <div className="d-flex justify-content-center">
                      <img src={icons.instagram} alt="owner-icon" />
                    </div>
                    <div className="black-100 text-15-600">Instagram</div>
                  </div>
                  <div
                    className="cmb-10 pointer"
                    onClick={() => {
                      window.open(
                        facebookUrl,
                        "_blank"
                        // "noopener,noreferrer"
                      );
                    }}
                  >
                    <div className="d-flex justify-content-center">
                      <img src={icons.facebook} alt="artist1-icon" />
                    </div>
                    <div className="black-100 text-15-600">Facebook</div>
                  </div>
                </div>
              </div>
              <div className="bottom-bdr cmb-20" />

              <div className="amenities-container cmb-20">
                <div className="text-17-700-31 cmb-5">Amenities</div>

                <div className="cmb-10 text-15-500 black-80">
                  {amenities?.map((elem, index) => {
                    const { name } = elem;
                    return (
                      <div className="cmb-10" key={index}>
                        {name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {popupData && (
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show
              onHide={() => {
                setPopupData(null);
              }}
            >
              <Modal.Body className="h-50">
                <SuccessApproved />
              </Modal.Body>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default ApprovalDetail;

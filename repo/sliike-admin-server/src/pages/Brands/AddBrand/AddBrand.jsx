import React, { useEffect, useState } from "react";
import TextInput from "components/form/TextInput/TextInput";
import Dropdown from "components/form/Dropdown/Dropdown";
import DatePicker from "components/form/DatePicker/DatePicker";
import Button from "components/form/Button/Button";
import ImageCropper from "components/layouts/ImageCropper/ImageCropper";
import {
  contractTypeList,
  icons,
  sliikePlanList,
  targetAudienceList,
} from "utils/constants";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEqual } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBrand, fetchBrandCategory, getDemography } from "store/globalSlice";
import { objectToFormData } from "utils/helpers";
import "./AddBrand.scss";
import moment from "moment";

const AddBrand = () => {
  const navigate = useNavigate();
  const [cropFile, setCropFile] = useState(null);
  const [logoCropFile, setLogoCropFile] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [logoImgData, setLogoImgData] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const dispatch = useDispatch();
  const { brandCategory } = useSelector((state) => ({
    brandCategory: state.global.brandCategory,
  }));
  const { demographyList } = useSelector((state) => ({
    demographyList: state.global.demographyList,
  }));

  const initialValues = {
    brandBanner: "",
    brandLogo: "",
    brandName: "",
    brandCategoryId: "",
    brandOwner: "",
    email: "",
    phoneNumber: "",
    country: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    targetAudience: "",
    targetDemographicId: "",
    registeredDate: "",
    sliikePlan: "",
    contractType: "",
    startDate: "",
    endDate: "",
    contractDuration: "",
    plateFormFee: "",
    discount: "",
    discountAmount: "",
    HSTOrGST: "",
    QSTOrPST: "",
    totalFeeCharge: "",
    websiteUrl: "",
    shippingPolicyUrl: "",
    returnPolicyUrl: "",
  };

  const validationSchema = Yup.object().shape({
    brandBanner: Yup.mixed().required("Brand banner is required"),
    brandLogo: Yup.mixed().required("Brand logo is required."),
    brandName: Yup.string()
      .required("Brand name is required.")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets allowed."),
    brandCategoryId: Yup.string().required("Brand category is required."),
    brandOwner: Yup.string()
      .required("Brand owner is required.")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets allowed."),
    email: Yup.string()
      .required("Email is required.")
      .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "Email must be a valid email"),
    phoneNumber: Yup.string()
      .required("Mobile is required.")
      .matches(/^[0-9]{10}$/, "Only 10 digits allowed "),
    address: Yup.string().required("Address is required."),
    country: Yup.string().required("Country is required."),
    city: Yup.string().required("City is required."),
    province: Yup.string().required("Province is required."),
    postalCode: Yup.string()
      .required("Postal code is required.")
      .matches(/^[0-9]{10}$/, "Enter valid postal code"),
    targetAudience: Yup.string().required("Target audience is required."),
    targetDemographicId: Yup.string().required(
      "Target demography is required."
    ),
    registeredDate: Yup.string().required("Registere ddate is required."),
    sliikePlan: Yup.string().required("Sliike plan is required."),
    contractType: Yup.string().required("Contract type is required."),
    startDate: Yup.string().required("Start date is required."),
    endDate: Yup.string().required("End date is required."),
    // contractDuration: Yup.string().required("Contract duration is required."),
    plateFormFee: Yup.string().required("PlateForm fee is required."),
    discount: Yup.string().required("Discount is required."),
    discountAmount: Yup.string().required("Discount amount is required."),
    HSTOrGST: Yup.string().required("HSTOrGST is required."),
    QSTOrPST: Yup.string().required("QSTOrPST is required."),
    totalFeeCharge: Yup.string().required("TotalFee charge is required."),
    websiteUrl: Yup.string().required("Website URL is required."),
    shippingPolicyUrl: Yup.string().required(
      "Shipping policy URL is required."
    ),
    returnPolicyUrl: Yup.string().required("Return policy URL is required."),
  });

  const handleSaveBrand = async (value) => {
    setBtnLoading(true);
    const formData = objectToFormData(value);
    const response = await dispatch(addBrand(formData));
    if (response?.status === 200) {
      // localStorage.setItem("data", JSON.stringify(response?.brandId));
      navigate(`/brands/add-brand/product/step-2/${response?.brandId}`);
    }
    setBtnLoading(false);
  };

  const initAPI = async () => {
    await dispatch(fetchBrandCategory());
    await dispatch(getDemography());
  };
  useEffect(() => {
    initAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="add-brand-container" className="cmt-24">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSaveBrand}
      >
        {(props) => {
          const { values, errors, handleChange, setFieldValue, handleSubmit } =
            props;
          const {
            brandBanner,
            brandLogo,
            brandName,
            brandCategoryId,
            brandOwner,
            email,
            phoneNumber,
            country,
            address,
            city,
            province,
            postalCode,
            targetAudience,
            targetDemographicId,
            registeredDate,
            sliikePlan,
            contractType,
            startDate,
            endDate,
            contractDuration,
            plateFormFee,
            discount,
            discountAmount,
            HSTOrGST,
            QSTOrPST,
            totalFeeCharge,
            websiteUrl,
            shippingPolicyUrl,
            returnPolicyUrl,
          } = values;

          return (
            <form>
              <div className="cps-24 cpt-24 cpb-24 bg-white rounded row">
                <div className="text-20-700 color-dashboard-primary d-flex gap-3 cmb-24 align-items-center">
                  Add Brand Basic Info
                  <div className="text-17-600 color-blue">STEP-1</div>
                </div>
                <div className="image-upload-section cmb-48 col-md-6">
                  <div className="text-15-600 color-dashboard-primary cmb-16">
                    Upload brand Logo & banner
                  </div>

                  <div className="upload-banner-container d-flex justify-content-center align-items-center cpt-85 cpb-85">
                    {brandBanner ? (
                      <img
                        src={imgData ? imgData : brandBanner}
                        alt="banner"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          borderRadius: "10px",
                        }}
                        onError={(e) => {
                          e.target.src = icons.defaultImage;
                        }}
                      />
                    ) : (
                      <img
                        src={icons.defaultImage}
                        alt="banner"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          borderRadius: "10px",
                        }}
                      />
                    )}
                    <div className="banner-upload text-13-500-21 color-black-80 gap-2 d-flex align-items-center">
                      <img src={icons.addSquareBanner} alt="add-banner" />
                      Upload Brand Banner
                      <input
                        type="file"
                        className="fileType pointer"
                        name="Banner Image"
                        onChange={(e) => {
                          var files = e?.target?.files;
                          var extension = files[0]?.type;

                          if (
                            ["image/png", "image/jpg", "image/jpeg"].includes(
                              extension
                            )
                          ) {
                            if (e?.target?.files[0]) {
                              setCropFile(
                                URL.createObjectURL(e?.target?.files[0])
                              );
                              const reader = new FileReader();
                              reader.addEventListener("load", () => {
                                setImgData(reader.result);
                              });
                              reader.readAsDataURL(e.target.files[0]);
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="logo-upload text-13-500-21 color-black-80 d-flex justify-content-center align-items-center">
                      {brandLogo ? (
                        <img
                          src={logoImgData ? logoImgData : brandLogo}
                          alt="logo"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            borderRadius: "50%",
                          }}
                          onError={(e) => {
                            e.target.src = icons.defaultImage;
                          }}
                        />
                      ) : (
                        <img
                          src={icons.defaultImage}
                          alt="logo"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            borderRadius: "50%",
                          }}
                        />
                      )}
                      Logo
                      <input
                        type="file"
                        className="logoType pointer"
                        name="Logo"
                        accept="image/*"
                        onChange={(e) => {
                          var files = e?.target?.files;
                          var extension = files[0]?.type;

                          if (
                            ["image/png", "image/jpg", "image/jpeg"].includes(
                              extension
                            )
                          ) {
                            if (e?.target?.files[0]) {
                              setLogoCropFile(
                                URL.createObjectURL(e?.target?.files[0])
                              );
                              const reader = new FileReader();
                              reader.addEventListener("load", () => {
                                setLogoImgData(reader.result);
                              });
                              reader.readAsDataURL(e.target.files[0]);
                            }
                          }
                        }}
                      />
                    </div>

                    {/* <div className="logo-upload text-13-500-21 color-black-80 d-flex justify-content-center align-items-center">
                        Logo
                        <input
                          type="file"
                          className="logoType pointer"
                          name="Logo"
                          accept="image/*"
                          onChange={(e) => {
                            var files = e?.target?.files;
                            var extension = files[0]?.type;

                            if (
                              ["image/png", "image/jpg", "image/jpeg"].includes(
                                extension
                              )
                            ) {
                              if (e?.target?.files[0]) {
                                setLogoCropFile(
                                  URL.createObjectURL(e?.target?.files[0])
                                );
                                const reader = new FileReader();
                                reader.addEventListener("load", () => {
                                  setLogoImgData(reader.result);
                                });
                                reader.readAsDataURL(e.target.files[0]);
                              }
                            }
                          }}
                        />
                      </div> */}
                  </div>

                  {cropFile && (
                    <ImageCropper
                      onHide={() => {
                        setCropFile(null);
                      }}
                      fileURL={cropFile}
                      handelCropImage={(file) => {
                        setFieldValue("brandBanner", file || "");
                      }}
                    />
                  )}
                  {logoCropFile && (
                    <ImageCropper
                      onHide={() => {
                        setLogoCropFile(null);
                      }}
                      fileURL={logoCropFile}
                      handelCropImage={(file) => {
                        setFieldValue("brandLogo", file || "");
                      }}
                    />
                  )}
                </div>
                <div className="col-md-6" />

                <>
                  <span
                    className="col-md-4 text-13-500"
                    style={{ color: "red" }}
                  >
                    {errors?.brandBanner}{" "}
                    {errors?.brandLogo && errors?.brandBanner && "and"}{" "}
                    {errors?.brandLogo}
                  </span>
                  <div className="col-md-8" />
                </>

                <div className="col-md-3 cmb-24">
                  <TextInput
                    label="Brand name"
                    id="brandName"
                    value={brandName}
                    onChange={handleChange}
                    error={errors?.brandName}
                  />
                </div>
                <div className="col-md-3">
                  <Dropdown
                    label="Brand category"
                    id="brandCategoryId"
                    value={brandCategoryId}
                    options={brandCategory}
                    optionValue="brandCategoryName"
                    optionKey="_id"
                    onChange={(e) => {
                      setFieldValue("brandCategoryId", e.target.data?._id);
                    }}
                    error={errors?.brandCategoryId}
                  />
                </div>
                <div className="col-md-6" />
                <div className="col-md-3 cmb-24">
                  <TextInput
                    label="Brand owner"
                    id="brandOwner"
                    value={brandOwner}
                    onChange={handleChange}
                    error={errors?.brandOwner}
                  />
                </div>
                <div className="col-md-3">
                  <TextInput
                    label="Email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    error={errors?.email}
                  />
                </div>
                <div className="col-md-6" />
                <div className="col-md-3 cmb-24">
                  <TextInput
                    label="Phone number"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                    error={errors?.phoneNumber}
                  />
                </div>
                <div className="col-md-3">
                  <TextInput
                    label="Country"
                    id="country"
                    value={country}
                    onChange={handleChange}
                    error={errors?.country}
                  />
                </div>
                <div className="col-md-6" />
                <div className="col-md-3 cmb-24">
                  <TextInput
                    label="Address"
                    id="address"
                    value={address}
                    onChange={handleChange}
                    error={errors?.address}
                  />
                </div>
                <div className="col-md-3">
                  <TextInput
                    label="City"
                    id="city"
                    value={city}
                    onChange={handleChange}
                    error={errors?.city}
                  />
                </div>
                <div className="col-md-6" />

                <div className="col-md-3 cmb-24">
                  <TextInput
                    label="Province"
                    id="province"
                    value={province}
                    onChange={handleChange}
                    error={errors?.province}
                  />
                </div>
                <div className="col-md-3">
                  <TextInput
                    label="Postal code"
                    id="postalCode"
                    value={postalCode}
                    onChange={handleChange}
                    error={errors?.postalCode}
                  />
                </div>
                <div className="col-md-6" />

                <div className="col-md-3 cmb-24">
                  <Dropdown
                    label="Target audince"
                    id="targetAudience"
                    value={targetAudience}
                    onChange={handleChange}
                    options={targetAudienceList}
                    optionValue="value"
                    optionKey="id"
                    error={errors?.targetAudience}
                  />
                </div>
                <div className="col-md-3">
                  <Dropdown
                    label="Target demographics"
                    id="targetDemographicId"
                    value={targetDemographicId}
                    onChange={handleChange}
                    options={demographyList}
                    optionValue="demographyName"
                    optionKey="_id"
                    error={errors?.targetDemographicId}
                  />
                </div>
                <div className="col-md-6" />

                <div className="col-md-3 cmb-24">
                  <DatePicker
                    label="Date registered"
                    id="registeredDate"
                    value={registeredDate}
                    onChange={handleChange}
                    error={errors?.registeredDate}
                    maxDate={new Date()}
                  />
                </div>
                <div className="col-md-3">
                  <Dropdown
                    label="Sliike plan"
                    id="sliikePlan"
                    value={sliikePlan}
                    onChange={handleChange}
                    options={sliikePlanList}
                    optionValue="value"
                    optionKey="id"
                    error={errors?.sliikePlan}
                  />
                </div>
                <div className="col-md-6" />
                <div className="col-md-3 cmb-24">
                  <Dropdown
                    label="Contract type"
                    id="contractType"
                    value={contractType}
                    onChange={handleChange}
                    options={contractTypeList}
                    optionValue="value"
                    optionKey="id"
                    error={errors?.contractType}
                  />
                </div>
                <div className="col-md-9" />
                <div className="col-md-3 cmb-24">
                  <DatePicker
                    label="Start date"
                    id="startDate"
                    value={startDate}
                    onChange={handleChange}
                    error={errors?.startDate}
                    minDate={new Date()}
                  />
                </div>
                <div className="col-md-3 cmb-24">
                  <DatePicker
                    label="End date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => {
                      const startData = startDate;
                      const endData = e.target.value;
                      const startMoment = moment(startData, "YYYY-MM-DD");
                      const endMoment = moment(endData, "YYYY-MM-DD");
                      const dateDifferenceInDays = endMoment.diff(
                        startMoment,
                        "days"
                      );
                      setFieldValue(
                        "contractDuration",
                        `${dateDifferenceInDays} days`
                      );
                      handleChange(e);
                    }}
                    error={errors?.endDate}
                    minDate={startDate}
                  />
                </div>
                <div className="col-md-6" />

                <div className="col-md-3 cmb-24">
                  <TextInput
                    label="Contract duration"
                    id="contractDuration"
                    value={contractDuration}
                    onChange={handleChange}
                    disabled
                    // error={errors?.contractDuration}
                  />
                </div>
                <div className="col-md-3">
                  <TextInput
                    label="Platform fee"
                    id="plateFormFee"
                    value={plateFormFee}
                    onChange={handleChange}
                    error={errors?.plateFormFee}
                  />
                </div>
                <div className="col-md-6" />

                <div className="col-md-3 cmb-24">
                  <TextInput
                    label="Discount(%)"
                    id="discount"
                    value={discount}
                    onChange={handleChange}
                    error={errors?.discount}
                  />
                </div>
                <div className="col-md-3">
                  <TextInput
                    label="Discount amount"
                    id="discountAmount"
                    value={discountAmount}
                    onChange={handleChange}
                    error={errors?.discountAmount}
                  />
                </div>
                <div className="col-md-6" />

                <div className="col-md-3 cmb-24">
                  <TextInput
                    label="HST/GST"
                    id="HSTOrGST"
                    value={HSTOrGST}
                    onChange={handleChange}
                    error={errors?.HSTOrGST}
                  />
                </div>
                <div className="col-md-3">
                  <TextInput
                    label="QST/PST"
                    id="QSTOrPST"
                    value={QSTOrPST}
                    onChange={handleChange}
                    error={errors?.QSTOrPST}
                  />
                </div>
                <div className="col-md-6" />

                <div className="col-md-3 cmb-24">
                  <TextInput
                    label="Total Fee charged"
                    id="totalFeeCharge"
                    value={totalFeeCharge}
                    onChange={handleChange}
                    error={errors?.totalFeeCharge}
                  />
                </div>
                <div className="col-md-9" />

                <div className="col-md-6 cmb-24">
                  <TextInput
                    label="Website URL"
                    id="websiteUrl"
                    value={websiteUrl}
                    onChange={handleChange}
                    error={errors?.websiteUrl}
                  />
                </div>
                <div className="col-md-6" />

                <div className="col-md-3 cmb-42">
                  <TextInput
                    label="Shipping policy (URL)"
                    id="shippingPolicyUrl"
                    value={shippingPolicyUrl}
                    onChange={handleChange}
                    error={errors?.shippingPolicyUrl}
                  />
                </div>
                <div className="col-md-3">
                  <TextInput
                    label="Return policy (URL)"
                    id="returnPolicyUrl"
                    value={returnPolicyUrl}
                    onChange={handleChange}
                    error={errors?.returnPolicyUrl}
                  />
                </div>
                <div className="col-md-6" />

                <div className="col-md-6">
                  <Button
                    btnText="CONTINUE"
                    btnStyle={isEqual(values, initialValues) ? "DD" : "PD"}
                    onClick={handleSubmit}
                    btnLoading={btnLoading}
                  />
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddBrand;

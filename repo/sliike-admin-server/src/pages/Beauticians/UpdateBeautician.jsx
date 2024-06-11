import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  editBeautician,
  getDetailsOfBeautician,
  getLocationFromGeo,
  getProvinceList,
  throwError,
  throwSuccess,
} from "store/globalSlice";
import TextInput from "components/form/TextInput";
import Dropdown from "components/form/Dropdown";
import GoogleInput from "components/form/GoogleInput";
import PhoneNumber from "components/form/PhoneNumber";
import { useNavigate, useParams } from "react-router-dom";
import Button from "components/form/Button";
import { isEqual, omit } from "lodash";
import Loader from "components/layouts/Loader";

const UpdateBeautician = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { bId } = params;
  const formRef = useRef();
  const { provinceList } = useSelector((state) => ({
    provinceList: state.global.provinceList,
  }));
  const [locationAddress, setLocationAddress] = useState("");
  const [beauticianData, setBeauticianData] = useState({
    data: [],
    loader: true,
  });
  // const [isSuccess, setIsSuccess] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  // const [isEmailPopup, setIsEmailPopup] = useState(null);
  // const [isData, setIsData] = useState({});
  const fetchBeauticianDetails = async () => {
    const response = await dispatch(getDetailsOfBeautician(bId));
    if (response.status === 200) {
      setBeauticianData((prev) => {
        return {
          ...prev,
          data: response?.beautician,
          loader: false,
        };
      });
      if (response?.beautician?.[0]?.location) {
        const { location } = response?.beautician?.[0];
        const area = location?.coordinates || [];
        const long = area?.[0];
        const lat = area?.[1];
        const locationName = await dispatch(getLocationFromGeo({ lat, long }));
        if (locationName?.data && locationName?.data?.results.length > 0) {
          const locationData = locationName?.data?.results[0];
          setLocationAddress(locationData?.formatted_address);
        }
      }
    }
  };
  const {
    firstName = "",
    lastName = "",
    businessName = "",
    businessNumber = "",
    country = "",
    User = "",
    beauticianAddress = [],
  } = beauticianData?.data?.[0] || {};
  const { email = "", phoneNumber = "" } = User || {};
  const {
    province = "",
    address = "",
    apartment = "",
    city = "",
    zipCode = "",
  } = beauticianAddress?.[0] || {};

  const handleSave = async (values) => {
    let coordinates = [values?.latitude, values?.longitude];
    const payload = { ...values, coordinates: coordinates };
    const finalPayload = omit(payload, ["latitude", "longitude"]);
    setBtnLoading(true);
    const response = await dispatch(editBeautician(finalPayload, bId));
    if (response?.status === 200) {
      dispatch(throwSuccess(response?.message));
      if (formRef.current) {
        formRef.current.resetForm();
      }
      navigate(`/beauticians`);
    } else {
      dispatch(throwError(response?.message));
    }
    setBtnLoading(false);
  };

  const initAPI = async () => {
    await dispatch(getProvinceList());
  };

  useEffect(() => {
    fetchBeauticianDetails();
    initAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = {
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    phoneNumber: phoneNumber || "",
    country_code: "Ca",
    country_name: "Canada",
    businessName: businessName || "",
    businessNumber: businessNumber || "",
    latitude: "",
    longitude: "",
    country: country || "",
    province: province || "",
    street_address: address || "",
    apartment: apartment || "",
    city: city || "",
    pinCode: zipCode || "",
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required.")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets allowed."),
    lastName: Yup.string()
      .required("Last name is required.")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets allowed."),
    email: Yup.string()
      .required("Email is required.")
      .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "Email must be a valid email"),
    phoneNumber: Yup.string()
      .required("Mobile is required.")
      .matches(/^[0-9]{10}$/, "Only 10 digits allowed "),
    businessName: Yup.string()
      .required("Business name is required.")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets allowed."),
    businessNumber: Yup.string()
      .required("Business phone is required.")
      .matches(/^[0-9]{10}$/, "Only 10 digits allowed "),
    latitude: Yup.string().required("Location is required."),
    province: Yup.string().required("Province is required."),
  });
  return (
    <div
      id="update-beautician-container"
      className="cmt-24 cms-24 cme-24 pb-5 position-relative"
    >
      {beauticianData.loader ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="md" />
        </div>
      ) : (
        <>
          <div className="text-20-700 color-black-100 cmb-20">
            Update Client
          </div>
          <div className="client-form">
            <div className="text-17-600">Update Basic Details</div>
            <Formik
              innerRef={formRef}
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSave}
            >
              {(props) => {
                const {
                  values,
                  errors,
                  handleChange,
                  submitForm,
                  setFieldValue,
                } = props;
                const {
                  firstName,
                  lastName,
                  email,
                  phoneNumber,
                  country_code,
                  businessName,
                  businessNumber,
                  country,
                  province,
                  street_address,
                  apartment,
                  city,
                  pinCode,
                } = values;
                return (
                  <form
                    className="row"
                    onSubmit={submitForm}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        submitForm(e);
                      }
                    }}
                  >
                    <div className="col-md-4 cmb-24">
                      <TextInput
                        label="First Name"
                        placeholder="Enter First Name"
                        id="firstName"
                        value={firstName}
                        error={errors.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4 cmb-24">
                      <TextInput
                        label="Last Name"
                        placeholder="Enter Last Name"
                        id="lastName"
                        value={lastName}
                        error={errors.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4" />
                    <div className="col-md-4 cmb-40">
                      <TextInput
                        label="Email Address"
                        placeholder="Enter Email"
                        id="email"
                        value={email}
                        error={errors.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4 cmb-40">
                      <PhoneNumber
                        label="Phone Number"
                        placeholder="Enter Phone Number"
                        id="phoneNumber"
                        value={phoneNumber}
                        error={errors.phoneNumber}
                        onChange={handleChange}
                        country_code={country_code}
                        onCodeChange={(e) => {
                          setFieldValue("country_code", e?.target?.value);
                          setFieldValue("country_name", e?.target?.data?.name);
                        }}
                      />
                    </div>
                    <div className="col-md-4" />

                    <div className="text-17-600">Update Business Details</div>
                    <div className="col-md-4 cmb-40">
                      <TextInput
                        label="Business Name"
                        placeholder="Enter business name"
                        id="businessName"
                        value={businessName}
                        error={errors?.businessName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <TextInput
                        label="Phone Number"
                        placeholder="Enter phone number"
                        id="businessNumber"
                        value={businessNumber}
                        error={errors?.businessNumber}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="text-17-600">
                      Update Business Location Details
                    </div>
                    <div className="col-md-4 cmb-20">
                      <GoogleInput
                        label="Location"
                        placeholder="Enter location"
                        id="latitude"
                        error={errors?.latitude}
                        defaultValue={locationAddress}
                        onChange={(e) => {
                          setFieldValue("address", e?.address);
                          setFieldValue("latitude", e?.latitude);
                          setFieldValue("longitude", e?.longitude);
                          setFieldValue("country", e?.country);
                          setFieldValue("apartment", e?.locality);
                          setFieldValue("city", e?.administrative_area_level_3);
                          setFieldValue("pinCode", e?.postal_code);
                        }}
                      />
                    </div>

                    <div className="col-md-4 cmb-20">
                      <TextInput
                        label="Country"
                        placeholder="Enter country"
                        id="country"
                        value={country}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 cmb-20">
                      <Dropdown
                        label="Province"
                        placeholder="Enter province"
                        id="province"
                        options={provinceList}
                        optionValue="name"
                        optionKey="_id"
                        value={province}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 cmb-20">
                      <TextInput
                        label="Street Address"
                        placeholder="Enter street address"
                        id="street_address"
                        value={street_address}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 cmb-20">
                      <TextInput
                        label="Apartment"
                        placeholder="Enter apartment"
                        id="apartment"
                        value={apartment}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <TextInput
                        label="City"
                        placeholder="Enter city"
                        id="city"
                        value={city}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 cmb-40">
                      <TextInput
                        label="PinCode"
                        placeholder="Enter pin code"
                        id="pinCode"
                        value={pinCode}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4" />

                    <div className="col-md-8">
                      <Button
                        btnText="UPDATE"
                        btnStyle={isEqual(initialValues, values) ? "DD" : "PD"}
                        onClick={() => {
                          submitForm();
                        }}
                        disabled={isEqual(initialValues, values)}
                        btnLoading={btnLoading}
                      />
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateBeautician;

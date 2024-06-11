import Button from "components/form/Button/Button";
import Dropdown from "components/form/Dropdown/Dropdown";
import GoogleInput from "components/form/GoogleInput/GoogleInput";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import { omit } from "lodash";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProvinceList,
  setBeauticianPhoneNumber,
  stepOne,
  throwError,
  throwSuccess,
} from "store/globalSlice";
import * as Yup from "yup";

const StepOne = ({ activeStep, setActiveStep }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const { provinceList, beauticianPhoneNumber } = useSelector((state) => ({
    provinceList: state.global.provinceList,
    beauticianPhoneNumber: state.global.beauticianPhoneNumber,
  }));
  const params = useParams();
  const dispatch = useDispatch();
  const formRef = useRef();
  const navigate = useNavigate();

  const handleSave = async (value) => {
    setBtnLoading(true);
    let coordinates = [value?.latitude, value?.longitude];
    const payload = { ...value, coordinates: coordinates };
    const finalPayload = omit(payload, ["latitude", "longitude"]);
    const response = await dispatch(stepOne(finalPayload));
    if (response?.status === 200) {
      dispatch(throwSuccess(response?.message));
      if (formRef.current) {
        formRef.current.resetForm();
      }
      navigate(`/beauticians/add-beautician/${params?.bId}/step-2`);
      setActiveStep(activeStep + 1);
    } else {
      dispatch(throwError(response.message));
    }
    await dispatch(setBeauticianPhoneNumber(""));
    setBtnLoading(false);
  };

  const initAPI = async () => {
    await dispatch(getProvinceList());
  };

  useEffect(() => {
    initAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = {
    beauticianId: params?.bId,
    businessName: "",
    businessNumber: +beauticianPhoneNumber || "",
    latitude: "",
    longitude: "",
    country: "",
    province: "",
    address: "",
    street_address: "",
    city: "",
    post_code: "",
    apartment: "",
  };
  const validationSchema = Yup.object().shape({
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
    <div id="step-one-container" className="row g-0 gx-5">
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {(props) => {
          const { values, errors, handleChange, submitForm, setFieldValue } =
            props;
          const {
            businessName,
            businessNumber,
            country,
            province,
            apartment,
            street_address,
            city,
            post_code,
          } = values;
          return (
            <>
              <h5>Business Details</h5>
              <div className="col-md-4 cmb-20">
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

              <h5>Business Location</h5>
              <div className="col-md-4 cmb-20">
                <GoogleInput
                  label="Location"
                  placeholder="Enter location"
                  id="latitude"
                  error={errors?.latitude}
                  onChange={(e) => {
                    setFieldValue("address", e?.address);
                    setFieldValue("latitude", e?.latitude);
                    setFieldValue("longitude", e?.longitude);
                    setFieldValue("country", e?.country);
                    setFieldValue("address", e?.address);
                    setFieldValue("street_address", e?.locality);
                    setFieldValue("city", e?.administrative_area_level_3);
                    setFieldValue("post_code", e?.postal_code);
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

              <div className="col-md-4 cmb-20">
                <TextInput
                  label="City"
                  placeholder="Enter city"
                  id="city"
                  value={city}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 cmb-20">
                <TextInput
                  label="PinCode"
                  placeholder="Enter pin code"
                  id="post_code"
                  value={post_code}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-8" />

              <div className="d-flex">
                <Button
                  btnText="Save"
                  btnStyle="PD"
                  onClick={submitForm}
                  btnLoading={btnLoading}
                />
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default StepOne;

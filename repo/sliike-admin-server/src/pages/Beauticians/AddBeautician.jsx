import React, { useRef, useState } from "react";
import TextInput from "components/form/TextInput/TextInput";
import Button from "components/form/Button/Button";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  sendInvitation,
  setBeauticianPhoneNumber,
  throwError,
  throwSuccess,
} from "store/globalSlice";
import { useNavigate } from "react-router-dom";
import { isEqual } from "lodash";
import PhoneNumber from "components/form/PhoneNumber/PhoneNumber";
import "./AddBeautician.scss";

const AddBeautician = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();
  // const [isSuccess, setIsSuccess] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  // const [isEmailPopup, setIsEmailPopup] = useState(null);
  // const [isData, setIsData] = useState({});

  const handleSave = async (values) => {
    setBtnLoading(true);
    await dispatch(setBeauticianPhoneNumber(values?.phoneNumber));
    const response = await dispatch(sendInvitation(values));
    if (response?.status === 200) {
      dispatch(throwSuccess(response?.message));
      if (formRef.current) {
        formRef.current.resetForm();
      }
      navigate(`/beauticians/add-beautician/${response?.beauticianId}/step-1`);
    } else {
      dispatch(throwError(response?.message));
    }
    setBtnLoading(false);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country_code: "Ca",
    country: "Canada",
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
  });

  return (
    <div
      id="add-beautician-container"
      className="cmt-24 cms-24 cme-24 pb-5 position-relative"
    >
      {/* {isSuccess && (
        <div className="primary-container d-flex gap-2 justify-content-center align-items-center rounded">
          <span className="bg-white pt-1 pb-1 ps-1 pe-1 rounded">
            <i className="bi bi-check d-flex" />
          </span>
          <span className="text-14-500 color-white">
            Invite successfully sent
          </span>
          <span className="text-13-500 color-dashboard-primary bg-white cps-10 cpe-10 cpt-2 rounded">
            OK
          </span>
        </div>
      )} */}
      {/* {isEmailPopup &&
        (isData ? (
          <EmailPopup
            onHide={() => {
              setIsEmailPopup(null);
              if (formRef.current) {
                formRef.current.resetForm();
              }
              setIsSuccess(true);
              setTimeout(() => {
                setIsSuccess(false);
              }, 3000);
            }}
            isData={isData}
          />
        ) : (
          ""
        ))} */}

      <div className="text-20-700 color-black-100 cmb-20">Add Beautician</div>
      <div className="desc-block color-dashboard-primary cmb-20">
        Add basic information of a beautician and send invite. They will get a
        notification to complete their business registration.
      </div>
      <div className="beautician-form">
        <div className="text-17-600">Add Info</div>
        <Formik
          innerRef={formRef}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {(props) => {
            const { values, errors, handleChange, submitForm, setFieldValue } =
              props;
            const { firstName, lastName, email, phoneNumber, country_code } =
              values;
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
                      setFieldValue("country", e?.target?.data?.name);
                    }}
                  />
                </div>
                <div className="col-md-4" />

                <div className="col-md-8">
                  <Button
                    btnText="CONTINUE"
                    btnStyle={isEqual(initialValues, values) ? "DD" : "PD"}
                    onClick={() => {
                      submitForm();
                    }}
                    btnLoading={btnLoading}
                  />
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddBeautician;

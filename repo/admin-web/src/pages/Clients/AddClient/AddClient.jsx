import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import TextInput from "components/form/TextInput";
import PhoneNumber from "components/form/PhoneNumber";
import Button from "components/form/Button";
import { isEqual } from "lodash";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import PasswordInput from "components/form/PasswordInput";
// import { commonRoute } from "utils/constants";
import "./AddClient.scss";

const AddClient = () => {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const formRef = useRef();

  // const [isSuccess, setIsSuccess] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  // const [isEmailPopup, setIsEmailPopup] = useState(null);
  // const [isData, setIsData] = useState({});

  const handleSave = async (values) => {
    console.log("handleSave ~ values:", values);
    setBtnLoading(true);
    // const response = await dispatch(sendInvitation(values));
    // if (response?.status === 200) {
    //   dispatch(throwSuccess(response?.message));
    //   if (formRef.current) {
    //     formRef.current.resetForm();
    //   }
    //   navigate(commonRoute.clients);
    // }
    setBtnLoading(false);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country_code: "Ca",
    country: "Canada",
    password: "",
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
    password: Yup.string().required("Password is required."),
  });

  return (
    <div
      id="add-client-container"
      className="cmt-24 cms-24 cme-24 pb-5 position-relative"
    >
      <div className="text-20-700 color-black-100 cmb-20">Add Client</div>
      <div className="desc-block color-dashboard-primary cmb-20">
        Add basic information of a client and send invite. They will get a
        notification to complete their registration.
      </div>
      <div className="client-form">
        <div className="text-17-600">Add Basic Details</div>
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
            const {
              firstName,
              lastName,
              email,
              phoneNumber,
              country_code,
              password,
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
                <div className="col-md-4">
                  <TextInput
                    label="Email Address"
                    placeholder="Enter Email"
                    id="email"
                    value={email}
                    error={errors.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 cmb-20">
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

                <div className="col-md-4 cmb-40">
                  <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    id="password"
                    value={password}
                    error={errors.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-8" />

                <div className="col-md-8">
                  <Button
                    btnText="SUBMIT"
                    btnStyle={isEqual(initialValues, values) ? "DD" : "PD"}
                    onClick={() => {
                      submitForm();
                    }}
                    btnLoading={btnLoading}
                    disabled={isEqual(initialValues, values)}
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

export default AddClient;

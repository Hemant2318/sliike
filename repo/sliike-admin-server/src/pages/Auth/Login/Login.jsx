import Button from "components/form/Button";
import PasswordInput from "components/form/PasswordInput";
import TextInput from "components/form/TextInput";
import React, { useState } from "react";
import { icons } from "utils/constants";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { login, throwError } from "store/globalSlice";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);

  const handelSave = async (values) => {
    setBtnLoading(true);
    const response = await dispatch(login(values));
    if (response?.status === 200) {
      navigate("/");
    } else {
      dispatch(throwError(response.message));
    }

    setBtnLoading(false);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email")
      .required("Email is required."),
    password: Yup.string().required("Password is required."),
  });

  return (
    <div id="login-continer">
      <div className="login-block">
        <div className="login-heading-block bg-dashboard-primary cmb-24 cpt-16">
          <div className="logo-block cpb-8">
            <img src={icons.Sliikelogo4} alt="sliike-logo" />
          </div>
          <div className="logo-text text-17-500 color-blue-10">
            Welcome to Sliike admin portal
          </div>
        </div>
        <div className="login-content-block cpt-40 cpb-40 cps-32 cpe-32">
          <div className="login-content-block-heading cmb-24">
            <div className="text-17-600  color-black-100">SIGN IN</div>
            <div className="text-15-500 color-black-80">
              Sign in to manage your account.
            </div>
          </div>

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handelSave}
          >
            {(props) => {
              const { values, errors, handleChange, submitForm } = props;
              const { email, password } = values;
              return (
                <form
                  onSubmit={submitForm}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      submitForm(e);
                    }
                  }}
                >
                  <div className="cmb-24">
                    <TextInput
                      label="Email Address"
                      placeholder="Enter you email address here"
                      id="email"
                      value={email}
                      error={errors.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="cmb-16">
                    <PasswordInput
                      label="Password"
                      placeholder="Enter password"
                      id="password"
                      value={password}
                      error={errors.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="forgot-text cmb-24">
                    <span
                      className="text-16-500 color-blue pointer"
                      // onClick={() => {
                      //   navigate(commonRoute.changePassword);
                      // }}
                    >
                      Forgot Password?
                    </span>
                  </div>

                  <div>
                    <Button
                      btnText="SIGN IN"
                      btnStyle={email && password ? "PD" : "DD"}
                      className="h-56 text-16-600"
                      onClick={submitForm}
                      btnLoading={btnLoading}
                      // onClick={() => {
                      // navigate(
                      //   email && password
                      //     ? params?.secreat
                      //       ? commonRoute.changePassword
                      //       : commonRoute.dashboard
                      //     : ""
                      // );
                      // }}
                    />
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;

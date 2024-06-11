import Button from "components/form/Button";
import PasswordInput from "components/form/PasswordInput";
import TextInput from "components/form/TextInput";
import React, { useState } from "react";
import { commonRoute, icons } from "utils/constants";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { login, throwError } from "store/globalSlice";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);

  const handelSave = async (values) => {
    setBtnLoading(true);
    const response = await dispatch(login(values));
    let newData = response?.settings;
    let data = {
      ...newData,
      serviceSettings: [{ falsecount: 0 }],
      eCommerceSettings: [{ falsecount: 0 }],
      referralsSettings: [{ falsecount: 0 }],
      termsPolicySettings: [{ falsecount: 0 }],
      faqSettings: [{ falsecount: 0 }],
      feedbackSettings: [{ falsecount: 0 }],
      contactUsSettings: [{ falsecount: 0 }],
      moreOptionsSettings: [{ falsecount: 0 }],
    };
    if (response?.status === 200) {
      if (response?.settings) {
        const accessibility = data;
        if (accessibility?.dashboardSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.dashboard);
        } else if (accessibility?.beauticianSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.beauticians);
        } else if (accessibility?.clientSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.clients);
        } else if (accessibility?.brandSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.brands);
        } else if (accessibility?.serviceSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.services);
        } else if (accessibility?.productSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.products);
        } else if (accessibility?.eCommerceSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.eCommerceType);
        } else if (accessibility?.promotionSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.promotions);
        } else if (accessibility?.referralsSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.referrals);
        } else if (accessibility?.gistSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.gist);
        } else if (accessibility?.adminSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.admins);
        } else if (accessibility?.termsPolicySettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.termsPolicy);
        } else if (accessibility?.faqSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.faq);
        } else if (accessibility?.feedbackSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.feedback);
        } else if (accessibility?.contactUsSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.contactUs);
        } else if (accessibility?.moreOptionsSettings?.[0]?.falsecount !== 3) {
          navigate(commonRoute?.moreOptionsType);
        } else {
          //nothing
        }
      }
    } else {
      dispatch(throwError(response?.message));
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

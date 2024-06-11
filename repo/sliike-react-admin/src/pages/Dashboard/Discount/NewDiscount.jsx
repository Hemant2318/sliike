import Button from "components/form/Button/Button";
import DatePicker from "components/form/DatePicker/DatePicker";
import RadioButton from "components/form/RadioButton/RadioButton";
import SignTextInput from "components/form/SignTextInput/SignTextInput";
import TextArea from "components/form/TextArea/TextArea";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEqual } from "lodash";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { commonRoute } from "utils/constants";
import ClientListPopup from "./ClientListPopup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NewDiscount = () => {
  const [oldIds, setOldIds] = useState([]);
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const formRef = useRef();
  const [showPopup, setShowPopup] = useState(false);

  const { clientList } = useSelector((state) => ({
    clientList: state.global.clientList,
  }));

  // const sendDataToParent = () => {
  //   // setClientIds(e.target);
  //   // setShowPopup(false);
  // };

  const initialValues = {
    clientIds: [],
    clientNames: "",
    promotionTitle: "",
    discountCode: "",
    description: "",
    signText: "",
    isDiscPercentage: "",
    placeholderText: "",
    discount: "",
    startDate: "",
    endDate: "",
  };

  const validationSchema = Yup.object().shape({
    clientNames: Yup.string().required("Client names code is required."),
    promotionTitle: Yup.string().required("Discount title is required."),
    discountCode: Yup.string().required("Discount code is required."),
    description: Yup.string().required("Description is required."),
    signText: Yup.string().required("Radio option is required"),
    discount: Yup.lazy((value, obj) => {
      const { isDiscPercentage } = obj?.parent;
      if (isDiscPercentage === 1) {
        return Yup.string()
          .required("Percentage is required.")
          .matches(
            /\b(0*(?:[1-9][0-9]?|100))\b/,
            "Value can not be greater then 100"
          );
      } else {
        return Yup.string()
          .required("Amount is required.")
          .matches(
            /^(?=.{1,3}$)\d+(?:\.\d+)?$/,
            "Value can not be greater then 3 digits"
          );
      }
    }),
    // discount: Yup.string()
    //   .required("Discount value is required")
    //   .matches(
    //     /\b(0*(?:[1-9][0-9]?|100))\b/,
    //     "Value can not be greater then 100"
    //   ),
    startDate: Yup.string().required("Start date is required."),
    endDate: Yup.string().required("End date is required."),
  });
  const handelSave = async (values) => {
    setBtnLoading(true);
    if (values) {
      navigate(commonRoute.newDiscountSummary, { state: values });
    }
    setBtnLoading(false);
  };

  return (
    <div className="cmt-24 card-effect cps-24 cpt-24 cpb-24">
      <div className="text-20-700 color-dashboard-primary cmb-24">
        Add New discount
      </div>

      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handelSave}
      >
        {(props) => {
          const { values, errors, handleChange, setFieldValue, submitForm } =
            props;
          const {
            clientNames,
            clientIds,
            promotionTitle,
            discountCode,
            description,
            signText,
            placeholderText,
            discount,
            startDate,
            endDate,
          } = values;

          let names = [];
          clientList
            .filter((o) => clientIds?.includes(o?._id))
            ?.forEach((e) => {
              names.push([`${e.firstName} ${e.lastName}`]);
            });

          return (
            <form className="row">
              {showPopup && (
                <ClientListPopup
                  onHidePopup={() => {
                    setShowPopup(false);
                  }}
                  sendDataToParent={(e) => {
                    setOldIds(e?.id);
                    setFieldValue("clientIds", e?.id);
                    setFieldValue("clientNames", e?.name);
                  }}
                  oldIds={oldIds}
                />
              )}
              <div className="col-md-6 cmb-24">
                <TextInput
                  isRightArrow
                  label="Assign to"
                  placeholder="Select client"
                  id="clientNames"
                  value={clientNames}
                  error={errors?.clientNames}
                  onClick={() => {
                    setShowPopup(true);
                  }}
                />
              </div>
              <div className="col-md-9" />

              <div className="col-md-4 cmb-24">
                <TextInput
                  label="Discount title"
                  placeholder="Add discount title"
                  id="promotionTitle"
                  value={promotionTitle}
                  onChange={handleChange}
                  error={errors?.promotionTitle}
                />
              </div>

              <div className="col-md-2">
                <TextInput
                  label="Add discount code"
                  placeholder="Add code"
                  id="discountCode"
                  value={discountCode}
                  onChange={handleChange}
                  error={errors?.discountCode}
                />
              </div>
              <div className="col-md-6" />

              <div className="col-md-6 cmb-24">
                <TextArea
                  label="Description"
                  placeholder="Enter message"
                  id="description"
                  value={description}
                  onChange={handleChange}
                  error={errors?.description}
                />
              </div>
              <div className="col-md-5" />

              <div className="col-md-6 cmb-40">
                <div className="text-17-700 color-dashboard-primary cmb-16">
                  Set Discount
                </div>
                <div className="bg-blue-5 cps-24 cpe-24 cpt-16 cpb-16 border rounded">
                  <div className="text-17-600 color-dashboard-primary cmb-16">
                    Set discount by:
                    <span
                      className="text-13-500 cps-10"
                      style={{ color: "red" }}
                    >
                      {errors.signText}
                    </span>
                  </div>

                  <div className="d-flex gap-2 cmb-24">
                    <RadioButton
                      label="Percentage (%)"
                      value="Discount (%)"
                      name="currency"
                      id="usd"
                      checked={signText === "Discount (%)"}
                      onChange={(e) => {
                        setFieldValue("signText", "Discount (%)");
                        setFieldValue("placeholderText", "0%");
                        setFieldValue("isDiscPercentage", 1);
                      }}
                    />
                    <div>|</div>
                    <RadioButton
                      label="Amount ($)"
                      value="Discount ($)"
                      name="currency"
                      id="inr"
                      checked={signText === "Discount ($)"}
                      onChange={(e) => {
                        setFieldValue("signText", "Discount ($)");
                        setFieldValue("placeholderText", "$0.00");
                        setFieldValue("isDiscPercentage", 0);
                      }}
                    />
                  </div>
                  <div>
                    <SignTextInput
                      signValue={signText}
                      placeholder={placeholderText}
                      id="discount"
                      value={discount}
                      onChange={handleChange}
                      error={errors.discount}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-5" />

              <div className="cmb-16 text-17-700 color-dashboard-primary">
                Set discount Date
              </div>
              <div className="col-md-3">
                <DatePicker
                  label="Start Date"
                  placeholder="dd/mm/yy"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => {
                    setFieldValue("endDate", "");
                    handleChange(e);
                  }}
                  minDate={new Date()}
                  error={errors?.startDate}
                />
              </div>
              <div className="col-md-3 cmb-40">
                <DatePicker
                  label="End Date"
                  placeholder="dd/mm/yy"
                  id="endDate"
                  value={endDate}
                  onChange={handleChange}
                  minDate={startDate}
                  error={errors?.endDate}
                />
              </div>
              <div className="col-md-6" />

              <div className="col-md-6">
                <Button
                  btnText="CONTINUE"
                  className="text-15-600"
                  btnStyle={isEqual(initialValues, values) ? "DD" : "PD"}
                  disabled={isEqual(initialValues, values)}
                  btnLoading={btnLoading}
                  onClick={submitForm}
                />
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewDiscount;

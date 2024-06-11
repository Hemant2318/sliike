import Button from "components/form/Button/Button";
import DatePicker from "components/form/DatePicker/DatePicker";
import Dropdown from "components/form/Dropdown/Dropdown";
import RadioButton from "components/form/RadioButton/RadioButton";
import SignTextInput from "components/form/SignTextInput/SignTextInput";
import TextArea from "components/form/TextArea/TextArea";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { commonRoute } from "utils/constants";
import ProductServicePromotion from "./ProductServicePromotion";
import { useDispatch } from "react-redux";
import {
  fetchCurrentPromotion,
  getBusinessList,
  getProductList,
} from "store/globalSlice";
import { objectToQueryParams } from "utils/helpers";
import { omit } from "lodash";

const AddPromotion = () => {
  const [type, setType] = useState("service");

  return (
    <div className="cmt-24 card-effect cps-24 cpt-24 cpb-24">
      <div className="text-20-700 color-dashboard-primary cmb-24">
        Add New promotion
      </div>

      <div className="d-flex gap-4 cmb-24">
        <Button
          btnText="Service"
          btnStyle={type === "service" ? "PD" : "BD"}
          className="rounded-pill"
          onClick={() => {
            setType("service");
          }}
        />

        {/* <Button
          btnText="Product"
          btnStyle={type === "product" ? "PD" : "BD"}
          className="rounded-pill"
          onClick={() => {
            setType("product");
          }}
        /> */}
      </div>

      {type === "service" && <ProductServicePromotion type={type} />}

      {/* {type === "product" && <ProductServicePromotion type={type} />} */}

      {/* <Formik initialValues={initialValues} enableReinitialize>
        {(props) => {
          const { values, handleChange, setFieldValue } = props;
          const {
            promotion_title,
            beauty_business,
            service_category,
            description,
            signText,
            placeholderText,
            percentage,
            dollar,
            discount,
            start_date,
            end_date,
          } = values;
          return (
            <form className="row">
              <div className="col-md-6 cmb-24">
                <TextInput
                  label="Promotion Title"
                  id="promotion_title"
                  value={promotion_title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6" />

              <div className="col-md-3 cmb-24">
                <Dropdown
                  label="Beauty businesses"
                  id="beauty_business"
                  placeholder="Select a beauty business"
                  value={beauty_business}
                  onChange={handleChange}
                  options={[
                    {
                      id: "demo",
                      label: "Demo",
                    },
                  ]}
                />
              </div>

              <div className="col-md-3">
                <Dropdown
                  label="Service categories"
                  id="service_category"
                  value={service_category}
                  onChange={handleChange}
                  placeholder="Select a service category"
                  options={[
                    {
                      id: "demo",
                      label: "Demo",
                    },
                  ]}
                />
              </div>
              <div className="col-md-6" />

              <div className="col-md-6 cmb-24">
                <TextArea
                  label="Description"
                  id="description"
                  value={description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6" />

              <div className="col-md-6 cmb-40">
                <div className="text-17-700 color-dashboard-primary cmb-16">
                  Set Promo Discount
                </div>
                <div className="bg-blue-5 cps-24 cpe-24 cpt-16 cpb-16 border rounded">
                  <div className="text-17-600 color-dashboard-primary cmb-16">
                    Set discount by:
                  </div>
                  <div className="d-flex gap-2 cmb-24">
                    <RadioButton
                      label="Percentage (%)"
                      value="Discount (%)"
                      name="currency"
                      id="usd"
                      checked={signText === "Discount (%)"}
                      onChange={(e) => {
                        // console.log(e.target.value);
                        setFieldValue("signText", "Discount (%)");
                        setFieldValue("placeholderText", "0%");
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
                        // console.log(e.target.value);
                        // setFieldValue("signText", "Discount ($)");
                        setFieldValue("placeholderText", "$0.00");
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
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6" />

              <div className="cmb-16 text-17-700 color-dashboard-primary">
                Set Promo Date
              </div>
              <div className="col-md-3">
                <DatePicker
                  label="Start Date"
                  placeholder="dd/mm/yy"
                  id="start_date"
                  value={start_date}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3 cmb-40">
                <DatePicker
                  label="End Date"
                  placeholder="dd/mm/yy"
                  id="end_date"
                  value={end_date}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6" />

              <div className="col-md-6">
                <Button
                  btnText="CONTINUE"
                  btnStyle="DD"
                  className="text-15-600"
                  onClick={() => {
                    navigate(commonRoute.addSummary);
                  }}
                />
              </div>
            </form>
          );
        }}
      </Formik> */}
    </div>
  );
};

export default AddPromotion;

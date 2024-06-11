import Button from "components/form/Button/Button";
import DatePicker from "components/form/DatePicker/DatePicker";
import Dropdown from "components/form/Dropdown/Dropdown";
import RadioButton from "components/form/RadioButton/RadioButton";
import SignTextInput from "components/form/SignTextInput/SignTextInput";
import TextArea from "components/form/TextArea/TextArea";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import { isEqual, matches } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  getBusinessList,
  getProductList,
  getserviceList,
} from "store/globalSlice";
import { commonRoute } from "utils/constants";
import moment from "moment";

const ProductServicePromotion = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();
  const [serviceList, setServiceList] = useState([]);
  const [subServiceList, setSubServiceList] = useState([]);
  const [productLists, setProductLists] = useState([]);
  const [subProductList, setSubProductList] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loader, setLoader] = useState({
    business: true,
    serviceCat: false,
    subService: false,
  });
  const { businessList } = useSelector((state) => ({
    businessList: state.global.businessList,
  }));

  const handleSave = async (values) => {
    setBtnLoading(true);

    if (values) {
      navigate(commonRoute.addSummary, { state: values });
    }
    setBtnLoading(false);

    // const payload = omit(values, [
    //   "dollar",
    //   "placeholderText",
    //   "signText",
    //   "percentage",
    //   "service_category",
    // ]);
    // console.log("payload", payload);
    // const response = await dispatch(addPromotion(payload));
    // if (response?.status === 201) {
    //   dispatch(throwSuccess("Promotion added successfully"));
    //   navigate(commonRoute.addSummary, {
    //     text: "hello",
    //   });
    //   if (formRef.current) {
    //     formRef.current.resetForm();
    //   }
    // }
  };

  const initialValues = {
    beauticianId: "",
    promotionFor: type,
    promotionTitle: "",
    serviceName: "",
    service_category: "",
    description: "",
    isDiscPercentage: "",
    signText: "",
    placeholderText: "",
    percentage: "",
    dollar: "",
    refCode: "",
    discount: "",
    startDate: "",
    endDate: "",
    subTypeId: "",
  };

  const validationSchema = Yup.object().shape({
    promotionTitle: Yup.string().required("Promotion title is required."),
    beauticianId: Yup.string().required("Select the business."),
    service_category: Yup.string().required(
      type === "product"
        ? "Select the product category."
        : "Select the service category."
    ),
    serviceName: Yup.string().required(
      type === "product" ? "Select the product" : "Select the service."
    ),
    description: Yup.string()
      .required("Description is required.")
      .max(300, "Exceeded maximum character limit."),
    signText: Yup.string().required("Radio option is required"),
    discount: Yup.string()
      .required("Discount value is required")
      .matches(
        /\b(0*(?:[1-9][0-9]?|100))\b/,
        "Value can not be greater then 100"
      ),
    // .matches(
    //   /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
    //   "Only digits allowed"
    // ),
  });

  const fetchProductList = async (value) => {
    // console.log("values", values);
    const response = await dispatch(getProductList(value));
    if (response?.status === 200) {
      setProductLists(response?.data?.category);
    }
  };

  const fetchServiceList = async (value) => {
    setLoader((prev) => {
      return {
        ...prev,
        serviceCat: true,
      };
    });
    const response = await dispatch(getserviceList(value));
    if (response?.status === 200) {
      setServiceList(response?.data?.category);
    }
    setLoader((prev) => {
      return {
        ...prev,
        serviceCat: false,
      };
    });
  };

  const initAPI = async () => {
    await dispatch(getBusinessList());
    setLoader((prev) => {
      return {
        ...prev,
        business: false,
      };
    });
  };

  useEffect(() => {
    initAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSave}
      >
        {(props) => {
          const { values, errors, handleChange, setFieldValue, submitForm } =
            props;
          const {
            promotionTitle,
            beauticianId,
            service_category,
            description,
            signText,
            placeholderText,
            percentage,
            dollar,
            discount,
            startDate,
            endDate,
            subTypeId,
            serviceName,
          } = values;

          return (
            <form className="row">
              <div className="col-md-6 cmb-24">
                <TextInput
                  label="Promotion Title"
                  id="promotionTitle"
                  value={promotionTitle}
                  onChange={handleChange}
                  error={errors.promotionTitle}
                />
              </div>
              <div className="col-md-6" />

              <div className="col-md-6 cmb-24">
                <Dropdown
                  label="Beauty businesses"
                  id="beauticianId"
                  placeholder="Select a beauty business"
                  value={beauticianId}
                  error={errors.beauticianId}
                  isLoading={loader.business}
                  onChange={(e) => {
                    setFieldValue("service_category", "");
                    if (e?.target?.value) {
                      if (type === "product") {
                        fetchProductList(e?.target?.value);
                      } else {
                        fetchServiceList(e?.target?.value);
                      }
                    }
                    handleChange(e);
                  }}
                  options={businessList}
                  optionKey="id"
                  optionValue="businessName"
                />
              </div>

              <div className="col-md-6" />

              <div className="col-md-3">
                <Dropdown
                  label={
                    type === "product"
                      ? "Product categories"
                      : "Service categories"
                  }
                  id="service_category"
                  value={service_category}
                  error={errors.service_category}
                  isLoading={loader.serviceCat}
                  onChange={(e) => {
                    // setLoader((prev) => {
                    //   return {
                    //     ...prev,
                    //     subService: true,
                    //   };
                    // });
                    // setFieldValue("serviceName", "");

                    if (e?.target?.value) {
                      if (type === "product") {
                        let oldProduct = productLists;
                        oldProduct = oldProduct.filter(
                          (o) => o._id === e?.target?.value
                        );
                        setSubProductList(oldProduct?.[0]?.productList);
                      } else {
                        let oldList = serviceList;
                        oldList = oldList.filter(
                          (o) => o._id === e?.target?.value
                        );
                        setSubServiceList(oldList?.[0]?.serviceType);
                        setLoader((prev) => {
                          return {
                            ...prev,
                            subService: false,
                          };
                        });
                      }
                    }
                    handleChange(e);
                  }}
                  placeholder={
                    type === "product"
                      ? "Select a product category"
                      : "Select a service category"
                  }
                  options={type === "product" ? productLists : serviceList}
                  optionKey={type === "product" ? "_id" : "_id"}
                  optionValue={
                    type === "product"
                      ? "productCategoryName"
                      : "serviceCategoryName"
                  }
                  disabled={!values.beauticianId}
                />
              </div>

              <div className="col-md-3 cmb-24">
                <Dropdown
                  label={type === "product" ? "Product" : "Service"}
                  id="serviceName"
                  value={serviceName}
                  error={errors.serviceName}
                  isLoading={loader.subService}
                  onChange={(e) => {
                    if (type === "product") {
                      // console.log("product", e?.target?.data?.productId);
                      setFieldValue("subTypeId", e?.target?.data?.productId);
                    } else {
                      // console.log("product", e?.target?.data?.bServiceId);
                      setFieldValue("subTypeId", e?.target?.data?.bServiceId);
                    }
                    handleChange(e);
                  }}
                  placeholder={
                    type === "product" ? "Select a product" : "Select a service"
                  }
                  options={type === "product" ? subProductList : subServiceList}
                  optionKey={
                    type === "product" ? "productName" : "serviceTypeName"
                  }
                  optionValue={
                    type === "product" ? "productName" : "serviceTypeName"
                  }
                  disabled={!values.service_category}
                />
              </div>
              <div className="col-md-6" />

              <div className="col-md-6 cmb-24">
                <TextArea
                  label="Description"
                  id="description"
                  value={description}
                  error={errors.description}
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
                        setFieldValue("");
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
              <div className="col-md-6" />

              <div className="cmb-16 text-17-700 color-dashboard-primary">
                Set Promo Date
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
                />
              </div>
              <div className="col-md-6" />

              <div className="col-md-6">
                <Button
                  btnText="CONTINUE"
                  className="text-15-600"
                  btnStyle={isEqual(initialValues, values) ? "DD" : "PD"}
                  btnLoading={btnLoading}
                  onClick={submitForm}
                  //   onClick={() => {
                  //     navigate(commonRoute.addSummary);
                  //   }}
                />
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProductServicePromotion;

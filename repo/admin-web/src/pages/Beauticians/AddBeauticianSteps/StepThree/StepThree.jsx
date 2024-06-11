import Button from "components/form/Button/Button";
import TextInput from "components/form/TextInput/TextInput";
import React, { useRef } from "react";
import { useState } from "react";
import ServicePopup from "./ServicePopup";
import Dropdown from "components/form/Dropdown/Dropdown";
import {
  durationList,
  icons,
  intervalTimeOption,
  parallelClientOption,
  priceStatusOptions,
} from "utils/constants";
import { Formik } from "formik";
import CheckBox from "components/form/CheckBox/CheckBox";
import TextArea from "components/form/TextArea/TextArea";
import AddedList from "./AddedList";
import { useDispatch, useSelector } from "react-redux";
import { setStepThreeData } from "store/globalSlice";
import { cloneDeep, isEqual } from "lodash";
import * as Yup from "yup";
import "./StepThree.scss";

const StepThree = ({ activeStep, setActiveStep }) => {
  const [editService, setEditService] = useState(null);
  const [serviceCategoryPopup, setServiceCategoryPopup] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [cropFile, setCropFile] = useState(null);
  const [formType, setFormType] = useState("0");
  const dispatch = useDispatch();
  const { stepThreeData, fetchSubServiceType } = useSelector((state) => ({
    stepThreeData: state.global.stepThreeData,
    fetchSubServiceType: state.global.fetchSubServiceType,
  }));

  const formRef = useRef();

  const initialValues = {
    serviceCategory: editService?.serviceCategory || "",
    serviceCategoryName: editService?.serviceCategoryName || "",
    serviceType: editService?.serviceType || "",
    subServiceTypeName: editService?.subServiceTypeName || "",
    duration: editService?.duration || "",
    price: editService?.price || "",
    priceStatus: editService?.priceStatus || "Fixed",
    img: editService?.img || "",
    imgName: editService?.imgName || "",
    description: editService?.description || "",
    isBookOnline: editService?.isBookOnline || 1,
    isHomeService: editService?.isHomeService || 1,
    inBetweenInterval: editService?.inBetweenInterval || "15 min",
    noOfParallelClient: editService?.noOfParallelClient || "1",
  };

  const validationSchema = Yup.object().shape({
    serviceCategoryName: Yup.string().required("Service category is required."),
    serviceType: Yup.string().required("Service type is required."),
    duration: Yup.string().required("Duration is required."),
    price: Yup.string()
      .matches(/^\d{1,5}$/, "Price must be a 5-digit number")
      .required("Price is required."),
  });

  const handleSave = async (value) => {
    if (editService !== null) {
      handleUpdate(editService, value);
    } else {
      handleAdd(value);
    }
  };

  const handleAdd = async (value) => {
    dispatch(setStepThreeData([...stepThreeData, value]));
    if (value) {
      if (formRef.current) {
        formRef.current.resetForm();
      }
      setFormType("1");
    }
  };

  const handleUpdate = async (editValue, value) => {
    let newData = cloneDeep(stepThreeData);
    const newIndex = newData.findIndex(
      (elm) => elm?.clientIds === editValue?.clientIds
    );
    newData[newIndex] = value;

    dispatch(setStepThreeData([...newData]));
    if (formRef.current) {
      formRef.current.resetForm();
    }
    setFormType("1");
  };

  return (
    <div id="step-three-container">
      {formType === "0" ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
          innerRef={formRef}
        >
          {(props) => {
            const { values, errors, handleChange, setFieldValue, submitForm } =
              props;
            const {
              serviceCategoryName,
              serviceType,
              duration,
              price,
              priceStatus,
              img,
              description,
              isBookOnline,
              isHomeService,
              inBetweenInterval,
              noOfParallelClient,
            } = values;

            return (
              <form className="row g-0 gx-3">
                {serviceCategoryPopup && (
                  <ServicePopup
                    onHidePopup={() => {
                      setServiceCategoryPopup(false);
                    }}
                    sendDataToParen={(e) => {
                      setFieldValue("serviceCategoryName", e?.name);
                      setFieldValue("serviceCategory", e?.id);
                    }}
                  />
                )}
                <div className="col-md-8 cmb-20">
                  <div className="text-15-500 color-black-80 cmb-16">
                    Add image of this service (optional)
                  </div>
                  <div className="upload-banner-container d-flex justify-content-center align-items-center cpt-85 cpb-85">
                    {img && (
                      <img
                        src={imgData ? imgData : img}
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
                    )}
                    <div className="banner-upload text-13-500-21 color-black-80 gap-2 d-flex align-items-center">
                      <img src={icons.addSquareBanner} alt="add-banner" />
                      Upload Image
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
                              setFieldValue("img", e.target.files[0]);
                            }
                          }
                          setFieldValue("imgName", files[0]?.name);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4" />
                <div className="col-md-4 cmb-20">
                  <TextInput
                    id="serviceCategoryName"
                    label="Choose service category"
                    placeholder="Choose service category"
                    isRightArrow
                    value={serviceCategoryName}
                    error={errors?.serviceCategoryName}
                    onChange={() => {}}
                    onClick={() => {
                      setServiceCategoryPopup(true);
                    }}
                  />
                </div>

                <div className="col-md-4 cmb-20">
                  <Dropdown
                    label="Choose service type"
                    placeholder="Choose service type"
                    id="serviceType"
                    value={serviceType}
                    error={errors?.serviceType}
                    options={fetchSubServiceType}
                    optionKey="_id"
                    optionValue="serviceTypeName"
                    disabled={!values.serviceCategoryName}
                    onChange={(e) => {
                      setFieldValue(
                        "subServiceTypeName",
                        e.target.data?.serviceTypeName
                      );
                      handleChange(e);
                    }}
                    isClearable
                  />
                </div>
                <div className="col-md-4" />

                <div className="col-md-4 cmb-20">
                  <Dropdown
                    label="Duration"
                    placeholder="Choose duration"
                    id="duration"
                    value={duration}
                    error={errors?.duration}
                    options={durationList}
                    optionKey="id"
                    optionValue="value"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 cmb-20">
                  <TextInput
                    id="price"
                    label="Service Price"
                    placeholder="Enter service price"
                    value={price}
                    error={errors?.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4" />

                <div className="col-md-4 cmb-20">
                  <Dropdown
                    id="priceStatus"
                    label="Price Status"
                    placeholder="Choose price status"
                    value={priceStatus}
                    options={priceStatusOptions}
                    optionKey="value"
                    optionValue="value"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-8" />

                <div className="col-md-8 cmb-20">
                  <TextArea
                    id="description"
                    label="Service Description (optional)"
                    placeholder="Description"
                    value={description}
                    onChange={handleChange}
                  />
                </div>

                <div className="text-15-500 color-black-80 cmb-16">
                  Settings
                </div>
                <div className="col-md-4">
                  <CheckBox
                    label="Allow clients to book online?"
                    id="isBookOnline"
                    value={isBookOnline}
                    checked={isBookOnline === 1}
                    onChange={(e) => {
                      setFieldValue(
                        "isBookOnline",
                        e.target.checked === true ? 1 : 0
                      );
                    }}
                  />
                </div>
                <div className="col-md-4 cmb-20">
                  <CheckBox
                    label="Home Service?"
                    id="isHomeService"
                    value={isHomeService}
                    checked={isHomeService === 1}
                    onChange={(e) => {
                      setFieldValue(
                        "isHomeService",
                        e.target.checked === true ? 1 : 0
                      );
                    }}
                  />
                </div>
                <div className="col-md-4" />

                <div className="col-md-4">
                  <Dropdown
                    label="Interval Time"
                    placeholder="Choose interval time"
                    id="inBetweenInterval"
                    value={inBetweenInterval}
                    options={intervalTimeOption}
                    optionKey="value"
                    optionValue="value"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 cmb-20">
                  <Dropdown
                    label="Parallel Clients"
                    placeholder="Choose parallel clients"
                    id="noOfParallelClient"
                    value={noOfParallelClient}
                    options={parallelClientOption}
                    optionKey="value"
                    optionValue="value"
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex gap-3">
                  {/* <Button
                    btnText="Previous"
                    onClick={() => {
                      setActiveStep(activeStep - 1);
                    }}
                  /> */}

                  <Button
                    btnText="SAVE"
                    btnStyle="PD"
                    onClick={submitForm}
                    disabled={isEqual(values, initialValues)}
                  />
                </div>
              </form>
            );
          }}
        </Formik>
      ) : (
        <AddedList
          handleRedirect={() => {
            setFormType("0");
          }}
          setEditService={setEditService}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
    </div>
  );
};

export default StepThree;

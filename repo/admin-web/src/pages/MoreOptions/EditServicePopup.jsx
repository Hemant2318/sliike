import Button from "components/form/Button/Button";
import ColorPicker from "components/form/ColorPicker";
import FileUpload from "components/form/FileUpload/FileUpload";
import TextInput from "components/form/TextInput/TextInput";
import Loader from "components/layouts/Loader/Loader";
import { Formik } from "formik";
import { omit } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getSingleCategory,
  throwSuccess,
  updateServiceCategory,
} from "store/globalSlice";
import { objectToFormData } from "utils/helpers";
import * as Yup from "yup";

const EditServicePopup = ({ onHide, categoryId, tableData, handleSuccess }) => {
  const dispatch = useDispatch();
  const formRef = useRef();

  const [btnLoading, setBtnLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState({});
  const {
    serviceCategoryName,
    serviceCategoryName_fr,
    _id,
    imgPath,
    imgPathName,
    colorCode,
  } = categoryData || {};

  const getSingleCategoryData = async () => {
    const response = await dispatch(getSingleCategory(categoryId?._id));
    const categoryData = response?.data;
    setCategoryData(categoryData);
    setIsLoading(false);
  };

  const handelSave = async (values) => {
    const payload = omit(values, ["imgPathName"]);
    const formData = objectToFormData(payload);
    setBtnLoading(true);
    const response = await dispatch(
      updateServiceCategory(categoryId?._id, formData)
    );
    if (response?.status === 200) {
      dispatch(throwSuccess("Category Updated Successfully"));
      onHide();
      handleSuccess();
    }
    setBtnLoading(false);
  };

  const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required("Service Category is required."),
    serviceName_fr: Yup.string().required(
      "French Service Category is required."
    ),
    colorCode: Yup.string().matches(
      /^#(?:[0-9a-fA-F]{3}){1,2}$/,
      "Please enter valid code"
    ),
  });

  const initialValues = {
    serviceName: serviceCategoryName || "",
    serviceName_fr: serviceCategoryName_fr || "",
    _id: _id || "",
    imgPath: imgPath || "",
    imgPathName: imgPathName || "",
    colorCode: colorCode || "",
  };

  useEffect(() => {
    getSingleCategoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="d-flex justify-content-end color-dashboard-primary position-relative">
          <button
            type="button"
            className="btn-close position-absolute"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={onHide}
          ></button>
        </div>
        <div className="cmb-16 text-center color-dashboard-primary cmt-20">
          Edit Service Category
        </div>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Loader size="md" />
          </div>
        ) : (
          <Formik
            innerRef={formRef}
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(e) => {
              handelSave(e);
            }}
          >
            {(props) => {
              const {
                values,
                errors,
                handleChange,
                submitForm,
                handleReset,
                setFieldValue,
              } = props;
              return (
                <form
                  onSubmit={submitForm}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      submitForm(e);
                    }
                  }}
                >
                  <div className="row d-flex justify-content-center cmb-30">
                    <div className="cmb-22">
                      <TextInput
                        label="Service Category"
                        id="serviceName"
                        placeholder="Service Category"
                        value={values?.serviceName}
                        error={errors.serviceName}
                        onChange={handleChange}
                        disabled
                      />
                    </div>

                    <div className="cmb-22">
                      <TextInput
                        label="Catégories de services"
                        id="serviceName_fr"
                        placeholder="Entrez les catégories de services"
                        value={values?.serviceName_fr}
                        error={errors.serviceName_fr}
                        onChange={handleChange}
                        disabled
                      />
                    </div>

                    <div className="cmb-22">
                      <FileUpload
                        id="imgPath"
                        fileText={values?.imgPathName || ""}
                        label="Image"
                        onChange={(e) => {
                          setFieldValue("imgPathName", e.target.fileName);
                          handleChange(e);
                        }}
                      />
                    </div>

                    <div className="cmb-22">
                      <ColorPicker
                        label="ColorCode"
                        id="colorCode"
                        value={values?.colorCode}
                        error={errors.colorCode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-center gap-3">
                    <Button
                      className="text-13-600 h-auto cps-25 cpe-25 cpt-10 cpb-10 text-15-600"
                      btnStyle="GO"
                      btnText="CANCEL"
                      onClick={handleReset}
                    />
                    <Button
                      className="text-15-600 h-auto cps-35 cpe-35 cpt-10 cpb-10 text-15-600"
                      btnStyle="PD"
                      btnText="ADD"
                      onClick={(e) => {
                        if (!btnLoading) {
                          submitForm(e);
                        }
                      }}
                      btnLoading={btnLoading}
                    />
                  </div>
                </form>
              );
            }}
          </Formik>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditServicePopup;

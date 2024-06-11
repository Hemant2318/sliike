import Button from "components/form/Button/Button";
import ColorPicker from "components/form/ColorPicker";
import FileUpload from "components/form/FileUpload/FileUpload";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import { omit } from "lodash";
import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addServicesCategory, throwSuccess } from "store/globalSlice";
import { objectToFormData } from "utils/helpers";
import * as Yup from "yup";

const AddServicePopup = ({ onHide, handleSuccess }) => {
  const dispatch = useDispatch();
  const formRef = useRef();

  const [btnLoading, setBtnLoading] = useState(false);
  const initialValues = {
    serviceName: "",
    serviceName_fr: "",
    imgPath: "",
    imgPathName: "",
    colorCode: "",
  };

  const handleSave = async (values) => {
    const payload = omit(values, ["imgPathName"]);

    setBtnLoading(true);
    const formData = objectToFormData(payload);
    const response = await dispatch(addServicesCategory(formData));
    if (response?.status === 201) {
      dispatch(throwSuccess("Service Category Add Successfully"));
      onHide();
      handleSuccess();
      if (formRef.current) {
        formRef.current.resetForm();
      }
    }
    setBtnLoading(false);
  };
  const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required("Service Category is required."),
    serviceName_fr: Yup.string().required(
      "La catégorie de service français est requise."
    ),
    colorCode: Yup.string().required("Color Code is required."),
    // colorCode: Yup.string().matches(
    //   /^#([0-9A-F]{3}){1,2}$/i,
    //   "Please enter valid code"
    // ),
  });
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
          Add Service Category
        </div>

        <Formik
          innerRef={formRef}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
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
            const { serviceName, serviceName_fr, imgPathName, colorCode } =
              values;
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
                      placeholder="Enter Service Category"
                      value={serviceName}
                      error={errors.serviceName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="cmb-22">
                    <TextInput
                      label="Catégories de services"
                      id="serviceName_fr"
                      placeholder="Entrez les catégories de services"
                      value={serviceName_fr}
                      error={errors.serviceName_fr}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="cmb-22">
                    <FileUpload
                      id="imgPath"
                      fileText={imgPathName || ""}
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
                      value={colorCode}
                      error={errors.colorCode}
                      onChange={handleChange}
                    />
                    {/* <TextInput
                      label="ColorCode"
                      id="colorCode"
                      placeholder="Service ColorCode"
                      value={colorCode}
                      error={errors.colorCode}
                      onChange={handleChange}
                    /> */}
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-3">
                  <Button
                    className="text-13-600 h-auto cps-25 cpe-25 cpt-10 cpb-10 text-15-600"
                    btnStyle="GO"
                    btnText="CANCEL"
                    onClick={handleReset}
                    // btnLoading={btnLoader}
                  />
                  <Button
                    className="text-15-600 h-auto cps-35 cpe-35 cpt-10 cpb-10 text-15-600"
                    btnStyle="PD"
                    btnText="ADD"
                    onClick={submitForm}
                    btnLoading={btnLoading}
                  />
                </div>
              </form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddServicePopup;

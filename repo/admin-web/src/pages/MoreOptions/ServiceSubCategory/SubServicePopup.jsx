import Button from "components/form/Button/Button";
import Dropdown from "components/form/Dropdown/Dropdown";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import { isEqual, omit } from "lodash";
import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addServiceSubCategory,
  throwSuccess,
  updateServiceSubCategory,
} from "store/globalSlice";
import * as Yup from "yup";

const AddServicePopup = ({ onHide, editData, handleSuccess }) => {
  const dispatch = useDispatch();
  const { servicesCategoryList } = useSelector((state) => ({
    servicesCategoryList: state.global.servicesCategoryList,
  }));
  const formRef = useRef();

  const [btnLoading, setBtnLoading] = useState(false);
  const serviceId = editData?.serviceTypeList[0]?._id;

  const serviceTypeName = editData?.serviceTypeName;
  const serviceTypeName_fr = editData?.serviceTypeName_fr;

  const initialValues = {
    // addService: "",
    serviceId: serviceId || "",
    serviceTypeName: serviceTypeName || "",
    serviceTypeName_fr: serviceTypeName_fr || "",
  };

  const validationSchema = Yup.object().shape({
    serviceId: Yup.string().required("Service Category is required."),
    serviceTypeName: Yup.string().required("Sub Category is required"),
    serviceTypeName_fr: Yup.string().required(
      "La sous-catégorie est obligatoire"
    ),
  });

  const handleSave = async (values) => {
    setBtnLoading(true);
    if (editData) {
      handleEdit(values);
    } else {
      handleAdd(values);
    }
  };

  const handleAdd = async (values) => {
    const response = await dispatch(addServiceSubCategory(values));
    if (response?.status === 201) {
      dispatch(throwSuccess("Sub Category Added Successfully"));
      onHide();
      handleSuccess();
      if (formRef.current) {
        formRef.current.resetForm();
      }
    }

    setBtnLoading(false);
  };

  const handleEdit = async (values) => {
    // console.log("values", values);

    const payload = omit(values, ["serviceId"]);
    const response = await dispatch(
      updateServiceSubCategory(editData?._id, payload)
    );
    if (response?.status === 200) {
      dispatch(throwSuccess("Service Sub Category Updated Successfully"));
      onHide();
      handleSuccess();
    }
    setBtnLoading(false);
  };
  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="text-center cmb-16 color-dashboard-primary cmt-24">
          {editData ? "Edit Sub Service Category" : "Add Sub Service Category"}
        </div>

        <Formik
          enableReinitialize
          innerRef={formRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {(props) => {
            const { values, errors, handleChange, submitForm } = props;
            const { serviceId, serviceTypeName, serviceTypeName_fr } = values;
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
                  <div className="col-md-12 cmb-24">
                    {/* <TextInput
                      label="Service Category"
                      id="addService"
                      value={addService}
                      onChange={handleChange}
                      disabled
                    /> */}
                    <Dropdown
                      label="Service Category"
                      id="serviceId"
                      value={serviceId}
                      onChange={handleChange}
                      optionKey="_id"
                      optionValue="serviceCategoryName"
                      options={servicesCategoryList}
                      disabled={editData}
                      error={errors?.serviceId}
                    />
                  </div>

                  <div className="col-md-12 cmb-25">
                    <TextInput
                      label="Sub Category"
                      id="serviceTypeName"
                      placeholder="Sub Category"
                      value={serviceTypeName}
                      onChange={handleChange}
                      error={errors?.serviceTypeName}
                    />
                  </div>

                  {/* <div className="col-md-12 cmb-24">
                    <Dropdown
                      label="Catégorie de services"
                      id="serviceId"
                      value={serviceId}
                      onChange={handleChange}
                      optionKey="_id"
                      optionValue="serviceCategoryName_fr"
                      options={servicesCategoryList}
                      disabled={editData}
                    />
                  </div> */}

                  <div className="col-md-12">
                    <TextInput
                      label="Sous-catégorie"
                      id="serviceTypeName_fr"
                      placeholder="Sous-catégorie"
                      value={serviceTypeName_fr}
                      onChange={handleChange}
                      error={errors?.serviceTypeName_fr}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-3">
                  <Button
                    className="text-13-600 h-auto cps-25 cpe-25 cpt-10 cpb-10 text-15-600"
                    btnStyle="GO"
                    btnText="CANCEL"
                    onClick={onHide}
                    // btnLoading={btnLoader}
                  />
                  <Button
                    className="text-15-600 h-auto cps-35 cpe-35 cpt-10 cpb-10 text-15-600"
                    btnStyle="PD"
                    btnText={editData ? "EDIT" : "ADD"}
                    onClick={submitForm}
                    btnLoading={btnLoading}
                    disabled={editData && isEqual(values, initialValues)}
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

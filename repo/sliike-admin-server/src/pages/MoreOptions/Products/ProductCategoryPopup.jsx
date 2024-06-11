import Button from "components/form/Button/Button";
import ColorPicker from "components/form/ColorPicker";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import { isEqual } from "lodash";
import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addProductCategory,
  throwSuccess,
  updateProductCategory,
} from "store/globalSlice";
import * as Yup from "yup";

const ProductCategoryPopup = ({ onHide, handleSuccess, editData }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [btnLoading, setBtnLoading] = useState(false);
  const name = editData?.productCategoryName;
  const colorCode = editData?.colorCode;
  const name_fr = editData?.productCategoryName_fr;
  const id = editData?._id;

  const handleSave = async (value) => {
    if (editData) {
      handleUpdate(value);
    } else {
      handleAdd(value);
    }
  };

  const handleAdd = async (value) => {
    setBtnLoading(true);
    const payload = value;
    const response = await dispatch(addProductCategory(payload));
    if (response?.status === 201) {
      dispatch(throwSuccess("Product Category added successfully"));
      onHide();
      handleSuccess();
      if (formRef.current) {
        formRef.current.resetForm();
      }
    }
    setBtnLoading(false);
  };

  const handleUpdate = async (value) => {
    setBtnLoading(true);
    const payload = value;
    const response = await dispatch(updateProductCategory(id, payload));
    if (response?.status === 200) {
      dispatch(throwSuccess("Product category updated successfully."));
      onHide();
      handleSuccess();
    }
    setBtnLoading(false);
  };

  const initialValues = {
    name: name || "",
    name_fr: name_fr || "",
    colorCode: colorCode || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product category is required."),
    name_fr: Yup.string().required("La catégorie de produit est obligatoire."),
    colorCode: Yup.string().required("Color code is required."),
    // colorCode: Yup.string().matches(
    //   /^#(?:[0-9a-fA-F]{3}){1,2}$/,
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
        <div className="text-center cmb-16 color-dashboard-primary cmt-24">
          {editData ? "Edit Product category" : "Add Product category"}
        </div>

        <Formik
          innerRef={formRef}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {(props) => {
            const { values, errors, handleChange, submitForm, handleReset } =
              props;

            const { name, name_fr, colorCode } = values;

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
                    <TextInput
                      label="Product Category"
                      id="name"
                      placeholder="Product Category"
                      value={name}
                      error={errors.name}
                      onChange={handleChange}
                      disabled={editData}
                    />
                  </div>

                  <div className="col-md-12 cmb-24">
                    <TextInput
                      label="Catégorie de produit"
                      id="name_fr"
                      placeholder="Catégorie de produit"
                      value={name_fr}
                      error={errors.name_fr}
                      onChange={handleChange}
                      disabled={editData}
                    />
                  </div>

                  <div className="col-md-12 cmb-24">
                    <ColorPicker
                      label="Color Code"
                      id="colorCode"
                      value={colorCode}
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
                    btnText={editData ? "EDIT" : "ADD"}
                    btnLoading={btnLoading}
                    onClick={submitForm}
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

export default ProductCategoryPopup;

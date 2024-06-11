import Button from "components/form/Button/Button";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import { isEqual } from "lodash";
import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addAmenities, throwSuccess, updateAmenities } from "store/globalSlice";
import * as Yup from "yup";

const AmenitiesPopup = ({ onHide, handleSuccess, editData }) => {
  const dispatch = useDispatch();
  const [btnLoading, setBtnLoading] = useState(false);
  const formRef = useRef();
  const name = editData?.name;
  const name_fr = editData?.name_fr;
  const id = editData?._id;

  const handleSave = async (values) => {
    setBtnLoading(true);
    if (editData) {
      handleUpdate(values);
    } else {
      handleAdd(values);
    }
  };

  const handleAdd = async (values) => {
    setBtnLoading(true);
    const payload = values;
    const response = await dispatch(addAmenities(payload));
    if (response?.status === 201) {
      dispatch(throwSuccess("Amenities Added Successfully"));
      onHide();
      handleSuccess();
      if (formRef.current) {
        formRef.current.resetForm();
      }
    }
    setBtnLoading(false);
  };

  const handleUpdate = async (values) => {
    setBtnLoading(true);
    const response = await dispatch(updateAmenities(id, values));
    if (response?.status === 200) {
      dispatch(throwSuccess("Amenities Updated Successfully"));
      onHide();
      handleSuccess();
    }
    setBtnLoading(false);
  };

  const initialValues = {
    name: name || "",
    name_fr: name_fr || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Amenities is required."),
    name_fr: Yup.string().required("Des équipements sont requis."),
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
          {editData ? "Edit Amenities" : "Add Amenities"}
        </div>

        <Formik
          enableReinitialize
          innerRef={formRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {(props) => {
            const { values, errors, handleChange, submitForm, handleReset } =
              props;

            const { name, name_fr } = values;

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
                      label="Amenities"
                      id="name"
                      placeholder="Enter Amenities"
                      value={name}
                      error={errors.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-12 cmb-24">
                    <TextInput
                      label="Agréments"
                      id="name_fr"
                      placeholder="Entrez les commodités"
                      value={name_fr}
                      error={errors.name_fr}
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

export default AmenitiesPopup;

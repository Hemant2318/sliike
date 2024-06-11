import Button from "components/form/Button/Button";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import { isEqual } from "lodash";
import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addDemography,
  throwError,
  throwSuccess,
  updateDemography,
} from "store/globalSlice";
import * as Yup from "yup";

const DemographyPopup = ({ onHide, editData, handelSuccess }) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const [btnLoading, setBtnLoading] = useState(false);
  const id = editData?._id;
  const demographyName = editData?.demographyName;
  const demographyName_fr = editData?.demographyName_fr;
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
    const response = await dispatch(addDemography(payload));
    if (response?.status === 400) {
      dispatch(throwError(response?.message));
    }

    if (response?.status === 200) {
      dispatch(throwSuccess("Demography Added Successfully"));
      onHide();
      handelSuccess();
      if (formRef.current) {
        formRef.current.resetForm();
      }
    }
    setBtnLoading(false);
  };

  const handleUpdate = async (values) => {
    setBtnLoading(true);
    const response = await dispatch(updateDemography(id, values));
    if (response?.status === 200) {
      dispatch(throwSuccess("Demography Updated Successfully"));
      onHide();
      handelSuccess();
    }
    setBtnLoading(false);
  };

  const initialValues = {
    demographyName: demographyName || "",
    demographyName_fr: demographyName_fr || "",
  };
  const validationSchema = Yup.object().shape({
    demographyName: Yup.string().required("Demography is required."),
    demographyName_fr: Yup.string().required("La démographie est requise."),
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
          {editData ? "Edit Demography" : "Add Demography"}
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

            const { demographyName, demographyName_fr } = values;

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
                      label="Demography"
                      id="demographyName"
                      placeholder="Enter Demography"
                      value={demographyName}
                      error={errors?.demographyName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-12 cmb-24">
                    <TextInput
                      label="Démographie"
                      id="demographyName_fr"
                      placeholder="Entrez la démographie"
                      value={demographyName_fr}
                      error={errors?.demographyName_fr}
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
                    btnText={editData ? "Edit" : "ADD"}
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

export default DemographyPopup;

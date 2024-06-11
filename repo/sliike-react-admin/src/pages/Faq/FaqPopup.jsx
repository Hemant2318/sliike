import Button from "components/form/Button/Button";
import Dropdown from "components/form/Dropdown/Dropdown";
import TextArea from "components/form/TextArea/TextArea";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import { isEqual } from "lodash";
import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addFAQ, throwSuccess } from "store/globalSlice";
import { userType } from "utils/constants";
import * as Yup from "yup";

const FaqPopup = ({ onHide, handleSuccess, editData }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [btnLoading, setBtnLoading] = useState(false);

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
    const response = await dispatch(addFAQ(payload));
    if (response?.status === 201) {
      dispatch(throwSuccess("FAQ added successfully."));
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
    const response = await dispatch(addFAQ(values));
    if (response?.status === 201) {
      dispatch(throwSuccess("FAQ updated successfully."));
      onHide();
      handleSuccess();
    }
    setBtnLoading(false);
  };

  const initialValues = {
    useFor: editData?.useFor || "",
    question: editData?.question || "",
    answer: editData?.answer || "",
    faqId: editData?._id,
  };
  const validationSchema = Yup.object().shape({
    useFor: Yup.string().required("Please select user type."),
    question: Yup.string().required("Please enter question."),
    answer: Yup.string().max(300, "Exceeded maximum character limit."),
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
          {editData ? "Edit FAQ" : "Add FAQ"}
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {(props) => {
            const { values, errors, submitForm, handleReset, handleChange } =
              props;
            const { useFor, question, answer } = values;
            return (
              <form>
                <div className="row d-flex justify-content-center cmb-30">
                  <div className="col-md-12 cmb-30">
                    <Dropdown
                      isRequired
                      label="User Type"
                      id="useFor"
                      value={useFor}
                      error={errors.useFor}
                      options={userType}
                      optionKey="value"
                      optionValue="value"
                      onChange={handleChange}
                      disabled={editData && values}
                    />
                  </div>
                  <div className="col-md-12 cmb-30">
                    <TextInput
                      label="Question"
                      placeholder="Enter Question"
                      id="question"
                      value={question}
                      error={errors.question}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-12 cmb-30">
                    <TextArea
                      label="Answer"
                      placeholder="Enter Answer"
                      id="answer"
                      value={answer}
                      error={errors.answer}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex justify-content-center gap-3">
                    <Button
                      className="text-13-600 h-auto cps-25 cpe-25 cpt-10 cpb-10 text-15-600"
                      btnText="CANCEL"
                      btnStyle="GO"
                      onClick={handleReset}
                    />
                    <Button
                      className="text-15-600 h-auto cps-35 cpe-35 cpt-10 cpb-10 text-15-600"
                      btnText={editData ? "EDIT" : "ADD"}
                      btnStyle="PD"
                      onClick={submitForm}
                      btnLoading={btnLoading}
                      disabled={editData && isEqual(initialValues, values)}
                    />
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default FaqPopup;

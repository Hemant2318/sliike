import Button from "components/form/Button/Button";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendInvitation } from "store/globalSlice";
import { icons } from "utils/constants";
import * as Yup from "yup";

const EmailPopup = ({ onHide, isData }) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const [btnLoading, setBtnLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const initialValues = {
    firstName: isData?.firstName || "",
    lastName: isData?.lastName || "",
    email: isData?.email || "",
    phoneNumber: isData?.phoneNumber || "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required.")
      .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "Email must be a valid email"),
  });
  const handleSave = async (values) => {
    setBtnLoading(true);
    const response = await dispatch(sendInvitation(values));
    if (response?.status === 200) {
      // dispatch(throwSuccess("Invite successfully sent"));
      onHide();
      if (formRef.current) {
        formRef.current.resetForm();
      }
    }
    setBtnLoading(false);
  };
  return (
    <div className="d-flex gap-2">
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-409"
        centered
        show
        onHide={onHide}
      >
        <Modal.Body className="cps-24 cpe-24 cpt-24 cpb-24">
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
              const { email } = values;
              return (
                <form
                  className="row"
                  onSubmit={submitForm}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      submitForm(e);
                    }
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div className="cmb-30 col-md-10">
                      <TextInput
                        label="Email Address"
                        placeholder="Enter Email"
                        id="email"
                        value={email}
                        error={errors.email}
                        onChange={handleChange}
                      />
                    </div>
                    <Button
                      iconType="Edit-pen"
                      btnStyle="PD"
                      className="cps-3 cpe-3"
                    />
                  </div>
                  <div className="text-15-500 color-black-100 cmb-24">
                    Confirm that this email is correct. A business setup invite
                    will be sent to this email.
                  </div>

                  <div>
                    <Button
                      className="text-15-600 h-auto cps-30 cpe-30 cpt-10 cpb-10 text-15-600"
                      btnStyle="PD"
                      btnText="CONTINUE"
                      onClick={submitForm}
                      btnLoading={btnLoading}
                    />
                  </div>
                </form>
              );
            }}
          </Formik>
          {/* <div className="d-flex align-items-center gap-2">
            <div className="cmb-30 col-md-10">
              <TextInput
                label="Email Address"
                placeholder="Enter Email"
                id="email"
                // value={email}
                // error={errors.email}
                // onChange={handleChange}
              />
            </div>
            <Button iconType="Edit-pen" btnStyle="PD" className="cps-3 cpe-3" />
          </div>
          <div className="text-15-500 color-black-100 cmb-24">
            Confirm that this email is correct. A business setup invite will be
            sent to this email.
          </div>
          <div className="">
            <Button
              className="text-15-600 h-auto cps-30 cpe-30 cpt-10 cpb-10 text-15-600"
              btnStyle="PD"
              btnText="CONTINUE"
              onClick={() => {}}
            />
          </div> */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmailPopup;

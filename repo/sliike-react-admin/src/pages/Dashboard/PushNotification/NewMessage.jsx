import Button from "components/form/Button/Button";
import Dropdown from "components/form/Dropdown/Dropdown";
import TextArea from "components/form/TextArea/TextArea";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import { isEqual } from "lodash";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addNotification,
  editNotification,
  throwError,
} from "store/globalSlice";
import { commonRoute, sendToList } from "utils/constants";
import SuccessMessage from "./SuccessMessage";

const NewMessage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const type = params?.mType;
  const { state } = useLocation();
  const formRef = useRef();
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const initialValues = {
    Id: state?._id || "",
    sendTo: state?.sendTo || "",
    title: state?.title || "",
    message: state?.message || "",
  };

  const handleSave = async (values) => {
    setBtnLoading(true);
    if (type === "edit-message") {
      handleUpdate(values);
    } else {
      handleAdd(values);
    }
  };

  const handleAdd = async (values) => {
    setBtnLoading(true);
    const response = await dispatch(addNotification(values));
    if (response?.status === 201) {
      // dispatch(throwSuccess(response?.message));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        navigate(commonRoute.recentMessage);
      }, 2000);
    }
    if (formRef.current) {
      formRef.current.resetForm();
    }
    setBtnLoading(false);
  };

  const handleUpdate = async (values) => {
    setBtnLoading(true);
    const response = await dispatch(editNotification(values));
    if (response?.status === 201) {
      // dispatch(throwSuccess(response?.message));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        navigate(commonRoute.recentMessage);
      }, 2000);
    } else {
      dispatch(throwError(response?.message));
    }
    if (formRef.current) {
      formRef.current.resetForm();
    }
    setBtnLoading(false);
  };

  return isSuccess ? (
    <>
      <SuccessMessage />
      {/* <div className="dashboard-success-container gap-2 align-items-center rounded">
          <div>
            <img src={icons.successRound} alt="round" />
            <div className="text-17-600 color-black-80">
              Message successfully sent
            </div>
          </div>
        </div> */}
    </>
  ) : (
    <>
      <div
        id="new-message-container"
        className="bg-white rounded cps-24 cpt-24"
      >
        <div className="text-20-700 color-dashboard-primary cmb-30">
          {type === "edit-message" ? "Edit message" : "New message"}
        </div>

        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={handleSave}
        >
          {(props) => {
            const { values, handleChange, submitForm } = props;
            const { sendTo, title, message } = values;
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
                <div className="col-md-4 cmb-24">
                  <Dropdown
                    label="Send to"
                    placeholder="Choose recipient"
                    id="sendTo"
                    value={sendTo}
                    options={sendToList.map((o) => {
                      return { ...o, name: o?.value };
                    })}
                    optionValue="name"
                    onChange={handleChange}
                    disabled={type === "edit-message"}
                  />
                </div>
                <div className="col-md-8" />

                <div className="col-md-6 cmb-24">
                  <TextInput
                    label="Title"
                    placeholder="Add message title"
                    id="title"
                    value={title}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6" />

                <div className="col-md-6 cmb-24">
                  <TextArea
                    label="Message"
                    placeholder="Enter message"
                    id="message"
                    value={message}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6" />

                <div className="col-md-6">
                  <Button
                    btnText="SEND"
                    btnStyle={isEqual(initialValues, values) ? "LB" : "PD"}
                    // onClick={() => {
                    //   navigate(commonRoute.pushNotification);
                    // }}
                    disabled={isEqual(values, initialValues)}
                    onClick={submitForm}
                    btnLoading={btnLoading}
                  />
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default NewMessage;

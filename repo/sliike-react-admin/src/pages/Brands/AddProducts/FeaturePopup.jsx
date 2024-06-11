import Button from "components/form/Button/Button";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import { cloneDeep } from "lodash";
import React, { useRef } from "react";
import { Modal } from "react-bootstrap";

const FeaturePopup = ({
  hidePopup,
  sendDataToParent,
  editKeyList,
  featuresList,
}) => {
  const formRef = useRef();
  const initialValues = {
    name: editKeyList?.elem || "",
  };

  const handleSave = async (value) => {
    if (editKeyList) {
      handleUpdate(editKeyList, value);
    } else {
      handelAdd(value);
    }
  };

  const handleUpdate = (editKeyList, value) => {
    // console.log("editKeyList", editKeyList);
    // let oldVal = [...featuresList, value?.name];
    // let newVal = featuresList?.map((e, i) => {
    //   if (i === editKeyList?.index) {
    //     return value?.name;
    //   }
    // });
    let newVal = cloneDeep(featuresList);

    newVal[editKeyList?.index] = value?.name;
    sendDataToParent(newVal);
    if (formRef.current) {
      formRef.current.resetForm();
    }
    hidePopup();
  };

  const handelAdd = async (value) => {
    await sendDataToParent([...featuresList, value?.name]);
    if (formRef.current) {
      formRef.current.resetForm();
    }
    hidePopup();
  };

  return (
    <Modal
      show
      aria-labelledby="contained-modal-title-vcenter"
      //   centered
      className="cps-24 cpt-24 cpe-24"
    >
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSave}
          innerRef={formRef}
        >
          {(props) => {
            const { values, handleChange, handleSubmit } = props;
            return (
              <form>
                <div className="text-15-500 color-black cmb-24">
                  <TextInput
                    id="name"
                    label="Add Features"
                    placeholder="Enter the features"
                    value={values?.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex justify-content-center mt-auto align-items-bottom gap-2 w-100 cmb-20">
                  <Button
                    btnStyle="DD"
                    btnText="CANCEL"
                    onClick={hidePopup}
                    className="cps-30 cpe-30"
                  />
                  <Button
                    btnStyle="PD"
                    btnText="ADD"
                    className="cps-30 cpe-30"
                    onClick={handleSubmit}
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

export default FeaturePopup;

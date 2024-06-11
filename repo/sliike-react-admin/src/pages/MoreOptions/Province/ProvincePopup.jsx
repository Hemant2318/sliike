import Button from "components/form/Button/Button";
import ColorPicker from "components/form/ColorPicker";
// import Dropdown from "components/form/Dropdown/Dropdown";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import { isEqual } from "lodash";
import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addProvinceTax, editprovince, throwSuccess } from "store/globalSlice";
import * as Yup from "yup";

const ProvincePopup = ({ onHide, handleSuccess, editData }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  // const { provinceList } = useSelector((state) => ({
  //   provinceList: state.global.provinceList,
  // }));

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
    let subType = [];
    if (values?.gstTax) {
      subType.push({ taxName: "GST", tax: values?.gstTax });
    }
    if (values?.hstTax) {
      subType.push({ taxName: "HST", tax: values?.hstTax });
    }
    if (values?.qstTax) {
      subType.push({ taxName: "QST", tax: values?.qstTax });
    }
    if (values?.pstTax) {
      subType.push({ taxName: "PST", tax: values?.pstTax });
    }

    const payload = {
      name: values?.name,
      name_fr: values?.name_fr,
      subType: subType,
      colorCode: values?.colorCode,
    };

    // console.log("payload", payload);

    setBtnLoading(true);
    const response = await dispatch(addProvinceTax(payload));
    if (response?.status === 201) {
      dispatch(throwSuccess("Province Add Successful"));
      onHide();
      handleSuccess();
      if (formRef.current) {
        formRef.current.resetForm();
      }
    }
    setBtnLoading(false);
  };

  const handleUpdate = async (values) => {
    let subType = [];
    if (values?.gstTax) {
      subType.push({ taxName: "GST", tax: values?.gstTax });
    }
    if (values?.hstTax) {
      subType.push({ taxName: "HST", tax: values?.hstTax });
    }
    if (values?.qstTax) {
      subType.push({ taxName: "QST", tax: values?.qstTax });
    }
    if (values?.pstTax) {
      subType.push({ taxName: "PST", tax: values?.pstTax });
    }

    const payload = {
      ProvinceId: editData?._id,
      name: values?.name,
      name_fr: values?.name_fr,
      colorCode: values?.colorCode,
      subType: subType,
    };
    // console.log("payload", payload);

    const response = await dispatch(editprovince(payload));
    if (response?.status === 200) {
      dispatch(throwSuccess("Province Updated Successfully"));
      onHide();
      handleSuccess();
    }
    setBtnLoading(false);
  };

  const provinceName = editData?.name;
  const frenchProvinceName = editData?.name_fr;
  const colorCode = editData?.colorCode;
  const gstTaxValue = editData?.subType.find((o) => o.taxName === "GST");
  const hstTaxValue = editData?.subType.find((o) => o.taxName === "HST");
  const qstTaxValue = editData?.subType.find((o) => o.taxName === "QST");
  const pstTaxValue = editData?.subType.find((o) => o.taxName === "PST");

  const initialValues = {
    name: provinceName || "",
    name_fr: frenchProvinceName || "",
    colorCode: colorCode || "",
    subType: [],
    taxName: "",
    gstTax: gstTaxValue?.tax || "",
    hstTax: hstTaxValue?.tax || "",
    qstTax: qstTaxValue?.tax || "",
    pstTax: pstTaxValue?.tax || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Province is required."),
    name_fr: Yup.string().required("La province est requise."),
    // colorCode: Yup.string().matches(
    //   /^#(?:[0-9a-fA-F]{3}){1,2}$/,
    //   "Please enter valid code"
    // ),
    colorCode: Yup.string().required("Color code is required."),
    gstTax: Yup.string().matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      "Please enter only numeric value"
    ),
    hstTax: Yup.string().matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      "Please enter only numeric value"
    ),
    qstTax: Yup.string().matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      "Please enter only numeric value"
    ),
    pstTax: Yup.string().matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      "Please enter only numeric value"
    ),
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
          {editData ? "Edit Province" : "Add Province"}
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

            const { name, name_fr, colorCode, gstTax, hstTax, qstTax, pstTax } =
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
                  <div className="col-md-12 cmb-24">
                    <TextInput
                      label="Province"
                      id="name"
                      placeholder="Enter Province"
                      value={name}
                      onChange={handleChange}
                      disabled={editData}
                      error={errors?.name}
                    />

                    {
                      //do not delete
                      /* <Dropdown
                      label="Province"
                      id="name"
                      value={name}
                      onChange={handleChange}
                      optionKey="name"
                      optionValue="name"
                      options={provinceList}
                    /> */
                    }
                  </div>

                  <div className="col-md-12 cmb-24">
                    <TextInput
                      label="Province"
                      id="name_fr"
                      placeholder="Entrez la province"
                      value={name_fr}
                      onChange={handleChange}
                      disabled={editData}
                      error={errors?.name_fr}
                    />
                  </div>

                  <div className="col-md-12 cmb-24">
                    <ColorPicker
                      label="ColorCode"
                      id="colorCode"
                      value={colorCode}
                      error={errors?.colorCode}
                      onChange={handleChange}
                    />
                  </div>

                  {name && (
                    <>
                      <div className="col-md-6 cmb-24">
                        <TextInput
                          label="GST Tax %"
                          placeholder="GST tax"
                          id="gstTax"
                          value={gstTax}
                          error={errors.gstTax}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 cmb-24">
                        <TextInput
                          label="HST Tax %"
                          placeholder="HST tax"
                          id="hstTax"
                          value={hstTax}
                          error={errors.hstTax}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 cmb-24">
                        <TextInput
                          label="QST Tax %"
                          placeholder="QST tax"
                          id="qstTax"
                          value={qstTax}
                          error={errors.qstTax}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 cmb-24">
                        <TextInput
                          label="PST Tax %"
                          placeholder="PST tax"
                          id="pstTax"
                          value={pstTax}
                          error={errors.pstTax}
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}
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
                    btnText={editData ? "EDIT" : "ADD"}
                    onClick={submitForm}
                    btnLoading={btnLoading}
                    disabled={editData && isEqual(values, initialValues)}
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   handelDelete(isData?.id);
                    //   // console.log("delete", e);
                    // }}
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

export default ProvincePopup;

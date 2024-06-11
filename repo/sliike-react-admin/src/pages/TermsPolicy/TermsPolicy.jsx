import Button from "components/form/Button/Button";
import RadioButton from "components/form/RadioButton/RadioButton";
import TextEditor from "components/form/TextEditor/TextEditor";
import Loader from "components/layouts/Loader/Loader";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getTerms, throwSuccess, updateTerms } from "store/globalSlice";

const TermsPolicy = () => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [termsTextEditorReset, setTermsTextEditorReset] = useState(true);
  const [policyTextEditorReset, setPolicyTextEditorReset] = useState(true);

  const [data, setData] = useState({});
  const [initialValues, setInitialValues] = useState({
    loading: true,
    language: "English",
    terms: "",
    policy: "",
  });

  const getTermsPolicy = async () => {
    const response = await dispatch(getTerms());
    const resData = response?.data || [];
    let find = resData?.find((o) => o.language === initialValues?.language);
    setInitialValues(find);
    setData(resData);
    setIsLoading(false);
    // setTableData((prev) => {
    //   return {
    //     ...prev,
    //     data: response?.data,
    //     loading: false,
    //   };
    // });
  };

  const handleSave = async (values) => {
    const payload = {
      terms: values?.terms,
      policy: values?.policy,
    };
    // console.log("payload", payload);
    setBtnLoading(true);
    const response = await dispatch(updateTerms(initialValues?._id, payload));
    if (response?.status === 200) {
      dispatch(throwSuccess("Data Updated Successfully"));
      getTermsPolicy();
      if (formRef.current) {
        formRef.current.resetForm();
      }
    }
    setBtnLoading(false);
  };

  useEffect(() => {
    getTermsPolicy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="terms-policy-container"
      className="cmt-24 card-effect cps-24 cpe-24"
    >
      <div className="text-20-700 color-dashboard-primary cmb-22">
        Terms-Conditions & Privacy-Policy
      </div>

      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Loader size="md" />
        </div>
      ) : (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          innerRef={formRef}
          onSubmit={handleSave}
        >
          {(props) => {
            const {
              values,

              handleChange,
              submitForm,
            } = props;

            const { language, terms, policy } = values;

            return (
              <form className="row">
                <div className="d-flex gap-2 cmb-22">
                  <RadioButton
                    label="English"
                    value="English"
                    id="english"
                    name="language"
                    checked={language === "English"}
                    onChange={() => {
                      let findData = data?.find(
                        (o) => o.language === "English"
                      );

                      setInitialValues(findData);
                      // setFieldValue("language", "English");

                      setTermsTextEditorReset(!termsTextEditorReset);
                      setPolicyTextEditorReset(!policyTextEditorReset);
                    }}
                  />

                  <RadioButton
                    label="French"
                    value="French"
                    id="french"
                    name="language"
                    checked={language === "French"}
                    onChange={() => {
                      let findData = data?.find((o) => o.language === "French");
                      // console.log("findata f", findData);
                      // console.log("findData", findData);
                      setInitialValues(findData);
                      // setFieldValue("language", "French");

                      setTermsTextEditorReset(!termsTextEditorReset);
                      setPolicyTextEditorReset(!policyTextEditorReset);
                    }}
                  />
                </div>

                <div className="col-md-12 cmb-22">
                  <TextEditor
                    label="Terms Condition"
                    id="terms"
                    value={terms}
                    isReset={termsTextEditorReset}
                    setIsReset={() => {
                      setTermsTextEditorReset(false);
                    }}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 cmb-22">
                  <TextEditor
                    label="Privacy Policy"
                    id="policy"
                    value={policy}
                    setIsReset={() => {
                      setPolicyTextEditorReset(false);
                    }}
                    isReset={policyTextEditorReset}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12 d-flex justify-content-center cmb-30">
                  <Button
                    btnText="Edit"
                    btnStyle="PD"
                    className="cps-30 cpe-30"
                    btnLoading={btnLoading}
                    onClick={submitForm}
                  />
                </div>

                {/* {type === "French" && (
                <>
                  <div className="col-md-8 cmb-22">
                    <TextEditor label="Terms Condition" height="100px" />
                  </div>

                  <div className="col-md-8 cmb-22">
                    <TextEditor label="Privacy Policy" />
                  </div>
                </>
              )} */}
              </form>
            );
          }}
        </Formik>
      )}
    </div>
  );
};

export default TermsPolicy;

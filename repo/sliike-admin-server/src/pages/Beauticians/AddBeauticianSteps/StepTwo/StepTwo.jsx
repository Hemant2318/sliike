import RadioButton from "components/form/RadioButton/RadioButton";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { stepTwo, throwSuccess } from "store/globalSlice";

const StepTwo = ({ activeStep, setActiveStep }) => {
  const [isProvideService, setIsProvideService] = useState(0);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = async (value) => {
    setIsProvideService(value);
    const payload = {
      beauticianId: params?.bId,
      isProvideService: 1,
    };
    // console.log("payload", payload);

    const response = await dispatch(stepTwo(payload));
    // console.log("payload", response);
    if (response?.status === 200) {
      dispatch(throwSuccess(response?.message));
      navigate(`/beauticians/add-beautician/${params?.bId}/step-3`);
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div id="step-two-container" className="row g-0">
      {/* <h5>Select your business category</h5> */}
      <RadioButton
        label="I provide beauty services and also sell beauty products"
        id="isProvideService"
        checked={isProvideService === 1}
        onChange={() => {
          handleSave(1);
        }}
      />

      {/* <RadioButton
        label="I sell beauty products only"
        id="isProvideProduct"
        checked={isProvideService === 1}
        onChange={() => {
          handleSave(1);
        }}
      /> */}

      {/* <div className="d-flex mt-3">
        <Button
          btnText="Previous"
          onClick={() => {
            setActiveStep(activeStep - 1);
          }}
        />
      </div> */}
    </div>
  );
};

export default StepTwo;

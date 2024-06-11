import RadioButton from "components/form/RadioButton/RadioButton";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { stepTwo, throwSuccess } from "store/globalSlice";

const StepTwo = ({ activeStep, setActiveStep }) => {
  const [isProvideProduct, setIsProvideProduct] = useState(0);
  const [isProvideService, setIsProvideService] = useState(0);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = async (value) => {
    if (value === 1) {
      setIsProvideService(1);
      setIsProvideProduct(0);
    } else {
      setIsProvideService(0);
      setIsProvideProduct(1);
    }
    const payload = {
      beauticianId: params?.bId,
      isProvideService: value === 1 ? 1 : 0,
      isProvideProduct: value === 0 ? 1 : 0,
    };

    const response = await dispatch(stepTwo(payload));
    if (response?.status === 200) {
      dispatch(throwSuccess(response?.message));
      navigate(`/beauticians/add-beautician/${params?.bId}/step-3`);
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div id="step-two-container" className="row g-0">
      {/* <h5>Select your business category</h5> */}

      <div className="d-flex gap-4 flex-wrap">
        <RadioButton
          label="I sell beauty products only"
          id="isProvideProduct"
          checked={isProvideProduct === 1}
          onChange={() => {
            handleSave(0);
          }}
        />
        <RadioButton
          label="I provide beauty services and also sell beauty products"
          id="isProvideService"
          checked={isProvideService === 1}
          onChange={() => {
            handleSave(1);
          }}
        />
      </div>

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

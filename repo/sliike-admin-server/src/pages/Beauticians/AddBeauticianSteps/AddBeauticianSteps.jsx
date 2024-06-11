import React, { useState } from "react";
import { Stepper } from "react-form-stepper";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import StepFour from "./StepFour/StepFour";
import StepThree from "./StepThree/StepThree";
import "./AddBeauticianSteps.scss";
const AddBeauticianSteps = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Step 1" },
    { label: "Step 2" },
    { label: "Step 3" },
    { label: "Step 4" },
  ];

  return (
    <div id="add-beauticians-register-container" className="bg-white">
      <Stepper
        steps={steps}
        activeStep={activeStep}
        connectorStateColors={true}
        connectorStyleConfig={{
          completedColor: "#132c4e",
          activeColor: "#132c4e5e",
          disabledColor: "#eee",
        }}
        styleConfig={{
          activeBgColor: "#132c4e5e",
          completedBgColor: "#132c4e",
          inactiveBgColor: "#eee",
          activeTextColor: "#ffffff",
          completedTextColor: "#ffffff",
          inactiveTextColor: "#444",
        }}
      />

      <div className="steps-form-container p-4">
        {activeStep === 0 && (
          <StepOne activeStep={activeStep} setActiveStep={setActiveStep} />
        )}
        {activeStep === 1 && (
          <StepTwo activeStep={activeStep} setActiveStep={setActiveStep} />
        )}
        {activeStep === 2 && (
          <StepThree activeStep={activeStep} setActiveStep={setActiveStep} />
        )}
        {activeStep === 3 && (
          <StepFour activeStep={activeStep} setActiveStep={setActiveStep} />
        )}
      </div>

      {/* <div style={{ padding: "20px" }} className="d-flex gap-2">
        {activeStep !== 0 && (
          <Button
            btnText="Previous"
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
          />
        )}

        <Button
          btnText="Next"
          onClick={() => {
            setActiveStep(activeStep + 1);
          }}
        />
      </div> */}
    </div>
  );
};

export default AddBeauticianSteps;

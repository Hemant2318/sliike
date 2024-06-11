import Button from "components/form/Button/Button";
import CheckBox from "components/form/CheckBox/CheckBox";
import React from "react";

const WorkingHoursList = ({ handleClose }) => {
  return (
    <div
      id="working-hours-container"
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <h5>Want to copy work hours to other days?</h5>
      <div className="mt-4 border rounded p-3">
        <div className="d-flex gap-5">
          <CheckBox label="Monday" />
          <span>00:00 to 00:00</span>
        </div>

        <div className="d-flex gap-5">
          <CheckBox label="Monday" />
          <span>00:00 to 00:00</span>
        </div>
        <div className="d-flex gap-5">
          <CheckBox label="Monday" />
          <span>00:00 to 00:00</span>
        </div>

        <div className="d-flex gap-5">
          <CheckBox label="Monday" />
          <span>00:00 to 00:00</span>
        </div>

        <div className="d-flex gap-5">
          <CheckBox label="Monday" />
          <span>00:00 to 00:00</span>
        </div>

        <div className="d-flex gap-5">
          <CheckBox label="Monday" />
          <span>00:00 to 00:00</span>
        </div>

        <div className="d-flex gap-5">
          <CheckBox label="Monday" />
          <span>00:00 to 00:00</span>
        </div>
      </div>

      <Button
        btnText="SAVE"
        className="mt-3"
        btnStyle="PD"
        onClick={() => {
          handleClose();
        }}
      />
    </div>
  );
};

export default WorkingHoursList;

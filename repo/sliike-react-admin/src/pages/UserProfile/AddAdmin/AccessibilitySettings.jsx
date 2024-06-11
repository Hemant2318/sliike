import Button from "components/form/Button";
import CheckBox from "components/form/CheckBox";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { icons } from "utils/constants";

const AccessibilitySettings = ({ onHide, setSettingsData, settingsData }) => {
  const handleCheckBoxChange = (e, pIndex, cIndex) => {
    setSettingsData((prev) => {
      const newData = [...prev];
      newData[pIndex].value[cIndex].isCheck =
        !prev[pIndex].value[cIndex].isCheck;

      if (newData[pIndex].value[0].isCheck) {
        if (cIndex === 1) {
          newData[pIndex].value[1].isCheck = prev[pIndex].value[1].isCheck;
        } else if (cIndex === 2) {
          newData[pIndex].value[2].isCheck = prev[pIndex].value[2].isCheck;
        } else {
          newData[pIndex].value[1].isCheck = !prev[pIndex].value[1].isCheck;
          newData[pIndex].value[2].isCheck = !prev[pIndex].value[2].isCheck;
        }
      } else if (newData[pIndex].value[1].isCheck) {
      } else {
        //nothing
      }

      // if (
      //   !newData[pIndex].value[1].isCheck &&
      //   !newData[pIndex].value[2].isCheck
      // ) {
      //   //both false
      //   // console.log("both false");
      //   newData[pIndex].value[0].isCheck = prev[pIndex].value[0].isCheck;
      // } else if (
      //   newData[pIndex].value[1].isCheck &&
      //   newData[pIndex].value[2].isCheck
      // ) {
      //   //both true
      //   // console.log("both true");
      //   newData[pIndex].value[0].isCheck = prev[pIndex].value[0].isCheck;
      // } else if (
      //   !newData[pIndex].value[1].isCheck ||
      //   !newData[pIndex].value[2].isCheck
      // ) {
      //   //any one false from both
      //   // console.log("any one false from both");
      //   newData[pIndex].value[0].isCheck = !prev[pIndex].value[0].isCheck;
      // } else {
      //   console.log("else");
      //   //nonthing
      // }
      return newData;
    });
  };

  const handleApplyChanges = () => {
    setSettingsData(settingsData);
    onHide();
  };
  return (
    <Modal
      show
      onHide={onHide}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Modal.Header>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="text-20-700 color-dashboard-primary">
            <span>
              <img
                src={icons.closeSquare}
                alt="close"
                className="me-3 pointer"
                onClick={() => {
                  onHide();
                }}
              />
            </span>
            <span>User Accessibility Settings</span>
          </div>
          <div>
            <Button
              btnText="APPLY CHANGES"
              btnStyle="PD"
              className="cps-20 cpe-20"
              onClick={handleApplyChanges}
            />
          </div>
        </div>
        {/* <Modal.Title id="example-custom-modal-styling-title">
         
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <div className="row cps-10 cpe-10">
          {settingsData.map((elem, pIndex) => {
            return (
              <div key={pIndex} className="col-md-4 cmb-40">
                <div className="text-17-700 color-dashboard-primary">
                  {elem.keyTitle}
                </div>
                <div className="border rounded cps-10 cpe-10 cpt-10">
                  {elem.value.map((cElem, cIndex) => {
                    return (
                      <React.Fragment key={cIndex}>
                        <CheckBox
                          label={cElem.value}
                          checked={cElem.isCheck}
                          onChange={(e) => {
                            handleCheckBoxChange(e, pIndex, cIndex);
                          }}
                        />
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default AccessibilitySettings;

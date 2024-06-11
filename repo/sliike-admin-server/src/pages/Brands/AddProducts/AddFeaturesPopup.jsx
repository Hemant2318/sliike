import Button from "components/form/Button/Button";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { icons } from "utils/constants";
import FeaturePopup from "./FeaturePopup";
import { string } from "yup";
import { cloneDeep } from "lodash";
import { titleCaseString } from "utils/helpers";

const AddFeaturesPopup = ({
  onHide,
  handleSaveKeyFeatures,
  keyFeaturesList,
}) => {
  const [editKeyList, setEditKeyList] = useState(null);
  const [featuresPopup, setFeaturesPopup] = useState(false);
  const [featuresList, setFeaturesList] = useState([...keyFeaturesList]);

  const sendDataToParent = (fList) => {
    setFeaturesList(fList);
  };

  const handleSaveFeatures = async (featuresList) => {
    await handleSaveKeyFeatures(featuresList);
    onHide();
  };

  const deleteFeatures = (e, i) => {
    let newKeyList = featuresList.filter((v, index) => {
      if (index !== i) {
        return v;
      }
    });
    setFeaturesList(newKeyList);
  };

  return (
    <Modal
      show
      aria-labelledby="contained-modal-title-vcenter"
      className="cps-24 cpt-24 cpe-24"
    >
      <Modal.Body>
        <Modal.Title className="text-20-700 color-black cmb-24">
          Add Key Features
        </Modal.Title>
        <div
          className="add-features-list"
          // style={{
          //   minHeight: "558px",
          //   display: "flex",
          //   flexDirection: "column",
          // }}
        >
          {/* <ul className="text-15-500 color-black cmb-24">
            <li>Leaves a long lasting Colour on hair.</li>
          </ul> */}
          {featuresList?.map((elem, index) => {
            return (
              <ul className="text-15-500 color-black cmb-10 cps-15" key={index}>
                <div className="d-flex justify-content-between">
                  <li className="text-15-500-25 black-100">
                    {titleCaseString(elem)}
                  </li>
                  <div className="d-flex gap-3">
                    <i
                      className="bi bi-pen color-success pointer"
                      onClick={() => {
                        setEditKeyList({ elem, index });
                        setFeaturesPopup(true);
                      }}
                    />
                    <i
                      className="bi bi-trash color-red pointer"
                      onClick={() => {
                        deleteFeatures(elem, index);
                      }}
                    />
                  </div>
                </div>
              </ul>
            );
          })}
          <div className="d-flex gap-2 align-items-center">
            <img
              src={icons.addSquareBlue}
              alt="add-key-features"
              style={{ width: "24px", height: "24px" }}
              className="colo-blue"
            />
            <div
              className="color-blue pointer text-15-500-25"
              onClick={() => {
                setFeaturesPopup(true);
              }}
            >
              Add more
            </div>
          </div>

          <div className="d-flex justify-content-center mt-auto align-items-bottom gap-2 w-100 cmb-40">
            <Button
              btnStyle="DD"
              btnText="CANCEL"
              onClick={onHide}
              className="cps-30 cpe-30"
            />
            <Button
              btnStyle="PD"
              btnText="SAVE"
              onClick={() => {
                handleSaveFeatures(featuresList);
              }}
              className="cps-30 cpe-30"
            />
          </div>
        </div>
      </Modal.Body>

      {featuresPopup && (
        <FeaturePopup
          hidePopup={() => {
            setFeaturesPopup(false);
          }}
          sendDataToParent={sendDataToParent}
          editKeyList={editKeyList}
          featuresList={featuresList}
        />
      )}
    </Modal>
  );
};

export default AddFeaturesPopup;

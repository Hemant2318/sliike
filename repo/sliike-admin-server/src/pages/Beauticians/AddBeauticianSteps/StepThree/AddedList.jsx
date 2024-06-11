import Button from "components/form/Button/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setStepThreeData, stepThree, throwSuccess } from "store/globalSlice";
const { icons } = require("utils/constants");

const AddedList = ({
  handleRedirect,
  setEditService,
  activeStep,
  setActiveStep,
}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const { stepThreeData } = useSelector((state) => ({
    stepThreeData: state.global.stepThreeData,
  }));
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteService = (serviceData) => {
    let newData = stepThreeData.filter((o) => {
      if (o?.serviceCategory !== serviceData?.serviceCategory) {
        return o;
      }
    });
    dispatch(setStepThreeData(newData));
  };

  const handleAddServices = async (value) => {
    setBtnLoading(true);
    let imagesList = value?.map((val) => {
      return val?.img;
    });
    let finalData = new FormData();
    for (let i = 0; i < imagesList.length; i++) {
      finalData.append(`images`, imagesList[i]);
    }

    finalData.append("beauticianId", params?.bId);

    const payload = value?.map(({ img, ...rest }) => ({
      ...rest,
    }));
    let services = [];
    services.push(...payload);

    services.forEach((service, ind) => {
      Object.entries(service).forEach(([key, value]) => {
        finalData.append(`services[${ind}][${key}]`, value);
      });
    });
    const response = await dispatch(stepThree(finalData));
    if (response?.status === 200) {
      dispatch(throwSuccess(response?.message));
      navigate(`/beauticians/add-beautician/${params?.bId}/step-4`);
      setActiveStep(activeStep + 1);
    }
    setBtnLoading(false);
  };

  return (
    <>
      <div className="added-service-container">
        {stepThreeData.length
          ? stepThreeData?.map((elem, index) => {
              return (
                <>
                  <h5 className="bg-black-20 p-2" key={index}>
                    {elem?.serviceCategoryName}
                  </h5>
                  <div className="d-flex gap-3 p-2">
                    <h6 className="cmb-20">{elem?.subServiceTypeName}</h6>
                    <i
                      className="bi bi-pen color-success pointer"
                      onClick={() => {
                        setEditService(elem, index);
                        handleRedirect();
                      }}
                    />
                    <i
                      className="bi bi-trash color-red pointer"
                      onClick={() => {
                        deleteService(elem);
                      }}
                    />
                  </div>
                </>
              );
            })
          : "No Data"}

        <div className="d-flex gap-2 align-items-center p-2">
          <img
            src={icons.addSquareBlue}
            alt="add-key-features"
            style={{ width: "24px", height: "24px" }}
            className="color-blue"
          />
          <div
            className="color-blue pointer text-15-500-25"
            onClick={() => {
              setEditService(null);
              handleRedirect();
            }}
          >
            Add Another Service
          </div>
        </div>

        <div className="d-flex mt-3">
          <Button
            btnText="ADD"
            btnStyle="PD"
            onClick={() => {
              handleAddServices(stepThreeData);
            }}
            btnLoading={btnLoading}
          />
        </div>
      </div>
    </>
  );
};

export default AddedList;

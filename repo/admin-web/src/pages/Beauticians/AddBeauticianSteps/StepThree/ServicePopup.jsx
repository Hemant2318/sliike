import RadioButton from "components/form/RadioButton/RadioButton";
import Loader from "components/layouts/Loader";
import React, { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubServices, getServicesCategories } from "store/globalSlice";

const ServicePopup = ({ onHidePopup, sendDataToParen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkIDs, setCheckIDs] = useState();
  const dispatch = useDispatch();
  const { servicesCategoryList } = useSelector((state) => ({
    servicesCategoryList: state.global.servicesCategoryList,
  }));

  const handleSelect = async (data) => {
    setCheckIDs(data);
    sendDataToParen({ id: data?._id, name: data?.serviceCategoryName });
    setTimeout(() => {
      onHidePopup();
    }, 500);
    await dispatch(getAllSubServices(data?._id));
  };

  const initAPI = async () => {
    setIsLoading(true);
    await dispatch(getServicesCategories());
    setIsLoading(false);
  };

  useEffect(() => {
    initAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="d-flex justify-content-between color-dashboard-primary cmb-20">
          <div className="text-20-700 color-dashboard-primary">
            Service Category
          </div>
          <div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onHidePopup}
            />
          </div>
        </div>

        <div className="border-bottom pb-1 cmb-20">{/* <RadioButton/> */}</div>

        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
            <Loader size="sm" />
          </div>
        ) : (
          <div className="cmb-20" style={{ height: "30vh", overflowY: "auto" }}>
            {servicesCategoryList?.map((elem, ind) => {
              return (
                <RadioButton
                  label={elem?.serviceCategoryName}
                  value={elem?.serviceCategoryName}
                  id={elem?._id}
                  key={ind}
                  checked={checkIDs?._id === elem?._id}
                  onChange={() => {
                    handleSelect(elem);
                  }}
                />
              );
            })}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ServicePopup;

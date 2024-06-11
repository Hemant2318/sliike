import Button from "components/form/Button/Button";
import Dropdown from "components/form/Dropdown/Dropdown";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { icons } from "utils/constants";
import { getMonthList } from "utils/helpers";
import NewMessage from "./NewMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import { omit } from "lodash";
import { getAllNotification } from "store/globalSlice";

const AssignedMessages = ({
  notificationData,
  setNotificationData,
  handleSuccess,
  changeOffset,
}) => {
  const { total, offset, limit } = notificationData || {};

  const dispatch = useDispatch();
  const [isEditData, setIsEditData] = useState(null);
  const navigate = useNavigate();
  const editType = "edit-message";

  const [showPopup, setShowPopup] = useState(false);
  const activePage = offset / limit + 1;
  const totalPage = Math.ceil(total / limit);

  return (
    <div className="cmt-30 cpb-50">
      <div className="message-container">
        {notificationData?.data?.length === 0 ? (
          <div
            style={{ height: "100Px" }}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="text-20-700 color-black-80 text-center">
              No Records Found.
            </div>
          </div>
        ) : (
          notificationData?.data?.map((elem, index) => {
            const { title, message, createdAt } = elem;

            return (
              <div className="message-card cmb-25" key={index}>
                <div className="d-flex flex-wrap justify-content-between text-15-700 color-black-100 cmb-10">
                  {title}
                  <div
                    className="text-15-500 color-black-80 pointer"
                    onClick={() => {
                      setIsEditData(elem);
                      navigate(`/dashboard/push-notification/edit-message`, {
                        state: elem,
                      });
                    }}
                  >
                    Edit
                  </div>
                </div>
                <div className="text-15-500 color-black-80 cmb-10">
                  {message}
                </div>
                <div className="text-13-500-21 color-black-60">
                  {moment(createdAt).format("DD MMM, YYYY")}
                </div>
              </div>
            );
          })
        )}

        {notificationData?.data?.length >= 5 && (
          <div className="d-flex justify-content-between flex-wrap align-items-center text-15-500 color-black-80">
            {limit}/{total}
            <Button
              btnText="NEXT"
              rightIcon={<i className="bi bi-chevron-right" />}
              btnStyle="PD"
              onClick={() => {
                if (activePage !== totalPage) {
                  changeOffset(
                    notificationData?.offset + notificationData?.limit
                  );
                }
              }}
            />
          </div>
        )}
      </div>

      {isEditData && <NewMessage isEditData={isEditData} />}
    </div>
  );
};

export default AssignedMessages;

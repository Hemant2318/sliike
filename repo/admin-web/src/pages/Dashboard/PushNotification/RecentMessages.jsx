import Button from "components/form/Button/Button";
import React, { useEffect } from "react";
import { useState } from "react";
import AssignedMessages from "./AssignedMessages";
import { useDispatch } from "react-redux";
import { getAllNotification } from "store/globalSlice";
import { omit } from "lodash";
import moment from "moment";
import { getMonthList } from "utils/helpers";
import Dropdown from "components/form/Dropdown/Dropdown";
import Loader from "components/layouts/Loader/Loader";

const RecentMessages = () => {
  const dispatch = useDispatch();

  const [type, setType] = useState("Beautician");
  const [yearText, setYearText] = useState("");

  const [notificationData, setNotificationData] = useState({
    type: type,
    offset: 0,
    limit: 5,
    intervalLimit: 5,
    total: 0,
    startDate: moment().startOf("month").format("DD-MM-YYYY"),
    endDate: moment().endOf("month").format("DD-MM-YYYY"),
    loading: true,
    data: [],
  });
  const fetchAllNotification = async (obj) => {
    const payload = omit(obj, ["data", "loading", "total"]);
    const response = await dispatch(getAllNotification(payload));
    if (response?.status === 200) {
      setNotificationData((prev) => {
        return {
          ...prev,
          data: response?.data?.notificationData,
          total: response?.data?.count || 0,
          loading: false,
        };
      });
    }
  };
  useEffect(() => {
    fetchAllNotification(notificationData);
    setYearText(getMonthList(12)[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-white rounded cps-24 cpt-24">
      <div className="text-20-700 color-black cmb-20">Recent messages</div>
      <div className="d-flex gap-3">
        <Button
          btnText="Assigned to beauticians"
          className="rounded-pill"
          btnStyle={notificationData?.type === "Beautician" ? "PD" : "BD"}
          onClick={() => {
            let oldData = {
              ...notificationData,
              type: "Beautician",
              loading: true,
            };
            setNotificationData(oldData);
            fetchAllNotification(oldData);
          }}
        />
        <Button
          btnText="Assigned to clients"
          className="rounded-pill"
          btnStyle={notificationData?.type === "Client" ? "PD" : "BD"}
          onClick={() => {
            let oldData = {
              ...notificationData,
              type: "Client",
              loading: true,
            };
            setNotificationData(oldData);
            fetchAllNotification(oldData);
          }}
        />
        <Button
          btnText="Assigned to all"
          className="rounded-pill"
          btnStyle={notificationData?.type === "All" ? "PD" : "BD"}
          onClick={() => {
            let oldData = {
              ...notificationData,
              type: "All",
              loading: true,
            };
            setNotificationData(oldData);
            fetchAllNotification(oldData);
          }}
        />
      </div>

      <div className="row col-md-2 cmb-30 cmt-30">
        <Dropdown
          placeholder="Year"
          value={yearText}
          options={getMonthList(12).map((o) => {
            return { ...o, name: o.id };
          })}
          optionValue="name"
          onChange={(e) => {
            let oldData = {
              ...notificationData,
              startDate: moment(e.target.value)
                .startOf("month")
                .format("DD-MM-YYYY"),
              endDate: moment(e.target.value)
                .endOf("month")
                .format("DD-MM-YYYY"),
              loading: true,
            };
            setYearText(e.target.value);
            setNotificationData(oldData);
            fetchAllNotification(oldData);
            // handleSuccess(oldData);
          }}
        />
      </div>

      {notificationData?.loading ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="md" />
        </div>
      ) : (
        <AssignedMessages
          notificationData={notificationData}
          setNotificationData={setNotificationData}
          handleSuccess={() => {
            fetchAllNotification(notificationData);
          }}
          yearText={yearText}
          setYearText={setYearText}
          changeOffset={(newOffset, newLimit = notificationData.limit) => {
            let oldData = {
              ...notificationData,
              offset: newOffset,
              limit: newLimit,
              loading: true,
            };
            setNotificationData(oldData);
            fetchAllNotification(oldData);
          }}
        />
      )}
    </div>
  );
};

export default RecentMessages;

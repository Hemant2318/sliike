import React from "react";
import "./PushNotification.scss";
import { commonRoute, icons } from "utils/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PushNotification = () => {
  // const [messageType, setMessageType] = useState();
  const { permissionsData } = useSelector((state) => ({
    permissionsData: state.global.permissionsData,
  }));
  const access = {
    dashboardMenu: permissionsData?.dashboardSettings?.[0],
  };

  const dashboardPermission = access.dashboardMenu;
  const navigate = useNavigate();
  return (
    <>
      <div className="message-container">
        <div className="text-20-700 color-dashboard-primary">
          Create Message
        </div>
        <div className="text-15-500-25 color-black-60 cmb-20">
          Send instant message all at once
        </div>
        <div
          className={
            dashboardPermission?.all
              ? "d-flex justify-content-between"
              : "d-flex justify-content-center"
          }
        >
          {dashboardPermission?.all && (
            <div>
              <div
                className="add-new-message cmb-10 pointer"
                onClick={() => {
                  navigate("/dashboard/push-notification/new-message");
                }}
              >
                <img src={icons.addIconPlus} alt="add" />
              </div>
              <div className="text-15-700 color-dashboard-primary">
                New message
              </div>
              <div className="text-13-500-21 black-80">Create new message</div>
            </div>
          )}

          {dashboardPermission?.viewOnly && (
            <div>
              <div
                className="recent-new-message cmb-10 pointer"
                onClick={() => {
                  navigate(commonRoute.recentMessage);
                }}
              >
                <img src={icons.messageIcon} alt="message" />
              </div>
              <div className="text-15-700 color-dashboard-primary">
                Recent messages
              </div>
              <div className="text-13-500-21 black-80">
                View recent messages
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div id="push-notification-container">
    </div> */}
    </>
  );
};

export default PushNotification;

import React from "react";
import "./Discount.scss";
import { useNavigate } from "react-router-dom";
import { icons } from "utils/constants";
import { useSelector } from "react-redux";

const Discount = () => {
  const { permissionsData } = useSelector((state) => ({
    permissionsData: state.global.permissionsData,
  }));
  const access = {
    dashboardMenu: permissionsData?.dashboardSettings?.[0],
  };

  const dashboardPermission = access.dashboardMenu;
  const navigate = useNavigate();
  return (
    <div className="discount-block">
      <div className="text-20-700 color-dashboard-primary">Create Discount</div>
      <div className="text-15-500-25 color-black-60 cmb-20">
        Create and assign discount to clients
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
              className="add-new-discount cmb-10 pointer"
              onClick={() => {
                navigate(`/dashboard/discount/add-discount`);
              }}
            >
              <img src={icons.addIconPlus} alt="add" />
            </div>
            <div className="text-15-700 color-dashboard-primary">
              New discount
            </div>
            <div className="text-13-500-21 black-80">Create new discount</div>
          </div>
        )}

        {dashboardPermission?.viewOnly && (
          <div>
            <div
              className="recent-new-discount cmb-10 pointer"
              onClick={() => {
                navigate(`/dashboard/discount/recent-discount`);
              }}
            >
              <img src={icons.recentDiscount} alt="message" />
            </div>
            <div className="text-15-700 color-dashboard-primary">
              Recent discount
            </div>
            <div className="text-13-500-21 black-80">View recent discounts</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discount;

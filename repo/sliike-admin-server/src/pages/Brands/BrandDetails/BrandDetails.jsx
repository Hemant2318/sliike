import React from "react";
import { icons } from "utils/constants";
import "./BrandDetails.scss";
import BrandChartView from "./BrandChartView";
import Button from "components/form/Button/Button";
import MenuOption from "components/layouts/MenuOption/MenuOption";
import BrandTransactionHistory from "./BrandTransactionHistory";
import FilterChartViewData from "./FilterChartViewData";
import BarChartData from "./BarChartData";
const BrandDetails = () => {
  return (
    <div id="brands-details-container" className="cmt-24">
      <div className="card-effect shadow cmb-24">
        <div className="d-flex cps-24 cpt-24 cpb-24">
          <div className="d-flex gap-3 pe-3">
            <div
              className="bg-blue-5 d-flex justify-content-center align-items-center color-blue-60 text-20-700"
              style={{
                width: "196px",
                height: "177px",
                borderRadius: "5px",
              }}
            >
              Rose
            </div>
            <div>
              <div className="text-17-600 color-dashboard-primary">Rose</div>
              <div className="color-blue-60 text-13-500-21">
                ID: SLKB0000001
              </div>
              <div className="text-13-500-21 color-dashboard-primary mt-2">
                <img src={icons.mapIcon} alt="location" className="me-2" />
                Route Du 3e-rang,Collingwood, QC, Canada
              </div>
              <div className="d-flex justify-content-between gap-2 mt-3">
                <div>
                  <div className="color-blue-60 text-13-500-21">
                    Start date:
                  </div>
                  <div className="bg-white color-dashboard-primary rounded-pill ps-2 pe-2 pt-1 text-center mt-1 border">
                    18 July, 2022
                  </div>
                </div>
                <div>
                  <div className="color-blue-60 text-13-500-21">End date:</div>
                  <div className="bg-white color-dashboard-primary rounded-pill ps-2 pe-2 pt-1 text-center mt-1 border">
                    18 July, 2023
                  </div>
                </div>
                <div>
                  <div className="color-blue-60 text-13-500-21">Status:</div>
                  <div className="bg-success color-white rounded-pill ps-2 pe-2 pt-1 text-center mt-1">
                    Active
                  </div>
                </div>
                <div>
                  <div className="color-blue-60 text-13-500-21">
                    Sliike plan:
                  </div>
                  <div className="bg-blue color-white rounded-pill ps-2 pe-2 pt-1 text-center mt-1">
                    Sliike pro
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-start border-end ps-3 pe-3">
            <div className="d-flex align-items-center gap-2">
              <span>
                <img src={icons.smsIcon} alt="sms" />
              </span>
              <span className="text-13-500 color-dashboard-primary">
                queensbeauty@gmail.com
              </span>
            </div>
            <div className="d-flex align-items-center gap-2 mt-2">
              <span>
                <img src={icons.callIcon} alt="sms" />
              </span>
              <span className="text-13-500 color-dashboard-primary">
                514 888 7722
              </span>
            </div>
          </div>
          {/* <div></div> */}
        </div>
      </div>

      <div className="card-effect rounded cpt-24 cpb-24 cpe-24 cps-24 cmb-24">
        <BrandChartView />
      </div>
      <div className="text-17-600 color-dashboard-primary cmt-56 cmb-24 d-flex justify-content-between">
        Brand Transaction History
        <div className="option-chat">
          <MenuOption
            icon={
              <Button
                btnText="DOWNLOAD"
                btnStyle="PD"
                iconType="L-Download-White"
              />
            }
            option={[
              {
                text: "Excel File",
                onClick: () => {},
              },
              {
                text: "CSV File",
                onClick: () => {},
              },
              {
                text: "PDF File",
                onClick: () => {},
              },
            ]}
          />
        </div>
      </div>
      <div className="bg-white pt-2 cmb-56">
        <div className="d-flex justify-content-end cme-24 mb-2">
          <Button
            btnText="Go to next slide"
            btnStyle="PLO"
            iconType="R-Arrow"
            className="rounded-pill"
          />
        </div>
        <BrandTransactionHistory />
      </div>
      <div className="bg-white pt-2 cmb-56">
        <FilterChartViewData />
      </div>
      <div className="bg-white pt-2">
        <BarChartData />
      </div>
    </div>
  );
};
export default BrandDetails;

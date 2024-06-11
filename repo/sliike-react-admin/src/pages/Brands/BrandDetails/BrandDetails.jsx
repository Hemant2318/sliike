import React, { useEffect, useState } from "react";
import { icons } from "utils/constants";
import BrandChartView from "./BrandChartView";
import FilterChartViewData from "./FilterChartViewData";
import BarChartData from "./BarChartData";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBrandDashboard } from "store/globalSlice";
import { omit } from "lodash";
import Loader from "components/layouts/Loader";
import moment from "moment";
import { titleCaseString } from "utils/helpers";
import "./BrandDetails.scss";

const BrandDetails = () => {
  const params = useParams();
  const Id = params.id;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState({
    brandId: Id,
    loading: true,
    data: [],
    chartData: [],
  });
  const { permissionsData } = useSelector((state) => ({
    permissionsData: state.global.permissionsData,
  }));
  const access = {
    brandsMenu: permissionsData?.brandSettings?.[0],
  };
  const brandPermission = access?.brandsMenu;

  const fetchDashboardData = async (obj) => {
    const payload = omit(obj, ["loading", "data", "chartData"]);
    const response = await dispatch(fetchBrandDashboard(payload));
    if (response?.status === 200) {
      setTableData((prev) => {
        return {
          ...prev,
          data: response?.brandData,
          chartData: response?.brandChart,
          loading: false,
        };
      });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardData(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const brandDetails = tableData?.data?.[0];
  return (
    <div id="brands-details-container" className="cmt-24">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="md" />
        </div>
      ) : (
        <>
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
                  {brandDetails?.brandBanner ? (
                    <img
                      src={
                        brandDetails?.brandBanner && brandDetails?.brandBanner
                      }
                      alt="brand"
                      style={{
                        objectFit: "cover",
                        width: "196px",
                        height: "177px",
                        borderRadius: "5px",
                      }}
                      onError={(e) => {
                        e.target.src = icons.defaultImage;
                      }}
                    />
                  ) : (
                    <img
                      src={icons.defaultImage}
                      alt="beautician"
                      style={{
                        objectFit: "cover",
                        width: "196px",
                        height: "177px",
                        borderRadius: "5px",
                      }}
                    />
                  )}
                </div>
                <div>
                  <div className="text-17-600 color-dashboard-primary">
                    {titleCaseString(brandDetails?.brandName)}
                  </div>
                  <div className="color-blue-60 text-13-500-21">
                    {brandDetails?.uid}
                  </div>
                  <div className="text-13-500-21 color-dashboard-primary mt-2">
                    <img src={icons.mapIcon} alt="location" className="me-2" />
                    <div>
                      {brandDetails?.address}, {brandDetails?.city},{" "}
                      {brandDetails?.country}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between gap-2 mt-3">
                    <div>
                      <div className="color-blue-60 text-13-500-21">
                        Start date:
                      </div>
                      <div className="bg-white color-dashboard-primary rounded-pill ps-2 pe-2 pt-1 text-center mt-1 border">
                        {brandDetails?.startDate &&
                          moment(brandDetails?.startDate).format(
                            "DD MMM, YYYY"
                          )}
                      </div>
                    </div>
                    <div>
                      <div className="color-blue-60 text-13-500-21">
                        End date:
                      </div>
                      <div className="bg-white color-dashboard-primary rounded-pill ps-2 pe-2 pt-1 text-center mt-1 border">
                        {brandDetails?.endDate &&
                          moment(brandDetails?.endDate).format("DD MMM, YYYY")}
                      </div>
                    </div>
                    <div>
                      <div className="color-blue-60 text-13-500-21">
                        Status:
                      </div>
                      <div className="bg-success color-white rounded-pill ps-2 pe-2 pt-1 text-center mt-1">
                        {brandDetails?.status === 1 ? "Active" : "Inactive"}
                      </div>
                    </div>
                    {/* <div>
                      <div className="color-blue-60 text-13-500-21">
                        Sliike plan:
                      </div>
                      <div className="bg-blue color-white rounded-pill ps-2 pe-2 pt-1 text-center mt-1">
                        Sliike pro
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="border-start border-end ps-3 pe-3">
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <img src={icons.smsIcon} alt="sms" />
                  </span>
                  <span className="text-13-500 color-dashboard-primary">
                    {brandDetails?.email}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <span>
                    <img src={icons.callIcon} alt="sms" />
                  </span>
                  <span className="text-13-500 color-dashboard-primary">
                    {brandDetails?.phoneNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-effect rounded cpt-24 cpb-24 cpe-24 cps-24 cmb-24">
            <BrandChartView tableData={tableData} />
          </div>
          {/* <div className="text-17-600 color-dashboard-primary cmt-56 cmb-24 d-flex justify-content-between">
            Brand Transaction History
            {brandPermission?.viewAndDownload && (
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
            )}
          </div> */}
          {/* <div className="bg-white pt-2 cmb-56">
            <BrandTransactionHistory />
          </div> */}
          <div className="bg-white pt-2 cmb-56">
            <FilterChartViewData tableData={tableData} />
          </div>
          <div className="bg-white pt-2">
            <BarChartData tableData={tableData} />
          </div>
        </>
      )}
    </div>
  );
};
export default BrandDetails;

import React from "react";
import Chart from "react-google-charts";
import { icons } from "utils/constants";
import { titleCaseString } from "utils/helpers";

const ServiceChartView = ({
  financialSummaryData,
  topServicesData,
  clickCountListData,
}) => {
  const tempArray = [
    {
      key: "Service Finacials Chart",
      total: financialSummaryData?.totalEarned || 0,
      sign: financialSummaryData?.totalEarned && "$",
      title: "Total amount earned:",
      value: [
        {
          key: "Service sold",
          value: financialSummaryData?.totalSubTotal || 0,
          sign: "$",
          color: "#1571ED",
        },
        {
          key: "Discount given",
          value: financialSummaryData?.discount || 0,
          sign: "$",
          color: "#FFD059",
        },
        {
          key: "GST/HST",
          value: financialSummaryData?.totalGSTORHST || 0,
          sign: "$",
          color: "#F2994A",
        },
        {
          key: "PST/QST",
          value: financialSummaryData?.totalPSTORQST || 0,
          sign: "$",
          color: "#132C4E",
        },
        {
          key: "Sliike fee",
          value: financialSummaryData?.totalSliikFees || 0,
          sign: "$",
          color: "#43A16B",
        },
        {
          key: "Sliike GST/HST fee",
          value: financialSummaryData?.totalsliikFeeGST || 0,
          sign: "$",
          color: "#FF481A",
        },
        {
          key: "Sliike PST/QST fee",
          value: financialSummaryData?.totalsliikFeePST || 0,
          sign: "$",
          color: "#9747FF",
        },
        {
          key: "Subscription fee",
          value: "0.00",
          sign: "$",
          color: "#718095",
        },
        {
          key: "Total Sliike revenue",
          value: financialSummaryData?.totalSliikRevenue || 0,
          sign: "$",
          color: "#411F00",
        },
      ],
    },
  ];

  const options = {
    pieSliceText: "value",
    tooltip: { isHtml: true },
    legend: {
      position: "none",
    },
    chartArea: {
      width: "100%",
    },
    width: "100%",
    backgroundColor: "#FAFAFA",
  };

  const total_amount_earn = tempArray?.[0]?.title;
  const total_amount_earn_val = tempArray?.[0]?.total;

  return (
    <div className="row" id="service-chart-container">
      <div className="col-md-6">
        <div className="border rounded">
          <div className="cpt-20 cps-24 cpe-24 cpb-20">
            <div className="text-17-700 color-dashboard-primary border-bottom">
              Financial Summary
            </div>
            {tempArray?.[0]?.value?.map((parentElem, parentIndex) => {
              return (
                <>
                  <div
                    className="mt-2 mb-1 d-flex justify-content-between mb-2 financial-summary"
                    key={parentIndex}
                  >
                    <span className="text-13-500-21 color-blue-60 me-2">
                      {parentElem?.key}:
                    </span>
                    <span className="text-13-500-21 color-dashboard-primary">
                      {parentElem?.sign}
                      {parentElem?.value
                        ? (Math.round(parentElem?.value * 100) / 100).toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                </>
              );
            })}

            <div className="d-flex pt-1 d-flex justify-content-between border-top mt-2">
              <span className="text-15-500 color-blue-60 me-2">
                {total_amount_earn}
              </span>
              <span className="text-15-700 color-dashboard-primary">
                $
                {total_amount_earn_val
                  ? total_amount_earn_val.toFixed(2)
                  : "0.00"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 border rounded">
        <div className="cpt-20 cps-15 cpe-15 cpb-20 h-100">
          <div className="text-17-700 color-dashboard-primary">
            Periodic Statistics
          </div>
          <div className="mt-2 d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2 align-items-center">
              <span>
                <img src={icons.eye} alt="share-icon" />
              </span>
              <span className="text-13-500-21 color-blue-60">
                Number of views
              </span>
            </div>
            <span className="text-13-600 color-dashboard-primary">
              {clickCountListData?.nubOfView}
            </span>
          </div>

          <div className="mt-2 d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2 align-items-center">
              <span>
                <img src={icons.share} alt="eye-icon" />
              </span>
              <span className="text-13-500-21 color-blue-60">
                Number of share clicks
              </span>
            </div>
            <span className="text-13-600 color-dashboard-primary">
              {clickCountListData?.nubOfShareClicked}
            </span>
          </div>
          <div className="mt-2 d-flex justify-content-between align-items-center cmb-20">
            <div className="d-flex gap-2 align-items-center">
              <span>
                <img src={icons.roundRight} alt="roundRight-icon" />
              </span>
              <span className="text-13-500-21 color-blue-60">
                Number of buy clicks
              </span>
            </div>
            <span className="text-13-600 color-dashboard-primary">
              {clickCountListData?.nubOfCartClicked}
            </span>
          </div>
          <div className="border-bottom cmb-10" />
          <div className="text-17-700 color-dashboard-primary cmb-10">
            Customer Top Services
          </div>
          <div className="cmb-10 top-service-container">
            {topServicesData?.map((elem, index) => {
              return (
                <>
                  <div className="text-13-600 color-black-100" key={index}>
                    {titleCaseString(elem?.serviceTypeName)}
                    <div className="text-11-500 color-black-80">
                      {elem?.lastMonth} Last month/ {elem?.currentMonth} This
                      month
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div className="text-17-700 color-dashboard-primary cmb-10">
        Chart View
      </div>

      {tempArray.map((childElem, childindex) => {
        let mapData = [["Task", "Hours per Day"]];
        let sliceColor = [];
        childElem?.value.forEach((o) => {
          mapData.push([o.key, +o.value]);
          sliceColor.push(o.color);
        });
        return (
          <div className="col-md-6 d-flex flex-column" key={childindex}>
            <div className="w-100">
              <Chart
                chartType="PieChart"
                data={mapData}
                width={"100%"}
                height={"236px"}
                options={{
                  ...options,
                  colors: sliceColor,
                }}
              />
            </div>
            <div className="chart-title text-15-500 color-black-80 d-flex justify-content-center">
              <div className="text-15-500 color-black-80 text-center cmb-30">
                {childElem.title}
              </div>

              <div className="text-15-700 color-black-100 cps-8">
                {childElem.sign}
                {childElem.total.toFixed(2)}
              </div>
            </div>

            <div className="piechart-desc-block ps-3 pt-1 pe-3 pb-2 border flex-grow-1">
              <div className="piechart-desc-title text-15-700 color-black-100">
                {childElem.key}
              </div>
              <div className="d-flex flex-wrap">
                {childElem.value.map((subChildElem, subChildIndex) => {
                  return (
                    <div className="w-50" key={subChildIndex}>
                      <div className="text-11-500 color-black-100 d-flex align-items-center gap-2 mb-1">
                        <span
                          className="p-1"
                          style={{
                            backgroundColor: subChildElem?.color,
                          }}
                        />
                        <span>{subChildElem?.key}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceChartView;

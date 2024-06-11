import React from "react";
import Chart from "react-google-charts";
import { icons } from "utils/constants";
import { titleCaseString } from "utils/helpers";

const ProductChartView = ({ productDetails }) => {
  const financialSummaryData = productDetails?.data?.finacialSummary?.[0];
  const periodicData = productDetails?.data?.periodicStatics;
  const topProductData = productDetails?.data?.TopProducts;
  const tempArray = [
    {
      key: "Service Finacials",
      total:
        (financialSummaryData?.totalAmountEarned &&
          financialSummaryData?.totalAmountEarned.toFixed(2)) ||
        0.0,
      sign: "$",
      title: "Total amount earned:",
      value: [
        {
          key: "Sales",
          value: financialSummaryData?.productSales.toFixed(2) || 0.0,
          sign: "$",
          color: "#1571ED",
        },
        {
          key: "Discount%",
          value: financialSummaryData?.discount.toFixed(2) || 0.0,
          sign: "$",
          color: "#FFD059",
        },
        {
          key: "GST/HST",
          value: financialSummaryData?.totalGSTORHST.toFixed(2) || 0.0,
          sign: "$",
          color: "#F2994A",
        },
        {
          key: "PST/QST",
          value: financialSummaryData?.totalPSTORQST.toFixed(2) || 0.0,
          sign: "$",
          color: "#132C4E",
        },

        {
          key: "Sliike GST/HST fee",
          value: financialSummaryData?.totalsliikFeeGST.toFixed(2) || 0.0,
          sign: "$",
          color: "#FF481A",
        },
        {
          key: "Sliike PST/QST fee",
          value: financialSummaryData?.totalsliikFeePST.toFixed(2) || 0.0,
          sign: "$",
          color: "#9747FF",
        },
        {
          key: "Sliike fee",
          value: financialSummaryData?.totalSliikFees.toFixed(2) || 0.0,
          sign: "$",
          color: "#43A16B",
        },
        {
          key: "Shipping",
          value: financialSummaryData?.totalShipping.toFixed(2) || 0.0,
          sign: "$",
          color: "#718095",
        },
        {
          key: "Total Sliike revenue",
          value:
            (financialSummaryData?.sllikrevnue &&
              financialSummaryData?.sllikrevnue.toFixed(2)) ||
            0.0,
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
  };
  const total_amount_earn = tempArray?.[0]?.title;
  const total_amount_earn_val = tempArray?.[0]?.total;
  return (
    <div className="row" id="detail-chart-container">
      <div className="col-md-6">
        <div className="border rounded">
          <div className="cpt-20 cps-24 cpe-24 cpb-20">
            <div className="text-17-700 color-dashboard-primary border-bottom">
              Financial Summary
            </div>
            {tempArray?.[0]?.value?.map((elem, index) => {
              return (
                <div
                  className="mt-2 mb-1 d-flex justify-content-between mb-2"
                  key={index}
                >
                  <span className="text-13-500-21 color-blue-60 me-2">
                    {elem?.key}:
                  </span>
                  <span className="text-13-500-21 color-dashboard-primary">
                    {elem?.sign}
                    {elem?.value}
                  </span>
                </div>
              );
            })}
            <div className="d-flex pt-1 d-flex justify-content-between border-top mt-2">
              <span className="text-15-500 color-blue-60 me-2">
                {total_amount_earn}
              </span>
              <span className="text-15-700 color-dashboard-primary">
                ${total_amount_earn_val && total_amount_earn_val}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 border rounded">
        <div className="cpt-20 cps-15 cpe-15 cpb-20 rounded h-100">
          <div className="text-17-700 color-dashboard-primary">
            Periodic Statistics
          </div>
          <div className="mt-2 d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2 align-items-center">
              <span>
                <img src={icons.share} alt="share-icon" />
              </span>
              <span className="text-13-500-21 color-blue-60">
                Number of views
              </span>
            </div>
            <span className="text-13-600 color-dashboard-primary">
              {periodicData?.numOfViews}
            </span>
          </div>

          <div className="mt-2 d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2 align-items-center">
              <span>
                <img src={icons.eye} alt="eye-icon" />
              </span>
              <span className="text-13-500-21 color-blue-60">
                Number of share clicks
              </span>
            </div>
            <span className="text-13-600 color-dashboard-primary">
              {periodicData?.numOfShare}
            </span>
          </div>
          <div className="mt-2 d-flex justify-content-between align-items-center cmb-20">
            <div className="d-flex gap-2 align-items-center">
              <span>
                <img src={icons.roundRight} alt="roundRight-icon" />
              </span>
              <span className="text-13-500-21 color-blue-60">
                Number of add to cart clicks
              </span>
            </div>
            <span className="text-13-600 color-dashboard-primary">
              {periodicData?.numOfAddToCart}
            </span>
          </div>
          <div className="border-bottom cmb-10" />
          <div className="text-17-700 color-dashboard-primary cmb-10">
            Customer Top Beauty Products
          </div>
          <div className="top-service-container">
            {topProductData?.map((data, index) => {
              return (
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={data?.imgName?.[0]}
                    alt="prodimage"
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "5px",
                    }}
                  />
                  <div className="text-13-600 color-black-100" key={index}>
                    {titleCaseString(data?.productName)}
                    <div className="text-11-500 color-black-80">
                      {data?.lastMonth} Last month/ {data?.currentMonth} This
                      month
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <div className="text-13-600 color-black-100">
              Smoothning Cream
              <div className="text-11-500 color-black-80">
                48 Last month/ 24 This month
              </div>
            </div>
            <div className="text-13-600 color-black-100">
              Acrylic Nails
              <div className="text-11-500 color-black-80">
                200 Last month/ 165 This month
              </div>
            </div> */}
          </div>

          {/* <div className="d-flex justify-content-between">
            <div className="text-13-600 color-black-100">
              Men’s Beard Oil
              <div className="text-11-500 color-black-80">
                105 Last month/ 80 This month
              </div>
            </div>
            <div className="text-13-600 color-black-100">
              Clipper
              <div className="text-11-500 color-black-80">
                200 Last month/ 165 This month
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="text-17-700 color-dashboard-primary cmb-10">
        Chartview
      </div>

      {tempArray?.map((childElem, childindex) => {
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
                {childElem.total}
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

export default ProductChartView;

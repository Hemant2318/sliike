import React from "react";
import Chart from "react-google-charts";
import { icons } from "utils/constants";

const BrandChartView = ({ tableData }) => {
  const brandDetails = tableData?.data?.[0];

  const tempArray = [
    // {
    //   key: "Financial Summary",
    //   total: "0.00",
    //   sign: "$",
    //   title: "Total Sliike Revenue:",
    //   value: [
    //     {
    //       key: "Total media fee",
    //       value: "4",
    //       color: "#1571ED",
    //     },
    //     {
    //       key: "Discount amount",
    //       value: "38",
    //       color: "#132C4E",
    //     },
    //     {
    //       key: "Total GST/HST",
    //       value: "8",
    //       color: "#F2994A",
    //     },
    //     {
    //       key: "Total PST/QST",
    //       value: "4",
    //       color: "#9747FF",
    //     },
    //     {
    //       key: "Discount",
    //       value: "35",
    //       color: "#FFD059",
    //     },
    //   ],
    // },
    {
      key: "Periodic Statistics",
      total: "",
      sign: "",
      title: "Total",

      value: [
        {
          key: "Number of views",
          value: brandDetails?.numOfViews,
          color: "#03AF7C",
        },
        {
          key: "Number of share clicks",
          value: brandDetails?.shareClick,
          color: "#3F8DF6",
        },
        {
          key: "Number of buy clicks",
          value: brandDetails?.numOfBuyClick,
          color: "#6721FB",
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
  return (
    <>
      <div className="row">
        {/* <div className="col-md-6">
          <div className="border cpt-20 cps-24 cpe-24 cpb-20 rounded">
            <div>Finacial Summary</div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">
                Total media fee:
              </span>
              <span className="text-13-600 color-dashboard-primary">$0.00</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Discount %:</span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">
                Discount Amt:
              </span>
              <span className="text-13-600 color-dashboard-primary">$0.00</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">
                Total GST/HST:
              </span>
              <span className="text-13-600 color-dashboard-primary">$0.00</span>
            </div>
            <div className="mt-2 d-flex justify-content-between border-bottom">
              <span className="text-13-500-21 color-blue-60">
                Total PST/QST:
              </span>
              <span className="text-13-600 color-dashboard-primary">$0.00</span>
            </div>
            <div className="mt-2 d-flex justify-content-between pt-1">
              <span className="text-13-500-21 color-blue-60">
                Total Sliike revenue:
              </span>
              <span className="text-15-700 color-dashboard-primary">$0.00</span>
            </div>
          </div>
        </div> */}
        <div className="col-md-6 border">
          <div className="cpt-20 cps-24 cpe-24 cpb-20 rounded h-100">
            <div>Periodic Statistics</div>
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
                {brandDetails?.numOfViews}
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
                {brandDetails?.shareClick}
              </span>
            </div>
            <div className="mt-2 d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2 align-items-center">
                <span>
                  <img src={icons.roundRight} alt="roundRight-icon" />
                </span>
                <span className="text-13-500-21 color-blue-60">
                  Number of buy clicks
                </span>
              </div>
              <span className="text-13-600 color-dashboard-primary">
                {brandDetails?.numOfBuyClick}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-6 border">
          {tempArray.map((childElem, childindex) => {
            let mapData = [["Task", "Hours per Day"]];
            let sliceColor = [];
            childElem?.value.forEach((o) => {
              mapData.push([o.key, +o.value]);
              sliceColor.push(o.color);
            });
            return (
              <div className="d-flex flex-column" key={childindex}>
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
                {/* <div className="chart-title text-15-500 color-black-80 d-flex justify-content-center">
                  <div className="text-15-500 color-black-80 text-center cmb-30">
                    {childElem.title}
                  </div>

                  <div className="text-15-700 color-black-100 cps-8">
                    {childElem.sign}
                    {childElem.total}
                  </div>
                </div> */}

                <div className="piechart-desc-block ms-2 ps-2 pe-3 pb-2 flex-grow-1 border mb-2 me-2">
                  <div className="piechart-desc-title text-15-700 color-black-100">
                    {childElem.key}
                  </div>
                  <div className="d-flex flex-wrap">
                    {childElem.value.map((subChildElem, subChildIndex) => {
                      return (
                        <div className="w-50" key={subChildIndex}>
                          <div className="text-11-500 color-black-100 d-flex align-items-center gap-2">
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
      </div>

      {/* <div className="text-20-700 color-dashboard-primary cmt-56">
        Chart View
      </div> */}
      {/* <div className="row">
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
                        <div className="text-11-500 color-black-100 d-flex align-items-center gap-2">
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
      </div> */}
    </>
  );
};

export default BrandChartView;

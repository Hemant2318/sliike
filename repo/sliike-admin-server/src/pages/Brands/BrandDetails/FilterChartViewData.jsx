import React from "react";
import Chart from "react-google-charts";
import { icons } from "utils/constants";

const FilterChartViewData = () => {
  const tempArray = [
    {
      key: "Click by Gender",
      total: "0.00",
      sign: "$",
      title: "",
      value: [
        {
          key: "Female",
          value: "25",
          color: "#FFD059",
        },
        {
          key: "Male",
          value: "25",
          color: "#1571ED",
        },
        {
          key: "Transgender",
          value: "25",
          color: "#9747FF",
        },
        {
          key: "Others",
          value: "25",
          color: "#F2994A",
        },
      ],
    },
    {
      key: "Click by Demography",
      total: "",
      sign: "",
      title: "",

      value: [
        {
          key: "Blacks",
          value: "25",
          color: "#1571ED",
        },
        {
          key: "Asians",
          value: "25",
          color: "#132C4E",
        },
        {
          key: "Indigenous",
          value: "10",
          color: "#F2994A",
        },
        {
          key: "Hispanic/Latino",
          value: "35",
          color: "#9747FF",
        },
        {
          key: "Others",
          value: "25",
          color: "#FFD059",
        },
      ],
    },
    {
      key: "Province",
      total: "",
      sign: "",
      title: "",

      value: [
        {
          key: "Newfoundland and Labrador",
          value: "25",
          color: "#132C4E",
        },
        {
          key: "Nova Scotia",
          value: "25",
          color: "#718095",
        },
        {
          key: "Prince Edward Island",
          value: "10",
          color: "#FF481A",
        },
        {
          key: "Quebec",
          value: "35",
          color: "#9747FF",
        },
        {
          key: "New Brunswick",
          value: "25",
          color: "#00A5D9",
        },
        {
          key: "Ontario",
          value: "25",
          color: "#411F00",
        },
        {
          key: "Alberta",
          value: "25",
          color: "#219653",
        },
        {
          key: "British Columbia",
          value: "10",
          color: "#1571ED",
        },
        {
          key: "Sakatchewan",
          value: "35",
          color: "#F2994A",
        },
        {
          key: "Manitoba",
          value: "25",
          color: "#FFD059",
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
        <div className="col-md-4">
          <div className="cpt-20 cps-24 cpe-24 cpb-20">
            <div className="text-17-700 color-dashboard-primary">
              Clicks By Gender
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Female:</span>
              <span className="text-13-600 color-dashboard-primary">$0.00</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Male:</span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Transgender:</span>
              <span className="text-13-600 color-dashboard-primary">$0.00</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Others:</span>
              <span className="text-13-600 color-dashboard-primary">$0.00</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="cpt-20 cps-24 cpe-24 cpb-20">
            <div className="text-17-700 color-dashboard-primary">
              Clicks By Demography
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Black:</span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Asian:</span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Indigenous:</span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">
                Hispanic/Latino:
              </span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Others:</span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="cpt-20 cps-24 cpe-24 cpb-20">
            <div className="text-17-700 color-dashboard-primary">
              Clicks By Province
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Quebec:</span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Ontario:</span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Alberta:</span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">
                British Columbia:
              </span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Manitoba:</span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Nova Scotia:</span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>

            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">
                Prince Edward Island:
              </span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">
                New Brunswic:
              </span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">
                Newfoundland and Labrador:
              </span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="text-13-500-21 color-blue-60">Sakatchewen:</span>
              <span className="text-13-600 color-dashboard-primary">0</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-20-700 color-dashboard-primary cmt-56 cps-20">
        Chart View
      </div>
      <div className="row">
        {tempArray.map((childElem, childindex) => {
          let mapData = [["Task", "Hours per Day"]];
          let sliceColor = [];
          childElem?.value.forEach((o) => {
            mapData.push([o.key, +o.value]);
            sliceColor.push(o.color);
          });
          return (
            <div className="col-md-4 d-flex flex-column" key={childindex}>
              <div className="cpt-20 cps-24 cpe-24 cpb-20">
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
            </div>
          );
        })}
        {/* <div className="col-md-4">
          <div className="cpt-20 cps-24 cpe-24 cpb-20">1</div>
        </div> */}
      </div>
    </>
  );
};

export default FilterChartViewData;

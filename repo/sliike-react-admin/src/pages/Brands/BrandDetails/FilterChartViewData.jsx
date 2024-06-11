import React from "react";
import Chart from "react-google-charts";

const FilterChartViewData = ({ tableData }) => {
  const brandDetails = tableData?.data?.[0];

  const tempArray = [
    {
      key: "Click by Gender",
      total: "",
      sign: "",
      title: "",
      value: [
        {
          key: "Female",
          value: brandDetails?.genderCounts?.Female || 0,
          color: "#FFD059",
        },
        {
          key: "Male",
          value: brandDetails?.genderCounts?.Male || 0,
          color: "#1571ED",
        },
        {
          key: "Transgender",
          value: brandDetails?.genderCounts?.Transgender || 0,
          color: "#9747FF",
        },
        {
          key: "Others",
          value: brandDetails?.genderCounts?.Others || 0,
          color: "#F2994A",
        },
      ],
    },
    // {
    //   key: "Click by Demography",
    //   total: "",
    //   sign: "",
    //   title: "",

    //   value: [
    //     {
    //       key: "Blacks",
    //       value: "25",
    //       color: "#1571ED",
    //     },
    //     {
    //       key: "Asians",
    //       value: "25",
    //       color: "#132C4E",
    //     },
    //     {
    //       key: "Indigenous",
    //       value: "10",
    //       color: "#F2994A",
    //     },
    //     {
    //       key: "Hispanic/Latino",
    //       value: "35",
    //       color: "#9747FF",
    //     },
    //     {
    //       key: "Others",
    //       value: "25",
    //       color: "#FFD059",
    //     },
    //   ],
    // },
    {
      key: "Province",
      total: "",
      sign: "",
      title: "",
      value: [],
      // value: [
      //   {
      //     key: "Newfoundland and Labrador",
      //     value: "25",
      //     color: "#132C4E",
      //   },
      //   {
      //     key: "Nova Scotia",
      //     value: "25",
      //     color: "#718095",
      //   },
      //   {
      //     key: "Prince Edward Island",
      //     value: "10",
      //     color: "#FF481A",
      //   },
      //   {
      //     key: "Quebec",
      //     value: "35",
      //     color: "#9747FF",
      //   },
      //   {
      //     key: "New Brunswick",
      //     value: "25",
      //     color: "#00A5D9",
      //   },
      //   {
      //     key: "Ontario",
      //     value: "25",
      //     color: "#411F00",
      //   },
      //   {
      //     key: "Alberta",
      //     value: "25",
      //     color: "#219653",
      //   },
      //   {
      //     key: "British Columbia",
      //     value: "10",
      //     color: "#1571ED",
      //   },
      //   {
      //     key: "Sakatchewan",
      //     value: "35",
      //     color: "#F2994A",
      //   },
      //   {
      //     key: "Manitoba",
      //     value: "25",
      //     color: "#FFD059",
      //   },
      // ],
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

  tempArray?.forEach((elem) => {
    if (elem?.key === "Province") {
      brandDetails?.provinceCounts?.forEach((o) => {
        elem?.value?.push({
          key: o?.name,
          value: o?.count,
          color: o?.colorCode,
        });
      });
    }
  });

  return (
    <>
      <div className="row">
        {tempArray?.map((elem, index) => {
          return (
            <>
              <div className="col-md-6 border" key={index}>
                <div className="cpt-20 cps-24 cpe-24 cpb-20">
                  <div className="text-17-700 color-dashboard-primary">
                    {elem?.key}
                  </div>
                  {elem?.value?.map((childElem, childIndex) => {
                    return (
                      <div
                        className="mt-2 d-flex justify-content-between"
                        key={childIndex}
                      >
                        <span className="text-13-500-21 color-blue-60">
                          {childElem?.key}
                        </span>
                        <span className="text-13-600 color-dashboard-primary">
                          {childElem?.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}

        {/* <div className="col-md-4">
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
        </div> */}
      </div>
      <div className="text-20-700 color-dashboard-primary cmt-56 cps-20">
        Chart View
      </div>
      <div className="row">
        {tempArray?.map((childElem, childindex) => {
          let mapData = [["Task", "Hours per Day"]];
          let sliceColor = [];
          childElem?.value?.forEach((o) => {
            mapData.push([o.key, +o.value]);
            sliceColor.push(o.color);
          });
          return (
            <div className="col-md-6 d-flex flex-column">
              <div className="cpt-20 cps-24 cpe-24 cpb-20" key={childindex}>
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

                <div className="piechart-desc-block ps-3 pt-1 pe-3 pb-2 border flex-grow-1">
                  <div className="piechart-desc-title text-15-700 color-black-100">
                    {childElem.key}
                  </div>
                  <div className="d-flex flex-wrap">
                    {childElem?.value?.map((subChildElem, subChildIndex) => {
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
      </div>
    </>
  );
};

export default FilterChartViewData;

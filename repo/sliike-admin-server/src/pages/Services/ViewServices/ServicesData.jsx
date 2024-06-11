import Button from "components/form/Button/Button";
import React from "react";
import Chart from "react-google-charts";
import { icons } from "utils/constants";

const ServicesData = ({ serviceFinancial }) => {
  const sliike_revenue =
    serviceFinancial?.totalSliikFees +
    serviceFinancial?.totalsliikFeeGST +
    serviceFinancial?.totalsliikFeePST;

  const tempArray = [
    {
      key: "Service Finacials",
      // total: "2,127.27",
      // sign: "$",
      // title: "Total amount earned:",
      value: [
        {
          key: "Service sold",
          value: serviceFinancial?.totalSubTotal || 0.0,
          sign: "$",
          color: "#1571ED",
        },
        {
          key: "Discount given",
          value: serviceFinancial?.discount || 0.0,
          sign: "$",
          color: "#FFD059",
        },
        {
          key: "GST/HST",
          value: serviceFinancial?.totalGSTORHST || 0.0,
          sign: "$",
          color: "#F2994A",
        },
        {
          key: "PST/QST",
          value: serviceFinancial?.totalGSTORHST || 0.0,
          sign: "$",
          color: "#132C4E",
        },
        {
          key: "Sliike fee",
          value: serviceFinancial?.totalSliikFees || 0.0,
          sign: "$",
          color: "#43A16B",
        },
        {
          key: "Sliike GST/HST fee",
          value: serviceFinancial?.totalsliikFeeGST || 0.0,
          sign: "$",
          color: "#FF481A",
        },
        {
          key: "Sliike PST/QST fee",
          value: serviceFinancial?.totalsliikFeePST || 0.0,
          sign: "$",
          color: "#9747FF",
        },
        {
          key: "Subscription fee",
          value: 0.0,
          sign: "$",
          color: "#718095",
        },
        {
          key: "Total Sliike revenue",
          value: sliike_revenue || 0.0,
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
  return (
    <>
      <div className="row cps-24">
        {tempArray?.map((parentElem, parentIndex) => {
          return (
            <div className="col-md-4 border rounded" key={parentIndex}>
              <div className="cpt-20 cps-24 cpe-24 cpb-20">
                <div className="text-17-700 color-dashboard-primary border-bottom">
                  {parentElem?.key}
                </div>
                {parentElem?.value?.map((childElem, childIndex) => {
                  const val = childElem?.value;
                  return (
                    <div className="mt-2 mb-1" key={childIndex}>
                      <span className="text-13-500-21 color-blue-60 me-2">
                        {childElem?.key}
                        {":"}
                      </span>
                      <span className="text-13-500-21 color-dashboard-primary">
                        {childElem?.sign}
                        {/* {val} */}
                        {(Math.round(val * 100) / 100).toFixed(2)}
                      </span>
                    </div>
                  );
                })}

                {/* <div className="mb-1">
              <span className="text-13-500-21 color-blue-60 me-2">
                Discount given:
              </span>
              <span className="text-13-500-21 color-dashboard-primary">
                $0.00
              </span>
            </div>
            <div className="mb-1">
              <span className="text-13-500-21 color-blue-60 me-2">
                GST/HST:
              </span>
              <span className="text-13-500-21 color-dashboard-primary">
                $100.00
              </span>
            </div>
            <div className="mb-1">
              <span className="text-13-500-21 color-blue-60 me-2">
                PST/QST:
              </span>
              <span className="text-13-500-21 color-dashboard-primary">
                $199.50
              </span>
            </div>
            <div className="mb-1">
              <span className="text-13-500-21 color-blue-60 me-2">
                Sliike fee:
              </span>
              <span className="text-13-500-21 color-dashboard-primary">
                $149.80
              </span>
            </div>
            <div className="mb-1">
              <span className="text-13-500-21 color-blue-60 me-2">
                Sliike GST/HST fee:
              </span>
              <span className="text-13-500-21 color-dashboard-primary">
                $7.49
              </span>
            </div>
            <div className="mb-1">
              <span className="text-13-500-21 color-blue-60 me-2">
                Sliike PST/QST fee:
              </span>
              <span className="text-13-500-21 color-dashboard-primary">
                $14.94
              </span>
            </div>
            <div className="mb-1">
              <span className="text-13-500-21 color-blue-60 me-2">
                Subscription fee:
              </span>
              <span className="text-13-500-21 color-dashboard-primary">
                $14.99
              </span>
            </div>
            <div className="border-bottom mb-1">
              <span className="text-13-500-21 color-blue-60 me-2">
                Total amount earned:
              </span>
              <span className="text-13-500-21 color-dashboard-primary">
                $2,127.27
              </span>
            </div>
            <div className="d-flex  pt-1">
              <span className="text-15-500 color-blue-60 me-2">
                Total Sliike revenue:
              </span>
              <span className="text-15-700 color-dashboard-primary">
                $164.79
              </span>
            </div> */}
              </div>
            </div>
          );
        })}

        {tempArray.map((childElem, childindex) => {
          let mapData = [["Task", "Hours per Day"]];
          let sliceColor = [];
          childElem?.value.forEach((o) => {
            mapData.push([o.key, +o.value]);
            sliceColor.push(o.color);
          });
          return (
            <div className="col-md-4 d-flex flex-column" key={childindex}>
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
    </>
  );
};

export default ServicesData;

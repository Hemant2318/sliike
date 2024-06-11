import React from "react";
import Chart from "react-google-charts";

const BeauticianChartView = ({ tableData }) => {
  const serviceFinancialData = tableData?.data?.serviceFinacial?.[0];
  const productFinancialData = tableData?.data?.productFinacial?.[0];
  const SummaryFinancialData = tableData?.data?.summaryFinacials?.[0];
  const tempArray = [
    {
      key: "Service Finacials",
      total: serviceFinancialData?.totalEarned.toFixed(2) || 0.0,
      sign: "$",
      title: "Total amount earned:",
      value: [
        {
          key: "Service sold",
          value: serviceFinancialData?.totalSubTotal || 0.0,
          sign: "$",
          color: "#1571ED",
        },
        {
          key: "Discount given",
          value: "0.00",
          sign: "$",
          color: "#FFD059",
        },
        {
          key: "GST/HST",
          value: serviceFinancialData?.totalGSTORHST || 0.0,
          sign: "$",
          color: "#F2994A",
        },
        {
          key: "PST/QST",
          value: serviceFinancialData?.totalPSTORQST || 0.0,
          sign: "$",
          color: "#132C4E",
        },
        {
          key: "Sliike fee",
          value: serviceFinancialData?.totalSliikFees || 0.0,
          sign: "$",
          color: "#43A16B",
        },
        {
          key: "Sliike GST/HST fee",
          value: serviceFinancialData?.totalsliikFeeGST || 0.0,
          sign: "$",
          color: "#FF481A",
        },
        {
          key: "Sliike PST/QST fee",
          value: serviceFinancialData?.totalsliikFeePST || 0.0,
          sign: "$",
          color: "#9747FF",
        },
        {
          key: "Subscription fee",
          value: "0.0",
          sign: "$",
          color: "#718095",
        },
        {
          key: "Total Sliike revenue",
          value: serviceFinancialData?.totalSliikRevenue || 0.0,
          sign: "$",
          color: "#411F00",
        },
      ],
    },
    {
      key: "Product Financials",
      total: productFinancialData?.totalEarned?.toFixed(2) || 0.0,
      sign: "$",
      title: "Total amount earned:",
      value: [
        {
          key: "Product Sales",
          value: productFinancialData?.totalSubTotal || 0.0,
          sign: "$",
          color: "#1571ED",
        },
        {
          key: "Discount given",
          value: productFinancialData?.discount || 0.0,
          sign: "$",
          color: "#FFD059",
        },
        {
          key: "GST/HST",
          value: productFinancialData?.totalGSTORHST || 0.0,
          sign: "$",
          color: "#F2994A",
        },
        {
          key: "PST/QST",
          value: productFinancialData?.totalPSTORQST || 0.0,
          sign: "$",
          color: "#132C4E",
        },
        {
          key: "Sliike fee",
          value: productFinancialData?.totalSliikFees || 0.0,
          sign: "$",
          color: "#43A16B",
        },
        {
          key: "Sliike GST/HST fee",
          value: productFinancialData?.totalsliikFeeGST || 0.0,
          sign: "$",
          color: "#FF481A",
        },
        {
          key: "Sliike PST/QST fee",
          value: productFinancialData?.totalsliikFeePST || 0.0,
          sign: "$",
          color: "#9747FF",
        },
        {
          key: "Shipping Fee",
          value: 0,
          sign: "$",
          color: "#718095",
        },
        {
          key: "Total Sliike revenue",
          value: 0,
          sign: "$",
          color: "#411F00",
        },
      ],
    },
    {
      key: "Summary Financials",
      total: SummaryFinancialData?.totalEarned?.toFixed(2) || 10.0,
      sign: "$",
      title: "Total amount earned:",
      value: [
        {
          key: "Total Business Revenue",
          value: SummaryFinancialData?.totalBusinessRevenue || 0.0,
          sign: "$",
          color: "#FFD059",
        },
        {
          key: "Total GST/HST:",
          value: SummaryFinancialData?.totalGSTORHST || 0.0,
          sign: "$",
          color: "#132C4E",
        },
        {
          key: "Total PST/QST",
          value: SummaryFinancialData?.totalPSTORQST || 0.0,
          sign: "$",
          color: "#132C4E",
        },
        {
          key: "Total Transaction amt.",
          value: SummaryFinancialData?.totalTransctionAmt || 0.0,
          sign: "$",
          color: "#1571ED",
        },
        {
          key: "Total Sliike Revenue",
          value: SummaryFinancialData?.totalSllikRevenue || 0.0,
          sign: "$",
          color: "#43A16B",
        },
        {
          key: "Total Shipping",
          value: 0,
          sign: "$",
          color: "#FF481A",
        },
        {
          key: "Total Shipping GST/HST",
          value: SummaryFinancialData?.totalShippingGSTORHST || 0.0,
          sign: "$",
          color: "#9747FF",
        },
        {
          key: "Total Shipping PST/QST",
          value: SummaryFinancialData?.totalShippingQSTORPST || 0.0,
          sign: "$",
          color: "#411F00",
        },
        {
          key: "-",
          value: "-",
          sign: "$",
          color: "#F2994A",
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
    // backgroundColor: "#FAFAFA",
  };
  return (
    <div className="row">
      {tempArray.map((parentElem, parentIndex) => {
        return (
          <div className="col-md-4" key={parentIndex}>
            <div className="border cpt-20 cps-24 cpe-24 cpb-20 rounded">
              <div className="text-17-700 color-dashboard-primary border-bottom">
                {parentElem?.key}
              </div>
              {parentElem?.value?.map((childElem, childIndex) => {
                const val = childElem?.value;
                return (
                  <div
                    className={`mt-2 ${
                      childElem?.key !== "-" && "beautician-cardList"
                    }`}
                    key={childIndex}
                  >
                    {childElem?.key !== "-" && (
                      <>
                        <span className="text-13-500-21 color-blue-60 me-2">
                          {childElem?.key}:
                        </span>
                        <span className="text-13-500-21 color-dashboard-primary">
                          {childElem?.sign}
                          {(Math.round(val * 100) / 100).toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="text-20-700 color-dashboard-primary cmt-56">
        Chart View
      </div>
      <div className="row">
        {tempArray?.map((childElem, childindex) => {
          let mapData = [["Task", "Hours per Day"]];
          let sliceColor = [];
          childElem?.value.forEach((o) => {
            mapData.push([o.key, +o.value]);
            sliceColor.push(o.color);
          });
          return (
            <div className="col-md-4 d-flex flex-column" key={childindex}>
              {childElem?.title === "Total amount earned:" &&
              childElem?.total !== 0 ? (
                <>
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
                  {childElem?.key !== "Summary Financials" && (
                    <div className="chart-title text-15-500 color-black-80 d-flex justify-content-center">
                      <div className="text-15-500 color-black-80 text-center cmb-30">
                        {childElem.title}
                      </div>

                      <div className="text-15-700 color-black-100 cps-8">
                        {childElem.sign}
                        {childElem.total}
                      </div>
                    </div>
                  )}
                  {}
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
                </>
              ) : (
                <div className="text-16-500 color-black-40 p-4">
                  No records found
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BeauticianChartView;

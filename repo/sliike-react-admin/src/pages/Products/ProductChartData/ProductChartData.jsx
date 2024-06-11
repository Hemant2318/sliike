import React from "react";
import Chart from "react-google-charts";

const ProductChartData = ({ tableData, setTableData, getProductData }) => {
  const productFinacialData = tableData?.data?.productFinacial?.[0];
  const tempArray = [
    {
      key: "Product Finacial",
      total:
        (productFinacialData?.sllikrevnue &&
          productFinacialData?.sllikrevnue.toFixed(2)) ||
        0.0,
      sign: "$",
      title: "Total Sliike revenue",
      value: [
        {
          key: "Product sales",
          value: productFinacialData?.productSales.toFixed(2) || 0.0,
          sign: "$",
          color: "#1571ED",
        },
        {
          key: "Discount given",
          value: productFinacialData?.discount.toFixed(2) || 0.0,
          sign: "$",
          color: "#FFD059",
        },
        {
          key: "GST/HST",
          value: productFinacialData?.totalGSTORHST.toFixed(2) || 0.0,
          sign: "$",
          color: "#F2994A",
        },
        {
          key: "PST/QST",
          value: productFinacialData?.totalPSTORQST.toFixed(2) || 0.0,
          sign: "$",
          color: "#132C4E",
        },
        {
          key: "Sliike fee",
          value: productFinacialData?.totalSliikFees.toFixed(2) || 0.0,
          sign: "$",
          color: "#43A16B",
        },
        {
          key: "Sliike GST/HST fee",
          value: productFinacialData?.totalsliikFeeGST.toFixed(2) || 0.0,
          sign: "$",
          color: "#FF481A",
        },
        {
          key: "Sliike PST/QST fee",
          value: productFinacialData?.totalsliikFeePST.toFixed(2) || 0.0,
          sign: "$",
          color: "#9747FF",
        },
        {
          key: "Shipping",
          value: productFinacialData?.totalShipping.toFixed(2) || 0.0,
          sign: "$",
          color: "#718095",
        },
        {
          key: "Total amount earned",
          value:
            (productFinacialData?.totalAmountEarned &&
              productFinacialData?.totalAmountEarned.toFixed(2)) ||
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

  const total_sliike_rev = tempArray?.[0]?.title;
  const total_sliike_rev_val = tempArray?.[0]?.total;
  return (
    <>
      <div className="row cps-24 gap-5">
        <div className="col-md-4 border rounded bg-white">
          <div className="cpt-20 cpb-20">
            <div className="text-17-700 color-dashboard-primary border-bottom">
              Product Financial List
            </div>
            {tempArray?.[0]?.value?.map((e, i) => {
              return (
                <div className="mt-2 mb-1" key={i}>
                  <span className="text-13-500-21 color-blue-60 me-2">
                    {e?.key}:
                  </span>
                  <span className="text-13-500-21 color-dashboard-primary">
                    {e?.sign}
                    {e?.value
                      ? (Math.round(e?.value * 100) / 100).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
              );
            })}
            <div className="d-flex pt-1 d-flex border-top mt-2">
              <span className="text-15-500 color-blue-60 me-2">
                {total_sliike_rev}:
              </span>
              <span className="text-15-700 color-dashboard-primary">
                ${total_sliike_rev_val ? total_sliike_rev_val : "0.00"}
              </span>
            </div>
          </div>
        </div>

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
                  Total amount earned:
                </div>

                <div className="text-15-700 color-black-100 cps-8">
                  {`$${
                    productFinacialData?.totalAmountEarned.toFixed(2) || 0.0
                  }`}
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

export default ProductChartData;

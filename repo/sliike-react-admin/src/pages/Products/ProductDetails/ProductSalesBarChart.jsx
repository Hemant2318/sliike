import Loader from "components/layouts/Loader";
import React from "react";
import Chart from "react-google-charts";

const ProductSalesBarChart = ({ barChartData, productDetails }) => {
  let productSalesArray = [["months", "Views"]];
  if (barChartData?.length > 0) {
    barChartData?.forEach((o) => {
      productSalesArray.push([o?.month, +o?.services]);
    });
  }

  return (
    <div className="cpt-20 cps-24 cpe-24 cpb-20">
      {productDetails?.loading ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="sm" />
        </div>
      ) : (
        <div className="bar-chart-card">
          <Chart
            chartType="ColumnChart"
            data={productSalesArray}
            options={{
              colors: ["#132C4E"],
              legend: { position: "none" },
              vAxis: {
                title: "Total Revenue/month",
                titleTextStyle: {
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#132c4e",
                },
              },
              vAxes: {
                0: { format: "currency" },
              },
              bar: { groupWidth: "20%" },
              height: 500,
            }}
          />

          {/* <div>
            <div className="d-flex gap-3 justify-content-center">
              <div className="text-11-500 color-black-100 d-flex align-items-center gap-2">
                <span
                  className="p-1"
                  style={{
                    backgroundColor: "#132C4E",
                  }}
                />
                <span>Views</span>
              </div>
              <div className="text-11-500 color-black-100 d-flex align-items-center gap-2">
                <span
                  className="p-1"
                  style={{
                    backgroundColor: "#1571ED",
                  }}
                />
                <span>Share clicks</span>
              </div>
              <div className="text-11-500 color-black-100 d-flex align-items-center gap-2">
                <span
                  className="p-1"
                  style={{
                    backgroundColor: "#F2994A",
                  }}
                />
                <span>Buy clicks</span>
              </div>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ProductSalesBarChart;

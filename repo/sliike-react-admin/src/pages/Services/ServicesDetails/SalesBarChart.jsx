import Loader from "components/layouts/Loader/Loader";
import React from "react";
import Chart from "react-google-charts";

const SalesBarChart = ({ barChartData, serviceData }) => {
  let chartData = [["Months", "Views"]];
  const tempArray = [
    [
      {
        key: "Jan",
        value: 0,
      },
      {
        key: "Feb",
        value: 0,
      },
      {
        key: "Mar",
        value: 0,
      },
      {
        key: "Apr",
        value: 0,
      },
      {
        key: "May",
        value: 0,
      },
      {
        key: "Jun",
        value: 0,
      },
      {
        key: "Jul",
        value: 0,
      },
      {
        key: "Aug",
        value: 0,
      },
      {
        key: "Sep",
        value: 0,
      },
      {
        key: "Oct",
        value: 0,
      },
      {
        key: "Nov",
        value: 0,
      },
      {
        key: "Dec",
        value: 0,
      },
    ],
  ];

  tempArray?.[0]?.map((o, index) => {
    o.value = barChartData?.[index];
  });

  tempArray?.[0]?.forEach((o) => {
    chartData.push([o.key, +o.value]);
  });

  return (
    <>
      {/* <div className=""> */}
      <div className="bar-chart-card cmt-15">
        {serviceData?.loading ? (
          <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
            <Loader size="sm" />
          </div>
        ) : (
          <Chart
            chartType="ColumnChart"
            data={chartData}
            options={{
              // backgroundColor: { stroke: "black" },
              // isStacked: "percent",
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
        )}

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
      {/* </div> */}
    </>
  );
};

export default SalesBarChart;

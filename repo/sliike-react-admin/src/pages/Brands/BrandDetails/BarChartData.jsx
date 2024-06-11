import React from "react";
import Chart from "react-google-charts";

const BarChartData = ({ tableData }) => {
  const brandChart = tableData?.chartData;
  let chartData = [["months", "Views", "Share clicks", "Buy clicks"]];
  const newArray = [];
  brandChart?.forEach((elem) => {
    newArray.push([elem?.month, elem?.views, elem?.share, elem?.buy]);
  });

  newArray?.forEach((o) => {
    chartData.push([o?.[0], o?.[1], o?.[2], o?.[3]]);
  });

  return (
    <div className="row cps-20">
      <div className="text-20-700 color-dashboard-primary cmt-56 cps-40">
        Periodic Stats Bar Chart
      </div>

      <div className="cpt-20 cps-24 cpe-24 cpb-20">
        <div className="bar-chart-card">
          <Chart
            chartType="ColumnChart"
            data={chartData}
            options={{
              legend: { position: "none" },
              vAxis: { title: "" },
            }}
          />

          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChartData;

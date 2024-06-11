import React from "react";
import Chart from "react-google-charts";

const BarChartData = () => {
  return (
    <div className="row cps-20">
      <div className="text-20-700 color-dashboard-primary cmt-56 cps-40">
        Periodic Stats Bar Chart
      </div>

      <div className="cpt-20 cps-24 cpe-24 cpb-20">
        <div className="bar-chart-card">
          <Chart
            chartType="ColumnChart"
            data={[
              ["months", "Views", "Share clicks", "Buy clicks"],
              ["Jan", 1200, 500, 200],
              ["Feb", 1200, 500, 200],
              ["Mar", 1200, 500, 200],
              ["Apr", 1500, 700, 400],
              ["May", 1000, 800, 300],
              ["Jun", 1400, 400, 200],
              ["Jul", 800, 600, 150],
              ["Aug", 900, 800, 600],
              ["Sep", 0, 0, 0],
              ["Oct", 0, 0, 0],
              ["Nov", 0, 0, 0],
              ["Dec", 0, 0, 0],
            ]}
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

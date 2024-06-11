import React from "react";
import Chart from "react-google-charts";
import CardBarChart from "../CardBarChart";
import "./CardPieChart.scss";
import Loader from "components/layouts/Loader/Loader";

const CardPieChart = ({ dashboardData, cardData }) => {
  const options = {
    pieSliceText: "value",
    legend: {
      position: "none",
    },
    // backgroundColor: "#FAFAFA",
  };

  return (
    <div id="pie-chart-container">
      <div className="pie-chart-block row">
        {cardData?.loading ? (
          <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
            <Loader size="md" />
          </div>
        ) : (
          dashboardData?.map((parentElem, parentIndex) => {
            return (
              <div className="pie-chart-heading col-md-12" key={parentIndex}>
                <div className="row cmt-16 pieChart-block cpt-40 cpb-40 cmb-96">
                  <div className="text-20-700 color-dashboard-primary">
                    {parentElem.key}
                  </div>
                  {parentElem?.value?.map((childElem, childindex) => {
                    let mapData = [["Task", "Hours per Day"]];
                    let sliceColor = [];

                    /* childElem?.color?.map((o) => {
                    sliceColor.push(o);
                  }); */

                    childElem?.value?.forEach((o) => {
                      mapData?.push([o.key, +o.value]);
                      sliceColor?.push(o.color);
                    });

                    return (
                      <div className="chart-block col-md-4" key={childindex}>
                        <Chart
                          chartType="PieChart"
                          data={mapData}
                          options={{
                            ...options,
                            colors: sliceColor,
                          }}
                        />
                        <div className="chart-title text-15-500 color-black-80 d-flex justify-content-center">
                          <div className="text-15-500 color-black-80 text-center cmb-30">
                            {childElem.title}
                          </div>

                          <div className="text-15-700 color-black-100 cps-8">
                            {childElem.sign}
                            {childElem.total}
                          </div>
                        </div>

                        <div className="piechart-desc-block cps-5 cpt-5 cpe-5 cpb-5">
                          <div className="piechart-desc-title text-15-700 color-black-100">
                            {childElem.key}
                          </div>
                          <div className="d-flex  flex-wrap">
                            {childElem.value.map(
                              (subChildElem, subChildIndex) => {
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
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}

        <CardBarChart />
      </div>
    </div>
  );
};

export default CardPieChart;

import Chart from "react-google-charts";

const ChartView = ({ clientData }) => {
  // console.log("clientData", clientData);
  // const { upcoming, completed, cancelled, noShow } = clientData;
  const total =
    clientData?.upcoming +
    clientData?.completed +
    clientData?.cancelled +
    clientData?.noShow;
  const chartData = [
    {
      key: "Service Order Summary",
      total: total,
      sign: "",
      title: "Total:",
      value: [
        {
          key: "Upcoming",
          value: clientData?.upcoming,
          sign: "$",
          color: "#1571ED",
        },
        {
          key: "Completed",
          value: clientData?.completed,
          sign: "$",
          color: "#132C4E",
        },
        {
          key: "Cancelled",
          value: clientData?.cancelled,
          sign: "$",
          color: "#F2994A",
        },
        {
          key: "No-show",
          value: clientData?.noShow,
          sign: "$",
          color: "#FFD059",
        },
      ],
    },
    // {
    //   key: "",
    //   total: "27",
    //   sign: "",
    //   title: "Total:",
    //   value: [
    //     {
    //       key: "Purchased",
    //       value: "24",
    //       sign: "$",
    //       color: "#FFD059",
    //     },
    //     {
    //       key: "Cancelled",
    //       value: "3",
    //       sign: "$",
    //       color: "#1571ED",
    //     },
    //   ],
    // },
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
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="border cpt-20 cps-24 cpe-24 cpb-20 rounded">
            <div className="text-17-700 color-dashboard-primary border-bottom">
              Services Order Summary
            </div>
            <div className="mt-2">
              <span className="text-13-500-21 color-blue-60 me-2">
                Upcoming:
              </span>
              <span className="text-13-500-21 color-dashboard-primary">
                {clientData?.upcoming}
              </span>
            </div>
            <div>
              <span className="text-13-500-21 color-blue-60 me-2">
                Completed:
              </span>
              <span className="text-13-500-21 color-dashboard-primary">
                {clientData?.completed}
              </span>
            </div>
            <div>
              <span className="text-13-500-21 color-blue-60 me-2">
                Cancelled:
              </span>
              <span className="text-13-500-21 color-dashboard-primary">
                {clientData?.cancelled}
              </span>
            </div>
            <div className="border-bottom">
              <span className="text-13-500-21 color-blue-60 me-2">
                No-show:
              </span>
              <span className="text-13-500-21 color-dashboard-primary">
                {clientData?.noShow}
              </span>
            </div>
            <div className="d-flex justify-content-between pt-1">
              <span className="text-15-500 color-blue-60 me-2">Total:</span>
              <span className="text-17-500 color-dashboard-primary">
                {total}
              </span>
            </div>
          </div>
        </div>
        {/* <div className="col-md-4">
          <div className="border cpt-20 cps-24 cpe-24 cpb-20 rounded h-100 d-flex flex-column">
            <div className="text-17-700 color-dashboard-primary border-bottom">
              Beauty Products Order Summary
            </div>
            <div className="flex-grow-1">
              <div className="mt-2">
                <span className="text-13-500-21 color-blue-60 me-2">
                  Purchased:
                </span>
                <span className="text-13-500-21 color-dashboard-primary">
                  24
                </span>
              </div>
              <div className="">
                <span className="text-13-500-21 color-blue-60 me-2">
                  Cancelled:
                </span>
                <span className="text-13-500-21 color-dashboard-primary">
                  3
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-between pt-1 border-top">
              <span className="text-15-500 color-blue-60 me-2">Total:</span>
              <span className="text-17-500 color-dashboard-primary">27</span>
            </div>
          </div>
        </div> */}
        <div className="col-md-4" />
      </div>
      <div className="text-20-700 color-dashboard-primary cmt-56">
        Chart View
      </div>
      <div className="row">
        {chartData?.map((childElem, childindex) => {
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
          );
        })}
      </div>
    </>
  );
};
export default ChartView;

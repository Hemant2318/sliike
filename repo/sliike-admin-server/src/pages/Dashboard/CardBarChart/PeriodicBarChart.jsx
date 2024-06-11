import Dropdown from "components/form/Dropdown/Dropdown";
import Loader from "components/layouts/Loader/Loader";
import ReportDownloadButton from "components/layouts/ReportDownloadButton/ReportDownloadButton";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { omit } from "lodash";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import Chart from "react-google-charts";
import { useDispatch } from "react-redux";
import { getPeriodicBarChart } from "store/globalSlice";
import { getYearList, objectToQueryParams } from "utils/helpers";

const PeriodicBarChart = () => {
  const dispatch = useDispatch();
  const [periodicChart, setPeriodicChart] = useState({
    year: moment().format("YYYY"),
    data: [],
    loader: true,
  });
  const [exportPeriodic, setExportPeriodic] = useState({
    data: [],
    loader: true,
  });

  const exportHeader = [
    "Months",
    "Beauty Services",
    "Beauty Products",
    "Brand Media",
  ];

  const exportPeriodicData = async (data) => {
    let flagArray = [];
    data?.forEach((o) => {
      flagArray.push([o?.month, o?.services, o?.product, o?.brand]);
    });
    setExportPeriodic((prev) => {
      return {
        ...prev,
        data: flagArray,
        loader: false,
      };
    });
  };

  const doc = new jsPDF();
  const Print = () => {
    doc.autoTable({ html: "#periodicData-table" });
    const header = exportHeader;
    let row = [];
    row = periodicChart?.data?.map((o) => {
      return [o?.month, o?.services, o?.product, o?.brand];
    });
    doc.autoTable(header, row);
    doc.save("Periodic Business.pdf");
  };

  const fetchPeriodicChartData = async (obj) => {
    const queryParams = objectToQueryParams(omit(obj, ["data", "loader"]));
    const response = await dispatch(getPeriodicBarChart(queryParams));

    if (response?.status === 200) {
      setPeriodicChart((prev) => {
        return {
          ...prev,
          data: response?.data,
          loader: false,
        };
      });
    }
    exportPeriodicData(response?.data);
  };

  useEffect(() => {
    fetchPeriodicChartData(periodicChart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let periodicArray = [
    ["months", "Beauty services", "Beauty products", "Brand media"],
  ];

  const tempArray = [];
  periodicChart?.data?.forEach((o) => {
    tempArray.push([o?.month, o?.services, o?.product, o?.brand]);
  });

  tempArray?.forEach((o) => {
    periodicArray.push([o?.[0], o?.[1], o?.[2], o?.[3]]);
  });

  return (
    <div className="bar-chart-block cmb-99">
      <div className="bar-chart-heading-block d-flex flex-wrap justify-content-between cmb-16">
        <div className="bar-heading text-20-700 color-dashboard-primary">
          Customer Bar Chart
        </div>
        <div className="bar-chart-buttons d-flex gap-3">
          <Dropdown
            placeholder="Year"
            value={periodicChart?.year}
            optionValue="name"
            options={getYearList(12).map((o) => {
              return { ...o, name: o.id };
            })}
            onChange={(e) => {
              let oldData = {
                ...periodicChart,
                year: e.target.value,
                loader: true,
              };
              setPeriodicChart(oldData);
              fetchPeriodicChartData(oldData);
            }}
          />

          <ReportDownloadButton
            btnStyle="PD"
            btnText="DOWNLOAD REPORT"
            iconType="L-Download-White"
            data={exportPeriodic?.data}
            headers={exportHeader}
            filename={`Periodic Business.csv`}
            pdfFile={() => {
              Print();
            }}
          />
        </div>
      </div>

      <div className="bar-chart-card-block">
        <div className="bar-chart-title text-17-700 cpt-18 cps-103">
          <span className="color-dashboard-primary">
            Periodic Business Bar Chart
          </span>
          <span className="color-blue-60">(Services, Products & Brands)</span>
        </div>

        <div className="bar-chart-card">
          {periodicChart?.loader ? (
            <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
              <Loader size="sm" />
            </div>
          ) : (
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="320px"
              data={periodicArray}
              options={{
                colors: ["#132C4E", "#1571ED", "#F2994A"],
                legend: { position: "none" },
                vAxis: {
                  title: "Customers",
                  titleTextStyle: {
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#132c4e",
                  },
                },
              }}
            />
          )}

          <div>
            <div className="d-flex gap-3 justify-content-center">
              <div className="text-11-500 color-black-100 d-flex align-items-center gap-2">
                <span
                  className="p-1"
                  style={{
                    backgroundColor: "#132C4E",
                  }}
                />
                <span>Beauty services</span>
              </div>
              <div className="text-11-500 color-black-100 d-flex align-items-center gap-2">
                <span
                  className="p-1"
                  style={{
                    backgroundColor: "#1571ED",
                  }}
                />
                <span>Beauty products</span>
              </div>
              <div className="text-11-500 color-black-100 d-flex align-items-center gap-2">
                <span
                  className="p-1"
                  style={{
                    backgroundColor: "#F2994A",
                  }}
                />
                <span>Brand media</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodicBarChart;

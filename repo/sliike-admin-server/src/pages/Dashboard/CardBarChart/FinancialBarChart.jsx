import Dropdown from "components/form/Dropdown/Dropdown";
import Loader from "components/layouts/Loader/Loader";
import ReportDownloadButton from "components/layouts/ReportDownloadButton/ReportDownloadButton";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { omit } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import Chart from "react-google-charts";
import { useDispatch } from "react-redux";
import { getFinancialBarChart } from "store/globalSlice";
import { getYearList, objectToQueryParams } from "utils/helpers";

const FinancialBarChart = () => {
  const dispatch = useDispatch();
  const [financialData, setFinancialData] = useState({
    year: moment().format("YYYY"),
    data: [],
    loader: true,
  });

  const [financialExportData, setFinancialExportData] = useState({
    data: [],
    loader: true,
  });

  const exportHeader = ["Months", "Services", "Products"];

  const financialChartExportData = async (returnData) => {
    let flagArray = [];
    returnData?.forEach((o) => {
      flagArray.push([o?.month, o?.services, o?.product]);
    });
    setFinancialExportData((prev) => {
      return {
        ...prev,
        data: flagArray,
        loader: false,
      };
    });
  };

  const fetchFinancialBarChartData = async (obj) => {
    const queryParams = objectToQueryParams(omit(obj, ["data", "loader"]));
    const response = await dispatch(getFinancialBarChart(queryParams));
    if (response?.status === 200) {
      setFinancialData((prev) => {
        return {
          ...prev,
          data: response?.data,
          loader: false,
        };
      });
    }
    financialChartExportData(response?.data);
  };

  useEffect(() => {
    fetchFinancialBarChartData(financialData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let financialArray = [["months", "Services", "Products"]];
  const tempArray = [];
  financialData?.data?.forEach((o) => {
    tempArray.push([o?.month, o?.services, o?.product]);
  });

  tempArray?.forEach((e) => {
    financialArray.push([e?.[0], e?.[1], e?.[2]]);
  });

  const doc = new jsPDF();
  const Print = () => {
    doc.autoTable({ html: "#financial-data-table" });
    const header = exportHeader;
    let row = [];
    row = financialData?.data?.map((o) => {
      return [o?.month, o?.services, o?.product];
    });
    doc.autoTable(header, row);
    doc.save("Financial Bar Chart.pdf");
  };

  return (
    <div className="bar-chart-block cmb-99">
      <div className="bar-chart-heading-block d-flex flex-wrap justify-content-between cmb-16">
        <div className="bar-heading text-20-700 color-dashboard-primary">
          Financials
        </div>
        <div className="bar-chart-buttons d-flex gap-3">
          <Dropdown
            placeholder="Year"
            value={financialData?.year}
            options={getYearList(12).map((o) => {
              return { ...o, name: o.id };
            })}
            optionValue="name"
            onChange={(e) => {
              let oldData = {
                ...financialData,
                year: e.target.value,
                loader: true,
              };
              setFinancialData(oldData);
              fetchFinancialBarChartData(oldData);
            }}
          />
          <ReportDownloadButton
            btnStyle="PD"
            iconType="L-Download-White"
            btnText="DOWNLOAD REPORT"
            headers={exportHeader}
            data={financialExportData?.data}
            filename="Financial Bar Chart.csv"
            pdfFile={() => {
              Print();
            }}
          />
        </div>
      </div>

      <div className="bar-chart-card-block">
        <div className="bar-chart-title text-17-700 cpt-18 cps-103">
          <span className="color-dashboard-primary">
            Periodic Financial Bar Chart
          </span>
          <span className="color-blue-60">(Services & Products)</span>
        </div>

        <div className="bar-chart-card">
          {financialData?.loader ? (
            <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
              <Loader size="sm" />
            </div>
          ) : (
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="320px"
              data={financialArray}
              options={{
                colors: ["#132C4E", "#1571ED", "#F2994A"],
                legend: { position: "none" },
                vAxis: {
                  title: "Total Revenue",
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
                <span>Services</span>
              </div>
              <div className="text-11-500 color-black-100 d-flex align-items-center gap-2">
                <span
                  className="p-1"
                  style={{
                    backgroundColor: "#1571ED",
                  }}
                />
                <span>Products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialBarChart;

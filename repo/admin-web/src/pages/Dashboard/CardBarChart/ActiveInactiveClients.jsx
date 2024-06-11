import Dropdown from "components/form/Dropdown/Dropdown";
import Loader from "components/layouts/Loader/Loader";
import ReportDownloadButton from "components/layouts/ReportDownloadButton/ReportDownloadButton";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { omit } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useDispatch } from "react-redux";
import { getActiveInactiveClient } from "store/globalSlice";
import { getYearList, objectToQueryParams } from "utils/helpers";

const ActiveInactiveClient = () => {
  const dispatch = useDispatch();
  const [clientChart, setClientChart] = useState({
    year: moment().format("YYYY"),
    data: [],
    loader: true,
  });

  const [exportClient, setExportClient] = useState({
    data: [],
    loader: true,
  });

  const exportHeader = ["Months", "Active", "Inactive"];

  const exportClientData = async (data) => {
    let flagArray = [];
    data?.forEach((o) => {
      flagArray.push([o?.month, o?.activate, o?.deActivate]);
    });
    setExportClient((prev) => {
      return {
        ...prev,
        data: flagArray,
        loader: false,
      };
    });
  };

  const doc = new jsPDF();
  const Print = () => {
    doc.autoTable({ html: "#clientChart-table" });
    const header = exportHeader;
    let row = [];
    row = clientChart?.data?.map((o) => {
      return [o?.month, o?.activate, o?.deActivate];
    });
    doc.autoTable(header, row, {
      startY: false,
      theme: "grid",
      tableWidth: "auto",
      columnWidth: "wrap",
      showHeader: "everyPage",
      headerStyles: {
        theme: "grid",
        fillColor: [19, 44, 78],
        fontSize: 11,
      },
      styles: {
        overflow: "linebreak",
        halign: "justify",
        columnWidth: "wrap",
        font: "League Spartan",
        fontSize: 10,
        overflowColumns: "linebreak",
      },
    });
    doc.save("Active Inactive Clients.pdf");
  };

  const fetchActiveInactiveClient = async (obj) => {
    const queryParams = objectToQueryParams(omit(obj, ["data", "loader"]));
    const response = await dispatch(getActiveInactiveClient(queryParams));
    if (response?.status === 200) {
      setClientChart((prev) => {
        return {
          ...prev,
          data: response?.data,
          loader: false,
        };
      });
    }
    exportClientData(response?.data);
  };

  useEffect(() => {
    fetchActiveInactiveClient(clientChart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let clientArray = [["months", "Active", "Inactive"]];
  const tempArray = [];
  clientChart?.data?.forEach((o) => {
    tempArray.push([o?.month, o?.activate, o?.deActivate]);
  });

  tempArray?.forEach((o) => {
    clientArray.push([o?.[0], o?.[1], o?.[2]]);
  });

  return (
    <div className="bar-chart-block cmb-99">
      <div className="bar-chart-heading-block d-flex flex-wrap justify-content-between cmb-16">
        <div className="bar-heading text-20-700 color-dashboard-primary">
          Active & Inactive Clients
        </div>
        <div className="bar-chart-buttons d-flex gap-3">
          <Dropdown
            placeholder="Year"
            value={clientChart?.year}
            options={getYearList(12).map((o) => {
              return { ...o, name: o.id };
            })}
            optionValue="name"
            onChange={(e) => {
              let oldData = {
                ...clientChart,
                year: e.target.value,
                loader: true,
              };
              setClientChart(oldData);
              fetchActiveInactiveClient(oldData);
            }}
          />
          <ReportDownloadButton
            btnStyle="PD"
            iconType="L-Download-White"
            btnText="DOWNLOAD REPORT"
            data={exportClient?.data}
            headers={exportHeader}
            filename={`Active Inactive Clients.csv`}
            pdfFile={() => {
              Print();
            }}
          />
        </div>
      </div>

      <div className="bar-chart-card-block">
        <div className="bar-chart-card">
          {clientChart?.loader ? (
            <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
              <Loader size="sm" />
            </div>
          ) : (
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="320px"
              data={clientArray}
              options={{
                colors: ["#132C4E", "#F2994A"],
                legend: { position: "none" },
                vAxis: {
                  title: "Number of active and Inactive customers",
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
                <span>Active</span>
              </div>
              <div className="text-11-500 color-black-100 d-flex align-items-center gap-2">
                <span
                  className="p-1"
                  style={{
                    backgroundColor: "#F2994A",
                  }}
                />
                <span>Inactive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveInactiveClient;

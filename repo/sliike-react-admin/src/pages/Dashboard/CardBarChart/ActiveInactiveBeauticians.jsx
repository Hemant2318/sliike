import Dropdown from "components/form/Dropdown/Dropdown";
import Loader from "components/layouts/Loader/Loader";
import ReportDownloadButton from "components/layouts/ReportDownloadButton/ReportDownloadButton";
import { omit } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import { getActiveInactiveBeautician } from "store/globalSlice";
import { getYearList, objectToQueryParams } from "utils/helpers";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ActiveInactiveBeauticians = () => {
  const dispatch = useDispatch();
  const [beauticianChart, setBeauticianChart] = useState({
    year: moment().format("YYYY"),
    data: [],
    loader: true,
  });

  const [exportBeautician, setExportBeautician] = useState({
    data: [],
    loader: true,
  });
  const { permissionsData } = useSelector((state) => ({
    permissionsData: state.global.permissionsData,
  }));
  const access = {
    dashboardMenu: permissionsData?.dashboardSettings?.[0],
  };

  const dashboardPermission = access.dashboardMenu;
  const exportHeader = ["Months", "Active", "Inactive"];

  const exportBeauticianData = async (data) => {
    let flagArray = [];
    data?.forEach((o) => {
      flagArray.push([o?.month, o?.activate, o?.deActivate]);
    });
    setExportBeautician((prev) => {
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
    row = beauticianChart?.data?.map((o) => {
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
    doc.save("Active Inactive Beauticians.pdf");
  };

  const fetchActiveInactiveBeautician = async (obj) => {
    const queryParams = objectToQueryParams(omit(obj, ["data", "loader"]));
    const response = await dispatch(getActiveInactiveBeautician(queryParams));
    if (response?.status === 200) {
      setBeauticianChart((prev) => {
        return {
          ...prev,
          data: response?.data,
          loader: false,
        };
      });
    }
    exportBeauticianData(response?.data);
  };

  useEffect(() => {
    fetchActiveInactiveBeautician(beauticianChart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let beauticianArray = [["months", "Active", "Inactive"]];
  const tempArray = [];
  beauticianChart?.data?.forEach((o) => {
    tempArray.push([o?.month, o?.activate, o?.deActivate]);
  });

  tempArray?.forEach((o) => {
    beauticianArray.push([o?.[0], o?.[1], o?.[2]]);
  });

  return (
    <div className="bar-chart-block cmb-99">
      <div className="bar-chart-heading-block d-flex flex-wrap justify-content-between cmb-16">
        <div className="bar-heading text-20-700 color-dashboard-primary">
          Active & Inactive Beauticians
        </div>
        <div className="bar-chart-buttons d-flex gap-3">
          <Dropdown
            placeholder="Year"
            value={beauticianChart?.year}
            options={getYearList(12).map((o) => {
              return { ...o, name: o.id };
            })}
            optionValue="name"
            onChange={(e) => {
              let oldData = {
                ...beauticianChart,
                year: e.target.value,
                loader: true,
              };
              setBeauticianChart(oldData);
              fetchActiveInactiveBeautician(oldData);
            }}
          />
          {dashboardPermission?.viewAndDownload && (
            <ReportDownloadButton
              btnStyle="PD"
              iconType="L-Download-White"
              btnText="DOWNLOAD REPORT"
              data={exportBeautician?.data}
              headers={exportHeader}
              filename={`Active Inactive Beauticians.csv`}
              pdfFile={() => {
                Print();
              }}
            />
          )}
        </div>
      </div>

      <div className="bar-chart-card-block">
        <div className="bar-chart-card">
          {beauticianChart?.loader ? (
            <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
              <Loader size="sm" />
            </div>
          ) : (
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="320px"
              data={beauticianArray}
              options={{
                colors: ["#132C4E", "#F2994A"],
                legend: { position: "none" },
                vAxis: {
                  title: "Number of active and Inactive beauticians",
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

export default ActiveInactiveBeauticians;

import Dropdown from "components/form/Dropdown/Dropdown";
import Loader from "components/layouts/Loader/Loader";
import ReportDownloadButton from "components/layouts/ReportDownloadButton/ReportDownloadButton";
import "jspdf-autotable";
import jsPDF from "jspdf";
import { omit } from "lodash";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-google-charts";
import { useDispatch } from "react-redux";
import { getRegisteredBarChart } from "store/globalSlice";
import { getYearList, objectToQueryParams } from "utils/helpers";

const RegisteredBarChart = () => {
  const dispatch = useDispatch();
  const [registeredChart, setRegisteredChart] = useState({
    year: moment().format("YYYY"),
    data: [],
    loader: true,
  });
  const [exportRegister, setExportRegister] = useState({
    data: [],
    loader: true,
  });

  const exportHeader = [
    "Months",
    "Beauty Services",
    "Beauty Products",
    "Brand Media",
  ];

  const exportRegisterData = async (data) => {
    let flagArray = [];
    data?.forEach((o) => {
      flagArray.push([o?.month, o?.services, o?.product, o?.brand]);
    });
    setExportRegister((prev) => {
      return {
        ...prev,
        data: flagArray,
        loader: false,
      };
    });
  };

  const doc = new jsPDF();
  const Print = () => {
    doc.autoTable({ html: "#registerData-table" });
    const header = exportHeader;
    let row = [];
    row = registeredChart?.data?.map((o) => {
      return [o?.month, o?.services, o?.product, o?.brand];
    });
    doc.autoTable(header, row);
    doc.save("Total Number of Registered.pdf");
  };

  const fetchRegisteredBarChart = async (obj) => {
    const queryParams = objectToQueryParams(omit(obj, ["data", "loader"]));
    const response = await dispatch(getRegisteredBarChart(queryParams));
    if (response?.status === 200) {
      setRegisteredChart((prev) => {
        return {
          ...prev,
          data: response?.data,
          loader: false,
        };
      });
    }
    exportRegisterData(response?.data);
  };

  useEffect(() => {
    fetchRegisteredBarChart(registeredChart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let registerArray = [
    ["months", "Beauty services", "Beauty products", "Brand media"],
  ];

  const tempArray = [];
  registeredChart?.data?.forEach((o) => {
    tempArray.push([o?.month, o?.services, o?.product, o?.brand]);
  });

  tempArray?.forEach((o) => {
    registerArray.push([o?.[0], o?.[1], o?.[2], o?.[3]]);
  });

  return (
    <div className="bar-chart-block cmb-99">
      <div className="bar-chart-heading-block d-flex flex-wrap justify-content-between cmb-16">
        <div className="bar-heading text-20-700 color-dashboard-primary">
          Total Number of Registered Services, Product & Brands
        </div>
        <div className="bar-chart-buttons d-flex gap-3">
          <Dropdown
            placeholder="Year"
            value={registeredChart?.year}
            options={getYearList(12).map((o) => {
              return { ...o, name: o.id };
            })}
            optionValue="name"
            onChange={(e) => {
              let oldData = {
                ...registeredChart,
                year: e.target.value,
                loader: true,
              };
              setRegisteredChart(oldData);
              fetchRegisteredBarChart(oldData);
            }}
          />
          <ReportDownloadButton
            btnText="DOWNLOAD REPORT"
            btnStyle="PD"
            iconType="L-Download-White"
            data={exportRegister?.data}
            headers={exportHeader}
            filename={`Total Number of Registered.csv`}
            pdfFile={() => {
              Print();
            }}
          />
        </div>
      </div>

      <div className="bar-chart-card-block">
        <div className="bar-chart-title text-17-700 cpt-18 cps-103">
          <span className="color-dashboard-primary">
            Registered Services, Products and Brands Bar Chart
          </span>
          {/* <span className="color-blue-60">(Services, Products & Brands)</span> */}
        </div>

        <div className="bar-chart-card">
          {registeredChart?.loader ? (
            <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
              <Loader size="sm" />
            </div>
          ) : (
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="320px"
              data={registerArray}
              //   data={[
              //     ["months", "Beauty services", "Beauty products", "Brand media"],
              //     ["Jan", 0, 0, 0],
              //     ["Feb", 0, 0, 0],
              //     ["Mar", 0, 0, 0],
              //     ["Apr", 0, 0, 0],
              //     ["May", 0, 0, 0],
              //     ["Jun", 0, 0, 0],
              //     ["Jul", 0, 0, 0],
              //     ["Aug", 0, 0, 0],
              //     ["Sep", 0, 0, 0],
              //     ["Oct", 0, 0, 0],
              //     ["Nov", 1400, 400, 200],
              //     ["Dec", 0, 0, 0],
              //   ]}
              options={{
                colors: ["#132C4E", "#1571ED", "#F2994A"],
                legend: { position: "none" },
                vAxis: {
                  title: "Services, Products & Brands",
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

export default RegisteredBarChart;

import React, { useEffect, useState } from "react";
import { appoitmentStatus, genderlist, icons } from "utils/constants";
import ServiceChartView from "./ServiceChartView";
import TotalServices from "./TotalServices";
import SalesBarChart from "./SalesBarChart";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDemography,
  getProvinceList,
  getServicesCategories,
  getSingleService,
} from "store/globalSlice";
import moment from "moment";
import Loader from "components/layouts/Loader/Loader";
import { getYearList, objectToQueryParams } from "utils/helpers";
import Dropdown from "components/form/Dropdown/Dropdown";
import Button from "components/form/Button/Button";
import ReportDownloadButton from "components/layouts/ReportDownloadButton/ReportDownloadButton";
import jsPDF from "jspdf";
import "jspdf-autotable";
import MenuOption from "components/layouts/MenuOption";
import SearchInput from "components/form/SearchInput";
import "./ServicesDetails.scss";
import { omit } from "lodash";

const ServicesDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [statusText, setStatusText] = useState("Status");
  const [buttonText, setButtonText] = useState("Category");
  const [provinceText, setProvinceText] = useState("Province");
  const [demoGraphy, setDemoGraphy] = useState("Demography");
  const [provinceId, setProvinceId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dateTax, setDateTax] = useState("Date");
  const [endDate, setEndDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [genderText, setGenderText] = useState("Gender");
  const [searchValue, setSearchValue] = useState();
  const [timer, setTimer] = useState("");

  const { servicesCategoryList, provinceList, demographyList } = useSelector(
    (state) => ({
      servicesCategoryList: state.global.servicesCategoryList,
      provinceList: state.global.provinceList,
      demographyList: state.global.demographyList,
    })
  );
  const [serviceData, setServiceData] = useState({
    beauticianId: params?.id,
    categoryId: categoryId || "",
    provinceId: provinceId || "",
    startDate: startDate || "",
    endDate: endDate || "",
    chartForYear: moment().format("YYYY"),
    demographyId: "",
    gender: "",
    orderStatus: "",
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    loading: true,
    data: [],
    search: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [exportData, setExportData] = useState({
    data: [],
    loader: false,
  });
  // const [param, setParam] = useState({
  //   chartForYear: moment().format("YYYY"),
  //   loader: true,
  // });

  const exportHeader = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nav",
    "Dec",
  ];

  const exportServiceSales = async (data) => {
    let flagArray = [];
    data?.forEach((o) => {
      flagArray.push(o.toString());
    });

    setExportData((prev) => {
      return {
        ...prev,
        data: data,
        loader: false,
      };
    });
  };

  const fetchSingleServiceData = async (obj) => {
    const payload = omit(obj, ["data", "loading", "total"]);
    const response = await dispatch(getSingleService(payload));
    if (response?.status === 200) {
      setServiceData((prev) => {
        return {
          ...prev,
          data: response,
          total: response?.data?.serviceCount || 0,
          loading: false,
        };
      });
      // setParam((prev) => {
      //   return {
      //     ...prev,
      //     loader: false,
      //   };
      // });
    }
    exportServiceSales(response?.data?.monthCount);
    setIsLoading(false);
  };

  const handelFilter = async ({
    categoryId,
    provinceId,
    startDate,
    endDate,
    gender,
    appointmentStatus,
    demographyId,
  }) => {
    let oldData = serviceData;
    oldData = {
      ...oldData,
      categoryId: categoryId,
      provinceId: provinceId,
      startDate: startDate,
      endDate: endDate,
      gender: gender,
      orderStatus: appointmentStatus,
      demographyId: demographyId,
    };
    setServiceData(oldData);
    fetchSingleServiceData(oldData);
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
    let time = timer;
    clearTimeout(time);
    time = setTimeout(() => {
      let oldData = { ...serviceData, search: value, loading: true };
      setServiceData(oldData);
      fetchSingleServiceData(oldData);
    }, 800);
    setTimer(time);
  };

  const initAPI = async () => {
    await dispatch(getServicesCategories());
    await dispatch(getProvinceList());
    await dispatch(getDemography());
  };

  useEffect(() => {
    fetchSingleServiceData(serviceData);
    initAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beauticianData = serviceData?.data?.data?.beauticiandata?.[0];
  const address = beauticianData?.beauticianAddress?.[0];
  const userDetails = beauticianData?.userDetails?.[0];
  const financialSummaryData = serviceData?.data?.data?.serviceFinacial?.[0];
  const topServicesData = serviceData?.data?.data?.topServices;
  const barChartData = serviceData?.data?.data?.monthCount;
  const clickCountListData = serviceData?.data?.data?.clickCountList;

  const todayDate = moment().format("YYYY-MM-DD");
  const monthEndDate = moment().clone().endOf("month").format("YYYY-MM-DD");
  const yesterdayDate = moment().subtract(1, "days").format("YYYY-MM-DD");
  const lastWeekDate = moment().subtract(7, "days").format("YYYY-MM-DD");
  const lastThirtyDayDate = moment().subtract(30, "days").format("YYYY-MM-DD");
  const lastNintyDayDate = moment().subtract(90, "days").format("YYYY-MM-DD");
  const lastMonthData = moment().subtract(1, "months").format("YYYY-MM-DD");
  const lastYearData = moment().subtract(1, "years").format("YYYY-MM-DD");
  const doc = new jsPDF();
  const Print = () => {
    doc.autoTable({ html: "#service-pdf-table" });
    const header = exportHeader;
    const row = [barChartData];
    doc.autoTable(header, row);
    doc.save("Service Sales Report.pdf");
  };

  return (
    <div className="cmt-24" id="service-details-container">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="md" />
        </div>
      ) : (
        <>
          <div className="card-effect shadow cmb-40">
            <div className="d-flex cps-24 cpt-24 cpb-24 flex-wrap">
              <div className="d-flex pe-3 gap-3">
                <div
                  className="bg-blue-5 color-blue-60 text-20-700 d-flex align-items-center justify-content-center"
                  style={{
                    width: "196px",
                    height: "177px",
                    borderRadius: "5px",
                  }}
                >
                  {beauticianData?.logo ? (
                    <img
                      src={beauticianData?.logo && beauticianData?.logo}
                      alt="beautician"
                      style={{
                        objectFit: "cover",
                        width: "196px",
                        height: "177px",
                        borderRadius: "5px",
                      }}
                      onError={(e) => {
                        e.target.src = icons.defaultImage;
                      }}
                    />
                  ) : (
                    <img
                      src={icons.defaultImage}
                      alt="beautician"
                      style={{
                        objectFit: "cover",
                        width: "196px",
                        height: "177px",
                        borderRadius: "5px",
                      }}
                    />
                  )}
                </div>
                <div>
                  <div className="text-17-600 color-dashboard-primary">
                    {beauticianData?.businessName}
                  </div>
                  <div className="text-13-500-21 color-blue-60">
                    ID: {beauticianData?.uid}
                  </div>
                  <div className="text-13-500-21 color-dashboard-primary mt-2">
                    <img src={icons.mapIcon} alt="location" className="me-2" />
                    {address?.address}
                  </div>
                  <div className="d-flex justify-content-between gap-3 mt-3 text-13-500-21 color-blue-60">
                    <div>
                      <div>Reg date:</div>
                      <div className="bg-dashboard-primary color-white rounded-pill ps-3 pe-3 pt-1 text-center mt-1">
                        {moment(beauticianData?.createdAt).format("DD-MM-YYYY")}
                      </div>
                    </div>
                    <div>
                      <div>Status:</div>
                      <div className="bg-success color-white rounded-pill ps-3 pe-3 pt-1 text-center mt-1">
                        {userDetails?.isActiveBeautician === 1
                          ? "Active"
                          : "Inactive"}
                      </div>
                    </div>
                    {/* <div>
                  <div>Demography:</div>
                  <div className="bg-blue color-white rounded-pill ps-3 pe-3 pt-1 text-center mt-1">
                    Black
                  </div>
                </div> */}
                  </div>
                </div>
              </div>
              <div className="ps-3 pe-3 border-start border-end">
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <img src={icons.smsIcon} alt="sms" />
                  </span>
                  <span className="text-13-500 color-dashboard-primary">
                    {userDetails?.email}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <span>
                    <img src={icons.callIcon} alt="sms" />
                  </span>
                  <span className="text-13-500 color-dashboard-primary">
                    {userDetails?.phoneNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-effect rounded cpt-24 cpb-24 cpe-24 cps-24 cmb-24">
            <ServiceChartView
              financialSummaryData={financialSummaryData}
              topServicesData={topServicesData}
              clickCountListData={clickCountListData}
            />
          </div>

          <div className="text-17-700 color-dashboard-primary d-flex gap-2 align-items-center cmb-20">
            Service Sales Summary
            <div className="text-13-500">
              (Total sales: {serviceData?.data?.data?.serviceCount})
            </div>
          </div>
          <div className="card-effect rounded spt-24 cpb-24 cpe-24 cps-24 cmb-24">
            <div className="pb-3 d-flex gap-1 flex-wrap">
              <MenuOption
                icon={
                  <Button
                    btnText={buttonText}
                    btnStyle="PLO"
                    iconType="R-Filter"
                  />
                }
                option={servicesCategoryList?.map((o) => {
                  const { serviceCategoryName, _id } = o;
                  return {
                    text: serviceCategoryName,
                    onClick: () => {
                      setButtonText(serviceCategoryName);
                      setCategoryId(_id);
                      handelFilter({ categoryId: _id });
                    },
                  };
                })}
              />
              <MenuOption
                icon={
                  <Button
                    btnText={dateTax}
                    btnStyle="PLO"
                    iconType="R-Filter"
                  />
                }
                option={[
                  {
                    text: "Today",
                    onClick: () => {
                      setDateTax("Today");
                      handelFilter({
                        startDate: todayDate,
                        endDate: todayDate,
                      });
                    },
                  },
                  {
                    text: "Yesterday",
                    onClick: () => {
                      setDateTax("Yesterday");
                      handelFilter({
                        startDate: yesterdayDate,
                        endDate: yesterdayDate,
                      });
                    },
                  },
                  {
                    text: "Last 7 days",
                    onClick: () => {
                      setDateTax("Last 7 days");
                      handelFilter({
                        startDate: lastWeekDate,
                        endDate: todayDate,
                      });
                    },
                  },
                  {
                    text: "Last 30 days",
                    onClick: () => {
                      setDateTax("Last 30 days");
                      handelFilter({
                        startDate: lastThirtyDayDate,
                        endDate: todayDate,
                      });
                    },
                  },
                  {
                    text: "Last 90 days",
                    onClick: () => {
                      setDateTax("Last 90 days");
                      handelFilter({
                        startDate: lastNintyDayDate,
                        endDate: todayDate,
                      });
                    },
                  },
                  {
                    text: "Last month",
                    onClick: () => {
                      setDateTax("Last month");
                      handelFilter({
                        startDate: lastMonthData,
                        endDate: todayDate,
                      });
                    },
                  },
                  {
                    text: "Last year",
                    onClick: () => {
                      setDateTax("Last year");
                      handelFilter({
                        startDate: lastYearData,
                        endDate: todayDate,
                      });
                    },
                  },
                  // {
                  //   text: "Week to date",
                  //   onClick: () => {
                  //     setDateTax("Week to date");
                  //     handelFilter({
                  //       startDate: yesterdayDate,
                  //       endDate: todayDate,
                  //     });
                  //   },
                  // },
                  // {
                  //   text: "Month to date",
                  //   onClick: () => {
                  //     setDateTax("Month to date");
                  //     handelFilter({
                  //       startDate: yesterdayDate,
                  //       endDate: todayDate,
                  //     });
                  //   },
                  // },
                  // {
                  //   text: "Quarter to date",
                  //   onClick: () => {
                  //     setDateTax("Quarter to date");
                  //     handelFilter({
                  //       startDate: yesterdayDate,
                  //       endDate: todayDate,
                  //     });
                  //   },
                  // },
                  // {
                  //   text: "Year to date",
                  //   onClick: () => {
                  //     setDateTax("Year to date");
                  //     handelFilter({
                  //       startDate: yesterdayDate,
                  //       endDate: todayDate,
                  //     });
                  //   },
                  // },
                  // {
                  //   text: "All time",
                  //   onClick: () => {
                  //     setDateTax("All time");
                  //     handelFilter({
                  //       startDate: yesterdayDate,
                  //       endDate: todayDate,
                  //     });
                  //   },
                  // },
                ]}
              />
              <MenuOption
                icon={
                  <Button
                    btnText={provinceText}
                    btnStyle="PLO"
                    iconType="R-Filter"
                  />
                }
                option={provinceList?.map((o) => {
                  const { name, _id } = o;
                  return {
                    text: name,
                    onClick: () => {
                      setProvinceText(name);
                      setProvinceId(_id);
                      handelFilter({ provinceId: _id });
                    },
                  };
                })}
              />
              <MenuOption
                icon={
                  <Button
                    btnText={demoGraphy}
                    btnStyle="PLO"
                    iconType="R-Filter"
                  />
                }
                option={demographyList?.map((o) => {
                  const { demographyName, _id } = o;
                  return {
                    text: demographyName,
                    onClick: () => {
                      setDemoGraphy(demographyName);
                      handelFilter({ demographyId: _id });
                    },
                  };
                })}
              />
              <MenuOption
                icon={
                  <Button
                    btnText={statusText}
                    btnStyle="PLO"
                    iconType="R-Filter"
                  />
                }
                option={appoitmentStatus?.map((o) => {
                  return {
                    text: o?.value,
                    onClick: (e) => {
                      setStatusText(o?.value);
                      handelFilter({ appointmentStatus: o?.id });
                    },
                  };
                })}
              />
              <MenuOption
                icon={
                  <Button
                    btnText={genderText}
                    btnStyle="PLO"
                    iconType="R-Filter"
                  />
                }
                option={genderlist?.map((o) => {
                  return {
                    text: o?.value,
                    onClick: (e) => {
                      setGenderText(o?.value);
                      handelFilter({ gender: o?.value });
                    },
                  };
                })}
              />
              <SearchInput
                searchWidth
                placeholder="Search clients"
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
            <TotalServices
              serviceData={serviceData}
              setServiceData={setServiceData}
              fetchSingleServiceData={fetchSingleServiceData}
            />
          </div>

          <div className="card-effect rounded cpt-24 cpb-24 cpe-24 cps-24">
            <div className="d-flex justify-content-between">
              <div className="text-20-700 color-dashboard-primary">
                Service Sales Bar Chart
              </div>
              <div className="d-flex gap-3">
                {/* <Button btnText="Nov 2022" iconType="R-Filter" btnStyle="PLO" /> */}
                <Dropdown
                  placeholder="Year"
                  value={serviceData?.chartForYear}
                  optionValue="name"
                  options={getYearList(12).map((o) => {
                    return { ...o, name: o.id };
                  })}
                  onChange={(e) => {
                    let oldData = {
                      ...serviceData,
                      chartForYear: e.target.value,
                      loading: true,
                    };
                    setServiceData(oldData);
                    fetchSingleServiceData(oldData);
                  }}
                />

                <ReportDownloadButton
                  btnStyle="PD"
                  btnText="DOWNLOAD REPORT"
                  iconType="L-Download-White"
                  data={[exportData?.data]}
                  headers={exportHeader}
                  filename={`Service Sales Report.csv`}
                  pdfFile={() => {
                    Print();
                  }}
                />
              </div>
            </div>

            <SalesBarChart
              barChartData={barChartData}
              serviceData={serviceData}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ServicesDetails;

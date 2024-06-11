import React, { useEffect, useState } from "react";
import {
  appoitmentStatus,
  genderlist,
  icons,
  priceRangeList,
  productSalesStatus,
} from "utils/constants";
import Button from "components/form/Button/Button";
import BeauticianChartView from "./BeauticianChartView";
import BeauticianServicePurchaseSummary from "./BeauticianServicePurchaseSummary";
import { useNavigate, useParams } from "react-router-dom";
import MenuOption from "components/layouts/MenuOption/MenuOption";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBeauticianDashboard,
  getProductSaleReport,
  getServicesCategories,
} from "store/globalSlice";
import { omit } from "lodash";
import moment from "moment";
import Loader from "components/layouts/Loader/Loader";
import { getProvinceList } from "store/globalSlice";
import { getMonthList } from "utils/helpers";
import Dropdown from "components/form/Dropdown/Dropdown";
import ReportDownloadButton from "components/layouts/ReportDownloadButton/ReportDownloadButton";
import jsPDF from "jspdf";
import "jspdf-autotable";
import SearchInput from "components/form/SearchInput/SearchInput";
import "./BeauticianDetails.scss";
import BeauticianProductPurchaseSummary from "./BeauticianProductPurchaseSummary";

const BeauticianDetails = () => {
  const { servicesCategoryList, provinceList } = useSelector((state) => ({
    servicesCategoryList: state.global.servicesCategoryList,
    provinceList: state.global.provinceList,
  }));
  const navigate = useNavigate();
  const params = useParams();
  const beauticianId = params.id;
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Category");
  const [categoryId, setCategoryId] = useState("");
  const [provinceText, setProvinceText] = useState("Province");
  const [provinceId, setProvinceId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dateTax, setDateTax] = useState("Date");
  const [endDate, setEndDate] = useState("");
  const [yearText, setYearText] = useState("");
  const [genderText, setGenderText] = useState("Gender");
  const [priceRange, setPriceRange] = useState("Price Range");
  const [statusText, setStatusText] = useState("Status");
  const [searchValue, setSearchValue] = useState();
  const [searchClient, setSearchClient] = useState();
  const [timer, setTimer] = useState("");
  const [exportData, setExportData] = useState({ data: [], loader: false });
  const [tableData, setTableData] = useState({
    beauticianId: beauticianId,
    categoryId: categoryId || "",
    appointmentStatus: "",
    provinceId: provinceId || "",
    search: "",
    startDate: startDate || "",
    endDate: endDate || "",
    chartSDate: moment().startOf("month").format("YYYY-MM-DD"),
    chartEDate: moment().endOf("month").format("YYYY-MM-DD"),
    gender: "",
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    loading: true,
    data: [],
  });
  const [productSales, setProductSales] = useState({
    data: [],
    loading: true,
    beauticianId: beauticianId,
    limit: 10,
    offset: 0,
    total: 0,
    intervalLimit: 10,
    productStartDate: moment().startOf("month").format("YYYY-MM-DD"),
    productEndDate: moment().endOf("month").format("YYYY-MM-DD"),
    productProvinceId: "", //6450f37111a9f609fe3e7fe0
    minPrice: "",
    maxPrice: "",
    serachClient: "",
    orderStatus: "",
  });

  const exportFinancialReport = async (returnData) => {
    const serviceFinancialData = returnData?.serviceFinacial?.[0];
    const productFinancialData = returnData?.productFinacial?.[0];
    const SummaryFinancialData = returnData?.summaryFinacials?.[0];
    let flagArray = [
      ["Service Finacials"],
      [
        "Service sold",
        "Discount given",
        "GST/HST",
        "PST/QST",
        "Sliike fee",
        "Sliike GST/HST fee",
        "Sliike PST/QST fee",
        "Subscription fee",
        "Total amount earned",
        "Total Sliike revenue",
      ],
      [
        serviceFinancialData?.totalSubTotal.toFixed(2) || 0.0,
        0,
        serviceFinancialData?.totalGSTORHST.toFixed(2) || 0.0,
        serviceFinancialData?.totalPSTORQST.toFixed(2) || 0.0,
        serviceFinancialData?.totalSliikFees.toFixed(2) || 0.0,
        serviceFinancialData?.totalsliikFeeGST.toFixed(2) || 0.0,
        serviceFinancialData?.totalsliikFeePST.toFixed(2) || 0.0,
        0,
        serviceFinancialData?.totalEarned.toFixed(2) || 0.0,
        serviceFinancialData?.totalSliikRevenue.toFixed(2) || 0.0,
      ],
      [],
      ["Product Financials"],
      [
        "Product Sales",
        "Discount given",
        "GST/HST",
        "PST/QST",
        "Sliike fee",
        "Sliike GST/HST fee",
        "Sliike PST/QST fee",
        "Shipping Fee",
        "Total Sliike revenue",
      ],
      [
        productFinancialData?.totalSubTotal || 0.0,
        productFinancialData?.discount || 0.0,
        productFinancialData?.totalGSTORHST || 0.0,
        productFinancialData?.totalPSTORQST || 0.0,
        productFinancialData?.totalSliikFees || 0.0,
        productFinancialData?.totalsliikFeeGST || 0.0,
        productFinancialData?.totalsliikFeePST || 0.0,
        0,
        0,
      ],
      [],
      ["Summary Financials"],
      [
        "Total Business Revenue",
        "Total GST/HST",
        "Total PST/QST",
        "Total Transaction amt",
        "Total Sliike Revenue",
        "Total Shipping",
        "Total Shipping GST/HST",
        "Total Shipping PST/QST",
        "Summary Financials",
      ],
      [
        SummaryFinancialData?.totalBusinessRevenue || 0.0,
        SummaryFinancialData?.totalGSTORHST || 0.0,
        SummaryFinancialData?.totalPSTORQST || 0.0,
        SummaryFinancialData?.totalTransctionAmt || 0.0,
        SummaryFinancialData?.totalSllikRevenue || 0.0,
        0,
        SummaryFinancialData?.totalShippingGSTORHST || 0.0,
        SummaryFinancialData?.totalShippingQSTORPST || 0.0,
        0,
      ],
    ];
    setExportData((prev) => {
      return {
        ...prev,
        data: flagArray,
        loader: false,
      };
    });
  };

  const fetchDashboardData = async (obj) => {
    const payload = omit(obj, ["loading", "data", "total"]);
    const response = await dispatch(fetchBeauticianDashboard(payload));
    // console.log("response", response);
    if (response?.status === 200) {
      setTableData((prev) => {
        return {
          ...prev,
          data: response?.data,
          total: response?.data?.count || 0,
          loading: false,
        };
      });
      exportFinancialReport(response?.data);
      setIsLoading(false);
    }
  };

  const fetchProductSaleReport = async (data) => {
    const payload = omit(data, ["loading", "data", "total"]);
    const response = await dispatch(getProductSaleReport(payload));
    if (response?.status === 200) {
      setProductSales((prev) => {
        return {
          ...prev,
          data: response?.data?.productSales,
          total: response?.data?.productCount || 0,
          loading: false,
        };
      });
    }
  };

  const handelFilter = async ({
    categoryId,
    provinceId,
    startDate,
    endDate,
    gender,
    appointmentStatus,
    productStartDate,
    productEndDate,
    productProvinceId,
    minPrice,
    maxPrice,
    orderStatus,
  }) => {
    let oldData = tableData;
    oldData = {
      ...oldData,
      categoryId: categoryId,
      provinceId: provinceId,
      startDate: startDate,
      endDate: endDate,
      gender: gender,
      appointmentStatus: appointmentStatus,
    };
    setTableData(oldData);
    fetchDashboardData(oldData);

    let oldValue = productSales;
    oldValue = {
      ...oldValue,
      productProvinceId: productProvinceId,
      productStartDate: productStartDate,
      productEndDate: productEndDate,
      minPrice: minPrice,
      maxPrice: maxPrice,
      orderStatus: orderStatus,
    };
    setProductSales(oldValue);
    fetchProductSaleReport(oldValue);
  };

  const handleSearch = (e) => {
    if (e.target.id === "serviceSummary") {
      let value = e.target.value;
      setSearchValue(value);
      let time = timer;
      clearTimeout(time);
      time = setTimeout(() => {
        let oldData = { ...tableData, search: value, loading: true };
        setTableData(oldData);
        fetchDashboardData(oldData);
      }, 800);
      setTimer(time);
    } else {
      let value = e.target.value;
      setSearchClient(value);
      let time = timer;
      clearTimeout(time);
      time = setTimeout(() => {
        let oldValues = { ...productSales, serachClient: value, loading: true };
        setProductSales(oldValues);
        fetchProductSaleReport(oldValues);
      }, 800);
      setTimer(time);
    }
  };

  // const setChartFilter = async ({ chartSDate, chartEDate }) => {
  //   let oldChartData = tableData;
  //   oldChartData = {
  //     ...oldChartData,
  //     chartSDate: chartSDate,
  //     chartEDate: chartEDate,
  //   };
  //   setTableData(oldChartData);
  //   fetchDashboardData(oldChartData);
  // };

  useEffect(() => {
    fetchDashboardData(tableData);
    fetchProductSaleReport(productSales);
    setYearText(getMonthList(12)[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initAPI = async () => {
    await dispatch(getServicesCategories());
    await dispatch(getProvinceList());
  };
  useEffect(() => {
    initAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beauticianDetails = tableData?.data?.beauticiandata?.[0];
  const address = beauticianDetails?.beauticianAddress?.[0];
  const useDetails = beauticianDetails?.userDetails?.[0];

  const todayDate = moment().format("YYYY-MM-DD");
  const monthEndDate = moment().clone().endOf("month").format("YYYY-MM-DD");
  const yesterdayDate = moment().subtract(1, "days").format("YYYY-MM-DD");
  const lastWeekDate = moment().subtract(7, "days").format("YYYY-MM-DD");
  const lastThirtyDayDate = moment().subtract(30, "days").format("YYYY-MM-DD");
  const lastNintyDayDate = moment().subtract(90, "days").format("YYYY-MM-DD");
  const lastMonthData = moment().subtract(1, "months").format("YYYY-MM-DD");
  const lastYearData = moment().subtract(1, "years").format("YYYY-MM-DD");
  // const weekToDate = "";

  const doc = new jsPDF("landscape");
  const Print = () => {
    doc.autoTable({ html: "#beautician-report-table" });
    const header = exportData?.data;
    let row = exportData?.data;
    doc.autoTable(header, row, {
      margin: { left: 10, right: 10 },
      startY: false,
      tableWidth: "auto",
      columnWidth: "wrap",
      showHeader: "everyPage",
      tableLineColor: 200,
      tableLineWidth: 0,
      didParseCell: function (data) {
        let arr = [0, 4, 8, 12, 16, 20];
        data?.table?.body?.forEach((elem, idx) => {
          if (arr.indexOf(idx) > -1) {
            elem.cells[0].colSpan = 14;
            elem.cells[0].styles.fillColor = [19, 44, 78];
            elem.cells[0].styles.textColor = [255, 255, 255];
            elem.cells[0].styles.fontStyle = "bold";
            elem.cells[0].styles.fontSize = 11;
          }
        });
      },
      columnStyles: {
        0: {
          columnWidth: 22,
        },

        1: {
          columnWidth: 25,
        },

        2: {
          columnWidth: 25,
        },
        3: {
          columnWidth: 25,
        },
        4: {
          columnWidth: 25,
        },
        5: {
          columnWidth: 22,
        },
        6: {
          columnWidth: 23,
        },
        7: {
          columnWidth: 21,
        },
        8: {
          columnWidth: 25,
        },
        9: {
          columnWidth: 25,
        },
        10: {
          columnWidth: 30,
        },

        // rowPageBreak: "avoid",
      },
      headerStyles: {
        fontSize: 15,
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
    doc.save("Sales and Financial Reports.pdf");
  };

  return (
    <div id="beautician-detail-container" className="cmt-24">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="md" />
        </div>
      ) : (
        <>
          <div className="card-effect shadow">
            <div className="d-flex cps-24 cpt-24 cpb-24">
              <div className="d-flex pe-3 gap-3">
                <div
                  className="bg-blue-5 color-blue-60 text-20-700 d-flex align-items-center justify-content-center"
                  style={{
                    width: "196px",
                    height: "177px",
                    borderRadius: "5px",
                  }}
                >
                  {beauticianDetails?.logo ? (
                    <img
                      src={beauticianDetails?.logo && beauticianDetails?.logo}
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
                  {/* {beauticianDetails?.logo ? (
                    <img
                      src={beauticianDetails?.logo && beauticianDetails?.logo}
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
                    <div className="no-logo color-dashboard-primary">
                      <i className="bi bi-exclamation color-dashboard-primary text-24-700" />
                      No Logo
                    </div>
                  )} */}
                  {/* <div className="no-logo color-dashboard-primary">
                    <i className="bi bi-exclamation color-dashboard-primary text-24-700" />
                    No Logo
                  </div> */}
                </div>
                <div>
                  <div className="text-17-600 color-dashboard-primary">
                    {beauticianDetails?.businessName}
                  </div>
                  <div className="text-13-500-21 color-blue-60">
                    ID: {beauticianDetails?.uid}
                  </div>
                  <div className="text-13-500-21 color-dashboard-primary mt-2">
                    <img src={icons.mapIcon} alt="location" className="me-2" />
                    <div>{address?.address}</div>
                    <div>{address?.apartment}</div>
                    <div>{address?.city}</div>
                    <div>{address?.zipCode}</div>
                  </div>
                  <div className="d-flex  gap-3 mt-3 text-13-500-21 color-blue-60">
                    <div>
                      <div>Reg date:</div>
                      <div className="bg-dashboard-primary color-white rounded-pill ps-3 pe-3 pt-1 text-center mt-1 text-nowrap">
                        {beauticianDetails?.createdAt &&
                          moment(beauticianDetails?.createdAt).format(
                            "DD-MM-YYYY"
                          )}
                      </div>
                    </div>
                    <div>
                      <div>Status:</div>
                      <div className="bg-success color-white rounded-pill ps-3 pe-3 pt-1 text-center mt-1 text-nowrap">
                        {useDetails?.isActiveBeautician === 1
                          ? "Active"
                          : "Inactive"}
                      </div>
                    </div>

                    {beauticianDetails?.plan && (
                      <div>
                        <div>Sliike Plan</div>
                        <div className="bg-blue color-white rounded-pill ps-3 pe-3 pt-1 text-center mt-1">
                          {beauticianDetails?.plan?.name}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="ps-3 pe-3 border-start border-end">
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <img src={icons.smsIcon} alt="sms" />
                  </span>
                  <span className="text-13-500 color-dashboard-primary">
                    {useDetails?.email}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <span>
                    <img src={icons.callIcon} alt="sms" />
                  </span>
                  <span className="text-13-500 color-dashboard-primary">
                    {useDetails?.phoneNumber}
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center text-center w-25">
                <Button
                  btnText="MORE DETAILS"
                  btnStyle="PLO"
                  className="pointer"
                  onClick={() => {
                    navigate(`/beauticians/details/${params?.id}`);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="card-effect cmt-40 cmb-30 rounded">
            <div className="d-flex justify-content-between align-items-center cps-24 cpt-24 cpb-24 cpe-24">
              <div className="text-20-700 color-dashboard-primary">
                Sales and Financial Reports
              </div>
              <div className="d-flex gap-3">
                <Dropdown
                  placeholder="Year"
                  value={yearText}
                  optionValue="name"
                  options={getMonthList(12).map((o) => {
                    return { ...o, name: o.id };
                  })}
                  onChange={(e) => {
                    let oldData = {
                      ...tableData,
                      chartSDate: moment(e.target.value)
                        .startOf("month")
                        .format("YYYY-MM-DD"),
                      chartEDate: moment(e.target.value)
                        .endOf("month")
                        .format("YYYY-MM-DD"),
                    };
                    setYearText(e.target.value);
                    setTableData(oldData);
                    fetchDashboardData(oldData);
                  }}
                />

                <ReportDownloadButton
                  data={exportData?.data}
                  filename={`Sales and Financial Reports.csv`}
                  btnStyle="PD"
                  iconType="L-Download-White"
                  btnText="DOWNLOAD REPORT"
                  pdfFile={() => {
                    Print();
                  }}
                />
              </div>
            </div>
          </div>
          <div className="card-effect rounded cpt-24 cpb-24 cpe-24 cps-24">
            <BeauticianChartView tableData={tableData} />
          </div>
          <div className="text-17-600 color-dashboard-primary cmt-56 cmb-24">
            Service Sales Summary
          </div>
          <div className="bg-white pt-2">
            <div className="pb-3 d-flex gap-1">
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

              <SearchInput
                id="serviceSummary"
                placeholder="Search clients"
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
            <div className="bg-white pt-2">
              <BeauticianServicePurchaseSummary
                tableData={tableData}
                setTableData={setTableData}
                fetchDashboardData={fetchDashboardData}
              />
            </div>
          </div>
          <div className="text-17-600 color-dashboard-primary cmt-56 cmb-24">
            Product Sales Summary
          </div>
          <div className="bg-white pt-2">
            <div className="pb-3 d-flex gap-1">
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
                        productStartDate: todayDate,
                        productEndDate: todayDate,
                      });
                    },
                  },
                  {
                    text: "Yesterday",
                    onClick: () => {
                      setDateTax("Yesterday");
                      handelFilter({
                        productStartDate: yesterdayDate,
                        productEndDate: yesterdayDate,
                      });
                    },
                  },
                  {
                    text: "Last 7 days",
                    onClick: () => {
                      setDateTax("Last 7 days");
                      handelFilter({
                        productStartDate: lastWeekDate,
                        productEndDate: todayDate,
                      });
                    },
                  },
                  {
                    text: "Last 30 days",
                    onClick: () => {
                      setDateTax("Last 30 days");
                      handelFilter({
                        productStartDate: lastThirtyDayDate,
                        productEndDate: todayDate,
                      });
                    },
                  },
                  {
                    text: "Last 90 days",
                    onClick: () => {
                      setDateTax("Last 90 days");
                      handelFilter({
                        productStartDate: lastNintyDayDate,
                        productEndDate: todayDate,
                      });
                    },
                  },
                  {
                    text: "Last month",
                    onClick: () => {
                      setDateTax("Last month");
                      handelFilter({
                        productStartDate: lastMonthData,
                        productEndDate: todayDate,
                      });
                    },
                  },
                  {
                    text: "Last year",
                    onClick: () => {
                      setDateTax("Last year");
                      handelFilter({
                        productStartDate: lastYearData,
                        productEndDate: todayDate,
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
                      handelFilter({ productProvinceId: _id });
                    },
                  };
                })}
              />
              <MenuOption
                icon={
                  <Button
                    btnText={priceRange}
                    btnStyle="PLO"
                    iconType="R-Filter"
                  />
                }
                option={priceRangeList?.map((o) => {
                  return {
                    text: o?.value,
                    onClick: () => {
                      setPriceRange(o?.value);
                      handelFilter({ minPrice: o?.min, maxPrice: o?.max });
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
                option={productSalesStatus?.map((o) => {
                  return {
                    text: o?.value,
                    onClick: () => {
                      setStatusText(o?.value);
                      handelFilter({ orderStatus: o?.id });
                    },
                  };
                })}
              />

              <SearchInput
                id="productSale"
                placeholder="Search clients"
                value={searchClient}
                onChange={handleSearch}
              />
            </div>
            <div className="bg-white pt-2">
              <BeauticianProductPurchaseSummary
                productSales={productSales}
                setProductSales={setProductSales}
                fetchProductSaleReport={fetchProductSaleReport}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BeauticianDetails;

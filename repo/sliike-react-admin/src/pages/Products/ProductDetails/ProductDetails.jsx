import React from "react";
import { icons, priceRangeList, productSalesStatus } from "utils/constants";
import ProductChartView from "./ProductChartView";
import TotalProducts from "./TotalProducts";
import ProductSalesBarChart from "./ProductSalesBarChart";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { omit } from "lodash";
import { fetchSingleProductDetail, getProvinceList } from "store/globalSlice";
import { useParams } from "react-router-dom";
import { getMonthList, titleCaseString } from "utils/helpers";
import moment from "moment";
import Loader from "components/layouts/Loader";
import SearchInput from "components/form/SearchInput";
import MenuOption from "components/layouts/MenuOption";
import Button from "components/form/Button";
import Dropdown from "components/form/Dropdown";
import ReportDownloadButton from "components/layouts/ReportDownloadButton";
import jsPDF from "jspdf";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const params = useParams();
  const { provinceList, permissionsData } = useSelector((state) => ({
    provinceList: state.global.provinceList,
    permissionsData: state.global.permissionsData,
  }));
  const access = {
    productsMenu: permissionsData?.productSettings?.[0],
  };
  const productPermission = access?.productsMenu;
  const dispatch = useDispatch();
  const [yearText, setYearText] = useState("");
  const [exportData, setExportData] = useState({
    data: [],
    loader: false,
  });
  const [timer, setTimer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState("Price Range");
  const [statusText, setStatusText] = useState("Status");
  const [searchValue, setSearchValue] = useState();
  const [dateTax, setDateTax] = useState("Date");
  const [provinceText, setProvinceText] = useState("Province");
  const [productDetails, setProductDetails] = useState({
    beauticianId: params?.id,
    chartSDate: "",
    chartEDate: "",
    startDate: "",
    serach: "",
    endDate: "",
    provincId: "",
    minPrice: "",
    maxPrice: "",
    orderStatus: "",
    data: [],
    loading: true,
    total: 0,
    limit: 10,
    offset: 0,
    intervalLimit: 10,
  });
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
      flagArray.push(o?.services);
    });

    setExportData((prev) => {
      return {
        ...prev,
        data: flagArray,
        loader: false,
      };
    });
  };
  const getProductDetail = async (obj) => {
    const payload = omit(obj, ["data", "loading", "total"]);
    const response = await dispatch(fetchSingleProductDetail(payload));
    if (response?.status === 200) {
      setProductDetails((prev) => {
        return {
          ...prev,
          data: response,
          total: response?.productCount || 0,
          loading: false,
        };
      });
    }
    exportServiceSales(response?.salesChart);
    setIsLoading(false);
  };

  const initAPI = async () => {
    await dispatch(getProvinceList());
  };
  useEffect(() => {
    initAPI();
    getProductDetail(productDetails);
    setYearText(getMonthList(12)[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelFilter = async ({
    provincId,
    startDate,
    endDate,
    minPrice,
    maxPrice,
    orderStatus,
  }) => {
    let oldData = productDetails;
    oldData = {
      ...oldData,
      provincId: provincId,
      startDate: startDate,
      endDate: endDate,
      minPrice: minPrice,
      maxPrice: maxPrice,
      orderStatus: orderStatus,
    };
    setProductDetails(oldData);
    getProductDetail(oldData);
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
    let time = timer;
    clearTimeout(time);
    time = setTimeout(() => {
      let oldData = { ...productDetails, serach: value, loading: true };
      setProductDetails(oldData);
      getProductDetail(oldData);
    }, 800);
    setTimer(time);
  };

  const beauticianDetail = productDetails?.data?.beauticianData?.[0];
  const barChartData = productDetails?.data?.salesChart;
  const todayDate = moment().format("YYYY-MM-DD");

  const yesterdayDate = moment().subtract(1, "days").format("YYYY-MM-DD");
  const lastWeekDate = moment().subtract(7, "days").format("YYYY-MM-DD");
  const lastThirtyDayDate = moment().subtract(30, "days").format("YYYY-MM-DD");
  const lastNintyDayDate = moment().subtract(90, "days").format("YYYY-MM-DD");
  const lastMonthData = moment().subtract(1, "months").format("YYYY-MM-DD");
  const lastYearData = moment().subtract(1, "years").format("YYYY-MM-DD");

  const doc = new jsPDF();
  const Print = () => {
    doc.autoTable({ html: "#product-pdf-table" });
    const header = exportHeader;
    const row = [exportData?.data];
    doc.autoTable(header, row);
    doc.save("Product Sales Report.pdf");
  };

  return (
    <div className="cmt-24" id="product-detail-container">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="md" />
        </div>
      ) : (
        <div id="product-details-container">
          <div className="card-effect shadow cmb-40">
            <div className="d-flex cps-24 cpt-24 cpb-24 gap-2">
              <div className="d-flex gap-3">
                <div
                  className="bg-blue-5 color-blue-60 text-20-700 d-flex align-items-center justify-content-center"
                  style={{
                    width: "196px",
                    height: "177px",
                    borderRadius: "5px",
                  }}
                >
                  {beauticianDetail?.logo && (
                    <img
                      src={beauticianDetail?.logo}
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
                  )}
                </div>
                <div>
                  <div className="text-17-600 color-dashboard-primary">
                    {titleCaseString(beauticianDetail?.businessName)}
                  </div>
                  <div className="color-blue-60 text-13-500">
                    ID: {beauticianDetail?.uid}
                  </div>
                  <div className="text-13-500-21 color-dashboard-primary mt-2">
                    <img src={icons.mapIcon} alt="location" className="me-2" />
                    {beauticianDetail?.address}
                  </div>
                  <div className="d-flex gap-3 mt-3 text-13-500-21 color-blue-60">
                    <div>
                      <div>Reg date:</div>
                      <div className="bg-dashboard-primary color-white rounded-pill ps-3 pe-3 pt-1 text-center mt-1">
                        {moment(beauticianDetail?.createdAt).format(
                          "DD MMM, YYYY"
                        )}
                      </div>
                    </div>
                    <div>
                      <div>Status:</div>
                      <div className="bg-success color-white rounded-pill ps-3 pe-3 pt-1 text-center mt-1">
                        {beauticianDetail?.status === 1 ? "Active" : "Inactive"}
                      </div>
                    </div>
                    {/* <div>
                  <div>Sliike Plan:</div>
                  <div className="bg-blue color-white rounded-pill ps-3 pe-3 pt-1 text-center mt-1">
                    Sliike Pro
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
                    {beauticianDetail?.email}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <span>
                    <img src={icons.callIcon} alt="sms" />
                  </span>
                  <span className="text-13-500 color-dashboard-primary">
                    {beauticianDetail?.phoneNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-effect rounded cpt-24 cpb-24 cpe-24 cps-24 cmb-24">
            <ProductChartView productDetails={productDetails} />
          </div>

          <div className="text-17-600 color-dashboard-primary cmt-56 cmb-24">
            Product Sales Summary{" "}
            <span className="text-13-500">
              (Total Sales: {productDetails?.data?.productCount})
            </span>
          </div>
          <div className="bg-white pt-2">
            <div className="pb-3 d-flex gap-3">
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
                      handelFilter({ provincId: _id });
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
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
            <div className="bg-white pt-2">
              <TotalProducts
                productDetails={productDetails}
                setProductDetails={setProductDetails}
                getProductDetail={getProductDetail}
              />
            </div>
          </div>
          {/* <div className="card-effect rounded spt-24 cpb-24 cpe-24 cps-24 cmb-24"></div> */}

          <div className="card-effect rounded cpb-24 cpe-24 cps-24 cmt-70">
            <div className="d-flex justify-content-between cmb-20">
              <div className="text-20-700 color-dashboard-primary">
                Product Sales Bar Chart
              </div>
              <div className="d-flex gap-3">
                <Dropdown
                  placeholder="Year"
                  value={yearText}
                  options={getMonthList(12).map((o) => {
                    return { ...o, name: o.id };
                  })}
                  optionValue="name"
                  onChange={(e) => {
                    let oldData = {
                      ...productDetails,
                      chartSDate: moment(e.target.value)
                        .startOf("month")
                        .format("DD-MM-YYYY"),
                      chartEDate: moment(e.target.value)
                        .endOf("month")
                        .format("DD-MM-YYYY"),
                      loading: true,
                    };
                    setYearText(e.target.value);
                    setProductDetails(oldData);
                    getProductDetail(oldData);
                  }}
                />
                {productPermission?.viewAndDownload && (
                  <ReportDownloadButton
                    btnStyle="PD"
                    btnText="DOWNLOAD REPORT"
                    iconType="L-Download-White"
                    data={[exportData?.data]}
                    headers={exportHeader}
                    filename={`Product Sales Report.csv`}
                    pdfFile={() => {
                      Print();
                    }}
                  />
                )}
              </div>
            </div>
            <ProductSalesBarChart
              barChartData={barChartData}
              productDetails={productDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

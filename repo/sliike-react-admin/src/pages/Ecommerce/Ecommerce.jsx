import Button from "components/form/Button";
import Dropdown from "components/form/Dropdown";
import ReportDownloadButton from "components/layouts/ReportDownloadButton";
import React, { useEffect, useState } from "react";
import { icons } from "utils/constants";
import { getMonthList, objectToQueryParams } from "utils/helpers";
import ListViewOverview from "./ListViewOverview";
import { useDispatch } from "react-redux";
import moment from "moment";
import { omit } from "lodash";
import { getECommerceDashboard } from "store/globalSlice";
import Loader from "components/layouts/Loader";
import jsPDF from "jspdf";
import "./Ecommerce.scss";

const Ecommerce = () => {
  const [yearText, setYearText] = useState("");
  const dispatch = useDispatch();
  const [exportData, setExportData] = useState({ data: [], loader: false });
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    // startDate: "1-05-2023",
    // endDate: "30-09-2023",
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
    loading: true,
    data: [],
  });

  const exportDashboardData = async (returnData) => {
    const beautyProductTransactions = returnData?.productTransction?.[0];
    const numberOfBusiness = returnData?.numberOfBusiness;
    const numberOfPosted = returnData?.numberOfProductsPosted;
    const numberOfProductSold = returnData?.numberOfproductSold;
    const productsShipped = returnData?.numberOfproductShipped;
    const gender = returnData?.Gender?.[0];
    const age = returnData?.ageRange;
    const province = returnData?.provinceData;
    const totalSumOfBusiness = numberOfBusiness?.reduce(
      (accumulator, currentItem) => accumulator + currentItem?.business,
      0
    );
    const totalSumOfProduct = numberOfPosted?.reduce(
      (accumulator, currentItem) => accumulator + currentItem?.productsPosted,
      0
    );
    const totalSumOfProductSold = numberOfProductSold?.reduce(
      (accumulator, currentItem) => accumulator + currentItem?.totalPruchase,
      0
    );
    const totalSumOfProductShipped = productsShipped?.reduce(
      (accumulator, currentItem) => accumulator + currentItem?.totalShipped,
      0
    );

    const businessKey = [];
    const businessValue = [];
    numberOfBusiness?.forEach((o) => {
      businessKey.push(o?.productCategoryName);
      businessValue?.push(o?.business);
    });

    const pPostedKey = [];
    const pPostedValue = [];
    numberOfPosted?.forEach((o) => {
      pPostedKey.push(o?.productCategoryName);
      pPostedValue?.push(o?.productsPosted);
    });

    const pSoldKey = [];
    const pSoldValue = [];
    numberOfProductSold?.forEach((o) => {
      pSoldKey.push(o?.productCategoryName);
      pSoldValue?.push(o?.totalPruchase);
    });
    const pShippedKey = [];
    const pShippedValue = [];
    productsShipped?.forEach((o) => {
      pShippedKey.push(o?.productCategoryName);
      pShippedValue?.push(o?.totalShipped);
    });

    let tempAge = [];
    let tempAgeCount = [];
    age?.forEach((o) => {
      if (o?._id !== "Unknown") {
        tempAge.push(o?._id);
        tempAgeCount.push(o?.count);
      }
    });

    let tempProvince = [];
    let tempProvinceCount = [];

    province?.forEach((o) => {
      tempProvince.push(o?.name);
      tempProvinceCount.push(o?.count);
    });
    const csvData = [
      ["Beauty Product Transactions"],
      [
        "Total HST/GST",
        "Total PST/QST",
        "Total Platform fee earned",
        "Total Platform fee HST/GST",
        "Total Platform fee PST/QST",
        "Total Subscription fee",
        "Total Services Transactions",
      ],
      [
        beautyProductTransactions?.totalGSTORHST?.toFixed(2) || 0.0,
        beautyProductTransactions?.totalPSTORQST?.toFixed(2) || 0.0,
        beautyProductTransactions?.totalSliikRevenue?.toFixed(2) || 0.0,
        beautyProductTransactions?.totalsliikFeeGST?.toFixed(2) || 0.0,
        beautyProductTransactions?.totalsliikFeePST?.toFixed(2) || 0.0,
        beautyProductTransactions?.totalSliikFees?.toFixed(2) || 0.0,
        beautyProductTransactions?.totalSubTotal?.toFixed(2) || 0.0,
      ],
      [],
      ["Number of E-Commerce Businesses"],
      [...businessKey, "Total Number of businesses"],
      [...businessValue, totalSumOfBusiness],
      [],
      ["Number of Products Posted"],
      [...pPostedKey, "Total Number of businesses"],
      [...pPostedValue, totalSumOfProduct],
      [],
      ["Number of Products Sold"],
      [...pSoldKey, "Total Number of businesses"],
      [...pSoldValue, totalSumOfProductSold],
      [],
      ["Number of Products Shipped"],
      [...pShippedKey, "Total Number of businesses"],
      [...pShippedValue, totalSumOfProductShipped],
      [],
      ["Gender"],
      ["Female", "Male", "Transgender", "Others"],
      [
        gender?.Female || 0,
        gender?.Male || 0,
        gender?.Transgender || 0,
        gender?.Other || 0,
      ],
      [],
      ["Age Range"],
      tempAge,
      tempAgeCount,
      [],
      ["Province"],
      tempProvince,
      tempProvinceCount,
    ];
    setExportData((prev) => {
      return {
        ...prev,
        data: csvData,
        loader: false,
      };
    });
  };

  const fetchECommerceDashboard = async (obj) => {
    const queryParams = objectToQueryParams(omit(obj, ["data", "loading"]));
    const response = await dispatch(getECommerceDashboard(queryParams));
    if (response?.status === 200) {
      setDashboardData((prev) => {
        return {
          ...prev,
          data: response,
          loading: false,
        };
      });
    }
    setIsLoading(false);
    exportDashboardData(response);
  };

  useEffect(() => {
    fetchECommerceDashboard(dashboardData);
    setYearText(getMonthList(12)[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const beautyProductTransactions = dashboardData?.data?.productTransction?.[0];
  const numberOfBusiness = dashboardData?.data?.numberOfBusiness;
  const numberOfPosted = dashboardData?.data?.numberOfProductsPosted;
  const numberOfProductSold = dashboardData?.data?.numberOfproductSold;
  const productsShipped = dashboardData?.data?.numberOfproductShipped;
  const gender = dashboardData?.data?.Gender?.[0];
  const age = dashboardData?.data?.ageRange;
  const province = dashboardData?.data?.provinceData;
  const totalSumOfBusiness = numberOfBusiness?.reduce(
    (accumulator, currentItem) => accumulator + currentItem?.business,
    0
  );
  const totalSumOfProduct = numberOfPosted?.reduce(
    (accumulator, currentItem) => accumulator + currentItem?.productsPosted,
    0
  );
  const totalSumOfProductSold = numberOfProductSold?.reduce(
    (accumulator, currentItem) => accumulator + currentItem?.totalPruchase,
    0
  );
  const totalSumOfProductShipped = productsShipped?.reduce(
    (accumulator, currentItem) => accumulator + currentItem?.totalShipped,
    0
  );
  let dashboardArray = [
    {
      key: "Financial Summary",
      value: [
        {
          key: "Beauty Product Transactions",
          total: beautyProductTransactions?.totalSubTotal.toFixed(2) || 0.0,
          sign: "$",
          title: "Total Transactions",

          value: [
            {
              key: "Total HST/GST",
              value: beautyProductTransactions?.totalGSTORHST.toFixed(2) || 0.0,
              sign: "$",
              color: "#132C4E",
            },
            {
              key: "Total PST/QST",
              value: beautyProductTransactions?.totalPSTORQST.toFixed(2) || 0.0,
              sign: "$",
              color: "#1571ED",
            },
            {
              key: "Total Platform fee earned",
              value:
                beautyProductTransactions?.totalProductRevenue.toFixed(2) ||
                0.0,
              sign: "$",
              color: "#F2994A",
            },
            {
              key: "Total Platform fee HST/GST",
              value:
                beautyProductTransactions?.totalsliikFeeGST.toFixed(2) || 0.0,
              sign: "$",
              color: "#9747FF",
            },
            {
              key: "Total Platform fee PST/QST",
              value:
                beautyProductTransactions?.totalsliikFeePST.toFixed(2) || 0.0,
              sign: "$",
              color: "#FFD059",
            },
            {
              key: "Total Subscription fee",
              value:
                beautyProductTransactions?.totalSliikFees.toFixed(2) || 0.0,
              sign: "$",
              color: "#411F00",
            },
          ],
        },
      ],
    },
    {
      key: "Business Unit Overviews",
      value: [
        {
          key: "Number of E-Commerce Businesses",
          total: totalSumOfBusiness || 0.0,
          title: "Total Number of businesses",
          value: [],
          // value: [
          //   {
          //     key: "Haircare",
          //     value: "150",
          //   },
          //   {
          //     key: "Nail Services",
          //     value: "150",
          //   },
          //   {
          //     key: "Make-up",
          //     value: "150",
          //   },
          //   {
          //     key: "Barbers",
          //     value: "150",
          //   },
          //   {
          //     key: "Facial/Skincare",
          //     value: "150",
          //   },
          //   {
          //     key: "Massage",
          //     value: "150",
          //   },
          //   {
          //     key: "SPA",
          //     value: "150",
          //   },
          //   {
          //     key: "Tattoo Art",
          //     value: "150",
          //   },
          //   {
          //     key: "Photography",
          //     value: "150",
          //   },
          //   {
          //     key: "Beauty Product Shop",
          //     value: "150",
          //   },
          //   {
          //     key: "Beauty Consultant",
          //     value: "150",
          //   },
          // ],
        },
        {
          key: "Number of Products Posted",
          total: totalSumOfProduct || 0.0,
          title: "Total Number of businesses",
          value: [],
          // value: [
          //   {
          //     key: "Haircare",
          //     value: "150",
          //   },
          //   {
          //     key: "Nail Services",
          //     value: "150",
          //   },
          //   {
          //     key: "Make-up",
          //     value: "150",
          //   },
          //   {
          //     key: "Barbers",
          //     value: "150",
          //   },
          //   {
          //     key: "Facial/Skincare",
          //     value: "150",
          //   },
          //   {
          //     key: "Massage",
          //     value: "150",
          //   },
          //   {
          //     key: "SPA",
          //     value: "150",
          //   },
          //   {
          //     key: "Tattoo Art",
          //     value: "150",
          //   },
          //   {
          //     key: "Photography",
          //     value: "150",
          //   },
          //   {
          //     key: "Beauty Product Shop",
          //     value: "150",
          //   },
          //   {
          //     key: "Beauty Consultant",
          //     value: "150",
          //   },
          // ],
        },
        {
          key: "Number of Products Sold",
          total: totalSumOfProductSold || 0.0,
          title: "Total Number of businesses",
          value: [],
          // value: [
          //   {
          //     key: "Haircare",
          //     value: "150",
          //   },
          //   {
          //     key: "Nail Services",
          //     value: "150",
          //   },
          //   {
          //     key: "Make-up",
          //     value: "150",
          //   },
          //   {
          //     key: "Barbers",
          //     value: "150",
          //   },
          //   {
          //     key: "Facial/Skincare",
          //     value: "150",
          //   },
          //   {
          //     key: "Massage",
          //     value: "150",
          //   },
          //   {
          //     key: "SPA",
          //     value: "150",
          //   },
          //   {
          //     key: "Tattoo Art",
          //     value: "150",
          //   },
          //   {
          //     key: "Photography",
          //     value: "150",
          //   },
          //   {
          //     key: "Beauty Product Shop",
          //     value: "150",
          //   },
          //   {
          //     key: "Beauty Consultant",
          //     value: "150",
          //   },
          // ],
        },
        {
          key: "Number of Products Shipped",
          total: totalSumOfProductShipped || 0.0,
          title: "Total Number of businesses",
          value: [],
          // value: [
          //   {
          //     key: "Haircare",
          //     value: "150",
          //   },
          //   {
          //     key: "Nail Services",
          //     value: "150",
          //   },
          //   {
          //     key: "Make-up",
          //     value: "150",
          //   },
          //   {
          //     key: "Barbers",
          //     value: "150",
          //   },
          //   {
          //     key: "Facial/Skincare",
          //     value: "150",
          //   },
          //   {
          //     key: "Massage",
          //     value: "150",
          //   },
          //   {
          //     key: "SPA",
          //     value: "150",
          //   },
          //   {
          //     key: "Tattoo Art",
          //     value: "150",
          //   },
          //   {
          //     key: "Photography",
          //     value: "150",
          //   },
          //   {
          //     key: "Beauty Product Shop",
          //     value: "150",
          //   },
          //   {
          //     key: "Beauty Consultant",
          //     value: "150",
          //   },
          // ],
        },
      ],
    },
    {
      key: "Total Number of Customers By:",
      value: [
        {
          key: "Gender",
          value: [
            {
              key: "Female",
              value: gender?.female || 0.0,
              color: "#F2994A",
            },
            {
              key: "Male",
              value: gender?.Male || 0.0,
              color: "#132C4E",
            },
            {
              key: "Trangender",
              value: gender?.Transgender || 0.0,
              color: "#1571ED",
            },
            {
              key: "Others",
              value: gender?.Other || 0.0,
              color: "#FFD059",
            },
          ],
        },
        {
          key: "Demography",
          value: [
            {
              key: "Blacks",
              value: "2000",
              color: "#F2994A",
            },
            {
              key: "Hispanic/Latino",
              value: "1200",
              color: "#FFD059",
            },
            {
              key: "Asian",
              value: "800",
              color: "#132C4E",
            },
            {
              key: "Indigenous (North America)",
              value: "250",
              color: "#1571ED",
            },
            {
              key: "White or Caucasian",
              value: "240",
              color: "#9747FF",
            },
            {
              key: "Mixed Race",
              value: "255",
              color: "#FF481A",
            },
            {
              key: "Others",
              value: "280",
              color: "#411F00",
            },
          ],
        },
        {
          key: "Age Range",
          value: [
            {
              key: "Less than 18",
              value: 0,
              color: "#FFD059",
            },
            {
              key: "18 - 25",
              value: 0,
              color: "#F2994A",
            },
            {
              key: "26 - 30",
              value: 0,
              color: "#132C4E",
            },
            {
              key: "31 - 40",
              value: 0,
              color: "#1571ED",
            },
            {
              key: "41 - 50",
              value: 0,
              color: "#411F00",
            },
            {
              key: "50+",
              value: 0,
              color: "#9747FF",
            },
          ],
        },
        {
          key: "Province",
          value: [],
          // value: [
          //   {
          //     key: "British Columbia",
          //     value: "2000",
          //   },
          //   {
          //     key: "Alberta",
          //     value: "2000",
          //   },
          //   {
          //     key: "Saskatchewan",
          //     value: "2000",
          //   },
          //   {
          //     key: "Manitoba",
          //     value: "2000",
          //   },
          //   {
          //     key: "Ontario",
          //     value: "2000",
          //   },
          //   {
          //     key: "Quebec",
          //     value: "2000",
          //   },
          //   {
          //     key: "New Brunswick",
          //     value: "2000",
          //   },
          //   {
          //     key: "Nova Scotia",
          //     value: "2000",
          //   },
          //   {
          //     key: "Prince Edward Island",
          //     value: "2000",
          //   },
          //   {
          //     key: "Newfoundland and Labrador",
          //     value: "2000",
          //   },
          // ],
        },
      ],
    },
  ];

  dashboardArray[1]?.value?.forEach((e) => {
    if (e?.key === "Number of E-Commerce Businesses") {
      numberOfBusiness?.forEach((elem) => {
        e?.value?.push({
          key: elem?.productCategoryName,
          value: elem?.business,
        });
      });
    }
    if (e?.key === "Number of Products Posted") {
      numberOfPosted?.forEach((elem) => {
        e?.value?.push({
          key: elem?.productCategoryName,
          value: elem?.productsPosted,
        });
      });
    }
    if (e?.key === "Number of Products Sold") {
      numberOfProductSold?.forEach((elem) => {
        e?.value?.push({
          key: elem?.productCategoryName,
          value: elem?.totalPruchase,
        });
      });
    }
    if (e?.key === "Number of Products Shipped") {
      productsShipped?.forEach((elem) => {
        e?.value?.push({
          key: elem?.productCategoryName,
          value: elem?.totalShipped,
        });
      });
    }
  });
  dashboardArray[2].value.forEach((ageElem) => {
    if (ageElem?.key === "Age Range") {
      ageElem?.value?.forEach((element) => {
        age?.forEach((ageRangeElem) => {
          if (ageRangeElem?._id === element?.key) {
            element.value = ageRangeElem?.count;
          }
        });
      });
    }

    if (ageElem?.key === "Province") {
      province?.forEach((pElem) => {
        ageElem?.value?.push({
          key: pElem?.name,
          value: pElem?.count,
        });
      });
    }
  });

  const doc = new jsPDF("landscape");
  const Print = () => {
    doc.autoTable({ html: "#eCommerce-dashboard-table" });
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
        8: {
          columnWidth: 25,
        },
        9: {
          columnWidth: 25,
        },
        11: {
          columnWidth: 25,
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
    doc.save("eCommerce Dashboard.pdf");
  };
  return (
    <div className="ecommerce-overview-container">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="md" />
        </div>
      ) : (
        <>
          <div className="cardlist-header gap-3 cps-24 cpt-26 cpb-25 cpe-24 cmb-24">
            <div className="d-flex">
              <Button
                btnText="Chart View"
                btnStyle="PLO"
                leftIcon={<img src={icons.graphIcon} alt="icon" />}
              />
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
                    ...dashboardData,
                    startDate: moment(e.target.value)
                      .startOf("month")
                      .format("DD-MM-YYYY"),
                    endDate: moment(e.target.value)
                      .endOf("month")
                      .format("DD-MM-YYYY"),
                    loading: true,
                  };
                  setYearText(e.target.value);
                  setDashboardData(oldData);
                  fetchECommerceDashboard(oldData);
                }}
              />

              <ReportDownloadButton
                btnStyle="PD"
                btnText="DOWNLOAD REPORT"
                iconType="L-Download-White"
                data={exportData?.data}
                filename={`eCommerce Dashboard.csv`}
                pdfFile={() => {
                  Print();
                }}
              />
            </div>
          </div>

          <ListViewOverview dashboardArray={dashboardArray} />
        </>
      )}
    </div>
  );
};

export default Ecommerce;

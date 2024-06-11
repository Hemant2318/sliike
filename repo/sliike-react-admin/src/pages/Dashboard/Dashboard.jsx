import { useEffect, useState } from "react";
import { icons } from "utils/constants";
import CardList from "./CardList";
import CardPieChart from "./CardPieChart/CardPieChart";
import Button from "components/form/Button";
import { useDispatch, useSelector } from "react-redux";
import { getdashboardData } from "store/globalSlice";
import Loader from "components/layouts/Loader/Loader";
import Dropdown from "components/form/Dropdown/Dropdown";
import { getMonthList, objectToQueryParams } from "utils/helpers";
import ReportDownloadButton from "components/layouts/ReportDownloadButton/ReportDownloadButton";
import moment from "moment";
import { omit } from "lodash";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCardList, setIsCardList] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setCardData] = useState({
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
    data: [],
    loading: true,
  });
  const [exportData, setExportData] = useState({ data: [], loader: false });
  const [yearText, setYearText] = useState("");
  const { permissionsData } = useSelector((state) => ({
    permissionsData: state.global.permissionsData,
  }));
  const access = {
    dashboardMenu: permissionsData?.dashboardSettings?.[0],
  };

  const dashboardPermission = access?.dashboardMenu;

  const exportDashboardData = async (returnData) => {
    // console.log("return data", returnData);
    const serviceData = returnData?.serviceTransction?.[0];
    const productData = returnData?.productTransction?.[0];

    const totalBusiness = returnData?.numberOfBusiness;
    let tempServicesCate = [];
    let tempServicesCateValue = [];
    totalBusiness?.forEach((o) => {
      tempServicesCate.push(o.serviceCategoryName);
      tempServicesCateValue.push(o.services);
    });

    const totalBusinessProduct = returnData?.numberOfProducts;
    let tempProductCategories = [];
    let tempProductCategoriesValue = [];
    totalBusinessProduct?.forEach((p) => {
      tempProductCategories.push(p?.productCategoryName);
      tempProductCategoriesValue?.push(p?.productSales);
    });

    const gender = returnData?.Gender?.[0];
    const provinceDetails = returnData?.provinceData;
    const ageData = returnData?.ageRange;
    let tempProvince = [];
    let tempProvinceCount = [];

    provinceDetails?.forEach((o) => {
      tempProvince.push(o.name);
      tempProvinceCount.push(o.count);
    });

    let tempAge = [];
    let tempAgeCount = [];
    ageData?.forEach((o) => {
      if (o?._id !== "Unknown") {
        tempAge.push(o?._id);
        tempAgeCount.push(o?.count);
      }
    });
    const csvData = [
      // ["Financial Summary"],
      ["Services Transactions"],
      [
        "Total HST/GST",
        "Total PST/QST",
        // "Total Platform fee earned",
        // "Total Platform fee HST/GST",
        // "Total Platform fee PST/QST",
        "Total Subscription fee",
        // "Total Services Transactions",
      ],
      [
        serviceData?.totalGSTORHST.toFixed(2) || 0.0,
        serviceData?.totalPSTORQST.toFixed(2) || 0.0,
        // serviceData?.totalSliikRevenue.toFixed(2) || 0.0,
        // serviceData?.totalsliikFeeGST.toFixed(2) || 0.0,
        // serviceData?.totalsliikFeePST.toFixed(2) || 0.0,
        0.0,
        // serviceData?.totalSubTotal.toFixed(2) || 0.0,
      ],
      [],
      ["Product Transactions"],
      [
        "Total HST/GST",
        "Total PST/QST",
        // "Total Platform fee earned",
        // "Total Platform fee HST/GST",
        // "Total Platform fee PST/QST",
        "Total Subscription fee",
        // "Shipping cost",
        // "Total Services Transactions",
      ],
      [
        productData?.totalGSTORHST.toFixed(2) || 0.0,
        productData?.totalPSTORQST.toFixed(2) || 0.0,
        // productData?.totalProductRevenue.toFixed(2) || 0.0,
        // productData?.totalsliikFeeGST.toFixed(2) || 0.0,
        // productData?.totalsliikFeePST.toFixed(2) || 0.0,
        0,
        // 0,
        // productData?.totalSubTotal.toFixed(2) || 0.0,
      ],
      [],
      // ["Total Number of Businesses"],
      ["Total Businesses (Services)"],
      [...tempServicesCate, "Total Number of businesses"],
      [...tempServicesCateValue, returnData?.totalNumberofBusiness],
      [],
      ["Total Businesses (Products)"],
      [...tempProductCategories, "Total Number of businesses"],
      [...tempProductCategoriesValue, returnData?.totalNumberofProductSales],
      [],
      // ["Total Number of Customers By"],
      ["Gender"],
      ["Female", "Male", "Transgender", "Others"],
      [
        gender?.Female || 0,
        gender?.Male || 0,
        gender?.Transgender || 0,
        gender?.Other || 0,
      ],
      [],
      ["Province"],
      tempProvince,
      tempProvinceCount,
      [],
      ["Age Range"],
      tempAge,
      tempAgeCount,
    ];
    setExportData((prev) => {
      return {
        ...prev,
        data: csvData,
        loader: false,
      };
    });
  };

  const fetchData = async (obj) => {
    const queryParams = objectToQueryParams(omit(obj, ["data", "loading"]));
    const response = await dispatch(getdashboardData(queryParams));

    if (response?.status === 200) {
      setCardData((prev) => {
        return {
          ...prev,
          data: response,
          loading: false,
        };
      });
      setIsLoading(false);
    }
    exportDashboardData(response);
  };
  useEffect(() => {
    if (dashboardPermission?.falsecount !== 3) {
      fetchData(cardData);
      setYearText(getMonthList(12)[0].id);
    } else {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const storeData = cardData?.data;
  const sTransactionData = cardData?.data?.serviceTransction?.[0];
  const pTransactionData = cardData?.data?.productTransction?.[0];
  const numberBusiness = cardData?.data?.numberOfBusiness;
  const numberProducts = cardData?.data?.numberOfProducts;

  const totalNoOfBusiness = cardData?.data?.totalNumberofBusiness;
  const totalNoOfProduct = cardData?.data?.totalNumberofProductSales;

  const genderData = cardData?.data?.Gender?.[0];
  const provinceData = cardData?.data?.provinceData;
  const agerangeData = cardData?.data?.ageRange;
  // console.log("numberProducts", numberProducts);

  // const [tempArray, setTempArray] = useState([
  //   {
  //     key: "Financial Summary",
  //     value: [
  //       {
  //         key: "Services Transactions:",
  //         total: sTransactionData?.totalSubTotal,
  //         sign: "$",
  //         title: "Total Services Transactions",

  //         value: [
  //           {
  //             key: "Total HST/GST:",
  //             value: sTransactionData?.totalGSTORHST,
  //             sign: "$",
  //             color: "#132C4E",
  //           },
  //           {
  //             key: "Total PST/QST:",
  //             value: sTransactionData?.totalPSTORQST,
  //             sign: "$",
  //             color: "#1571ED",
  //           },
  //           {
  //             key: "Total Platform fee earned:",
  //             value: sTransactionData?.totalSliikRevenue,
  //             sign: "$",
  //             color: "#F2994A",
  //           },
  //           {
  //             key: "Total Platform fee HST/GST:",
  //             value: sTransactionData?.totalsliikFeeGST,
  //             sign: "$",
  //             color: "#9747FF",
  //           },
  //           {
  //             key: "Total Platform fee PST/QST:",
  //             value: sTransactionData?.totalsliikFeePST,
  //             sign: "$",
  //             color: "#FFD059",
  //           },
  //           {
  //             key: "Total Subscription fee:",
  //             value: 0,
  //             sign: "$",
  //             color: "#411F00",
  //           },
  //         ],
  //       },
  //       // {
  //       //   key: "Product Transactions",
  //       //   total: "1000",
  //       //   sign: "$",
  //       //   title: "Total Services Transactions:",
  //       //   value: [
  //       //     {
  //       //       key: "Total HST/GST:",
  //       //       value: "150",
  //       //       sign: "$",
  //       //       color: "#132C4E",
  //       //     },
  //       //     {
  //       //       key: "Total PST/QST:",
  //       //       value: "100",
  //       //       sign: "$",
  //       //       color: "#1571ED",
  //       //     },
  //       //     {
  //       //       key: "Total Platform fee earned:",
  //       //       value: "200",
  //       //       sign: "$",
  //       //       color: "#F2994A",
  //       //     },
  //       //     {
  //       //       key: "Total Platform fee HST/GST:",
  //       //       value: "20",
  //       //       sign: "$",
  //       //       color: "#9747FF",
  //       //     },
  //       //     {
  //       //       key: "Total Platform fee PST/QST:",
  //       //       value: "5",
  //       //       sign: "$",
  //       //       color: "#FFD059",
  //       //     },
  //       //     {
  //       //       key: "Total Subscription fee:",
  //       //       value: "80",
  //       //       sign: "$",
  //       //       color: "#411F00",
  //       //     },
  //       //     {
  //       //       key: "Shipping cost:",
  //       //       value: "55",
  //       //       sign: "$",
  //       //       color: "#FF481A",
  //       //     },
  //       //   ],
  //       // },
  //       // {
  //       //   key: "Brand Media Revenue",
  //       //   total: "1000",
  //       //   sign: "$",
  //       //   title: "Total Sales:",

  //       //   value: [
  //       //     {
  //       //       key: "Total HST/GST:",
  //       //       value: "150",
  //       //       sign: "$",
  //       //       color: "#FFD059",
  //       //     },
  //       //     {
  //       //       key: "Total PST/QST:",
  //       //       value: "100",
  //       //       sign: "$",
  //       //       color: "#1571ED",
  //       //     },
  //       //   ],
  //       // },
  //     ],
  //   },
  //   {
  //     key: "Total Number of Businesses",
  //     value: [
  //       {
  //         key: "Total Businesses (Services)",
  //         total: "714",
  //         title: "Total Number of businesses:",
  //         // color: [
  //         //   "#1571ED",
  //         //   "#718095",
  //         //   "#FF481A",
  //         //   "#9747FF",
  //         //   "$411F00",
  //         //   "#00A5D9",
  //         //   "#219653",
  //         //   "#1571ED",
  //         //   "#F2994A",
  //         //   "#FFD059",
  //         //   "#C018A5",
  //         // ],

  //         value: [
  //           {
  //             key: "Haircare:",
  //             value: "150",
  //             // color: "#1571ED",
  //           },
  //           {
  //             key: "Nail Services:",
  //             value: "50",
  //             // color: "#718095",
  //           },
  //           {
  //             key: "Make-Up:",
  //             value: "80",
  //             // color: "#FF481A",
  //           },
  //           {
  //             key: "Barbers:",
  //             value: "180",
  //             // color: "#9747FF",
  //           },
  //           {
  //             key: "Facial/Skincare:",
  //             value: "40",
  //             // color: "#411F00",
  //           },
  //           {
  //             key: "Massage:",
  //             value: "55",
  //             // color: "#00A5D9",
  //           },
  //           {
  //             key: "SPA:",
  //             value: "35",
  //             // color: "#219653",
  //           },
  //           {
  //             key: "Tattoo Art:",
  //             value: "27",
  //             // color: "#1571ED",
  //           },
  //           {
  //             key: "Photography:",
  //             value: "15",
  //             // color: "#F2994A",
  //           },
  //           {
  //             key: "Beauty Product Shop:",
  //             value: "42",
  //             // color: "#FFD059",
  //           },
  //           {
  //             key: "Beauty Consultant:",
  //             value: "40",
  //             // color: "#C018A5",
  //           },
  //         ],
  //       },
  //       // {
  //       //   key: "Total Businesses (Products)",
  //       //   total: "714",
  //       //   title: "Total Number of businesses:",
  //       //   value: [
  //       //     {
  //       //       key: "Haircare:",
  //       //       value: "150",
  //       //       color: "#1571ED",
  //       //     },
  //       //     {
  //       //       key: "Nail Services:",
  //       //       value: "50",
  //       //       color: "#718095",
  //       //     },
  //       //     {
  //       //       key: "Make-Up:",
  //       //       value: "80",
  //       //       color: "#FF481A",
  //       //     },
  //       //     {
  //       //       key: "Barbers:",
  //       //       value: "180",
  //       //       color: "#9747FF",
  //       //     },
  //       //     {
  //       //       key: "Facial/Skincare:",
  //       //       value: "40",
  //       //       color: "#411F00",
  //       //     },
  //       //     {
  //       //       key: "Massage:",
  //       //       value: "55",
  //       //       color: "#00A5D9",
  //       //     },
  //       //     {
  //       //       key: "SPA:",
  //       //       value: "35",
  //       //       color: "#219653",
  //       //     },
  //       //     {
  //       //       key: "Tattoo Art:",
  //       //       value: "27",
  //       //       color: "#1571ED",
  //       //     },
  //       //     {
  //       //       key: "Photography:",
  //       //       value: "15",
  //       //       color: "#F2994A",
  //       //     },
  //       //     {
  //       //       key: "Beauty Product Shop:",
  //       //       value: "42",
  //       //       color: "#FFD059",
  //       //     },
  //       //     {
  //       //       key: "Beauty Consultant:",
  //       //       value: "40",
  //       //       color: "#C018A5",
  //       //     },
  //       //   ],
  //       // },
  //       // {
  //       //   key: "Total Businesses (Brands)",
  //       //   total: "1,035",
  //       //   title: "Total Number of businesses:",
  //       //   value: [
  //       //     {
  //       //       key: "Beauty:",
  //       //       value: "120",
  //       //       color: "#132C4E",
  //       //     },
  //       //     {
  //       //       key: "Lifestyle:",
  //       //       value: "100",
  //       //       color: "#1571ED",
  //       //     },
  //       //     {
  //       //       key: "Fashion:",
  //       //       value: "200",
  //       //       color: "#F2994A",
  //       //     },
  //       //     {
  //       //       key: "Cosmetics:",
  //       //       value: "180",
  //       //       color: "#9747FF",
  //       //     },
  //       //     {
  //       //       key: "Personal care:",
  //       //       value: "350",
  //       //       color: "#FFD059",
  //       //     },
  //       //     {
  //       //       key: "Home Care:",
  //       //       value: "85",
  //       //       color: "#411F00",
  //       //     },
  //       //   ],
  //       // },
  //     ],
  //   },
  //   {
  //     key: "Total Number of Customers By:",
  //     value: [
  //       {
  //         key: "Gender",
  //         value: [
  //           {
  //             key: "Female:",
  //             value: genderData?.Female,
  //             color: "#F2994A",
  //           },
  //           {
  //             key: "Male:",
  //             value: genderData?.Male,
  //             color: "#132C4E",
  //           },
  //           {
  //             key: "Trangender:",
  //             value: genderData?.Transgender,
  //             color: "#1571ED",
  //           },
  //           {
  //             key: "Others:",
  //             value: genderData?.Other,
  //             color: "#FFD059",
  //           },
  //         ],
  //       },
  //       {
  //         key: "Demography",
  //         value: [
  //           {
  //             key: "Blacks:",
  //             value: "2000",
  //             color: "#F2994A",
  //           },
  //           {
  //             key: "Hispanic/Latino:",
  //             value: "1200",
  //             color: "#FFD059",
  //           },
  //           {
  //             key: "Asian:",
  //             value: "800",
  //             color: "#132C4E",
  //           },
  //           {
  //             key: "Indigenous (North America):",
  //             value: "250",
  //             color: "#1571ED",
  //           },
  //           {
  //             key: "White or Caucasian:",
  //             value: "240",
  //             color: "#9747FF",
  //           },
  //           {
  //             key: "Mixed Race:",
  //             value: "255",
  //             color: "#FF481A",
  //           },
  //           {
  //             key: "Others:",
  //             value: "280",
  //             color: "#411F00",
  //           },
  //         ],
  //       },
  //       {
  //         key: "Province",
  //         value: [
  //           {
  //             key: "British Columbia:",
  //             value: "2000",
  //             color: "#1571ED",
  //           },
  //           {
  //             key: "Alberta:",
  //             value: "1200",
  //             color: "#219653",
  //           },
  //           {
  //             key: "Saskatchewan:",
  //             value: "800",
  //             color: "#F2994A",
  //           },
  //           {
  //             key: "Manitoba:",
  //             value: "200",
  //             color: "#FFD059",
  //           },
  //           {
  //             key: "Ontario:",
  //             value: "180",
  //             color: "#411F00",
  //           },
  //           {
  //             key: "Quebec:",
  //             value: "300",
  //             color: "#9747FF",
  //           },
  //           {
  //             key: "New Brunswick:",
  //             value: "400",
  //             color: "#00A5D9",
  //           },
  //           {
  //             key: "Nova Scotia:",
  //             value: "450",
  //             color: "#718095",
  //           },
  //           {
  //             key: "Prince Edward Island:",
  //             value: "600",
  //             color: "#FF481A",
  //           },
  //           {
  //             key: "Newfoundland and Labrador:",
  //             value: "267",
  //             color: "#132C4E",
  //           },
  //         ],
  //       },
  //       //age
  //       {
  //         key: "Age Range",
  //         value: [
  //           {
  //             key: "Less than 18:",
  //             value: "150",
  //             color: "#FFD059",
  //           },
  //           {
  //             key: "18 - 25:",
  //             value: "2000",
  //             color: "#F2994A",
  //           },
  //           {
  //             key: "26 - 30:",
  //             value: "1500",
  //             color: "#132C4E",
  //           },
  //           {
  //             key: "31-40",
  //             value: "1480",
  //             color: "#1571ED",
  //           },
  //           {
  //             key: "41 - 50:",
  //             value: "1280",
  //             color: "#411F00",
  //           },
  //           {
  //             key: "50+:",
  //             value: "1000",
  //             color: "#9747FF",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]);

  let tempArray = [
    {
      key: "Financial Summary",
      value: [
        {
          key: "Services Transactions",
          // total: sTransactionData?.totalSubTotal.toFixed(2) || 0.0,
          // sign: "$",
          // title: "Total Services Transactions",

          value: [
            {
              key: "Total HST/GST",
              value: sTransactionData?.totalGSTORHST.toFixed(2) || 0.0,
              sign: "$",
              color: "#132C4E",
            },
            {
              key: "Total PST/QST",
              value: sTransactionData?.totalPSTORQST.toFixed(2) || 0.0,
              sign: "$",
              color: "#1571ED",
            },
            // {
            //   key: "Total Platform fee earned",
            //   value: sTransactionData?.totalSliikRevenue.toFixed(2) || 0.0,
            //   sign: "$",
            //   color: "#F2994A",
            // },
            // {
            //   key: "Total Platform fee HST/GST",
            //   value: sTransactionData?.totalsliikFeeGST.toFixed(2) || 0.0,
            //   sign: "$",
            //   color: "#9747FF",
            // },
            // {
            //   key: "Total Platform fee PST/QST",
            //   value: sTransactionData?.totalsliikFeePST.toFixed(2) || 0.0,
            //   sign: "$",
            //   color: "#FFD059",
            // },
            {
              key: "Total Subscription fee",
              value: 0,
              sign: "$",
              color: "#411F00",
            },
          ],
        },
        {
          key: "Product Transactions",
          total: pTransactionData?.totalSubTotal.toFixed(2) || 0.0,
          sign: "$",
          title: "Total Transactions:",
          value: [
            {
              key: "Total HST/GST:",
              value: pTransactionData?.totalGSTORHST.toFixed(2) || 0.0,
              sign: "$",
              color: "#132C4E",
            },
            {
              key: "Total PST/QST:",
              value: pTransactionData?.totalPSTORQST.toFixed(2) || 0.0,
              sign: "$",
              color: "#1571ED",
            },
            {
              key: "Total Platform fee earned:",
              value: pTransactionData?.totalProductRevenue.toFixed(2) || 0.0,
              sign: "$",
              color: "#F2994A",
            },
            {
              key: "Total Platform fee HST/GST:",
              value: pTransactionData?.totalsliikFeeGST.toFixed(2) || 0.0,
              sign: "$",
              color: "#9747FF",
            },
            {
              key: "Total Platform fee PST/QST:",
              value: pTransactionData?.totalsliikFeePST.toFixed(2) || 0.0,
              sign: "$",
              color: "#FFD059",
            },
            {
              key: "Total Subscription fee:",
              value: 0,
              sign: "$",
              color: "#411F00",
            },
            {
              key: "Shipping cost:",
              value: 0,
              sign: "$",
              color: "#FF481A",
            },
          ],
        },
        // {
        //   key: "Brand Media Revenue",
        //   total: "1000",
        //   sign: "$",
        //   title: "Total Sales:",

        //   value: [
        //     {
        //       key: "Total HST/GST:",
        //       value: "150",
        //       sign: "$",
        //       color: "#FFD059",
        //     },
        //     {
        //       key: "Total PST/QST:",
        //       value: "100",
        //       sign: "$",
        //       color: "#1571ED",
        //     },
        //   ],
        // },
      ],
    },
    {
      key: "Total Number of Businesses",
      value: [
        {
          key: "Total Businesses (Services)",
          total: totalNoOfBusiness || 0.0,
          title: "Total Number of businesses",
          value: [],
        },
        {
          key: "Total Businesses (Products)",
          total: totalNoOfProduct || 0.0,
          title: "Total Number of businesses",
          value: [],
        },
        // {
        //   key: "Total Businesses (Brands)",
        //   total: "1,035",
        //   title: "Total Number of businesses:",
        //   value: [
        //     {
        //       key: "Beauty:",
        //       value: "120",
        //       color: "#132C4E",
        //     },
        //     {
        //       key: "Lifestyle:",
        //       value: "100",
        //       color: "#1571ED",
        //     },
        //     {
        //       key: "Fashion:",
        //       value: "200",
        //       color: "#F2994A",
        //     },
        //     {
        //       key: "Cosmetics:",
        //       value: "180",
        //       color: "#9747FF",
        //     },
        //     {
        //       key: "Personal care:",
        //       value: "350",
        //       color: "#FFD059",
        //     },
        //     {
        //       key: "Home Care:",
        //       value: "85",
        //       color: "#411F00",
        //     },
        //   ],
        // },
      ],
    },
    {
      key: "Total Number of Customers By",
      value: [
        {
          key: "Gender",
          value: [
            {
              key: "Female",
              value: genderData?.Female || 0.0,
              color: "#F2994A",
            },
            {
              key: "Male",
              value: genderData?.Male || 0.0,
              color: "#132C4E",
            },
            {
              key: "Trangender",
              value: genderData?.Transgender || 0.0,
              color: "#1571ED",
            },
            {
              key: "Others",
              value: genderData?.Other || 0.0,
              color: "#FFD059",
            },
          ],
        },
        // {
        //   key: "Demography",
        //   value: [
        //     {
        //       key: "Blacks",
        //       value: "2000",
        //       color: "#F2994A",
        //     },
        //     {
        //       key: "Hispanic/Latino",
        //       value: "1200",
        //       color: "#FFD059",
        //     },
        //     {
        //       key: "Asian",
        //       value: "800",
        //       color: "#132C4E",
        //     },
        //     {
        //       key: "Indigenous (North America)",
        //       value: "250",
        //       color: "#1571ED",
        //     },
        //     {
        //       key: "White or Caucasian",
        //       value: "240",
        //       color: "#9747FF",
        //     },
        //     {
        //       key: "Mixed Race",
        //       value: "255",
        //       color: "#FF481A",
        //     },
        //     {
        //       key: "Others",
        //       value: "280",
        //       color: "#411F00",
        //     },
        //   ],
        // },
        {
          key: "Province",
          value: [],
        },
        //age
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
      ],
    },
  ];

  tempArray[1]?.value?.forEach((e) => {
    if (e?.key === "Total Businesses (Services)") {
      numberBusiness?.forEach((elemVal) => {
        e?.value?.push({
          key: elemVal?.serviceCategoryName,
          value: elemVal?.services,
          color: elemVal?.colorCode,
        });
      });
    }
    if (e?.key === "Total Businesses (Products)") {
      numberProducts?.forEach((pVal) => {
        e?.value?.push({
          key: pVal?.productCategoryName,
          value: pVal?.productSales,
          color: pVal?.colorCode,
        });
      });
    }
  });

  tempArray[2]?.value?.forEach((pElem) => {
    if (pElem.key === "Province") {
      provinceData?.forEach((pEle) => {
        pElem?.value?.push({
          key: pEle?.name,
          value: pEle?.count || 0.0,
          color: pEle?.colorCode,
        });
      });
    }
  });

  tempArray[2].value.forEach((ageElem) => {
    if (ageElem?.key === "Age Range") {
      ageElem?.value?.forEach((element) => {
        agerangeData?.forEach((ageRangeElem) => {
          if (ageRangeElem?._id === element?.key) {
            element.value = ageRangeElem.count;
          }
        });
      });
    }
  });
  // useEffect(() => {
  //   tempArray[2].value.forEach((ele) => {
  //     if (ele.key === "Age Range") {
  //       ele.value.forEach((ageEle) => {
  //         agerangeData?.forEach((element) => {
  //           if (element._id === ageEle.key) {
  //             ageEle.value = element.count;
  //           }
  //         });
  //       });
  //     }
  //   });
  //   // setTempArray(tempArray);
  //   // console.log("newAge", tempArray[2].value);
  // }, [cardData]);

  const doc = new jsPDF("landscape");
  const Print = () => {
    doc.autoTable({ html: "#dashboard-table" });
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
    doc.save("Dashboard.pdf");
  };

  return (
    <div id="dashboard-container">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="md" />
        </div>
      ) : (
        <>
          <div className="cardlist-header d-flex gap-3 cps-24 cpt-26 cpb-25 cpe-24 cmb-24">
            <div className="d-flex">
              <Button
                btnText={isCardList ? "Graph View" : "List View"}
                btnStyle="PLO"
                leftIcon={
                  <img
                    src={isCardList ? icons.graphIcon : icons.menuIcon}
                    alt="icon"
                  />
                }
                onClick={() => {
                  setIsCardList(!isCardList);
                }}
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
                    ...cardData,
                    startDate: moment(e.target.value)
                      .startOf("month")
                      .format("DD-MM-YYYY"),
                    endDate: moment(e.target.value)
                      .endOf("month")
                      .format("DD-MM-YYYY"),
                    loading: true,
                  };
                  setYearText(e.target.value);
                  setCardData(oldData);
                  fetchData(oldData);
                }}
              />
              {dashboardPermission?.viewAndDownload && (
                <ReportDownloadButton
                  btnStyle="PD"
                  btnText="DOWNLOAD REPORT"
                  iconType="L-Download-White"
                  data={exportData?.data}
                  filename={`Dashboard.csv`}
                  pdfFile={() => {
                    Print();
                  }}
                />
              )}
              {/* <Button
                leftIcon={
                  <img
                    src={icons.downloadBlack}
                    alt="icon"
                    className="white-icon"
                  />
                }
                btnText="DOWNLOAD REPORT"
                btnStyle="PD"
              /> */}
            </div>
          </div>
          {isCardList ? (
            <CardList dashboardData={tempArray} storeData={storeData} />
          ) : (
            <CardPieChart dashboardData={tempArray} cardData={cardData} />
          )}
        </>
      )}
    </div>
  );
};
export default Dashboard;

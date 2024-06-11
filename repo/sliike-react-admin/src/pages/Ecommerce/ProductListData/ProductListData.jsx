import CheckBox from "components/form/CheckBox";
import ReportDownloadButton from "components/layouts/ReportDownloadButton";
import Table from "components/layouts/Table";
import UserProfileLayout from "components/layouts/UserProfileLayout";
import { omit } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getECommerceProductList } from "store/globalSlice";
import { icons } from "utils/constants";
import {
  formatDescription,
  objectToQueryParams,
  titleCaseString,
} from "utils/helpers";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ProductListData = () => {
  const dispatch = useDispatch();
  const [checkProductList, setCheckProductList] = useState([]);
  const [exportSingleData, setExportSingleData] = useState({
    data: [],
    loader: false,
  });
  const [tableData, setTableData] = useState({
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    loading: true,
    data: [],
  });

  const fetchProductList = async (obj) => {
    const queryParams = objectToQueryParams(
      omit(obj, ["data", "loading", "total"])
    );
    const response = await dispatch(getECommerceProductList(queryParams));
    if (response?.status === 200) {
      setTableData((prev) => {
        return {
          ...prev,
          data: response?.data?.productDetails,
          total: response?.data?.count,
          loading: false,
        };
      });
    }

    exportTotalProductList(response?.data?.productDetails);
  };

  const headers = [
    "Product Name",
    "Price",
    "Product Category",
    "Business Name",
    "Product Description",
    "Product Variation",
    "Unit Product Price",
    "Status",
    "Inventory",
    "Sales",
    "Returned",
    "Cancelled",
  ];
  let csvData = [];
  csvData = checkProductList?.map((o) => {
    const {
      productName,
      price,
      productCategory,
      businessName,
      description,
      productVariation,
      unitPrice,
      status,
      inverntory,
      sales,
      returnd,
      cancelled,
    } = o;
    return [
      titleCaseString(productName),
      `$${price.toFixed(2)}`,
      titleCaseString(productCategory),
      titleCaseString(businessName),
      titleCaseString(description),
      productVariation,
      unitPrice,
      status === 1 ? "Active" : "Inactive",
      inverntory,
      sales,
      returnd,
      cancelled,
    ];
  });

  const handelChangeAll = (e) => {
    if (e.target.checked) {
      const allListData = tableData?.data?.map((o) => o);
      setCheckProductList(allListData);
    } else {
      setCheckProductList([]);
    }
  };
  const handleSingleChange = (e, elem) => {
    if (e.target.checked) {
      setCheckProductList([...checkProductList, elem]);
    } else {
      setCheckProductList(checkProductList.filter((item) => item !== elem));
    }
  };

  const exportTotalProductList = async (list) => {
    let allProductList = [];
    allProductList = list?.map((el) => {
      const {
        productName,
        price,
        productCategory,
        businessName,
        description,
        productVariation,
        unitPrice,
        status,
        inverntory,
        sales,
        returnd,
        cancelled,
      } = el;
      return [
        titleCaseString(productName),
        `$${price.toFixed(2)}`,
        titleCaseString(productCategory),
        titleCaseString(businessName),
        titleCaseString(description),
        productVariation,
        unitPrice,
        status === 1 ? "Active" : "Inactive",
        inverntory,
        sales,
        returnd,
        cancelled,
      ];
    });
    setExportSingleData((prev) => {
      return { ...prev, data: allProductList, loader: true };
    });
  };

  useEffect(() => {
    fetchProductList(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const dummyData = [
  //   {
  //     id: 1,
  //     product_name: "Nivea body lotion",
  //     price: 25.0,
  //     product_category: "Make Up",
  //     business_name: "Queens Beauty Store",
  //     product_description: "The NIVEA Rich Nouri...",
  //     product_variation: 3,
  //     unit_product_price: 25,
  //     status: "Active",
  //     inventory: 20,
  //     sales: 8,
  //     returned: 2,
  //     cancelled: 2,
  //   },
  //   {
  //     id: 2,
  //     product_name: "Nivea body lotion",
  //     price: 25.0,
  //     product_category: "Make Up",
  //     business_name: "Queens Beauty Store",
  //     product_description: "The NIVEA Rich Nouri...",
  //     product_variation: 3,
  //     unit_product_price: 25,
  //     status: "Active",
  //     inventory: 20,
  //     sales: 8,
  //     returned: 2,
  //     cancelled: 2,
  //   },
  //   {
  //     id: 3,
  //     product_name: "Nivea body lotion",
  //     price: 25.0,
  //     product_category: "Make Up",
  //     business_name: "Queens Beauty Store",
  //     product_description: "The NIVEA Rich Nouri...",
  //     product_variation: 3,
  //     unit_product_price: 25,
  //     status: "Active",
  //     inventory: 20,
  //     sales: 8,
  //     returned: 2,
  //     cancelled: 2,
  //   },
  //   {
  //     id: 4,
  //     product_name: "Nivea body lotion",
  //     price: 25.0,
  //     product_category: "Make Up",
  //     business_name: "Queens Beauty Store",
  //     product_description: "The NIVEA Rich Nouri...",
  //     product_variation: 3,
  //     unit_product_price: 25,
  //     status: "Active",
  //     inventory: 20,
  //     sales: 8,
  //     returned: 2,
  //     cancelled: 2,
  //   },
  //   {
  //     id: 5,
  //     product_name: "Nivea body lotion",
  //     price: 25.0,
  //     product_category: "Make Up",
  //     business_name: "Queens Beauty Store",
  //     product_description: "The NIVEA Rich Nouri...",
  //     product_variation: 3,
  //     unit_product_price: 25,
  //     status: "Active",
  //     inventory: 20,
  //     sales: 8,
  //     returned: 2,
  //     cancelled: 2,
  //   },
  // ];
  const header = [
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600 d-flex align-items-center gap-2">
          <CheckBox
            className="header-user-data-checkbox"
            id="all"
            onChange={handelChangeAll}
            checked={checkProductList.length === tableData?.data?.length}
          />
          Product Name
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Price
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Product Category
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Business Name
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Product Description
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Product Variation
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Unit Product Price
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Status
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Inventory
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Sales
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Returned
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Cancelled
        </div>
      ),
    },
  ];
  let rowData = [];
  tableData?.data?.forEach((elem, index) => {
    const {
      productName,
      price,
      productCategory,
      businessName,
      description,
      productVariation,
      unitPrice,
      status,
      inverntory,
      sales,
      returnd,
      cancelled,
      imgName,
    } = elem;
    const formattedText = formatDescription(description, 25);

    let obj = [
      {
        value: (
          <div className="text-nowrap d-flex align-items-center gap-2">
            <div>
              <CheckBox
                className="user-data-checkbox"
                id="single-check"
                checked={checkProductList.includes(elem)}
                onChange={(e) => {
                  handleSingleChange(e, elem);
                }}
              />
            </div>
            <div>
              <UserProfileLayout
                text={productName}
                size="40"
                isSquare
                url={imgName[0]}
              />
            </div>
            <div className="text-nowrap color-black-80">
              <div className="color-black-100 text-13-500-21">
                {titleCaseString(productName)}
              </div>
            </div>
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">{`$${price.toFixed(
            2
          )}`}</div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {titleCaseString(productCategory)}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {titleCaseString(businessName)}
          </div>
        ),
      },
      {
        value: (
          <>
            <div className="text-nowrap color-black-80">
              {titleCaseString(formattedText)}
              <img
                src={icons.infoCircle}
                alt="info"
                className="pointer"
                data-tooltip-id={`my-tooltip-2-${index}`}
              />
            </div>
            <ReactTooltip
              id={`my-tooltip-2-${index}`}
              place="bottom"
              variant="info"
              content={<div>{titleCaseString(description)}</div>}
              className="bg-dashboard-primary"
            />
          </>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">{productVariation}</div>
        ),
      },
      {
        value: <div className="text-nowrap color-black-80">{unitPrice}</div>,
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {status === 1 ? "Active" : "Inactive"}
          </div>
        ),
      },
      {
        value: <div className="text-nowrap color-black-80">{inverntory}</div>,
      },
      {
        value: <div className="text-nowrap color-black-80">{sales}</div>,
      },
      {
        value: <div className="text-nowrap color-black-80">{returnd}</div>,
      },
      {
        value: <div className="text-nowrap color-black-80">{cancelled}</div>,
      },
    ];
    rowData.push({ data: obj });
  });

  const doc = new jsPDF("landscape");
  const Print = () => {
    doc.autoTable({
      html: "#my-table",
      columnStyles: { 3: { cellWidth: 100 } },
    });
    const tHeaders = headers;
    let row = [];
    let checkRow = csvData;
    let allRows = exportSingleData?.data;
    row = checkProductList.length ? checkRow : allRows;
    doc.autoTable(tHeaders, row, {
      startY: false,
      theme: "grid",
      horizontalPageBreak: true,
      tableWidth: "auto",
      columnWidth: "wrap",
      showHeader: "everyPage",
      tableLineWidth: 0,
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
    doc.save("Product List Data.pdf");
    setCheckProductList([]);
  };
  return (
    <div className="bg-white cpt-24 cpe-24 cpb-24 cps-24">
      <div className="d-flex justify-content-between align-items-center cmb-25">
        <div className="text-17-600 color-ieie">
          Product List{" "}
          <span className="color-blue-60">{`(${tableData?.total})`}</span>
        </div>
        <ReportDownloadButton
          btnStyle="PD"
          btnText="DOWNLOAD REPORT"
          iconType="L-Download-White"
          headers={headers}
          checkUser={checkProductList}
          setCheckUser={setCheckProductList}
          data={checkProductList.length ? csvData : exportSingleData?.data}
          filename="Product List Data.csv"
          pdfFile={() => {
            Print();
          }}
          isCheck
        />
      </div>

      <div className="overflow-auto">
        <Table
          header={header}
          rowData={rowData}
          tableData={tableData}
          isLoading={tableData?.loading}
          tHead="bg-blue-10"
          isPagination
          changeOffset={(newOffset, newLimit = tableData.limit) => {
            let oldData = {
              ...tableData,
              offset: newOffset,
              limit: newLimit,
              loading: true,
            };
            setTableData(oldData);
            fetchProductList(oldData);
          }}
        />
      </div>
    </div>
  );
};

export default ProductListData;

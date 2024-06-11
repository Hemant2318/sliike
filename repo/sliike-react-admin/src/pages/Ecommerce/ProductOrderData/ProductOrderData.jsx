import CheckBox from "components/form/CheckBox";
import ReportDownloadButton from "components/layouts/ReportDownloadButton";
import Table from "components/layouts/Table";
import { omit } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { getECommerceOrderData } from "store/globalSlice";
import { icons } from "utils/constants";
import { objectToQueryParams, titleCaseString } from "utils/helpers";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProductOrderData = () => {
  const dispatch = useDispatch();
  const [checkProductOrder, setCheckProductOrder] = useState([]);
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

  const fetchOrderData = async (obj) => {
    const queryParams = objectToQueryParams(
      omit(obj, ["data", "loading", "total"])
    );
    const response = await dispatch(getECommerceOrderData(queryParams));
    if (response?.status === 200) {
      setTableData((prev) => {
        return {
          ...prev,
          data: response?.data?.orderDetails,
          total: response?.data?.count,
          loading: false,
        };
      });
    }

    exportTotalOrderData(response?.data?.orderDetails);
  };

  const headers = [
    "Order Number",
    "Order Date",
    "Business Name",
    "Client Name",
    "Province",
    " Product",
    "Product Order",
    "Price",
    "Shipping Fee",
    "Discount",
    "Sales Tax",
    "GST/HST",
    "QST/PST",
    "Payment Status",
    "Delivery Status",
    "Delivery Date",
    "Shipping Status",
    "Tracking Number",
  ];
  let csvData = [];
  csvData = checkProductOrder?.map((o) => {
    const {
      orderID,
      orderDate,
      businessName,
      firstName,
      lastName,
      province,
      productName,
      totalQuantity,
      TotalPrice,
      shippingFees,
      discount,
      taxProvinceDetails,
      paymentStatus,
      deliveryStatus,
      deliveredDate,
      shippingStatus,
      trackNumber,
    } = o;

    return [
      orderID,
      moment(orderDate).format("DD MMM, YYYY"),
      titleCaseString(businessName),
      titleCaseString(`${firstName} ${lastName}`),
      province,
      titleCaseString(productName),
      totalQuantity,
      `$${TotalPrice.toFixed(2)}`,
      `$${shippingFees.toFixed(2)}`,
      `$${discount.toFixed(2)}`,
      taxProvinceDetails === null ? "No" : "Yes",
      taxProvinceDetails === null
        ? "-"
        : taxProvinceDetails?.GSTNumber === null
        ? taxProvinceDetails?.HSTNumber === null
          ? "-"
          : taxProvinceDetails?.HSTNumber
        : taxProvinceDetails?.GSTNumber,
      taxProvinceDetails === null
        ? "-"
        : taxProvinceDetails?.QSTNumber === null
        ? taxProvinceDetails?.PSTNumber === null
          ? "-"
          : taxProvinceDetails?.PSTNumber
        : taxProvinceDetails?.QSTNumber,
      paymentStatus === 1 ? "Pending" : "Completed",
      titleCaseString(deliveryStatus),
      moment(deliveredDate).format("DD MMM, YYYY"),
      titleCaseString(shippingStatus),
      trackNumber,
    ];
  });

  const singlePtroductOrder = (data) => {
    const {
      orderID,
      orderDate,
      businessName,
      firstName,
      lastName,
      province,
      productName,
      totalQuantity,
      TotalPrice,
      shippingFees,
      discount,
      taxProvinceDetails,
      paymentStatus,
      deliveryStatus,
      deliveredDate,
      shippingStatus,
      trackNumber,
    } = data;

    let flagArray = [
      orderID,
      moment(orderDate).format("DD MMM, YYYY"),
      titleCaseString(businessName),
      titleCaseString(`${firstName} ${lastName}`),
      province,
      titleCaseString(productName),
      totalQuantity,
      `$${TotalPrice.toFixed(2)}`,
      `$${shippingFees.toFixed(2)}`,
      `$${discount.toFixed(2)}`,
      taxProvinceDetails === null ? "No" : "Yes",
      taxProvinceDetails === null
        ? "-"
        : taxProvinceDetails?.GSTNumber === null
        ? taxProvinceDetails?.HSTNumber === null
          ? "-"
          : taxProvinceDetails?.HSTNumber
        : taxProvinceDetails?.GSTNumber,
      taxProvinceDetails === null
        ? "-"
        : taxProvinceDetails?.QSTNumber === null
        ? taxProvinceDetails?.PSTNumber === null
          ? "-"
          : taxProvinceDetails?.PSTNumber
        : taxProvinceDetails?.QSTNumber,
      paymentStatus === 1 ? "Pending" : "Completed",
      titleCaseString(deliveryStatus),
      moment(deliveredDate).format("DD MMM, YYYY"),
      titleCaseString(shippingStatus),
      trackNumber,
    ];

    setExportSingleData((prev) => {
      return {
        ...prev,
        data: flagArray,
        loader: false,
      };
    });
  };

  const exportTotalOrderData = async (orderData) => {
    let allOrderData = [];
    allOrderData = orderData?.map((elem) => {
      const {
        orderID,
        orderDate,
        businessName,
        firstName,
        lastName,
        province,
        productName,
        totalQuantity,
        TotalPrice,
        shippingFees,
        discount,
        taxProvinceDetails,
        paymentStatus,
        deliveryStatus,
        deliveredDate,
        shippingStatus,
        trackNumber,
      } = elem;

      return [
        orderID,
        moment(orderDate).format("DD MMM, YYYY"),
        titleCaseString(businessName),
        titleCaseString(`${firstName} ${lastName}`),
        province,
        titleCaseString(productName),
        totalQuantity,
        `$${TotalPrice.toFixed(2)}`,
        `$${shippingFees.toFixed(2)}`,
        `$${discount.toFixed(2)}`,
        taxProvinceDetails === null ? "No" : "Yes",
        taxProvinceDetails === null
          ? "-"
          : taxProvinceDetails?.GSTNumber === null
          ? taxProvinceDetails?.HSTNumber === null
            ? "-"
            : taxProvinceDetails?.HSTNumber
          : taxProvinceDetails?.GSTNumber,
        taxProvinceDetails === null
          ? "-"
          : taxProvinceDetails?.QSTNumber === null
          ? taxProvinceDetails?.PSTNumber === null
            ? "-"
            : taxProvinceDetails?.PSTNumber
          : taxProvinceDetails?.QSTNumber,
        paymentStatus === 1 ? "Pending" : "Completed",
        titleCaseString(deliveryStatus),
        moment(deliveredDate).format("DD MMM, YYYY"),
        titleCaseString(shippingStatus),
        trackNumber,
      ];
    });
    setExportSingleData((prev) => {
      return { ...prev, data: allOrderData, loader: true };
    });
  };
  const handleChangeAll = (e) => {
    if (e.target.checked) {
      const allUsers = tableData?.data?.map((o) => o);
      setCheckProductOrder(allUsers);
    } else {
      setCheckProductOrder([]);
    }
  };

  const handleSingleChange = (e, elem) => {
    if (e.target.checked) {
      setCheckProductOrder([...checkProductOrder, elem]);
    } else {
      setCheckProductOrder(checkProductOrder.filter((item) => item !== elem));
    }
  };
  useEffect(() => {
    fetchOrderData(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const dummyData = [
  //   {
  //     id: 1,
  //     order_id: "ID: SLKB0000001+",
  //     order_name: "Nivea body lotion",
  //     order_date: "12 jun, 2023",
  //     client_name: "Jake Sully",
  //     province: "Ontario",
  //     product: "Nivea body lotion, Mask",
  //     total_product_order: 2,
  //     price: "$100.00",
  //     shipping_fee: "$10.00",
  //     discount: "$00.00",
  //     business_name: "Queens Beauty Store",
  //     payment_status: "Completed",
  //     delivery_status: "In progress",
  //     delivery_data: "18 jun, 2023",
  //     shipping_status: "Delivered",
  //     tracking_number: "300000001122",
  //     sales_tax: "Yes",
  //     gst_hst: "000000000 RT0001",
  //     qst_pst: "0000000000 TQ0001",
  //   },
  //   {
  //     id: 2,
  //     order_id: "ID: SLKB0000001+",
  //     order_name: "Nivea body lotion",
  //     order_date: "12 jun, 2023",
  //     client_name: "Jake Sully",
  //     province: "Ontario",
  //     product: "Nivea body lotion, Mask",
  //     total_product_order: 2,
  //     price: "$100.00",
  //     shipping_fee: "$10.00",
  //     discount: "$00.00",
  //     business_name: "Queens Beauty Store",
  //     payment_status: "Completed",
  //     delivery_status: "In progress",
  //     delivery_data: "18 jun, 2023",
  //     shipping_status: "Delivered",
  //     tracking_number: "300000001122",
  //     sales_tax: "Yes",
  //     gst_hst: "000000000 RT0001",
  //     qst_pst: "0000000000 TQ0001",
  //   },
  //   {
  //     id: 3,
  //     order_id: "ID: SLKB0000001+",
  //     order_name: "Nivea body lotion",
  //     order_date: "12 jun, 2023",
  //     client_name: "Jake Sully",
  //     province: "Ontario",
  //     product: "Nivea body lotion, Mask",
  //     total_product_order: 2,
  //     price: "$100.00",
  //     shipping_fee: "$10.00",
  //     discount: "$00.00",
  //     business_name: "Queens Beauty Store",
  //     payment_status: "Completed",
  //     delivery_status: "In progress",
  //     delivery_data: "18 jun, 2023",
  //     shipping_status: "Delivered",
  //     tracking_number: "300000001122",
  //     sales_tax: "Yes",
  //     gst_hst: "000000000 RT0001",
  //     qst_pst: "0000000000 TQ0001",
  //   },
  //   {
  //     id: 4,
  //     order_id: "ID: SLKB0000001+",
  //     order_name: "Nivea body lotion",
  //     order_date: "12 jun, 2023",
  //     client_name: "Jake Sully",
  //     province: "Ontario",
  //     product: "Nivea body lotion, Mask",
  //     total_product_order: 2,
  //     price: "$100.00",
  //     shipping_fee: "$10.00",
  //     discount: "$00.00",
  //     business_name: "Queens Beauty Store",
  //     payment_status: "Completed",
  //     delivery_status: "In progress",
  //     delivery_data: "18 jun, 2023",
  //     shipping_status: "Delivered",
  //     tracking_number: "300000001122",
  //     sales_tax: "Yes",
  //     gst_hst: "000000000 RT0001",
  //     qst_pst: "0000000000 TQ0001",
  //   },
  //   {
  //     id: 5,
  //     order_id: "ID: SLKB0000001+",
  //     order_name: "Nivea body lotion",
  //     order_date: "12 jun, 2023",
  //     client_name: "Jake Sully",
  //     province: "Ontario",
  //     product: "Nivea body lotion, Mask",
  //     total_product_order: 2,
  //     price: "$100.00",
  //     shipping_fee: "$10.00",
  //     discount: "$00.00",
  //     business_name: "Queens Beauty Store",
  //     payment_status: "Completed",
  //     delivery_status: "In progress",
  //     delivery_data: "18 jun, 2023",
  //     shipping_status: "Delivered",
  //     tracking_number: "300000001122",
  //     sales_tax: "Yes",
  //     gst_hst: "000000000 RT0001",
  //     qst_pst: "0000000000 TQ0001",
  //   },
  // ];
  const header = [
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600 d-flex align-items-center gap-2">
          <CheckBox
            className="header-user-data-checkbox"
            id="all"
            onChange={handleChangeAll}
            checked={checkProductOrder.length === tableData?.data?.length}
          />
          Order Number
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Order Date
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
          Client Name
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Province
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Product
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Total Product Order
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
          Shipping Fee
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Discount
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Sales Tax
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          GST/HST
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          QST/PST
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Payment Status
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Delivery Status
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Delivery Date
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Shipping Status
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Tracking Number
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Action
        </div>
      ),
    },
  ];

  let rowData = [];
  tableData?.data?.forEach((elem) => {
    const {
      orderID,
      orderDate,
      businessName,
      firstName,
      lastName,
      province,
      productName,
      totalQuantity,
      TotalPrice,
      shippingFees,
      discount,
      taxProvinceDetails,
      paymentStatus,
      deliveryStatus,
      deliveredDate,
      shippingStatus,
      trackNumber,
    } = elem;

    let obj = [
      {
        value: (
          <div className="text-nowrap d-flex align-items-center gap-2">
            <div>
              <CheckBox
                className="user-data-checkbox"
                id="product-order"
                checked={checkProductOrder.includes(elem)}
                onChange={(e) => {
                  handleSingleChange(e, elem);
                }}
              />
            </div>

            <div className="text-nowrap color-black-80">
              <div className="color-black-100 text-13-500-21">{orderID}</div>
            </div>
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {moment(orderDate).format("DD MMM, YYYY")}
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
          <div className="text-nowrap color-black-80">
            {titleCaseString(`${firstName} ${lastName}`)}
          </div>
        ),
      },
      {
        value: <div className="text-nowrap color-black-80">{province}</div>,
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {titleCaseString(productName)}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">{totalQuantity}</div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {`$${TotalPrice.toFixed(2)}`}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">{`$${shippingFees.toFixed(
            2
          )}`}</div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">{`$${discount.toFixed(
            2
          )}`}</div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {taxProvinceDetails === null ? "No" : "Yes"}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {taxProvinceDetails === null
              ? "-"
              : taxProvinceDetails?.GSTNumber === null
              ? taxProvinceDetails?.HSTNumber === null
                ? "-"
                : taxProvinceDetails?.HSTNumber
              : taxProvinceDetails?.GSTNumber}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {taxProvinceDetails === null
              ? "-"
              : taxProvinceDetails?.QSTNumber === null
              ? taxProvinceDetails?.PSTNumber === null
                ? "-"
                : taxProvinceDetails?.PSTNumber
              : taxProvinceDetails?.QSTNumber}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {paymentStatus === 1 ? "Pending" : "Completed"}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {titleCaseString(deliveryStatus)}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {moment(deliveredDate).format("DD MMM, YYYY")}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {titleCaseString(shippingStatus)}
          </div>
        ),
      },
      {
        value: <div className="text-nowrap color-black-80">{trackNumber}</div>,
      },
      {
        value: (
          <div
            className="text-nowrap color-black-80"
            onClick={() => {
              singlePtroductOrder(elem);
            }}
          >
            <CSVLink
              data={[exportSingleData?.data]}
              headers={headers}
              filename={`Product Order Data.csv`}
              className="text-decoration-none pointer"
            >
              <div className="d-flex gap-2 align-items-center">
                <span className="text-13-500-21 color-black-80">Download</span>
                <img src={icons.downloadBlack} alt="add-brands" />
              </div>
            </CSVLink>
          </div>
        ),
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
    row = checkProductOrder.length ? checkRow : allRows;
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
    doc.save("Product Order Data.pdf");
    setCheckProductOrder([]);
  };
  return (
    <div
      id="product-order-data"
      className="bg-white cpt-24 cpe-24 cpb-24 cps-24"
    >
      <div className="d-flex justify-content-between align-items-center cmb-25">
        <div className="text-17-600 color-ieie">
          Orders
          <span className="color-blue-60"> {`(${tableData?.total})`}</span>
        </div>
        <ReportDownloadButton
          btnStyle="PD"
          btnText="DOWNLOAD REPORT"
          iconType="L-Download-White"
          checkUser={checkProductOrder}
          setCheckUser={setCheckProductOrder}
          data={checkProductOrder.length ? csvData : exportSingleData?.data}
          headers={headers}
          filename="Product Order Data.csv"
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
            fetchOrderData(oldData);
          }}
        />
      </div>
    </div>
  );
};

export default ProductOrderData;

import Table from "components/layouts/Table/Table";
import moment from "moment";
import React from "react";
import { titleCaseString } from "utils/helpers";

const BeauticianProductPurchaseSummary = ({
  productSales,
  setProductSales,
  fetchProductSaleReport,
}) => {
  // console.log("productSale", productSales?.data);

  const header = [
    {
      title: <div className="text-start ps-3">Product</div>,
    },
    {
      title: <div className="text-nowrap">Vendor</div>,
    },
    {
      title: <div className="text-nowrap">Purchase Date</div>,
    },
    {
      title: <div className="text-nowrap">Delivery Date</div>,
    },
    {
      title: <div className="text-nowrap">Delivery location</div>,
    },
    {
      title: <div className="text-nowrap">Price</div>,
    },
    {
      title: <div className="text-nowrap">Shipping</div>,
    },
    {
      title: <div className="text-nowrap">GST/HST</div>,
    },
    {
      title: <div className="text-nowrap">QST/PST</div>,
    },
    {
      title: <div className="text-nowrap">Sliike fee</div>,
    },
    {
      title: <div className="text-nowrap">Sliike GST/HST fee</div>,
    },
    {
      title: <div className="text-nowrap">Sliike PST/QST fee</div>,
    },
    {
      title: <div className="text-nowrap">Discount given</div>,
    },
    {
      title: <div className="text-nowrap">Total price</div>,
    },
    {
      title: "Status",
    },
  ];

  const rowData = [];
  productSales?.data?.forEach((elem) => {
    const {
      productName,
      clientFirstName,
      clientLastName,
      productPurchaseDate,
      deliveredDate,
      addressDetails,
      shippingCharge,
      GST,
      HST,
      PST,
      QST,
      sliikFee,
      sliikFeeGST,
      sliikFeeHST,
      sliikFeePST,
      sliikFeeQST,
      productDiscount,
      TotalPrice,
      orderStatus,
      beauticianId,
    } = elem;
    const vendor = titleCaseString(`${clientFirstName} ${clientLastName}`);
    let obj = [
      {
        value: (
          <div className="text-start ps-3 text-nowrap d-flex flex-column">
            {titleCaseString(productName)}
            {/* <span>{beauticianId}</span> */}
          </div>
        ),
      },
      {
        value: <div className="text-nowrap">{vendor}</div>,
      },
      {
        value: moment(productPurchaseDate).format("DD-MM-YYYY"),
      },
      {
        value: moment(deliveredDate).format("DD-MM-YYYY"),
      },
      {
        value: (
          <div className="d-flex flex-column">
            <span>
              {addressDetails.length && addressDetails?.[0]?.apartment},
            </span>
            <span>{addressDetails.length && addressDetails?.[0]?.street},</span>
            <span>{addressDetails.length && addressDetails?.[0]?.city}</span>
            <span>
              {addressDetails.length && addressDetails?.[0]?.address},
            </span>
            <span>{addressDetails.length && addressDetails?.[0]?.zipCode}</span>
          </div>
        ),
      },
      {
        value: `$${TotalPrice}`,
      },
      {
        value: `$${shippingCharge}`,
      },
      {
        value: `$${GST === 0 ? HST.toFixed(2) : GST.toFixed(2)}`,
      },
      {
        value: `$${QST === 0 ? PST.toFixed(2) : QST.toFixed(2)}`,
      },
      {
        value: `$${sliikFee}`,
      },
      {
        value: `$${
          sliikFeeGST === 0 ? sliikFeeHST.toFixed(2) : sliikFeeGST.toFixed(2)
        }`,
      },
      {
        value: `$${
          sliikFeeQST === 0 ? sliikFeePST.toFixed(2) : sliikFeeQST.toFixed(2)
        }`,
      },
      {
        value: `$${productDiscount}`,
      },
      {
        value: `$${TotalPrice}`,
      },
      {
        value: <div className="color-blue">{titleCaseString(orderStatus)}</div>,
      },
    ];
    rowData.push({ data: obj });
  });
  return (
    <div className="overflow-auto">
      <Table
        header={header}
        rowData={rowData}
        isLoading={productSales?.loading}
        searchText={productSales?.serachClient}
        tableData={productSales}
        searchInputChange={(searchText) => {
          let oldData = {
            ...productSales,
            serachClient: searchText,
            loading: true,
          };
          setProductSales(oldData);
          fetchProductSaleReport(oldData);
        }}
        changeOffset={(newOffset, newLimit = productSales.limit) => {
          let oldData = {
            ...productSales,
            offset: newOffset,
            limit: newLimit,
            loading: true,
          };
          setProductSales(oldData);
          fetchProductSaleReport(oldData);
        }}
        isPagination
      />
    </div>
  );
};

export default BeauticianProductPurchaseSummary;

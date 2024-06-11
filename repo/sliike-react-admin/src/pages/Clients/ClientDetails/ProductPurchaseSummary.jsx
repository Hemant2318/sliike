import Table from "components/layouts/Table";
import moment from "moment";
import { titleCaseString } from "utils/helpers";

const ProductPurchaseSummary = ({
  productSummary,
  setProductSummary,
  fetchProductSummary,
}) => {
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
      title: <div className="text-nowrap">Discount Given</div>,
    },
    {
      title: <div className="text-nowrap">Total price</div>,
    },
    {
      title: "Status",
    },
  ];

  const rowData = [];
  productSummary?.data?.forEach((elem) => {
    const {
      productName,
      vendorName,
      productPurchaseDate,
      deliveredDate,
      addressDetails,
      productPrice,
      shippingCharge,
      GST,
      HST,
      PST,
      QST,
      productDiscount,
      TotalPrice,
      orderStatus,
    } = elem;
    let obj = [
      {
        value: (
          <div className="text-start ps-3 text-nowrap">
            {titleCaseString(productName)}
          </div>
        ),
      },
      {
        value: <div className="text-nowrap">{titleCaseString(vendorName)}</div>,
      },
      {
        value: (
          <div className="text-nowrap">
            {moment(productPurchaseDate).format("DD-MM-YYYY")}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap">
            {moment(deliveredDate).format("DD-MM-YYYY")}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap d-flex flex-column">
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
        value: <div className="text-nowrap">{`$${productPrice}`}</div>,
      },
      {
        value: <div className="text-nowrap">{`$${shippingCharge}`}</div>,
      },
      {
        value: `$${GST === 0 ? HST.toFixed(2) : GST.toFixed(2)}`,
      },
      {
        value: `$${QST === 0 ? PST.toFixed(2) : QST.toFixed(2)}`,
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
        isLoading={productSummary?.loading}
        tableData={productSummary}
        changeOffset={(newOffset, newLimit = productSummary.limit) => {
          let oldData = {
            ...productSummary,
            offset: newOffset,
            limit: newLimit,
            loading: true,
          };
          setProductSummary(oldData);
          fetchProductSummary(oldData);
        }}
        isPagination
      />
    </div>
  );
};
export default ProductPurchaseSummary;

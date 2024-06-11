import Table from "components/layouts/Table";
import moment from "moment";
import { useState } from "react";

const ServicePurchaseSummary = ({
  tableData,
  setTableData,
  fetchClientDetails,
}) => {
  const header = [
    {
      title: <div className="text-start ps-3">Service</div>,
    },
    {
      title: "Beautician",
    },
    {
      title: <div className="text-nowrap">Date & time</div>,
    },
    {
      title: <div className="text-nowrap">Place of service</div>,
    },
    {
      title: <div className="text-nowrap">Service location</div>,
    },
    {
      title: <div className="text-nowrap">Service fee</div>,
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
      title: <div className="text-nowrap">Total fee</div>,
    },
    {
      title: "Status",
    },
  ];

  const rowData = [];
  tableData?.data?.servicePurchase?.forEach((elem) => {
    const {
      typeDetails,
      beauticianDetails,
      createdAt,
      dateTime,
      endDateTime,
      place,
      serviceDetails,
      paymentDetails,
      status,
      beauticianAddress,
      userAddress,
    } = elem;

    const starttime = moment.utc(dateTime).format("HH:mm:ss Z");

    const endttime = moment.utc(endDateTime).format("HH:mm:ss Z");

    let obj = [
      {
        value: (
          <div className="text-start ps-3 text-nowrap">
            {typeDetails?.[0]?.serviceTypeName}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap">
            {beauticianDetails?.[0]?.firstName}{" "}
            {beauticianDetails?.[0]?.lastName}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap">
            <div>{moment(dateTime).format("DD-MM-YYYY")}</div>
            <div className="text-11-500 color-black-80">
              {moment(starttime, "HH:mm:ss").format("HH:mm")}
              {"-"}
              {moment(endttime, "HH:mm:ss").format("HH:mm")}
            </div>
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap">
            {place === 0 ? "At the business place" : "At my place"}
          </div>
        ),
      },
      {
        value: (
          <div className="text-13-500-21 color-dashboard-primary">
            {place === 0 ? (
              <>
                <div>{beauticianAddress?.[0]?.apartment}</div>
                <div>{beauticianAddress?.[0]?.address}</div>
                <div>{beauticianAddress?.[0]?.city}</div>
                <div>{beauticianAddress?.[0]?.zipCode}</div>
              </>
            ) : (
              <>
                <div>{userAddress?.[0]?.street}</div>
                <div>{userAddress?.[0]?.address}</div>
                <div></div>
              </>
            )}
          </div>
        ),
      },
      {
        value: serviceDetails?.price && `$${serviceDetails?.price}`,
      },
      {
        value:
          paymentDetails?.[0]?.GST === 0
            ? paymentDetails?.[0]?.GST && `$${paymentDetails?.[0]?.GST || "-"}`
            : paymentDetails?.[0]?.HST && `$${paymentDetails?.[0]?.HST || "-"}`,
      },
      {
        value:
          paymentDetails?.[0]?.QST === 0
            ? paymentDetails?.[0]?.QST && `$${paymentDetails?.[0]?.QST || "-"}`
            : paymentDetails?.[0]?.PST && `$${paymentDetails?.[0]?.PST || "-"}`,
      },
      {
        value:
          paymentDetails?.[0]?.discount && `$${paymentDetails?.[0]?.discount}`,
      },
      {
        value:
          paymentDetails?.[0]?.TotalPrice &&
          `$${paymentDetails?.[0]?.TotalPrice}`,
      },
      {
        value: (
          <div
            className={
              (status === 0 && "color-gistColor") ||
              (status === 1 && "color-success") ||
              (status === 2 && "color-success") ||
              (status === 3 && "color-red") ||
              (status === 4 && "color-red") ||
              (status === 5 && "color-red")
            }
          >
            {(status === 0 && "Pending") ||
              (status === 1 && "Completed") ||
              (status === 2 && "Completed") ||
              (status === 3 && "Cancled") ||
              (status === 4 && "Cancled") ||
              (status === 5 && "No-Show")}
          </div>
        ),
      },
    ];
    rowData.push({ data: obj });
  });
  return (
    <div className="overflow-auto">
      <Table
        header={header}
        rowData={rowData}
        isLoading={tableData?.loading}
        searchLabel="Search User"
        searchText={tableData?.search}
        tableData={tableData}
        changeOffset={(newOffset, newLimit = tableData.limit) => {
          let oldData = {
            ...tableData,
            offset: newOffset,
            limit: newLimit,
            loading: true,
          };
          setTableData(oldData);
          fetchClientDetails(oldData);
        }}
        isPagination
      />
    </div>
  );
};
export default ServicePurchaseSummary;

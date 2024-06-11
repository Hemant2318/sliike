import Table from "components/layouts/Table/Table";
import moment from "moment";
import React from "react";
import { titleCaseString } from "utils/helpers";

const TotalServices = ({
  serviceData,
  setServiceData,
  fetchSingleServiceData,
}) => {
  const header = [
    {
      title: <div className="ps-3">Service</div>,
    },
    {
      title: <div className="">Client</div>,
    },
    {
      title: <div className="text-nowrap">Date & time</div>,
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
      title: <div className="text-nowrap">Total amount</div>,
    },
    {
      title: <div className="text-nowrap">Status</div>,
    },
  ];

  const rowData = [];
  serviceData?.data?.data?.serviceSales?.forEach((elem) => {
    const {
      serviceName,
      clientFirstName,
      clientLastName,
      dateTime,
      endDateTime,
      place,
      servicePrice,
      paymentDetails,
      status,
    } = elem;
    const clientName = titleCaseString(`${clientFirstName} ${clientLastName}`);
    const starttime = moment.utc(dateTime).format("HH:mm:ss Z");
    const endtime = moment.utc(endDateTime).format("HH:mm:ss Z");
    let obj = [
      {
        value: (
          <span className="text-nowrap ps-3">
            {titleCaseString(serviceName)}
          </span>
        ),
      },
      {
        value: <div className="text-nowrap">{clientName}</div>,
      },
      {
        value: (
          <div className="text-nowrap">
            <div>{moment(dateTime).format("DD-MM-YYYY")}</div>
            <div className="text-11-500 color-black-80">
              {moment(starttime, "HH:mm:ss").format("HH:mm")}
              {"-"}
              {moment(endtime, "HH:mm:ss").format("HH:mm")}
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
        value: <div className="text-nowrap">{`$${servicePrice}`}</div>,
      },
      {
        value: (
          <div className="text-nowrap">
            {paymentDetails.length
              ? paymentDetails?.[0]?.GST === 0
                ? `$${paymentDetails?.[0]?.HST.toFixed(2)}`
                : `$${paymentDetails?.[0]?.GST.toFixed(2)}`
              : `$0`}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap">
            {paymentDetails.length
              ? paymentDetails?.[0]?.QST === 0
                ? `$${paymentDetails?.[0]?.PST.toFixed(2)}`
                : `$${paymentDetails?.[0]?.QST.toFixed(2)}`
              : `$0`}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap">
            {paymentDetails.length
              ? `$${paymentDetails?.[0]?.sliikFee.toFixed(2)}`
              : `$0`}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap">
            {paymentDetails.length
              ? paymentDetails?.[0]?.GstInPer === 0
                ? `$${paymentDetails?.[0]?.HstInPer.toFixed(2)}`
                : `$${paymentDetails?.[0]?.GstInPer.toFixed(2)}`
              : `$0`}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap">
            {paymentDetails.length
              ? paymentDetails?.[0]?.PstInPer === 0
                ? `$${paymentDetails?.[0]?.QstInPer.toFixed(2)}`
                : `$${paymentDetails?.[0]?.PstInPer.toFixed(2)}`
              : `$0`}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap">
            {paymentDetails.length ? `$${paymentDetails?.[0]?.discount}` : `$0`}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap">
            {paymentDetails.length
              ? `$${paymentDetails?.[0]?.TotalPrice}`
              : `$0`}
          </div>
        ),
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
    <>
      <div className="overflow-auto">
        <Table
          isPagination
          header={header}
          rowData={rowData}
          tableData={serviceData}
          isLoading={serviceData?.loading}
          // searchLabel="Search User"
          // searchText={serviceData?.search}
          // searchInputChange={(searchText) => {
          //   let oldData = { ...serviceData, search: searchText, loading: true };
          //   setServiceData(oldData);
          //   fetchSingleServiceData(oldData);
          // }}
          changeOffset={(newOffset, newLimit = serviceData.limit) => {
            let oldData = {
              ...serviceData,
              offset: newOffset,
              limit: newLimit,
              loading: true,
            };
            setServiceData(oldData);
            fetchSingleServiceData(oldData);
          }}
        />
      </div>
    </>
  );
};

export default TotalServices;

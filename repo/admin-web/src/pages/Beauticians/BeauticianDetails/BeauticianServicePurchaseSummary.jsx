import Table from "components/layouts/Table/Table";
import moment, { utc } from "moment";
import React, { useState } from "react";

const BeauticianServicePurchaseSummary = ({
  tableData,
  setTableData,
  fetchDashboardData,
}) => {
  const header = [
    {
      title: <div className="text-start ps-3">Service</div>,
    },
    {
      title: "Client",
    },
    {
      title: <div className="text-nowrap">Date & time</div>,
    },
    // {
    //   title: <div className="text-nowrap">Place of service</div>,
    // },
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
      title: "Status",
    },
  ];

  const rowData = [];
  tableData?.data?.serviceSales?.forEach((elem) => {
    const {
      serviceTypeDetails,
      clientDetails,
      dateTime,
      endDateTime,
      place,
      serviceDetails,
      paymentData,
      status,
    } = elem;

    const starttime = moment.utc(dateTime).format("HH:mm:ss Z");

    const endttime = moment.utc(endDateTime).format("HH:mm:ss Z");

    // const sliikeGstHstFee =
    //   (paymentData?.[0]?.sliikFee * paymentData?.[0]?.gstORhst) / 100;

    // const sliikeQstPstFee =
    //   (paymentData?.[0]?.sliikFee * paymentData?.[0]?.pstORqst) / 100;

    const sliikeGstHstFee =
      (paymentData?.[0]?.sliikFee * paymentData?.[0]?.GstInPer) / 100 +
      (paymentData?.[0]?.sliikFee * paymentData?.[0]?.HstInPer) / 100;

    const sliikeQstPstFee =
      (paymentData?.[0]?.sliikFee * paymentData?.[0]?.PstInPer) / 100 +
      (paymentData?.[0]?.sliikFee * paymentData?.[0]?.QstInPer) / 100;

    const todayDate = moment().utc().format();

    let obj = [
      {
        value: (
          <div className="text-start ps-3 text-nowrap">
            {serviceTypeDetails?.[0]?.serviceTypeName}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap">
            {clientDetails?.[0]?.firstName} {clientDetails?.[0]?.lastName}
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
      // {
      //   value: place,
      // },
      {
        value: (
          <div className="text-nowrap">
            {place === 0 ? "At the business place" : "At my place"}
          </div>
        ),
      },
      {
        value: serviceDetails && `$${(serviceDetails?.[0]?.price).toFixed(2)}`,
      },
      {
        value: `$${
          paymentData?.[0]?.GST === 0
            ? (paymentData?.[0]?.HST).toFixed(2)
            : paymentData?.[0]?.GST.toFixed(2)
        }`,
        // `$${paymentData?.[0]?.gstORhst || 0.0}`
      },
      {
        value: `$${
          paymentData?.[0]?.QST === 0
            ? (paymentData?.[0]?.PST).toFixed(2)
            : (paymentData?.[0]?.QST).toFixed(2)
        }`,
        // `$${paymentData?.[0]?.pstORqst || 0.0}`
      },
      {
        value: `$${(paymentData?.[0]?.sliikFee || 0.0).toFixed(2)}`,
      },
      {
        value: `$${sliikeGstHstFee.toFixed(2)}`,
      },
      {
        value: `$${sliikeQstPstFee.toFixed(2)}`,
      },
      {
        value: `$${(paymentData?.[0]?.discount || 0.0).toFixed(2)}`,
      },
      {
        value: `$${(paymentData?.[0]?.TotalPrice || 0.0).toFixed(2)}`,
      },
      {
        value: (
          <div
            className={
              (dateTime > todayDate && "color-gistColor") ||
              (status === 1 && "color-success") ||
              (status === 2 && "color-success") ||
              (status === 3 && "color-red") ||
              (status === 4 && "color-red")
            }
          >
            {(dateTime > todayDate && "Upcoming") ||
              (status === 1 && "Completed") ||
              (status === 2 && "Delivered") ||
              (status === 3 && "Canceled") ||
              (status === 4 && "Canceled")}
          </div>
        ),
      },
    ];
    rowData.push({ data: obj });
  });
  return (
    <div className="overflow-auto">
      <Table
        isSearch
        header={header}
        rowData={rowData}
        isLoading={tableData?.loading}
        searchLabel="Search Clients"
        searchText={tableData?.search}
        tableData={tableData}
        searchInputChange={(searchText) => {
          let oldData = { ...tableData, search: searchText, loading: true };
          setTableData(oldData);
          fetchDashboardData(oldData);
        }}
        changeOffset={(newOffset, newLimit = tableData.limit) => {
          let oldData = {
            ...tableData,
            offset: newOffset,
            limit: newLimit,
            loading: true,
          };
          setTableData(oldData);
          fetchDashboardData(oldData);
        }}
        isPagination
      />
    </div>
  );
};

export default BeauticianServicePurchaseSummary;

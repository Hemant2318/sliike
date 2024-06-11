import Button from "components/form/Button/Button";
import SearchInput from "components/form/SearchInput/SearchInput";
import MenuOption from "components/layouts/MenuOption/MenuOption";
import StatusContainer from "components/layouts/StatusContainer/StatusContainer";
import Table from "components/layouts/Table/Table";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import React, { useState } from "react";
import { icons } from "utils/constants";

const BrandTransactionHistory = () => {
  let dummyData = [
    {
      id: 1,
      name: "Rose",
      // last_name: "Hanson",
      user_id: "SLKB0000001+",
      category: "Beauty",
      amount: "$0.00",
      discount: "$0.00",
      gst_hst: "$0.00",
    },
    {
      id: 2,
      name: "Sterlin Homes",
      // last_name: "Hanson",
      user_id: "SLKB0000001",
      category: "Home Care",
      amount: "$0.00",
      discount: "$0.00",
      gst_hst: "$0.00",
    },
    {
      id: 3,
      name: "Styles",
      // last_name: "Hanson",
      user_id: "SLKB0000001",
      category: "Fashion",
      amount: "$0.00",
      discount: "$0.00",
      gst_hst: "$0.00",
    },
    {
      id: 4,
      name: "TOV",
      // last_name: "Hanson",
      user_id: "SLKB0000001",
      category: "Lifestyle",
      amount: "$0.00",
      discount: "$0.00",
      gst_hst: "$0.00",
    },
    {
      id: 5,
      name: "LAKME",
      // last_name: "Hanson",
      user_id: "SLKB0000001",
      category: "Cosmetics",
      amount: "$0.00",
      discount: "$0.00",
      gst_hst: "$0.00",
    },
    {
      id: 6,
      name: "LAKME",
      // last_name: "Hanson",
      user_id: "SLKB0000001",
      category: "Personal care",
      amount: "$0.00",
      discount: "$0.00",
      gst_hst: "$0.00",
    },
  ];
  const [tableData, setTableData] = useState({
    offset: 0,
    limit: 5,
    intervalLimit: 5,
    total: 5,
    search: "",
    loading: false,
    data: dummyData || [],
  });
  const header = [
    {
      title: <div className="ps-3">Brand</div>,
    },
    {
      title: "Category",
    },
    {
      title: "Amount Paid",
    },
    {
      title: "Discount",
    },
    {
      title: "GST/HST",
    },
  ];
  const rowData = [];
  tableData?.data.forEach((elem) => {
    const { id, name, user_id, category, amount, discount, gst_hst } = elem;
    let obj = [
      {
        value: (
          <div className="text-start ps-3 d-flex align-items-center gap-2">
            <div>
              <UserProfileLayout text={`${name}`} size="40" />
            </div>
            <div
            //   onClick={() => {
            //     navigate("/brands/1");
            //   }}
            >
              <div className="text-13-500-21 pointer">{`${name}`}</div>
              <div className="text-9-500 color-black-60">ID:{user_id}</div>
            </div>
          </div>
        ),
      },
      {
        value: category,
      },

      {
        value: amount,
      },
      {
        value: discount,
      },
      {
        value: gst_hst,
      },
    ];
    rowData?.push({ data: obj });
  });
  return (
    <div className="cmt-24 position-relative">
      <div>
        <Table
          isPagination
          header={header}
          rowData={rowData}
          tableData={tableData}
          changeOffset={(newOffset, newLimit = tableData.limit) => {
            let oldData = {
              ...tableData,
              offset: newOffset,
              limit: newLimit,
              loading: true,
            };
            setTableData(oldData);
            // fetchTableData(oldData);
          }}
        />
      </div>
    </div>
  );
};

export default BrandTransactionHistory;

import React, { useEffect, useState } from "react";
import CustomDropdown from "components/form/Dropdown/Dropdown";
import { userType } from "utils/constants";
import { useDispatch } from "react-redux";
import { getContactUs } from "store/globalSlice";
import { titleCaseString } from "utils/helpers";
import moment from "moment";
import Table from "components/layouts/Table/Table";

const ContactUs = () => {
  const dispatch = useDispatch();
  const [selectOption, setSelectOption] = useState(userType[0].value);
  const [tableData, setTableData] = useState({
    data: [],
    loading: true,
  });
  const fetchContactUs = async (selectOption) => {
    setTableData(() => {
      return {
        loading: true,
      };
    });
    const response = await dispatch(getContactUs(selectOption));
    if (response?.status === 200) {
      setTableData((prev) => {
        return {
          ...prev,
          data: response?.data,
          loading: false,
        };
      });
    }
  };

  useEffect(() => {
    fetchContactUs(selectOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectOption]);

  const headers = [
    {
      title: "Id",
    },
    {
      title: "Name",
    },
    {
      title: "Date",
    },
    {
      title: "Email",
    },
    {
      title: "Mobile No",
    },
  ];

  const rowData = [];
  tableData?.data?.forEach((elem) => {
    const { memberDetails, createdAt } = elem;
    let obj = [
      {
        value: <div className="text-nowrap">{memberDetails?.uid}</div>,
      },
      {
        value: (
          <div className="text-nowrap">
            {titleCaseString(memberDetails?.firstName)}{" "}
            {titleCaseString(memberDetails?.lastName)}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap">
            <div>{moment(createdAt).format("DD-MM-YYYY")}</div>
            <div>{moment(createdAt).format("HH:mm:ss")}</div>
          </div>
        ),
      },
      {
        value: <div className="text-nowrap">{memberDetails?.email}</div>,
      },
      {
        value: <div className="text-nowrap">{memberDetails?.phoneNumber}</div>,
      },
    ];
    rowData.push({ data: obj });
  });

  return (
    <div id="contact-us-container" className="card-effect cmt-24 cps-24 cpe-24">
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-20-700 color-dashboard-primary">Contact US</div>
        <div className="d-flex align-items-center cmb-24">
          <CustomDropdown
            id="useFor"
            options={userType}
            value={selectOption}
            optionKey="value"
            optionValue="value"
            onChange={(e) => {
              setSelectOption(e.target.value);
            }}
          />
        </div>
      </div>

      <div>
        <Table
          header={headers}
          rowData={rowData}
          isLoading={tableData.loading}
          tableData={tableData}
        />
      </div>
    </div>
  );
};

export default ContactUs;

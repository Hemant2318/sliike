import Button from "components/form/Button/Button";
import React, { useState } from "react";
import { icons } from "utils/constants";
import DisplayTable from "./DisplayTable";
import "./UserData.scss";
import ReportDownloadButton from "components/layouts/ReportDownloadButton/ReportDownloadButton";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Table from "components/layouts/Table/Table";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { objectToQueryParams, titleCaseString } from "utils/helpers";
import { omit } from "lodash";
import { getAllUsersData } from "store/globalSlice";
import moment from "moment";
import { CSVLink } from "react-csv";
import CheckBox from "components/form/CheckBox/CheckBox";
import Loader from "components/layouts/Loader/Loader";

const UserData = () => {
  const dispatch = useDispatch();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [exportData, setExportData] = useState({ data: [], loader: false });

  const [checkedUsers, setCheckedUsers] = useState([]);
  const [exportSingleData, setExportSingleData] = useState({
    data: [],
    loader: false,
  });
  const [exportSingleClientData, setexportSingleClientData] = useState({
    data: [],
    loader: false,
  });
  const [userType, setUserType] = useState("Beautician");

  const [tableData, setTableData] = useState({
    type: "Beautician",
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    loading: true,
    data: [],
  });

  const [totalCountUsers, setTotalCountUsers] = useState({
    type: "",
    offset: 0,
    limit: 0,
    total: 0,
    loading: true,
    data: [],
  });

  const singleBeauticianData = (data) => {
    const profileCompletion = (
      (data?.screenStatus * 100 * 100) /
      700
    ).toFixed();
    const serviceData = data?.typeDetails?.map((o) => {
      return o?.serviceTypeName;
    });
    let flagArray = [
      data?.businessName,
      data?.uid,
      data?.hasShop === 0 ? "Independent" : "Own shop",
      moment(data?.createdAt).format("DD MMM, YYYY"),
      titleCaseString(`${data?.firstName} ${data?.lastName}`),
      data?.userDeatils?.[0]?.phoneNumber,
      data?.userDeatils?.[0]?.email,
      `${data?.addressDeatils?.[0]?.apartment} ${data?.addressDeatils?.[0]?.street} ${data?.addressDeatils?.[0]?.address} ${data?.addressDeatils?.[0]?.city} ${data?.addressDeatils?.[0]?.zipCode}`,
      "-",
      data?.addressDeatils?.[0]?.city && data?.addressDeatils?.[0]?.city,
      data?.provinceDetails?.[0]?.name,
      data?.country,
      "-",
      data?.gender !== null ? data?.gender : "-",
      data?.numOfService,
      //  "-",
      data?.numOfClient,
      data?.categoryDetails?.[0]?.serviceCategoryName,
      serviceData.toString(),
      // "View products",
      data?.isLicensed === 0 ? "No" : "Yes",
      data?.taxProvinceDetails === null ? "No" : "Yes",
      data?.GSTNumber === null
        ? data?.HSTNumber === null
          ? "-"
          : data?.HSTNumber
        : data?.GSTNumber,

      data?.QSTNumber === null
        ? data?.PSTNumber === null
          ? "-"
          : data?.PSTNumber
        : data?.QSTNumber,

      profileCompletion && `${profileCompletion}%`,
    ];

    setExportSingleData((prev) => {
      return {
        ...prev,
        data: flagArray,
        loader: false,
      };
    });
  };

  const singleClientData = (cd) => {
    const age = moment().diff(cd?.DOB !== null && cd?.DOB, "years");
    let clientFlagArray = [
      titleCaseString(`${cd?.firstName} ${cd?.lastName}`),
      cd?.uid,
      moment(cd?.createdAt).format("DD MMM, YYYY"),
      cd?.userDeatils?.[0]?.phoneNumber,
      cd?.userDeatils?.[0]?.email,
      `${cd?.addressDetails?.[0]?.apartment}, ${cd?.addressDetails?.[0]?.street}, ${cd?.addressDetails?.[0]?.address}`,
      "-",
      "-",
      cd?.provinceDeatils?.[0]?.name,
      cd?.country,
      "-",
      cd?.gender !== null ? cd?.gender : "-",
      cd?.DOB ? `${age}` : "-",
      cd?.numOfServiceBooked,
      // "-",,
      "-",
    ];
    setexportSingleClientData((prev) => {
      return {
        ...prev,
        data: clientFlagArray,
        loader: true,
      };
    });
  };

  const exportTotalUsers = async (userData) => {
    let allUsersData = [];
    allUsersData = userData?.map((o) => {
      const {
        logo,
        profileImage,
        businessName,
        uid,
        hasShop,
        createdAt,
        firstName,
        lastName,
        userDeatils,
        addressDeatils,
        addressDetails,
        provinceDetails,
        provinceDeatils,
        country,
        gender,
        DOB,
        numOfService,
        numOfClient,
        categoryDetails,
        isLicensed,
        taxProvinceDetails,
        GSTNumber,
        HSTNumber,
        PSTNumber,
        QSTNumber,
        screenStatus,
        typeDetails,
        numOfServiceBooked,
      } = o;
      const profileCompletion = ((screenStatus * 100 * 100) / 700).toFixed();
      const age = moment().diff(DOB !== null && DOB, "years");
      let viewServiceData = [];
      typeDetails?.length > 0 &&
        typeDetails?.forEach((e) => {
          viewServiceData?.push([e?.serviceTypeName]);
        });
      return tableData?.type === "Beautician"
        ? [
            titleCaseString(businessName),
            uid,
            hasShop === 0 ? "Independent" : "Own shop",
            moment(createdAt).format("DD MMM, YYYY"),
            titleCaseString(`${firstName} ${lastName}`),
            userDeatils?.[0]?.phoneNumber,
            userDeatils?.[0]?.email,
            `${addressDeatils?.[0]?.apartment && addressDeatils?.[0]?.apartment}
       ${addressDeatils?.[0]?.street && addressDeatils?.[0]?.street} ${
              addressDeatils?.[0]?.address && addressDeatils?.[0]?.address
            } ${addressDeatils?.[0]?.city && addressDeatils?.[0]?.city} ${
              addressDeatils?.[0]?.zipCode && addressDeatils?.[0]?.zipCode
            }`,
            "-",
            addressDeatils?.[0]?.city && addressDeatils?.[0]?.city,
            provinceDetails?.[0]?.name,
            country,
            "-",
            gender !== null ? gender : "-",
            numOfService,
            // "-",
            numOfClient,
            categoryDetails?.[0]?.serviceCategoryName,
            viewServiceData,
            isLicensed === 0 ? "No" : "Yes",
            taxProvinceDetails === null ? "No" : "Yes",
            GSTNumber === null
              ? HSTNumber === null
                ? "-"
                : HSTNumber
              : GSTNumber,
            QSTNumber === null
              ? PSTNumber === null
                ? "-"
                : PSTNumber
              : QSTNumber,
            profileCompletion && `${profileCompletion}%`,
          ]
        : [
            titleCaseString(`${firstName} ${lastName}`),
            uid,
            moment(createdAt).format("DD MMM, YYYY"),
            userDeatils?.[0]?.phoneNumber,
            userDeatils?.[0]?.email,
            `${
              addressDetails?.length > 0 ? addressDetails?.[0]?.apartment : "-"
            }, ${
              addressDetails?.length > 0 ? addressDetails?.[0]?.street : "-"
            }, ${
              addressDetails?.length > 0 ? addressDetails?.[0]?.address : "-"
            }`,
            "-",
            "-",
            provinceDeatils?.[0]?.name,
            country,
            "-",
            gender !== null ? gender : "-",
            DOB ? `${age}` : "-",
            numOfServiceBooked,
            // "-",
            "-",
          ];
    });
    setExportData((prev) => {
      return { ...prev, data: allUsersData, loader: true };
    });
    // setTimeout(() => {
    // setIsBtnLoading(false);
    // }, 5000);
  };

  const fetchAllUsersData = async (obj) => {
    const queryParams = objectToQueryParams(
      omit(obj, ["data", "loading", "total"])
    );

    const response = await dispatch(getAllUsersData(queryParams));
    if (response?.status === 200) {
      setTableData((prev) => {
        return {
          ...prev,
          data: response?.data?.allData,
          total: response?.data?.count || 0,
          loading: false,
        };
      });
    }
    if (response?.data?.count) {
      fetchTotalCountUsers(response?.data?.count);
    }
  };

  const fetchTotalCountUsers = async (totalLimit) => {
    const queryParams = objectToQueryParams({
      offset: 0,
      limit: totalLimit,
      type: tableData?.type,
    });
    const response = await dispatch(getAllUsersData(queryParams));
    setTotalCountUsers((prev) => {
      return {
        ...prev,
        data: response?.data?.allData,
        loading: false,
      };
    });
    exportTotalUsers(response?.data?.allData);
  };

  useEffect(() => {
    fetchAllUsersData(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelChangeAll = (e) => {
    if (e.target.checked) {
      const allUsers = tableData?.data?.map((o) => o);
      setCheckedUsers(allUsers);
    } else {
      setCheckedUsers([]);
    }
  };

  const handleSingleChange = (e, elem) => {
    if (e.target.checked) {
      setCheckedUsers([...checkedUsers, elem]);
    } else {
      setCheckedUsers(checkedUsers.filter((item) => item !== elem));
    }
  };

  let headers =
    tableData?.type === "Beautician"
      ? [
          "Business Name",
          "ID",
          "Business Type",
          "Registered Date",
          "Full Name",
          "Phone",
          "Email",
          "Address",
          "Language",
          "City",
          "Province",
          "Country",
          "Demographic",
          "Gender",
          "No. of Services",
          // "No. of Products",
          "No. of Clients",
          "Service Category",
          "Service Types",
          // "Product Names",
          "License",
          "Sales Tax",
          "GST/HST",
          "QST/PST",
          "Profile Completion",
        ]
      : [
          "Client Name",
          "ID",
          "Registered Date",
          "Phone",
          "Email",
          "Address",
          "Language",
          "City",
          "Province",
          "Country",
          "Demographic",
          "Gender",
          "Age",
          "Service Booked",
          "Profile Completion",
        ];
  let csvData = [];
  csvData = checkedUsers?.map((o) => {
    const {
      logo,
      profileImage,
      businessName,
      uid,
      hasShop,
      createdAt,
      firstName,
      lastName,
      userDeatils,
      addressDeatils,
      addressDetails,
      provinceDetails,
      provinceDeatils,
      country,
      gender,
      DOB,
      numOfService,
      numOfClient,
      categoryDetails,
      isLicensed,
      taxProvinceDetails,
      GSTNumber,
      HSTNumber,
      PSTNumber,
      QSTNumber,
      screenStatus,
      typeDetails,
      numOfServiceBooked,
    } = o;
    const profileCompletion = ((screenStatus * 100 * 100) / 700).toFixed();
    const age = moment().diff(DOB !== null && DOB, "years");
    let viewServiceData = [];
    typeDetails?.length > 0 &&
      typeDetails?.forEach((e) => {
        viewServiceData?.push([e?.serviceTypeName]);
      });
    return tableData?.type === "Beautician"
      ? [
          titleCaseString(businessName),
          uid,
          hasShop === 0 ? "Independent" : "Own shop",
          moment(createdAt).format("DD MMM, YYYY"),
          titleCaseString(`${firstName} ${lastName}`),
          userDeatils?.[0]?.phoneNumber,
          userDeatils?.[0]?.email,
          `${addressDeatils?.[0]?.apartment && addressDeatils?.[0]?.apartment}
           ${addressDeatils?.[0]?.street && addressDeatils?.[0]?.street} ${
            addressDeatils?.[0]?.address && addressDeatils?.[0]?.address
          } ${addressDeatils?.[0]?.city && addressDeatils?.[0]?.city} ${
            addressDeatils?.[0]?.zipCode && addressDeatils?.[0]?.zipCode
          }`,
          "-",
          addressDeatils?.[0]?.city && addressDeatils?.[0]?.city,
          provinceDetails?.[0]?.name,
          country,
          "-",
          gender !== null ? gender : "-",
          numOfService,
          // "-",
          numOfClient,
          categoryDetails?.[0]?.serviceCategoryName,
          viewServiceData,
          isLicensed === 0 ? "No" : "Yes",
          taxProvinceDetails === null ? "No" : "Yes",
          GSTNumber === null
            ? HSTNumber === null
              ? "-"
              : HSTNumber
            : GSTNumber,
          QSTNumber === null
            ? PSTNumber === null
              ? "-"
              : PSTNumber
            : QSTNumber,
          profileCompletion && `${profileCompletion}%`,
        ]
      : [
          titleCaseString(`${firstName} ${lastName}`),
          uid,
          moment(createdAt).format("DD MMM, YYYY"),
          userDeatils?.[0]?.phoneNumber,
          userDeatils?.[0]?.email,
          `${
            addressDetails?.length > 0 ? addressDetails?.[0]?.apartment : "-"
          }, ${
            addressDetails?.length > 0 ? addressDetails?.[0]?.street : "-"
          }, ${
            addressDetails?.length > 0 ? addressDetails?.[0]?.address : "-"
          }`,
          "-",
          "-",
          provinceDeatils?.[0]?.name,
          country,
          "-",
          gender !== null ? gender : "-",
          DOB ? `${age}` : "-",
          numOfServiceBooked,
          // "-",
          "-",
        ];
  });

  const [clickedCellIndex, setClickedCellIndex] = useState(null);
  const handleCellClick = (index) => {
    if (index !== clickedCellIndex) {
      setClickedCellIndex(index);
    } else {
      setClickedCellIndex(0);
    }
  };

  const header =
    tableData?.type === "Beautician"
      ? [
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600 d-flex align-items-center gap-2">
                <CheckBox
                  className="header-user-data-checkbox"
                  id="all"
                  onChange={handelChangeAll}
                  checked={checkedUsers.length === tableData?.data?.length}
                />
                Business Name
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Business Type
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Registered Date
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Full Name
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Phone
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Email
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Address
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Language
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                City
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
                Country
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Demographic
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Gender
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                No. of Services
              </div>
            ),
          },
          // {
          //   title: (
          //     <div className="text-nowrap color-dashboard-primary text-13-600">
          //       No. of Products
          //     </div>
          //   ),
          // },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                No. of Clients
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Service Category
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Service Types
              </div>
            ),
          },
          // {
          //   title: (
          //     <div className="text-nowrap color-dashboard-primary text-13-600">
          //       Product Names
          //     </div>
          //   ),
          // },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                License
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
                Profile Completion
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
        ]
      : [
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600 d-flex align-items-center gap-2">
                <CheckBox
                  className="header-user-data-checkbox"
                  id="all"
                  onChange={handelChangeAll}
                  checked={checkedUsers.length === tableData?.data?.length}
                />
                Client Name
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Registered Date
              </div>
            ),
          },

          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Phone
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Email
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Address
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Language
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                City
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
                Country
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Demographic
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Gender
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Age
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Service Booked
              </div>
            ),
          },
          // {
          //   title: (
          //     <div className="text-nowrap color-dashboard-primary text-13-600">
          //       Products Orders
          //     </div>
          //   ),
          // },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Profile Completion
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
      logo,
      profileImage,
      businessName,
      uid,
      hasShop,
      createdAt,
      firstName,
      lastName,
      userDeatils,
      addressDeatils,
      addressDetails,
      provinceDetails,
      provinceDeatils,
      country,
      gender,
      DOB,
      numOfService,
      numOfClient,
      categoryDetails,
      isLicensed,
      taxProvinceDetails,
      GSTNumber,
      HSTNumber,
      PSTNumber,
      QSTNumber,
      screenStatus,
      typeDetails,
      numOfServiceBooked,
    } = elem;

    const profileCompletion = ((screenStatus * 100 * 100) / 700).toFixed();
    const age = moment().diff(DOB !== null && DOB, "years");
    let obj =
      tableData?.type === "Beautician"
        ? [
            {
              value: (
                <div className="text-nowrap d-flex align-items-center gap-2">
                  <CheckBox
                    className="user-data-checkbox"
                    id="single-check"
                    checked={checkedUsers.includes(elem)}
                    onChange={(e) => {
                      handleSingleChange(e, elem);
                    }}
                  />

                  <div>
                    <UserProfileLayout size="40" url={logo} isSquare />
                  </div>
                  <div className="text-nowrap color-black-80">
                    <div className="color-black-100 text-13-500-21">
                      {titleCaseString(businessName)}
                    </div>
                    <div className="color-blue-60 text-11-500-18">
                      ID: {uid}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {hasShop === 0 ? "Independent" : "Own shop"}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {moment(createdAt).format("DD MMM, YYYY")}
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
              value: (
                <div className="text-nowrap color-black-80">
                  {userDeatils?.[0]?.phoneNumber}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-blue">
                  {userDeatils?.[0]?.email}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  <div>
                    {addressDeatils?.[0]?.apartment &&
                      addressDeatils?.[0]?.apartment}
                  </div>
                  <div>
                    {addressDeatils?.[0]?.street && addressDeatils?.[0]?.street}
                  </div>
                  <div>
                    {addressDeatils?.[0]?.address &&
                      addressDeatils?.[0]?.address}
                  </div>
                  <div>
                    {addressDeatils?.[0]?.city && addressDeatils?.[0]?.city}
                  </div>
                  <div>
                    {addressDeatils?.[0]?.zipCode &&
                      addressDeatils?.[0]?.zipCode}
                  </div>
                </div>
              ),
            },
            {
              value: <div className="text-nowrap color-black-80">-</div>,
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {addressDeatils?.[0]?.city && addressDeatils?.[0]?.city}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {provinceDetails?.[0]?.name}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{country}</div>
              ),
            },
            {
              value: <div className="text-nowrap color-black-80">-</div>,
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {gender !== null ? gender : "-"}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{numOfService}</div>
              ),
            },
            // {
            //   value: <div className="text-nowrap color-black-80">{}</div>,
            // },
            {
              value: (
                <div className="text-nowrap color-black-80">{numOfClient}</div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {categoryDetails?.[0]?.serviceCategoryName}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap list-items">
                  <div className="list-title">
                    <span className="color-black-80">View services</span>
                    <i className="bi bi-chevron-down toggle-btn" />
                  </div>
                  {typeDetails?.length > 0 &&
                    typeDetails?.map((e, i) => {
                      return (
                        <div className="list-content color-black-80" key={i}>
                          {e?.serviceTypeName}
                        </div>
                      );
                    })}
                </div>
              ),
            },
            // {
            //   value: (
            //     <div className="text-nowrap list-items">
            //       <div className="list-title">
            //         <span className="color-black-80">View products</span>
            //         <i className="bi bi-chevron-down toggle-btn" />
            //       </div>
            //       {/* {productName?.map((e, i) => {
            //         return (
            //           <div className="list-content color-black-80" key={i}>
            //             {e}
            //           </div>
            //         );
            //       })} */}
            //     </div>
            //   ),
            // },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {isLicensed === 0 ? "No" : "Yes"}
                </div>
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
                  {GSTNumber === null
                    ? HSTNumber === null
                      ? "-"
                      : HSTNumber
                    : GSTNumber}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {QSTNumber === null
                    ? PSTNumber === null
                      ? "-"
                      : PSTNumber
                    : QSTNumber}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {profileCompletion && `${profileCompletion}%`}
                </div>
              ),
            },
            {
              value: (
                <div
                  className="text-nowrap d-flex gap-2 align-items-center pointer"
                  onClick={() => {
                    singleBeauticianData(elem);
                  }}
                >
                  <CSVLink
                    data={[exportSingleData?.data]}
                    headers={headers}
                    filename={`singleBeautician.csv`}
                    className="text-decoration-none pointer"
                  >
                    <div className="d-flex gap-2 align-items-center">
                      <span className="text-13-500-21 color-black-80">
                        Download
                      </span>
                      <img src={icons.downloadBlack} alt="add-brands" />
                    </div>
                  </CSVLink>
                </div>
              ),
            },
          ]
        : [
            {
              value: (
                <div className="text-nowrap d-flex align-items-center gap-2">
                  <div>
                    <CheckBox
                      className="user-data-checkbox"
                      id="single-check"
                      checked={checkedUsers.includes(elem)}
                      onChange={(e) => {
                        handleSingleChange(e, elem);
                      }}
                    />
                  </div>
                  <div>
                    <UserProfileLayout
                      text={`${firstName} ${lastName}`}
                      size="40"
                      url={profileImage && profileImage}
                      isSquare
                    />
                  </div>
                  <div className="text-nowrap color-black-80">
                    <div className="color-black-100 text-13-500-21">
                      {titleCaseString(`${firstName} ${lastName}`)}
                    </div>
                    <div className="color-blue-60 text-11-500-18">
                      ID: {uid}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {moment(createdAt).format("DD MMM, YYYY")}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {userDeatils?.[0]?.phoneNumber}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-blue">
                  {" "}
                  {userDeatils?.[0]?.email}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  <div>
                    {addressDetails?.length > 0
                      ? addressDetails?.[0]?.apartment
                      : "-"}
                  </div>
                  <div>
                    {" "}
                    {addressDetails?.length > 0
                      ? addressDetails?.[0]?.street
                      : "-"}
                  </div>

                  <div>
                    {addressDetails?.length > 0
                      ? addressDetails?.[0]?.address
                      : "-"}
                  </div>
                </div>
              ),
            },
            {
              value: <div className="text-nowrap color-black-80">-</div>,
            },
            {
              value: <div className="text-nowrap color-black-80">-</div>,
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {provinceDeatils?.[0]?.name}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{country}</div>
              ),
            },
            {
              value: <div className="text-nowrap color-black-80">-</div>,
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {gender !== null ? gender : "-"}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {DOB ? `${age}` : "-"}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {numOfServiceBooked}
                </div>
              ),
            },
            // {
            //   value: <div className="text-nowrap color-black-80">"-"</div>,
            // },
            {
              value: <div className="text-nowrap color-black-80">-</div>,
            },
            {
              value: (
                <div
                  className="text-nowrap d-flex gap-2 align-items-center pointer"
                  onClick={() => {
                    singleClientData(elem);
                  }}
                >
                  <CSVLink
                    data={[exportSingleClientData?.data]}
                    headers={headers}
                    filename={`singleClient.csv`}
                    className="text-decoration-none pointer"
                  >
                    <div className="d-flex gap-2 align-items-center">
                      <span className="text-13-500-21 color-black-80">
                        Download
                      </span>
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
    setIsBtnLoading(true);
    doc.autoTable({
      html: "#my-table",
      columnStyles: { 3: { cellWidth: 100 } },
    });
    const tHeaders = headers;
    let row = [];
    let checkRow = csvData;
    // let row = csvData;
    let allRows = exportData?.data;
    row = checkedUsers.length ? checkRow : allRows;
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
    doc.save("User Data.pdf");
    setCheckedUsers([]);
    setIsBtnLoading(false);
  };

  // console.log("setIsBtnLoading", isBtnLoading);

  return (
    <div className="bg-white cpt-24 cpe-24 cpb-24 cps-24">
      <div className="d-flex justify-content-between align-items-center cmb-25">
        <div className="d-flex gap-3">
          <Button
            btnText="Beauticians"
            btnStyle={tableData?.type === "Beautician" ? "PD" : "GO"}
            className="rounded-pill"
            onClick={() => {
              let oldData = { ...tableData, type: "Beautician", loading: true };
              setTableData(oldData);
              fetchAllUsersData(oldData);
            }}
          />

          <Button
            btnText="Clients"
            btnStyle={tableData?.type === "Client" ? "PD" : "GO"}
            className="rounded-pill"
            onClick={() => {
              let oldData = { ...tableData, type: "Client", loading: true };
              setTableData(oldData);
              fetchAllUsersData(oldData);
            }}
          />
        </div>

        <ReportDownloadButton
          btnStyle="PD"
          btnText="DOWNLOAD REPORT"
          iconType="L-Download-White"
          headers={headers}
          setCheckUser={setCheckedUsers}
          data={checkedUsers.length ? csvData : exportData?.data}
          filename="UserData.csv"
          pdfFile={() => {
            Print();
          }}
          // isLoading={isBtnLoading}
          isCheck
        />
      </div>
      <div className="d-flex gap-2 align-items-center cmb-10">
        <span className="text-20-700 color-black-100">
          {tableData?.type === "Beautician" ? "Beauticians" : "Clients"}
        </span>
        <span className="text-17-600 color-blue-60">{tableData?.total}</span>
      </div>

      {tableData?.loading ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="sm" />
        </div>
      ) : (
        <div className="overflow-auto">
          <Table
            isClick
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
              fetchAllUsersData(oldData);
            }}
            clickedCellIndex={clickedCellIndex}
            onCellClick={handleCellClick}
          />
        </div>
      )}

      {/* <DisplayTable
        userType={userType}
        tableData={tableData}
        setTableData={setTableData}
      /> */}
    </div>
  );
};

export default UserData;

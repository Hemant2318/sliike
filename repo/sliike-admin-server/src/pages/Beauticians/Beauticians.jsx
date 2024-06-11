import React, { useEffect, useState } from "react";
// import SearchInput from "components/form/SearchInput";
import Button from "components/form/Button";
import { commonFilter, commonRoute, icons } from "utils/constants";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
// import MenuOption from "components/layouts/MenuOption/MenuOption";
import Table from "components/layouts/Table/Table";
// import RoundCheckBox from "components/form/RoundCheckBox/RoundCheckBox";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import StatusContainer from "components/layouts/StatusContainer/StatusContainer";
import { useDispatch } from "react-redux";
import { titleCaseString } from "utils/helpers";
import {
  changeArchive,
  changeRecommendStatus,
  changeStatus,
  deleteBeautician,
  getAllBeautician,
  throwSuccess,
} from "store/globalSlice";
import { omit } from "lodash";
import moment from "moment";
import DeleteConfirmPopup from "components/layouts/DeleteConfirmPopup/DeleteConfirmPopup";
import UserProfileLayout from "components/layouts/UserProfileLayout";
import MenuOption from "components/layouts/MenuOption/MenuOption";
import SearchInput from "components/form/SearchInput/SearchInput";
import RecommendContainer from "components/layouts/RecommendContainer/RecommendContainer";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReportDownloadButton from "components/layouts/ReportDownloadButton/ReportDownloadButton";
import RoundCheckBox from "components/form/RoundCheckBox/RoundCheckBox";
import "./Beauticians.scss";

// import { useReactToPrint } from "react-to-print";
// import { useRef } from "react";

const Beauticians = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checkBeautician, setCheckBeautician] = useState([]);
  const [exportData, setExportData] = useState({ data: [], loader: false });
  const [isSuccess, setIsSuccess] = useState(false);
  const [tableData, setTableData] = useState({
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    search: "",
    status: "",
    type: "",
    loading: true,
    data: [],
  });

  const [allDownloadsUser, setAllDownloadsUser] = useState({
    offset: 0,
    limit: tableData?.total,
    // intervalLimit: 10,
    total: 0,
    search: "",
    status: "",
    type: "",
    // loading: true,
    data: [],
  });
  console.log("allDownloadsUser", allDownloadsUser);

  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState({});
  const [buttonText, setButtonText] = useState("All");
  const [searchValue, setSearchValue] = useState();
  const [timer, setTimer] = useState("");

  const exportHeader = [
    "Business Name",
    "Id",
    "Address",
    "Working Days",
    "Recommend",
    "Status",
    "Business Setup Level",
    "Profile Completion",
  ];

  const handelChange = (e, elem) => {
    if (e.target.checked) {
      setCheckBeautician([...checkBeautician, elem]);
    } else {
      setCheckBeautician(checkBeautician?.filter((item) => item !== elem));
    }
  };

  let flagArray = checkBeautician?.map((o) => {
    const workDay = o?.workHours?.dayDetails?.map((o) => {
      return [o?.day, o?.startTime, o?.endTime];
    });
    const statusVal = o?.status === 1 ? "Active" : "Inactive";
    const recommendVal = o?.isRecommended === 1 ? "Yes" : "No";
    const businessDetails = o?.screenStatus >= 4 ? 14.3 : 0;
    const businessHours = o?.screenStatus === 7 ? 14.3 : 0;
    const license = o?.isLicensed === 1 ? 14.3 : 0;
    const services = o?.serviceCount >= 3 ? 14.3 : 0;
    const bankDetails = o?.stripe_id !== null ? 14.3 : 0;
    const importCount = o?.countInvitaion === 1 ? 14.3 : 0;
    const serviceTax = o?.taxProvinceDetails !== null ? 14.3 : 0;
    const businessLevel =
      businessDetails +
      businessHours +
      license +
      services +
      bankDetails +
      importCount +
      serviceTax;

    return [
      titleCaseString(o?.businessName) || "-",
      o?.uid || "-",
      o?.address?.address || "-",
      workDay || "-",
      recommendVal || "-",
      statusVal || "-",
      businessLevel.toFixed() === "14"
        ? `1 Step`
        : businessLevel.toFixed() === "29"
        ? `2 Step`
        : businessLevel.toFixed() === "43"
        ? `3 Step`
        : businessLevel.toFixed() === "57"
        ? `4 Step`
        : businessLevel.toFixed() === "72"
        ? `5 Step`
        : businessLevel.toFixed() === "86"
        ? `6 Step`
        : businessLevel.toFixed() === "100"
        ? `7 Step`
        : "-",
      `${businessLevel.toFixed()}%` || "-",
    ];
  });

  const exportBeauticianData = async (returnData) => {
    let flagAllData = [];
    flagAllData = returnData?.map((o) => {
      const workDay = o?.workHours?.dayDetails?.map((o) => {
        return [o?.day, o?.startTime, o?.endTime];
      });
      const statusVal =
        o?.userDetails?.isActiveBeautician === 1 ? "Active" : "Inactive";
      const recommendVal = o?.isRecommended === 1 ? "Yes" : "No";
      const businessDetails = o?.screenStatus >= 4 ? 14.3 : 0;
      const businessHours = o?.screenStatus === 7 ? 14.3 : 0;
      const license = o?.isLicensed === 1 ? 14.3 : 0;
      const services = o?.serviceCount >= 3 ? 14.3 : 0;
      const bankDetails = o?.stripe_id !== null ? 14.3 : 0;
      const importCount = o?.countInvitaion === 1 ? 14.3 : 0;
      const serviceTax = o?.taxProvinceDetails !== null ? 14.3 : 0;
      const businessLevel =
        businessDetails +
        businessHours +
        license +
        services +
        bankDetails +
        importCount +
        serviceTax;
      return [
        titleCaseString(o?.businessName) || "-",
        o?.uid || "-",
        o?.address?.address || "-",
        workDay || "-",
        recommendVal || "-",
        statusVal || "-",
        businessLevel.toFixed() === "14"
          ? `1 Step`
          : businessLevel.toFixed() === "29"
          ? `2 Step`
          : businessLevel.toFixed() === "43"
          ? `3 Step`
          : businessLevel.toFixed() === "57"
          ? `4 Step`
          : businessLevel.toFixed() === "72"
          ? `5 Step`
          : businessLevel.toFixed() === "86"
          ? `6 Step`
          : businessLevel.toFixed() === "100"
          ? `7 Step`
          : "-",
        `${businessLevel.toFixed()}%` || "-",
      ];
    });
    setExportData((prev) => {
      return { ...prev, data: flagAllData, loader: false };
    });
  };

  const fetchTableData = async (obj) => {
    // const queryParams = `?${objectToQueryParams(
    //   omit(obj, ["data", "loading", "total"])
    // )}`;
    const payload = omit(obj, ["data", "loading", "total"]);
    const response = await dispatch(getAllBeautician(payload));
    const data = response?.data?.allBeautician?.map((o) => {
      return { ...o, status: o?.userDetails?.isActiveBeautician };
    });
    setTableData((prev) => {
      return {
        ...prev,
        data: data,
        total: response?.data?.count || 0,
        loading: false,
      };
    });

    if (response?.data?.count > 0) {
      fetchTotalCountUsers(response?.data?.count);
    }
  };

  const fetchTotalCountUsers = async (totalRecords) => {
    const response = await dispatch(
      getAllBeautician({ offset: 0, limit: totalRecords })
    );

    setAllDownloadsUser((prev) => {
      return {
        ...prev,
        data: response?.data?.allBeautician,
        loading: false,
      };
    });

    exportBeauticianData(response?.data?.allBeautician);
  };

  const handelArchive = async ({ Id, type, isDeleted }) => {
    const payload = {
      Id: Id,
      type: type,
      isDeleted: isDeleted,
    };
    const response = await dispatch(changeArchive(payload));
    if (response?.status === 200) {
      dispatch(throwSuccess("Beautician archived"));
      fetchTableData(tableData);
    }
  };

  const handleFilter = async ({ filterStatus }) => {
    let oldData = tableData;
    oldData = { ...oldData, status: filterStatus };
    setTableData(oldData);
    fetchTableData(oldData);
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
    let time = timer;
    clearTimeout(time);
    time = setTimeout(() => {
      let oldData = { ...tableData, search: value, loading: true };
      setTableData(oldData);
      fetchTableData(oldData);
    }, 800);
    setTimer(time);
  };

  useEffect(() => {
    fetchTableData(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const header = [
    {
      title: "Business Name",
    },
    {
      title: "Address",
    },
    {
      title: <div className="text-nowrap">Working Days/Hours</div>,
    },
    {
      title: "Recommend",
    },
    {
      title: "Status",
    },
    {
      title: <div className="text-nowrap">Business Setup Level</div>,
    },
    {
      title: <div className="text-nowrap">Profile Completion</div>,
    },
    {
      title: "Action",
    },
  ];

  const rowData = [];
  tableData?.data?.forEach((elem) => {
    const {
      profileImage,
      businessName,
      _id,
      uid,
      address,
      // userDetails,
      workHours,
      isRecommended,
      status,
      screenStatus,
      isLicensed,
      serviceCount,
      stripe_id,
      countInvitaion,
      taxProvinceDetails,
      // isActiveBeautician,
    } = elem;
    // const status = userDetails?.isActiveBeautician;
    const currentDay = moment().format("dddd");
    const currentDayTime = workHours?.dayDetails?.find(
      (o) => o.day === currentDay
    );

    const businessDetails = screenStatus >= 4 ? 14.3 : 0;
    const businessHours = screenStatus === 7 ? 14.3 : 0;
    const license = isLicensed === 1 ? 14.3 : 0;
    const services = serviceCount >= 3 ? 14.3 : 0;
    const bankDetails = stripe_id !== null ? 14.3 : 0;
    const importCount = countInvitaion === 1 ? 14.3 : 0;
    const serviceTax = taxProvinceDetails !== null ? 14.3 : 0;

    const profileCompletion =
      businessDetails +
      businessHours +
      license +
      services +
      bankDetails +
      importCount +
      serviceTax;

    let obj = [
      {
        value: (
          <div className="text-start d-flex align-items-center gap-2 pointer">
            <div className="d-flex align-items-center gap-3">
              <RoundCheckBox
                id={_id}
                checked={checkBeautician.includes(elem)}
                onChange={(e) => {
                  handelChange(e, elem);
                }}
              />
              <UserProfileLayout
                isSquare
                // text={businessName ? `${businessName}` : "Business Name"}
                url={profileImage}
                size="40"
              />
            </div>
            <div
              onClick={() => {
                navigate(`/beauticians/details/${_id}`);
              }}
            >
              <div className="text-13-500-21 color-black-100">
                {businessName
                  ? titleCaseString(`${businessName}`)
                  : "Business Name"}
              </div>
              <div className="text-13-400 color-black-60 text-nowrap">
                ID: {uid}
              </div>
            </div>
          </div>
        ),
      },
      {
        value: (
          <div className="text-13-500 color-black-100">
            <div className="">
              {address ? address?.address : "-"}
              {/* {country} */}
            </div>
          </div>
        ),
      },
      {
        value: (
          <div className="d-flex">
            {workHours ? (
              <div className="d-flex text-13-500 color-black-20 gap-2 text-nowrap">
                <div className="color-black-80">{currentDay}</div>
                {workHours && (
                  <div className="color-black-100">
                    |{" "}
                    {currentDayTime?.isOpen === false
                      ? "Closed"
                      : `${currentDayTime?.startTime} ${
                          currentDayTime?.startTime &&
                          currentDayTime?.endTime &&
                          " - "
                        } ${currentDayTime?.endTime}`}
                  </div>
                )}
                <Dropdown align="start">
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <img src={icons.downArrow} alt="dwn-arrow" />
                  </Dropdown.Toggle>
                  <DropdownMenu>
                    {workHours?.dayDetails.map((elm, i) => {
                      const { day, startTime, endTime, isOpen } = elm;
                      return (
                        <DropdownItem className="">
                          <div
                            className="d-flex justify-content-between text-13-500 color-black-20 gap-2"
                            key={i}
                          >
                            <div className="color-black-80 w-50">{day}</div>

                            <div className="">
                              {(startTime || endTime || isOpen === false) &&
                                "|"}
                            </div>
                            <div className="color-black-100">
                              {isOpen === false
                                ? "Closed"
                                : `${startTime} ${
                                    startTime && endTime && " - "
                                  } ${endTime}`}
                              {/* {startTime}
                            {startTime && endTime && " - "}
                            {endTime} */}
                            </div>
                          </div>
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              "-"
            )}
          </div>
        ),
      },
      {
        value: (
          <div className="d-flex gap-2">
            <span className="text-13-500 color-black-100">
              {isRecommended === 1 ? "Yes" : "No"}
            </span>
            <span>
              <RecommendContainer
                title="Beautician"
                data={elem}
                apiFunction={async () => {
                  const payload = {
                    Id: _id,
                    isRecommended: !isRecommended,
                  };
                  return await dispatch(changeRecommendStatus(payload));
                }}
                handelSuccess={() => {
                  setTableData((prev) => {
                    let oldVal = prev?.data;
                    oldVal.map((el) => {
                      let newObj = el;
                      if (newObj?._id === elem?._id) {
                        newObj.isRecommended =
                          elem?.isRecommended === 1 ? 0 : 1;
                      }
                      return newObj;
                    });
                    return { ...prev, data: oldVal };
                  });
                }}
              />
            </span>
          </div>
        ),
      },
      {
        value: (
          <div className="d-flex gap-2">
            <span className="text-13-500 color-black-100">
              {status === 1 ? "Active" : "Inactive"}
            </span>
            <span>
              <StatusContainer
                title="Beautician"
                data={elem}
                apiFunction={async () => {
                  const payload = {
                    Id: _id,
                    type: "beautician",
                    status: !status,
                  };
                  return await dispatch(changeStatus(payload));
                }}
                handelSuccess={() => {
                  if (status === 1) {
                    setIsSuccess(true);
                    setTimeout(() => {
                      setIsSuccess(false);
                    }, 3000);
                  }
                  setTableData((prev) => {
                    let oldVal = prev?.data;
                    oldVal.map((el) => {
                      let newObj = el;
                      if (newObj?._id === elem?._id) {
                        newObj.status = elem?.status === 1 ? 0 : 1;
                      }
                      return newObj;
                    });
                    return { ...prev, data: oldVal };
                  });
                }}
              />
            </span>
          </div>
        ),
      },
      {
        value: (
          <div className="d-flex">
            {/* {tempStep ? `${tempStep}/7` : "-"} */}
            {profileCompletion.toFixed() === "14"
              ? `1/7`
              : profileCompletion.toFixed() === "29"
              ? `2/7`
              : profileCompletion.toFixed() === "43"
              ? `3/7`
              : profileCompletion.toFixed() === "57"
              ? `4/7`
              : profileCompletion.toFixed() === "72"
              ? `5/7`
              : profileCompletion.toFixed() === "86"
              ? `6/7`
              : profileCompletion.toFixed() === "100"
              ? `7/7`
              : 0}
          </div>
        ),
      },
      {
        value: (
          <div>{profileCompletion && `${profileCompletion.toFixed()}%`}</div>
        ),
      },
      {
        value: (
          <Dropdown align="end">
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <img src={icons.threeDots} alt="options" className="pointer" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                href=""
                className="d-flex align-items-center gap-2 mb-1"
                onClick={() => {
                  navigate(`/beauticians/beautician-dashboard/${_id}`);
                }}
              >
                <span>
                  <img src={icons.dashboardIcon} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">
                  View Dashboard
                </span>
              </Dropdown.Item>
              <Dropdown.Item
                href=""
                className="d-flex align-items-center gap-2 mb-1"
                onClick={() => {
                  handelArchive({
                    Id: elem?._id,
                    type: "beautician",
                    isDeleted: !elem?.isDeleted,
                  });
                }}
              >
                <span>
                  <img src={icons.archiveIcon} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">
                  Archive Beautician
                </span>
              </Dropdown.Item>
              <Dropdown.Item
                href=""
                className="d-flex align-items-center gap-2 mb-1"
                onClick={() => {
                  navigate(`/beauticians/update/${_id}`);
                }}
              >
                <span>
                  <img src={icons.edit} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">
                  Edit Beautician
                </span>
              </Dropdown.Item>
              <Dropdown.Item
                href=""
                className="d-flex align-items-center gap-2 mb-1"
                onClick={() => {
                  setIsDeletePopup(true);
                  setDeleteId(elem);
                }}
              >
                <span>
                  <img src={icons.trashIcon} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">
                  Delete Beautician
                </span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
    const header = [
      "Business Name",
      "ID",
      "Address",
      "Working Days",
      "Recommend",
      "Status",
      "Business Level",
      "Profile Completion",
    ];

    let row = [];
    let checkRow = flagArray;
    let allRow = exportData?.data;

    // checkRow = checkBeautician?.map((o) => {
    //   const workDay = o?.workHours?.dayDetails
    //     ?.map((elm) => {
    //       return [
    //         elm?.day,
    //         elm?.startTime ? elm?.startTime : "-",
    //         elm?.endTime ? elm?.endTime : "-",
    //       ];
    //     })
    //     .join("\r\n");

    //   const statusVal = o?.status === 1 ? "Active" : "Inactive";
    //   const recommendVal = o?.isRecommended === 1 ? "Yes" : "No";
    //   const businessDetails = o?.screenStatus >= 4 ? 14.3 : 0;
    //   const businessHours = o?.screenStatus === 7 ? 14.3 : 0;
    //   const license = o?.isLicensed === 1 ? 14.3 : 0;
    //   const services = o?.serviceCount >= 3 ? 14.3 : 0;
    //   const bankDetails = o?.stripe_id !== null ? 14.3 : 0;
    //   const importCount = o?.countInvitaion === 1 ? 14.3 : 0;
    //   const serviceTax = o?.taxProvinceDetails !== null ? 14.3 : 0;
    //   const businessLevel =
    //     businessDetails +
    //     businessHours +
    //     license +
    //     services +
    //     bankDetails +
    //     importCount +
    //     serviceTax;
    //   return [
    //     titleCaseString(o?.businessName) || "-",
    //     o?.uid || "-",
    //     o?.address?.address || "-",
    //     workDay || "-",
    //     recommendVal || "-",
    //     statusVal || "-",
    //     businessLevel.toFixed() === "14"
    //       ? `1 Step`
    //       : businessLevel.toFixed() === "29"
    //       ? `2 Step`
    //       : businessLevel.toFixed() === "43"
    //       ? `3 Step`
    //       : businessLevel.toFixed() === "57"
    //       ? `4 Step`
    //       : businessLevel.toFixed() === "72"
    //       ? `5 Step`
    //       : businessLevel.toFixed() === "86"
    //       ? `6 Step`
    //       : businessLevel.toFixed() === "100"
    //       ? `7 Step`
    //       : "-",
    //     `${businessLevel.toFixed()}%` || "-",
    //   ];
    // });

    row = checkBeautician.length ? checkRow : allRow;

    doc.autoTable(header, row, {
      startY: false,
      theme: "grid",
      tableWidth: "auto",
      columnWidth: "wrap",
      showHeader: "everyPage",
      // tableLineColor: 200,
      tableLineWidth: 0,
      columnStyles: {
        0: {
          columnWidth: 30,
        },
        1: {
          columnWidth: 25,
        },
        2: {
          columnWidth: "auto",
        },
        3: {
          columnWidth: "auto",
          // cellWidth: "wrap",
        },
        4: {
          columnWidth: 25,
        },
        5: {
          columnWidth: 20,
        },
        6: {
          columnWidth: 30,
        },
        7: {
          columnWidth: 35,
        },
        // rowPageBreak: "avoid",
      },
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
    doc.save("Beautician.pdf");
  };

  return (
    <div id="beautician-container" className="mt-3">
      {isSuccess && (
        <div className="beautician-success-conteiner d-flex gap-2 align-items-center rounded">
          <span className="bg-white pt-1 pb-1 ps-1 pe-1 rounded">
            <i className="bi bi-check d-flex" />
          </span>
          <span className="text-14-500 color-white">
            Beautician deactivated
          </span>
        </div>
      )}
      {isDeletePopup &&
        (deleteId ? (
          <DeleteConfirmPopup
            title="Beautician"
            deleteId={deleteId}
            onHide={() => {
              setIsDeletePopup(false);
            }}
            apiFunction={async () => {
              await dispatch(deleteBeautician(deleteId._id));
              dispatch(throwSuccess("Beautician Deleted Successfully."));
              setIsDeletePopup(false);
              fetchTableData();
              return;
            }}
            handelSuccess={() => {
              fetchTableData();
            }}
          />
        ) : (
          ""
        ))}

      <div className="beautician-header-block">
        <div className="content-block cps-10 cpt-24 cpe-24">
          <div className="title-value-block d-flex align-items-center gap-2 cmb-24">
            <div className="text-20-700 color-black-100">Businesses</div>
            <div className="value-block text-13-600 color-dashboard-primary cpt-2 cpe-6 cpb-2 cps-6">
              {tableData?.total}
            </div>
          </div>

          <div className="header-buttons-block d-flex gap-2 flex-wrap cmb-20">
            <div className="all-button-div">
              <MenuOption
                icon={
                  <Button
                    btnText={buttonText}
                    btnStyle="PLO"
                    iconType="R-Filter"
                  />
                }
                option={commonFilter.map((o) => {
                  return {
                    text: o?.value,
                    onClick: () => {
                      handleFilter({ filterStatus: o?.id });
                      setButtonText(o?.value);
                    },
                  };
                })}
              ></MenuOption>
            </div>

            <SearchInput
              placeholder="Search beauticians"
              value={searchValue}
              onChange={handleSearch}
            />

            <Button
              btnText="ARCHIVE"
              btnStyle="PLO"
              iconType="L-BlackArchive"
              onClick={() => {
                navigate("/beauticians/archive");
              }}
            />

            <Button
              btnText="ADD BEAUTICIAN"
              btnStyle="PLO"
              leftIcon={<img src={icons.addSquareBlack} alt="add-beautician" />}
              onClick={() => {
                navigate(commonRoute.registerBeautician);
              }}
            />

            <ReportDownloadButton
              btnText="DOWNLOAD"
              btnStyle="PLO"
              iconType="L-Download"
              checkUser={checkBeautician}
              setCheckUser={setCheckBeautician}
              data={checkBeautician.length ? flagArray : exportData?.data}
              headers={exportHeader}
              filename={`Beautician.csv`}
              pdfFile={() => {
                Print();
              }}
              isCheck
            />
          </div>
        </div>

        <div className="overflow-auto">
          <Table
            header={header}
            rowData={rowData}
            isLoading={tableData?.loading}
            tableData={tableData}
            changeOffset={(newOffset, newLimit = tableData.limit) => {
              let oldData = {
                ...tableData,
                offset: newOffset,
                limit: newLimit,
                loading: true,
              };
              setTableData(oldData);
              fetchTableData(oldData);
            }}
            isPagination
          />
        </div>
      </div>
    </div>
  );
};

export default Beauticians;

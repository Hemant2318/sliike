import React, { useEffect, useState } from "react";
import Table from "components/layouts/Table/Table";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { icons } from "utils/constants";
import { omit } from "lodash";
import {
  changeArchive,
  changeRecommendStatus,
  changeStatus,
  // deleteBeautician,
  getAllBeautician,
  throwSuccess,
} from "store/globalSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import StatusContainer from "components/layouts/StatusContainer/StatusContainer";
import { titleCaseString } from "utils/helpers";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import RecommendContainer from "components/layouts/RecommendContainer/RecommendContainer";
import "./Archive.scss";

const Archive = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const [isDeletePopup, setIsDeletePopup] = useState(false);
  // const [deleteId, setDeleteId] = useState({});

  const [tableData, setTableData] = useState({
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    search: "",
    loading: true,
    type: "archive",
    data: [],
  });
  const fetchTableData = async (obj) => {
    const payload = omit(obj, ["data", "loading", "total"]);

    const response = await dispatch(getAllBeautician(payload));
    const data = response?.data?.allBeautician?.map((o, k) => {
      return { ...o, status: o?.userDetails?.isActiveBeautician };
    });
    // console.log("data", data);

    setTableData((prev) => {
      return {
        ...prev,
        data: data,
        total: response?.data?.count || 0,
        loading: false,
      };
    });
  };

  const handelArchive = async ({ Id, type, isDeleted }) => {
    const payload = {
      Id: Id,
      type: type,
      isDeleted: isDeleted,
    };
    const response = await dispatch(changeArchive(payload));
    if (response?.status === 200) {
      dispatch(throwSuccess("Beautician unarchive"));
      fetchTableData(tableData);
    }
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
  tableData?.data.forEach((elem) => {
    const {
      profileImage,
      businessName,
      uid,
      _id,
      address,
      workHours,
      isRecommended,
      status,
      screenStatus,
    } = elem;
    const currentDay = moment().format("dddd");
    const currentDayTime = workHours?.dayDetails?.find(
      (o) => o.day === currentDay
    );

    const profileCompletion = ((screenStatus * 100 * 100) / 700).toFixed();

    let obj = [
      {
        value: (
          <div className="text-start d-flex align-items-center gap-2 pointer">
            <div className="d-flex">
              {/* <RoundCheckBox /> */}
              <UserProfileLayout
                isRounded
                text={businessName ? `${businessName}` : "Business Name"}
                url={profileImage}
                size="40"
              />
            </div>
            <div
            // onClick={() => {
            //   navigate(`/beauticians/${_id}`);
            // }}
            >
              <div className="text-13-500-21 color-black-100">
                {businessName
                  ? titleCaseString(`${businessName}`)
                  : "Beautician"}
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
                    status: "1",
                  };
                  // console.log("payload", payload);
                  return await dispatch(changeStatus(payload));
                }}
                handelSuccess={() => {
                  setTableData((prev) => {
                    // console.log("prev", prev?.data);
                    let oldVal = prev?.data;
                    oldVal.map((el, key) => {
                      let newObj = el;
                      // console.log("oldVal", oldVal);
                      if (newObj?._id === elem?._id) {
                        newObj.status = elem?.status === 1 ? 0 : 1;
                      }
                      return newObj;
                    });
                    return { ...prev, data: oldVal };
                  });
                }}
              />
              {/* <SwitchBox
                checked={status}
                onChange={() => {
                  handelActiveInactive(elem);
                }}
              /> */}
            </span>
          </div>
        ),
      },
      {
        value: (
          <div className="d-flex">
            {screenStatus ? `${screenStatus}/7` : "-"}
          </div>
        ),
      },
      {
        value: <div>{profileCompletion && `${profileCompletion}%`}</div>,
      },
      {
        value: (
          <Dropdown align="end">
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <img src={icons.threeDots} alt="options" className="pointer" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item
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
              </Dropdown.Item> */}
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
                  <img src={icons.archiveSlash} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">
                  Unarchive Beautician
                </span>
              </Dropdown.Item>
              {/* <Dropdown.Item
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
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        ),
      },
    ];
    rowData.push({ data: obj });
  });
  return (
    <div id="archived-container">
      {/* {isDeletePopup &&
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
        ))} */}

      <div className="heading-section cmb-40 cps-24 cpt-24 cpe-24">
        <div className="text-20-700 color-black-100">Archived</div>
      </div>
      {/* <div className="button-section">
        <div className="d-flex justify-content-end cpt-11 cpb-10">
          <Button
            btnText="Go to next slide"
            btnStyle="PLO"
            iconType="R-Arrow"
            className="rounded-pill"
          />
        </div>
      </div> */}
      <div className="opacity-75">
        <Table
          header={header}
          rowData={rowData}
          isLoading={tableData?.loading}
          tableData={tableData}
          searchText={tableData?.search}
          searchInputChange={(searchText) => {
            let oldData = { ...tableData, search: searchText, loading: true };
            setTableData(oldData);
            fetchTableData(oldData);
          }}
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
  );
};

export default Archive;

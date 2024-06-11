import Table from "components/layouts/Table/Table";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import { omit } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeArchive, getAllServices } from "store/globalSlice";
import { icons } from "utils/constants";
import { titleCaseString } from "utils/helpers";

const ServiceArchive = () => {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [tableData, setTableData] = useState({
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    search: "",
    type: "archive",
    category: categoryId || "",
    loading: true,
    data: [],
  });

  const fetchAllServices = async (obj) => {
    const payload = omit(obj, ["data", "loading", "total"]);
    // console.log("payload", payload);

    const response = await dispatch(getAllServices(payload));

    setTableData((prev) => {
      return {
        ...prev,
        data: response?.allServices?.data,
        total: response?.allServices?.count || 0,
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
      // dispatch(throwSuccess("Vendor unarchive"));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      fetchAllServices(tableData);
    }
  };

  useEffect(() => {
    fetchAllServices(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const header = [
    {
      title: <div className="text-start ps-3">Beauty Businesses</div>,
    },
    {
      title: "Category",
    },
    {
      title: <div className="text-nowrap">Registered Date</div>,
    },
    {
      title: <div className="text-nowrap">Total No. of Services</div>,
    },
    {
      title: "Pending",
    },
    {
      title: "Delivered",
    },
    {
      title: "Cancelled",
    },
    {
      title: <div className="text-nowrap">No-show</div>,
    },
    {
      title: "Action",
    },
  ];

  const rowData = [];

  tableData?.data.forEach((elem) => {
    const {
      profileImageURL,
      businessName,
      serviceName,
      createdAt,
      totalService,
      pending,
      delieverd,
      cancelled,
      noShow,
    } = elem;
    let obj = [
      {
        value: (
          <div className="text-start ps-3 d-flex align-items-center gap-2">
            <div>
              <UserProfileLayout isRounded url={profileImageURL} size="40" />
            </div>
            <div>
              <div
                className="text-13-500-21 pointer text-nowrap"
                onClick={() => {
                  // navigate("/services/1");
                }}
              >
                {businessName
                  ? titleCaseString(`${businessName}`)
                  : "Business Name"}
              </div>
              {/* <div className="text-9-500 color-blue-60">ID: {user_id}</div> */}
            </div>
          </div>
        ),
      },
      {
        value: serviceName.map((o) => {
          const { serviceCategoryName } = o;
          return (
            <ul className="color-dashboard-primary text-nowrap">
              <li className="text-nowrap">{serviceCategoryName}</li>
            </ul>
          );
        }),
      },
      {
        value: (
          <div className="color-dashboard-primary text-nowrap">
            {moment(createdAt).format("DD-MM-YYYY")}
          </div>
        ),
      },
      {
        value: <div className="color-dashboard-primary">{totalService}</div>,
      },
      {
        value: <div className="color-dashboard-primary">{pending}</div>,
      },
      {
        value: <div className="color-dashboard-primary">{delieverd}</div>,
      },
      {
        value: <div className="color-dashboard-primary">{cancelled}</div>,
      },
      {
        value: <div className="color-dashboard-primary">{noShow}</div>,
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
                // onClick={() => {
                //   navigate(`/beauticians/dashboard/${_id}`);
                // }}
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
                  Unarchive Vendor
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
                  Delete Vendor
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
    <div className="">
      <div className="cpt-24 cmb-10 position-relative">
        <div className="title-value-block d-flex align-items-center gap-2 cmb-24 position-relative">
          <div className="text-20-700 color-black-100">Archive</div>
        </div>
        {isSuccess && (
          <div className="success-conteiner-2 d-flex gap-2 align-items-center rounded cmb-30">
            <span className="bg-white pt-1 pb-1 ps-1 pe-1 rounded">
              <i className="bi bi-check d-flex" />
            </span>
            <span className="text-14-500 color-white">Unarchived</span>
          </div>
        )}

        <div className="overflow-auto cmt-90">
          <Table
            header={header}
            rowData={rowData}
            isLoading={tableData?.loading}
            searchLabel="Search Vendor"
            searchText={tableData?.search}
            tableData={tableData}
            searchInputChange={(searchText) => {
              let oldData = { ...tableData, search: searchText, loading: true };
              setTableData(oldData);
              fetchAllServices(oldData);
            }}
            changeOffset={(newOffset, newLimit = tableData.limit) => {
              let oldData = {
                ...tableData,
                offset: newOffset,
                limit: newLimit,
                loading: true,
              };
              setTableData(oldData);
              fetchAllServices(oldData);
            }}
            isPagination
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceArchive;

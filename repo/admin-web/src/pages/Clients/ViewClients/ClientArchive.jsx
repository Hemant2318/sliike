// import SearchInput from "components/form/SearchInput/SearchInput";
import StatusContainer from "components/layouts/StatusContainer/StatusContainer";
import Table from "components/layouts/Table/Table";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import { omit } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  changeArchive,
  changeStatus,
  // deleteClient,
  getAllClients,
  throwSuccess,
} from "store/globalSlice";
import { icons } from "utils/constants";

const ClientArchive = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [isDeletePopup, setIsDeletePopup] = useState(false);
  // const [deleteID, setDeleteID] = useState({});
  const [tableData, setTableData] = useState({
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    search: "",
    type: "archive",
    loading: true,
    data: [],
  });

  const fetchAllClients = async (obj) => {
    const payload = omit(obj, ["data", "loading", "total"]);
    const response = await dispatch(getAllClients(payload));
    // console.log("response client", response);
    const data = response?.data?.allClients?.map((o, k) => {
      return { ...o, status: o?.userDetails?.isActiveUser };
    });
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
    const archivePayload = {
      Id: Id,
      type: type,
      isDeleted: isDeleted,
    };
    const response = await dispatch(changeArchive(archivePayload));
    // console.log("response", response);
    if (response?.status === 200) {
      dispatch(throwSuccess("Client unarchive"));
      fetchAllClients(tableData);
    }
  };
  useEffect(() => {
    fetchAllClients(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const header = [
    {
      title: <div className="text-start ps-3">Client</div>,
    },
    {
      title: "Status",
    },
    {
      title: "Address",
    },
    {
      title: "City",
    },
    {
      title: "Province",
    },
    {
      title: "Contact",
    },
    {
      title: "Gender",
    },
    {
      title: "Age",
    },
    {
      title: "Demography",
    },
    {
      title: "Last service",
    },
    {
      title: "Action",
    },
  ];

  const rowData = [];
  //   console.log("tabledata", tableData?.data);
  tableData?.data.forEach((elem) => {
    const {
      uid,
      _id,
      firstName,
      lastName,
      gender,
      DOB,
      //  address,
      userDetails,
      status,
    } = elem;
    const age = moment().diff(DOB, "years");

    let obj = [
      {
        value: (
          <div className="text-start ps-3 d-flex align-items-center gap-2">
            <div>
              <UserProfileLayout
                isRounded
                text={`${firstName} ${lastName}`}
                size="40"
              />
            </div>
            <div>
              <div
                className="text-13-500-21 pointer"
                // onClick={() => {
                //   navigate("/clients/1");
                // }}
              >{`${firstName} ${lastName}`}</div>
              <div className="text-9-500 color-black-60">ID: {uid}</div>
            </div>
          </div>
        ),
      },
      {
        value: (
          <div className="d-flex align-items-center gap-2">
            <span>{status === 1 ? "Active" : "Inactive"}</span>
            <span>
              <StatusContainer
                title="Client"
                data={elem}
                apiFunction={async () => {
                  const payload = {
                    Id: _id,
                    type: "client",
                    status: !status,
                  };
                  return await dispatch(changeStatus(payload));
                }}
                handelSuccess={() => {
                  setTableData((prev) => {
                    let oldData = prev?.data;
                    oldData.map((e, i) => {
                      let newObj = e;
                      if (newObj?._id === elem?._id) {
                        newObj.status = elem?.status === 1 ? 0 : 1;
                      }
                      return newObj;
                    });
                    return { ...prev, data: oldData };
                  });
                }}
              />
            </span>
          </div>
        ),
      },
      {
        value: "-",
      },
      {
        value: "-",
      },
      {
        value: "-",
      },
      {
        value: (
          <div className="text-13-500-21">
            <div className="black-100">{userDetails?.phoneNumber}</div>
            <div className="color-blue">{userDetails?.email}</div>
          </div>
        ),
      },
      {
        value: <div>{gender ? gender : "-"}</div>,
      },
      {
        value: <div>{DOB ? `${age} yrs` : "-"}</div>,
      },
      {
        value: "-",
      },
      {
        value: "18 Jul, 2023",
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
                    type: "client",
                    isDeleted: !elem?.isDeleted,
                  });
                }}
              >
                <span>
                  <img src={icons.archiveSlash} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">
                  Unarchive Client
                </span>
              </Dropdown.Item>
              {/* <Dropdown.Item
                href=""
                className="d-flex align-items-center gap-2 mb-1"
                onClick={() => {
                  setIsDeletePopup(true);
                  setDeleteID(elem);
                }}
              >
                <span>
                  <img src={icons.trashIcon} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">
                  Delete Client
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
    <div
      id="client-archive-container"
      className="card-effect cmt-24 position-relative"
    >
      {/* {isDeletePopup &&
        (deleteID ? (
          <DeleteConfirmPopup
            title="Client"
            deleteID={deleteID}
            onHide={() => {
              setIsDeletePopup(false);
            }}
            apiFunction={async () => {
              await dispatch(deleteClient(deleteID._id));
              dispatch(throwSuccess("Client Deleted Successfully."));
              setIsDeletePopup(false);
              return;
            }}
          />
        ) : (
          ""
        ))} */}
      <div className="cpt-24 cps-24 cmb-10">
        <div className="title-value-block d-flex align-items-center gap-2 cmb-24">
          <div className="text-20-700 color-black-100">Archived</div>
          {/* <div className="text-13-600 color-dashboard-primary bg-blue-5 rounded-pill ps-2 pe-2 pt-1">
            1000
          </div> */}
        </div>
        {/* <div className="d-flex gap-3">
          <Button btnText="All" btnStyle="PLO" iconType="R-Filter" />

          <SearchInput
            placeholder="Search client"
            value=""
            onChange={() => {}}
          />
        </div> */}
        {/* <div className="d-flex justify-content-end cme-24 cmt-35">
          <Button
            btnText="Go to next slide"
            btnStyle="PLO"
            iconType="R-Arrow"
            className="rounded-pill"
          />
        </div> */}
      </div>
      <div className="opacity-75">
        <Table
          header={header}
          rowData={rowData}
          isLoading={tableData?.loading}
          searchLabel="Search Client"
          searchText={tableData?.search}
          tableData={tableData}
          searchInputChange={(searchText) => {
            let oldData = { ...tableData, search: searchText, loading: true };
            setTableData(oldData);
            fetchAllClients(oldData);
          }}
          changeOffset={(newOffset, newLimit = tableData.limit) => {
            let oldData = {
              ...tableData,
              offset: newOffset,
              limit: newLimit,
              loading: true,
            };
            setTableData(oldData);
            fetchAllClients(oldData);
          }}
          isPagination
        />
      </div>
    </div>
  );
};

export default ClientArchive;

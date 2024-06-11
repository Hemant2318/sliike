import Button from "components/form/Button";
import SearchInput from "components/form/SearchInput/SearchInput";
// import SearchInput from "components/form/SearchInput";
import DeleteConfirmPopup from "components/layouts/DeleteConfirmPopup/DeleteConfirmPopup";
import MenuOption from "components/layouts/MenuOption/MenuOption";
import ReportDownloadButton from "components/layouts/ReportDownloadButton/ReportDownloadButton";
import StatusContainer from "components/layouts/StatusContainer";
import Table from "components/layouts/Table";
import UserProfileLayout from "components/layouts/UserProfileLayout";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { omit } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeArchive,
  changeStatus,
  deleteClient,
  getAllClients,
  throwSuccess,
} from "store/globalSlice";
import { commonFilter, commonRoute, icons } from "utils/constants";
import { titleCaseString } from "utils/helpers";

const ViewClients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [deleteID, setDeleteID] = useState({});
  const [buttonText, setButtonText] = useState("All");
  const [searchValue, setSearchValue] = useState();
  const [timer, setTimer] = useState("");
  const [exportData, setExportData] = useState({ data: [], loading: false });
  const exportHeader = [
    "First Name",
    "Last Name",
    "Id",
    "Status",
    "Address",
    "Province",
    "Mobile No",
    "Email",
    "Gender",
    "Age",
    "Last Service",
  ];

  const [tableData, setTableData] = useState({
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    search: "",
    status: "",
    loading: true,
    data: [],
  });

  const [totalData, setTotalData] = useState({
    offset: 0,
    limit: tableData?.total,
    total: 0,
    search: "",
    status: "",
    type: "",
    data: [],
  });

  const getClientData = async (returnData) => {
    let flagArray = [];
    flagArray = returnData?.map((o) => {
      const statusVal =
        o?.userDetails?.isActiveUser === 1 ? "Active" : "Inactive";
      const add = o?.address.length
        ? `${o?.address?.[0]?.street && o?.address?.[0]?.street} ${
            o?.address?.[0]?.apartment && o?.address?.[0]?.apartment
          }, ${o?.address?.[0]?.provinceName && o?.address?.[0]?.provinceName}`
        : "-";

      const ageYear = moment().diff(o.DOB, "years");
      const Serviced = o?.lastArrayElement[0]?.createdAt;
      const ServicedLast = moment(Serviced).format("DD-MM-YYYY");

      return [
        o.firstName || "",
        o.lastName || "",
        o.uid || "",
        statusVal || "",
        add || "",
        o.address[0]?.provinceName || "",
        o.userDetails?.phoneNumber || "",
        o.userDetails?.email || "",
        o.gender || "",
        ageYear || "",
        ServicedLast || "",
      ];
    });
    setExportData((prev) => {
      return { ...prev, data: flagArray, loading: false };
    });
  };

  const fetchAllClients = async (obj) => {
    const payload = omit(obj, ["data", "loading", "total"]);
    const response = await dispatch(getAllClients(payload));
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

    if (response?.data?.count > 0) {
      fetchTotalCountUsers(response?.data?.count);
    }
  };

  const fetchTotalCountUsers = async (totalLimit) => {
    const response = await dispatch(
      getAllClients({ offset: 0, limit: totalLimit })
    );

    if (response?.status === 200) {
      setTotalData((prev) => {
        return {
          ...prev,
          data: response?.data?.allClients,
        };
      });
    }
    getClientData(response?.data?.allClients);
  };

  const handelArchive = async ({ Id, type, isDeleted }) => {
    const archivePayload = {
      Id: Id,
      type: type,
      isDeleted: isDeleted,
    };
    const response = await dispatch(changeArchive(archivePayload));
    if (response?.status === 200) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      fetchAllClients(tableData);
    }
  };

  const handleFilter = async ({ filterStatus }) => {
    let oldData = tableData;
    oldData = { ...oldData, status: filterStatus };
    setTableData(oldData);
    fetchAllClients(oldData);
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
    let time = timer;
    clearTimeout(time);
    time = setTimeout(() => {
      let oldData = { ...tableData, search: value, loading: true };
      setTableData(oldData);
      fetchAllClients(oldData);
    }, 800);
    setTimer(time);
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
      title: <div className="text-nowrap">Status</div>,
    },
    {
      title: <div className="text-nowrap">Address</div>,
    },
    // {
    //   title: "City",
    // },
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
    // {
    //   title: "Demography",
    // },
    {
      title: <div className="text-nowrap">Last service</div>,
    },
    {
      title: "Action",
    },
  ];

  const rowData = [];
  tableData?.data?.forEach((elem) => {
    const {
      uid,
      _id,
      profileImage,
      firstName,
      lastName,
      gender,
      DOB,
      address,
      userDetails,
      status,
      lastArrayElement,
    } = elem;
    const age = moment().diff(DOB, "years");
    const lastServiced = lastArrayElement[0]?.createdAt;

    let obj = [
      {
        value: (
          <div className="text-start ps-3 d-flex align-items-center gap-2">
            <div>
              <UserProfileLayout
                isRounded
                // text={`${firstName} ${lastName}`}
                size="40"
                url={profileImage && profileImage}
              />
            </div>
            <div>
              <div
                className="text-13-500-21 pointer text-nowrap color-black-100"
                onClick={() => {
                  navigate(`/clients/details/${_id}`);
                }}
              >
                {titleCaseString(`${firstName} ${lastName}`)}
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
        value: (
          <div>
            {address[0]?.apartment && address[0]?.apartment}
            {address[0]?.apartment && ","}
            {address[0]?.address && address[0]?.address}
          </div>
        ),
      },
      // {
      //   value: "-",
      // },
      {
        value: address[0]?.provinceName,
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
        value: <div className="text-nowrap">{DOB ? `${age} yrs` : "-"}</div>,
      },
      // {
      //   value: "-",
      // },
      {
        value: (
          <div className="text-nowrap">
            {lastArrayElement && moment(lastServiced).format("DD-MM-YYYY")}
          </div>
        ),
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
                  <img src={icons.archiveIcon} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">
                  Archive Client
                </span>
              </Dropdown.Item>
              <Dropdown.Item
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
    doc.autoTable({ html: "client_table" });
    const header = [
      "Client",
      "ID",
      "Status",
      "Address",
      "Province",
      "Email",
      "Mobile No",
      "Gender",
      "Age",
      "Last Service",
    ];

    let row = [];
    row = totalData?.data?.map((o) => {
      const clientName = `${o?.firstName} ${o?.lastName}`;
      const status = o?.userDetails?.isActiveUser === 1 ? "Active" : "Inactive";
      const address = o?.address.length
        ? `${o?.address?.[0]?.street && o?.address?.[0]?.street} ${
            o?.address?.[0]?.apartment && o?.address?.[0]?.apartment
          }, ${o?.address?.[0]?.provinceName && o?.address?.[0]?.provinceName}`
        : "-";
      const stateName = o?.address?.[0]?.provinceName;
      const age = moment().diff(o?.DOB, "years");
      const lastServiced = o?.lastArrayElement[0]?.createdAt;
      return [
        titleCaseString(clientName) || "-",
        o?.uid || "-",
        status || "-",
        address || "-",
        stateName || "-",
        o?.userDetails?.email || "-",
        o?.userDetails?.phoneNumber || "-",
        o?.gender || "-",
        o?.DOB ? `${age} yrs` : "-",
        (o?.lastArrayElement && moment(lastServiced).format("DD-MM-YYYY")) ||
          "-",
      ];
    });
    doc.autoTable(header, row, {
      startY: false,
      theme: "grid",
      tableWidth: "auto",
      columnWidth: "wrap",
      showHeader: "everyPage",
      tableLineWidth: 0,
      columnStyles: {
        3: {
          columnWidth: 50,
          // cellWidth: "wrap",
        },
        4: {
          columnWidth: 25,
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
    doc.save("clients.pdf");
  };

  return (
    <div className="card-effect cmt-24 position-relative">
      {isDeletePopup &&
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
              fetchAllClients();
              return;
            }}
            handelSuccess={() => {
              fetchAllClients();
            }}
          />
        ) : (
          ""
        ))}
      {isSuccess && (
        <div className="success-conteiner d-flex gap-2 align-items-center rounded">
          <span className="bg-white pt-1 pb-1 ps-1 pe-1 rounded">
            <i className="bi bi-check d-flex" />
          </span>
          <span className="text-14-500 color-white">Client Archived</span>
        </div>
      )}
      <div className="cpt-24 cps-10 cmb-10">
        <div className="title-value-block d-flex align-items-center gap-2 cmb-24">
          <div className="text-20-700 color-black-100">Clients</div>
          <div className="text-13-600 color-dashboard-primary bg-blue-5 rounded-pill ps-2 pe-2 pt-1">
            {tableData?.total}
          </div>
        </div>
        <div className="d-flex gap-3 cmb-24">
          <MenuOption
            icon={
              <Button btnText={buttonText} btnStyle="PLO" iconType="R-Filter" />
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
          />

          <SearchInput
            placeholder="Search clients"
            value={searchValue}
            onChange={handleSearch}
          />

          <Button
            btnText="ARCHIVE"
            btnStyle="PLO"
            iconType="L-Archive"
            onClick={() => {
              navigate(commonRoute.clientsArchived);
            }}
          />

          <ReportDownloadButton
            btnText="DOWNLOAD"
            btnStyle="PLO"
            iconType="L-Download"
            headers={exportHeader}
            data={exportData?.data}
            filename={`Client.csv`}
            pdfFile={() => {
              Print();
            }}
          />
          {/* <CSVLink
            headers={exportHeader}
            data={exportData?.data}
            filename={`Client.csv`}
            className="text-decoration-none"
          >
            <Button btnText="DOWNLOAD" btnStyle="PLO" iconType="L-Download" />
          </CSVLink> */}
        </div>
        {/* <div className="d-flex justify-content-end cme-24 cmt-35">
          <Button
            btnText="Go to next slide"
            btnStyle="PLO"
            iconType="R-Arrow"
            className="rounded-pill"
          />
        </div> */}
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
            fetchAllClients(oldData);
          }}
          isPagination
        />
      </div>
    </div>
  );
};
export default ViewClients;

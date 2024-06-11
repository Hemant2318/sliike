import { useState } from "react";
import SearchInput from "components/form/SearchInput";
import Button from "components/form/Button";
import CardView from "./CardView";
import { Dropdown } from "react-bootstrap";
import { commonFilter, icons } from "utils/constants";
import UserProfileLayout from "components/layouts/UserProfileLayout";
import { titleCaseString } from "utils/helpers";
import Table from "components/layouts/Table";
import StatusContainer from "components/layouts/StatusContainer";
import {
  adminStatusUpdate,
  deleteAdmins,
  throwSuccess,
} from "store/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuOption from "components/layouts/MenuOption";
import "./AdminList.scss";

const AdminList = ({ adminsData, setAdminsData, fetchAllAdmin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("All");
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [multipleArchiveIds, setMultipleArchiveIds] = useState([]);
  const { permissionsData } = useSelector((state) => ({
    permissionsData: state.global.permissionsData,
  }));
  const access = {
    adminsMenu: permissionsData?.adminSettings?.[0],
  };
  const adminsPermission = access?.adminsMenu;
  const [searchValue, setSearchValue] = useState();

  const [timer, setTimer] = useState("");
  const [type, setType] = useState(0);
  const [data, setData] = useState([
    {
      name: "Rachel Vince",
      id: "ID: SLKA0000001",
      role: "Sub-admin",
      isActive: false,
    },
    {
      name: "Rachel Vince",
      id: "ID: SLKA0000002",
      role: "Sub-admin",
      isActive: true,
    },
    {
      name: "Rachel Vince",
      id: "ID: SLKA0000003",
      role: "Sub-admin",
      isActive: true,
    },
  ]);
  const handelStatus = () => {
    setData((prev) => {
      let oldVal = prev;
      oldVal.map((el) => {
        let newObj = el;
        if (newObj?.id === el?.id) {
          newObj.status = el?.status === 1 ? 0 : 1;
        }
        return newObj;
      });
      return oldVal;
    });
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
    let time = timer;
    clearTimeout(time);
    time = setTimeout(() => {
      let oldData = { ...adminsData, search: value, loader: true };
      setAdminsData(oldData);
      fetchAllAdmin(oldData);
    }, 800);
    setTimer(time);
  };

  const handleFilter = async ({ filterStatus }) => {
    let oldData = adminsData;
    oldData = { ...oldData, status: filterStatus };
    setAdminsData(oldData);
    fetchAllAdmin(oldData);
  };

  const handleArchive = async (id) => {
    setIsDeleteLoading(true);
    let payload = {};
    if (multipleArchiveIds.length) {
      payload = { adminIds: id };
    } else {
      payload = { adminIds: [id] };
    }
    const response = await dispatch(deleteAdmins(payload));
    if (response?.status === 200) {
      fetchAllAdmin(adminsData);
      dispatch(throwSuccess(response.message));
      setMultipleArchiveIds([]);
    }
    setIsDeleteLoading(false);
  };

  const headers = [
    {
      title: "Admin",
    },
    {
      title: "Role",
    },
    {
      title: "Status",
    },
    {
      title: "Action",
    },
  ];

  const rowData = [];
  adminsData?.data?.forEach((elem) => {
    const {
      profileImage,
      firstName,
      lastName,
      uid,
      role,
      status,
      _id: id,
    } = elem;
    let obj = [
      {
        value: (
          <div className="d-flex align-items-center gap-2">
            <UserProfileLayout url={profileImage} size="40" />
            <div className="">
              <div className="text-13-500-21 color-black-100">
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
          <div className="text-13-500 color-black-100">
            {titleCaseString(role)}
          </div>
        ),
      },
      {
        value: (
          <div className="d-flex gap-2">
            <span className="text-13-500 color-black-100">
              {status === 1 ? "Active" : "Inactive"}
            </span>
            {adminsPermission?.all && (
              <span>
                <StatusContainer
                  title="Admin"
                  data={elem}
                  apiFunction={async () => {
                    const payload = {
                      adminId: id,
                      status: !status,
                    };
                    return await dispatch(adminStatusUpdate(payload));
                  }}
                  handelSuccess={() => {
                    setAdminsData((prev) => {
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
            )}
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
              <Dropdown.Item
                href=""
                className="d-flex align-items-center gap-2 mb-1"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/admins/profile-details/${id}`);
                }}
              >
                <span>
                  <img src={icons.viewDetails} alt="details" />
                </span>
                <span className="mt-1">View Details</span>
              </Dropdown.Item>
              {adminsPermission?.all && (
                <Dropdown.Item
                  href=""
                  className="d-flex align-items-center gap-2"
                  onClick={() => {
                    handleArchive(id);
                  }}
                >
                  <span>
                    <img src={icons.trash} alt="trash" />
                  </span>
                  <span className="mt-1">Delete Admin</span>
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        ),
      },
    ];
    rowData.push({ data: obj });
  });
  return (
    <div id="admin-list-container" className="cps-24 cpt-48 cme-24 h-100 pb-5">
      <div className="d-flex justify-content-between align-items-center cmb-24">
        <div className="text-20-700 color-dashboard-primary">Admins</div>
        {adminsPermission?.all && (
          <Button
            btnText="ADD ADMIN"
            btnStyle="PD"
            iconType="L-Add"
            className="cps-20 cpe-20"
            onClick={() => {
              navigate(`/admins/add-admin`);
            }}
          />
        )}
      </div>
      <div className="cmb-40 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
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
            placeholder="Search admin"
            value={searchValue}
            onChange={handleSearch}
          />

          {adminsPermission?.all && (
            <>
              <Button
                btnText="ARCHIVE"
                btnStyle="PLO"
                iconType="L-BlackArchive"
                onClick={() => {
                  navigate("/admins/archive");
                }}
              />

              {multipleArchiveIds.length > 0 && (
                <Button
                  btnText="Multiple Delete"
                  btnStyle="PLO"
                  leftIcon={<img src={icons.trashIcon} alt="dashboard" />}
                  onClick={() => {
                    handleArchive(multipleArchiveIds);
                  }}
                  btnLoading={isDeleteLoading}
                />
              )}
            </>
          )}
        </div>
        <div>
          <i
            className={`bi ${
              type === 0 ? "bi-list-ul" : "bi-grid"
            } text-20-700 pointer`}
            onClick={() => {
              setType(type === 0 ? 1 : 0);
            }}
          />
        </div>
      </div>
      {/* {isDeletePopup && adminsDeleteId && (
        <DeleteConfirmPopup
          title="Admin"
          deleteId={adminsDeleteId}
          onHide={() => {
            setIsDeletePopup(false);
          }}
          apiFunction={async () => {
            await dispatch(deleteAdmins({ adminId: adminsDeleteId }));
            dispatch(throwSuccess("Admin Deleted Successfully."));
            setIsDeletePopup(false);
            fetchAllAdmin();
            return;
          }}
          handelSuccess={() => {
            fetchAllAdmin();
          }}
        />
      )} */}
      {type === 0 ? (
        <CardView
          data={data}
          handelStatus={handelStatus}
          adminsData={adminsData}
          setAdminsData={setAdminsData}
          fetchAllAdmin={fetchAllAdmin}
          multipleArchiveIds={multipleArchiveIds}
          setMultipleArchiveIds={setMultipleArchiveIds}
        />
      ) : (
        <div className="overflow-auto">
          <Table
            header={headers}
            rowData={rowData}
            isLoading={adminsData?.loader}
            tableData={adminsData}
          />
          {/* <TableView
          data={data}
          handelStatus={handelStatus}
          adminsData={adminsData}
          setAdminsData={setAdminsData}
          handleSuccess={handleSuccess}
        /> */}
        </div>
      )}
    </div>
  );
};
export default AdminList;

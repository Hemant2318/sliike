import Button from "components/form/Button/Button";
import Table from "components/layouts/Table/Table";
import React, { useEffect, useState } from "react";
import SubServicePopup from "./SubServicePopup";
import { icons } from "utils/constants";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteServiceSubCategory,
  getAllServiceSubCategory,
  getServicesCategories,
  throwSuccess,
} from "store/globalSlice";
import { omit } from "lodash";
import MenuOption from "components/layouts/MenuOption/MenuOption";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import DeleteConfirmPopup from "components/layouts/DeleteConfirmPopup/DeleteConfirmPopup";
import { titleCaseString } from "utils/helpers";

const ServiceSubCategory = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [editData, setEditData] = useState(null);
  const [serviceId, setServiceId] = useState("");
  const [buttonText, setButtonText] = useState("Category");
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  // const [serialNo, setSerialNo] = useState(1);
  const { servicesCategoryList } = useSelector((state) => ({
    servicesCategoryList: state.global.servicesCategoryList,
  }));

  const [tableData, setTableData] = useState({
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    search: serviceId || "",
    loading: true,
    data: [],
  });

  const fetchSubCategory = async (obj) => {
    const payload = omit(obj, ["data", "loading", "total"]);
    const response = await dispatch(getAllServiceSubCategory(payload));
    setTableData((prev) => {
      return {
        ...prev,
        data: response?.data?.categoriesList,
        total: response?.data?.count || 0,
        loading: false,
      };
    });
  };

  const handelFilter = async ({ serviceId }) => {
    let oldData = tableData;
    oldData = { ...oldData, search: serviceId };
    setTableData(oldData);
    fetchSubCategory(oldData);
  };
  const headers = [
    {
      title: "Sr No.",
    },
    {
      title: "Services Categories",
    },
    {
      title: "Sub Category",
    },
    {
      title: "Catégories de services",
    },
    {
      title: "Sous-catégorie",
    },
    {
      title: "Action",
    },
  ];

  const rowData = [];
  // console.log("tableData", tableData?.data);
  tableData?.data?.forEach((elem, index) => {
    const { serviceTypeName, serviceTypeName_fr, serviceTypeList } = elem;
    // const serialNum = serialNo + 1;
    // console.log("serialNo", (serialNo - 1) * 10 + index);

    let obj = [
      {
        value: (
          <div className="d-flex gap-2 align-items-center">
            <div>{index + 1}</div>
            {/* <div>{serialNum + 1}</div> */}
            <div>
              <UserProfileLayout
                isSquare
                url={serviceTypeList[0]?.imgPath}
                text={serviceTypeList[0]?.serviceCategoryName}
              />
            </div>
          </div>
        ),
      },
      {
        value: titleCaseString(serviceTypeList[0]?.serviceCategoryName),
      },
      {
        value: titleCaseString(serviceTypeName),
      },
      {
        value: titleCaseString(serviceTypeList[0]?.serviceCategoryName_fr),
      },
      {
        value: titleCaseString(serviceTypeName_fr),
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
                  setCategoryId(elem);
                  setShowPopup(true);
                }}
              >
                <span>
                  <img src={icons.addSquareBlue} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">Add</span>
              </Dropdown.Item> */}
              <Dropdown.Item
                href=""
                className="d-flex align-items-center gap-2 mb-1"
                onClick={() => {
                  setEditData(elem);
                  setShowPopup(true);
                }}
              >
                <span>
                  <img src={icons.edit} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">Edit</span>
              </Dropdown.Item>
              <Dropdown.Item
                href=""
                className="d-flex align-items-center gap-2 mb-1"
                onClick={() => {
                  setDeleteData(elem);
                  setDeletePopup(true);
                }}
              >
                <span>
                  <img src={icons.trashIcon} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">Delete</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ),
      },
    ];
    rowData.push({ data: obj });
  });

  useEffect(() => {
    fetchSubCategory(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initAPI = async () => {
    await dispatch(getServicesCategories());
  };
  useEffect(() => {
    initAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="service-subCategory" className="cmt-24">
      {showPopup && (
        <SubServicePopup
          tableData={tableData}
          editData={editData}
          handleSuccess={() => {
            fetchSubCategory(tableData);
          }}
          onHide={() => {
            setShowPopup(false);
            setEditData(null);
          }}
        />
      )}

      {deletePopup &&
        (deleteData ? (
          <DeleteConfirmPopup
            title="Service Sub Category"
            deleteId={deleteData}
            onHide={() => {
              setDeletePopup(false);
            }}
            apiFunction={async () => {
              await dispatch(
                deleteServiceSubCategory({ serviceId: deleteData?._id })
              );
              dispatch(
                throwSuccess("Service Sub Category Deleted Successfully.")
              );
              setDeletePopup(false);
              fetchSubCategory(tableData);
              return;
            }}
            handelSuccess={() => {
              fetchSubCategory(tableData);
            }}
          />
        ) : (
          ""
        ))}

      <div className="cps-24 cpe-24">
        <div className="d-flex justify-content-between align-items-center cmb-24">
          <div className="text-20-700 color-black-100">
            Service Sub Category
          </div>
          <Button
            btnText="Add"
            btnStyle="PD"
            onClick={() => {
              setShowPopup(true);
            }}
          />
        </div>

        <div className="cmb-20">
          <MenuOption
            icon={
              <Button btnText={buttonText} btnStyle="PLO" iconType="R-Filter" />
            }
            option={servicesCategoryList.map((o) => {
              const { serviceCategoryName, _id } = o;
              return {
                text: serviceCategoryName,
                onClick: () => {
                  setButtonText(serviceCategoryName);
                  setServiceId(_id);
                  handelFilter({ serviceId: _id });
                },
              };
            })}
          />
        </div>

        <div>
          <Table
            header={headers}
            rowData={rowData}
            isLoading={tableData?.loading}
            tableData={tableData}
            changeOffset={(newOffset, newLimit = tableData.limit) => {
              // console.log("new limit", newLimit);
              let oldData = {
                ...tableData,
                offset: newOffset,
                limit: newLimit,
                loading: true,
              };
              setTableData(oldData);
              fetchSubCategory(oldData);
              // setSerialNo(newOffset + 1);
            }}
            isPagination
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceSubCategory;

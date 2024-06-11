import Button from "components/form/Button/Button";
import Table from "components/layouts/Table/Table";
import React, { useEffect, useState } from "react";
import AddServicePopup from "./AddServicePopup";
import { Dropdown } from "react-bootstrap";
import { icons } from "utils/constants";
import { useDispatch } from "react-redux";
import {
  deleteServiceCategory,
  getServicesCategories,
  throwSuccess,
} from "store/globalSlice";
import EditServicePopup from "./EditServicePopup";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import DeleteConfirmPopup from "components/layouts/DeleteConfirmPopup/DeleteConfirmPopup";
import { titleCaseString } from "utils/helpers";

const MoreOptions = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [categoryId, setCategoryId] = useState({});
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const [tableData, setTableData] = useState({
    loading: true,
    data: [],
  });
  const getAllServicesCategory = async (obj) => {
    const response = await dispatch(getServicesCategories());
    // console.log("response", response?.data);
    setTableData((prev) => {
      return {
        ...prev,
        data: response?.data,
        loading: false,
      };
    });
  };

  const headers = [
    {
      title: "Sr No.",
    },
    {
      title: "Services Categories",
    },
    {
      title: "Catégories de services",
    },
    {
      title: "Action",
    },
  ];

  const rowData = [];
  tableData?.data?.forEach((elem, index) => {
    const { serviceCategoryName, serviceCategoryName_fr, imgPath } = elem;
    let obj = [
      {
        value: (
          <div className="d-flex gap-2 align-items-center">
            <div>{index + 1}</div>
            <div>
              <UserProfileLayout isSquare url={imgPath} />
            </div>
          </div>
        ),
      },
      {
        value: titleCaseString(serviceCategoryName),
      },
      {
        value: titleCaseString(serviceCategoryName_fr),
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
                  setCategoryId(elem);
                  setShowEditPopup(true);
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
    getAllServicesCategory(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="cmt-24">
      {showPopup && (
        <AddServicePopup
          handleSuccess={() => {
            getAllServicesCategory(tableData);
          }}
          onHide={() => {
            setShowPopup(false);
          }}
        />
      )}

      {showEditPopup && (
        <EditServicePopup
          tableData={tableData}
          categoryId={categoryId}
          handleSuccess={() => {
            getAllServicesCategory(tableData);
          }}
          onHide={() => {
            setShowEditPopup(false);
          }}
        />
      )}

      {deletePopup &&
        (deleteData ? (
          <DeleteConfirmPopup
            title="Service Category"
            deleteId={deleteData}
            onHide={() => {
              setDeletePopup(false);
            }}
            apiFunction={async () => {
              await dispatch(
                deleteServiceCategory({ categoryId: deleteData?._id })
              );
              dispatch(throwSuccess("Service Category Deleted Successfully."));
              setDeletePopup(false);
              getAllServicesCategory();
              return;
            }}
            handelSuccess={() => {
              getAllServicesCategory();
            }}
          />
        ) : (
          ""
        ))}
      <div className="cps-24 cpe-24">
        <div className="d-flex justify-content-between align-items-center cmb-24">
          <div className="text-20-700 color-black-100">Service Category</div>
          <Button
            btnText="Add"
            btnStyle="PD"
            onClick={() => {
              setShowPopup(true);
            }}
          />
        </div>

        <div>
          <Table
            header={headers}
            rowData={rowData}
            isLoading={tableData?.loading}
            tableData={tableData}
          />
        </div>
      </div>
    </div>
  );
};

export default MoreOptions;

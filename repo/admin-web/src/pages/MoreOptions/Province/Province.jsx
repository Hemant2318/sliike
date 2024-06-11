/* eslint-disable array-callback-return */
/* eslint-disable no-sparse-arrays */
import Button from "components/form/Button/Button";
import Table from "components/layouts/Table/Table";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { icons } from "utils/constants";
import ProvincePopup from "./ProvincePopup";
import {
  deleteProvince,
  getProvinceList,
  throwSuccess,
} from "store/globalSlice";
import { useDispatch } from "react-redux";
import DeleteConfirmPopup from "components/layouts/DeleteConfirmPopup/DeleteConfirmPopup";
import { titleCaseString } from "utils/helpers";

const Province = () => {
  const dispatch = useDispatch();
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [editData, setEditData] = useState(null);
  const [tableData, setTableData] = useState({
    loading: true,
    data: [],
  });

  const fetchAllProvince = async () => {
    const response = await dispatch(getProvinceList());
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
      title: "Province",
    },
    {
      title: "Province",
    },
    // {
    //   title: "Province Tax",
    // },
    {
      title: "GST",
    },
    {
      title: "HST",
    },
    {
      title: "QST",
    },
    {
      title: "PST",
    },
    {
      title: "Action",
    },
  ];

  const rowData = [];
  tableData?.data?.map((elem, index) => {
    const { name, name_fr, subType } = elem;
    let obj = [
      {
        value: index + 1,
      },
      {
        value: titleCaseString(name),
      },
      {
        value: titleCaseString(name_fr),
      },
      // {
      //   value: "-",
      // },
      {
        value: subType?.map((o) => {
          const { taxName, tax } = o;
          return <div>{taxName === "GST" ? `${tax}%` : "-"}</div>;
        }),
      },
      ,
      {
        value: subType?.map((o) => {
          const { taxName, tax } = o;
          return <div>{taxName === "HST" ? `${tax}%` : "-"}</div>;
        }),
      },
      {
        value: subType?.map((o) => {
          const { taxName, tax } = o;
          return <div>{taxName === "QST" ? `${tax}%` : "-"}</div>;
        }),
      },
      {
        value: subType?.map((o) => {
          const { taxName, tax } = o;
          return <div>{taxName === "PST" ? `${tax}%` : "-"}</div>;
        }),
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
    fetchAllProvince(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="service-subCategory" className="cmt-24">
      {showPopup && (
        <ProvincePopup
          editData={editData}
          handleSuccess={() => {
            fetchAllProvince(tableData);
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
            title="Province Tax"
            deleteId={deleteData}
            onHide={() => {
              setDeletePopup(false);
            }}
            apiFunction={async () => {
              await dispatch(deleteProvince({ provinceId: deleteData?._id }));
              dispatch(throwSuccess("Province Deleted Successfully"));
              setDeletePopup(false);
              fetchAllProvince(tableData);
              return;
            }}
            handelSuccess={() => {
              fetchAllProvince(tableData);
            }}
          />
        ) : (
          ""
        ))}
      <div className="cps-24 cpe-24">
        <div className="d-flex justify-content-between align-items-center cmb-24">
          <div className="text-20-700 color-black-100">Province</div>
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

export default Province;

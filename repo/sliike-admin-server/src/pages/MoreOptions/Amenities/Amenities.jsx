import Button from "components/form/Button/Button";
import Table from "components/layouts/Table/Table";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { icons } from "utils/constants";
import AmenitiesPopup from "./AmenitiesPopup";
import { useDispatch } from "react-redux";
import { deleteAmenities, getAmenities, throwSuccess } from "store/globalSlice";
import DeleteConfirmPopup from "components/layouts/DeleteConfirmPopup/DeleteConfirmPopup";
import { titleCaseString } from "utils/helpers";

const Amenities = () => {
  const dispatch = useDispatch();
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [editData, setEditData] = useState(null);
  const [tableData, setTableData] = useState({
    data: [],
    loading: true,
  });

  const fetchAmenities = async () => {
    const response = await dispatch(getAmenities());
    if (response?.status === 200) {
      setTableData((prev) => {
        return {
          ...prev,
          data: response?.data,
          loading: false,
        };
      });
    }
  };

  useEffect(() => {
    fetchAmenities(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headers = [
    {
      title: "Sr No.",
    },
    {
      title: "Amenities",
    },
    {
      title: "Agréments",
    },
    {
      title: "Actions",
    },
  ];

  const rowData = [];
  tableData?.data?.forEach((elem, index) => {
    const { name, name_fr } = elem;
    let obj = [
      {
        value: index + 1,
      },
      {
        value: <div className="text-nowrap">{titleCaseString(name)}</div>,
      },
      {
        value: <div className="text-nowrap">{titleCaseString(name_fr)}</div>,
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

  return (
    <div id="amenities-container" className="cmt-24">
      {showPopup && (
        <AmenitiesPopup
          editData={editData}
          handleSuccess={() => {
            fetchAmenities(tableData);
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
            title="Amenities"
            deleteId={deleteData}
            onHide={() => {
              setDeletePopup(false);
            }}
            apiFunction={async () => {
              await dispatch(deleteAmenities({ amenityId: deleteData?._id }));
              dispatch(throwSuccess("Amenities Deleted Successfully"));
              setDeletePopup(false);
              fetchAmenities(tableData);
              return;
            }}
            handelSuccess={() => {
              fetchAmenities(tableData);
            }}
          />
        ) : (
          ""
        ))}
      <div className="cps-24 cpe-24">
        <div className="d-flex justify-content-between align-items-center cmb-24">
          <div className="text-20-700 color-black-100">Amenities</div>
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
            tableData={tableData}
            isLoading={tableData?.loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Amenities;

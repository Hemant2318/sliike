import Button from "components/form/Button";
import Table from "components/layouts/Table";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteBrandCategory,
  fetchBrandCategory,
  throwSuccess,
} from "store/globalSlice";
import { icons } from "utils/constants";
import BrandCategoryPopup from "./BrandCategoryPopup";
import DeleteConfirmPopup from "components/layouts/DeleteConfirmPopup/DeleteConfirmPopup";
import { titleCaseString } from "utils/helpers";

const BrandCategory = () => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [editData, setEditData] = useState(null);
  const [brandData, setBrandData] = useState({
    data: [],
    loading: true,
  });
  const dispatch = useDispatch();

  const getBrandCategories = async (data) => {
    const response = await dispatch(fetchBrandCategory());
    if (response?.status === 200) {
      setBrandData((prev) => {
        return {
          ...prev,
          data: response?.data,
          loading: false,
        };
      });
    }
  };

  useEffect(() => {
    getBrandCategories(brandData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headers = [
    {
      title: "Sr No.",
    },
    {
      title: "Brand Category",
    },
    {
      title: "Catégorie de marque",
    },
    {
      title: "Actions",
    },
  ];

  const rowData = [];
  brandData?.data?.forEach((elem, index) => {
    const { brandCategoryName, brandCategoryName_fr } = elem;
    let obj = [
      {
        value: index + 1,
      },
      {
        value: (
          <div className="text-nowrap">
            {titleCaseString(brandCategoryName)}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap">
            {titleCaseString(brandCategoryName_fr)}
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
    <div id="brand-category-container">
      {showPopup && (
        <BrandCategoryPopup
          editData={editData}
          handleSuccess={() => {
            getBrandCategories(brandData);
          }}
          onHide={() => {
            setShowPopup(false);
            setEditData(null);
          }}
        />
      )}
      {deletePopup && deleteData && (
        <DeleteConfirmPopup
          title="Brand Category"
          deleteId={deleteData}
          onHide={() => {
            setDeletePopup(false);
          }}
          apiFunction={async () => {
            await dispatch(
              deleteBrandCategory({ categoryId: deleteData?._id })
            );
            dispatch(throwSuccess("Brand Category Deleted Successfully"));
            setDeletePopup(false);
            getBrandCategories(brandData);
            return;
          }}
          handelSuccess={() => {
            getBrandCategories(brandData);
          }}
        />
      )}
      <div className="cps-24 cpe-24">
        <div className="d-flex justify-content-between align-items-center cmb-24">
          <div className="text-20-700 color-black-100">Brand Category</div>
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
            tableData={brandData}
            isLoading={brandData?.loading}
          />
        </div>
      </div>
    </div>
  );
};

export default BrandCategory;

import Button from "components/form/Button/Button";
import Table from "components/layouts/Table/Table";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteProductCategory,
  getProductCategory,
  throwSuccess,
} from "store/globalSlice";
import { icons } from "utils/constants";
import ProductCategoryPopup from "./ProductCategoryPopup";
import DeleteConfirmPopup from "components/layouts/DeleteConfirmPopup/DeleteConfirmPopup";
import { titleCaseString } from "utils/helpers";

const ProductCategory = () => {
  const dispatch = useDispatch();
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [editData, setEditData] = useState(null);
  const [tableData, setTableData] = useState({
    loading: true,
    data: [],
  });
  const [showPopup, setShowPopup] = useState(false);
  const fetchProductCategory = async () => {
    const response = await dispatch(getProductCategory());
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

  const headers = [
    {
      title: "Sr No.",
    },
    {
      title: "Product category",
    },
    {
      title: "Catégorie de produit",
    },
    {
      title: "Action",
    },
  ];

  const rowData = [];
  tableData?.data?.forEach((elem, index) => {
    const { productCategoryName, productCategoryName_fr } = elem;
    let obj = [
      {
        value: index + 1,
      },
      {
        value: titleCaseString(productCategoryName),
      },
      {
        value: titleCaseString(productCategoryName_fr),
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
    fetchProductCategory(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="product-category" className="cmt-24">
      {showPopup && (
        <ProductCategoryPopup
          editData={editData}
          handleSuccess={() => {
            fetchProductCategory(tableData);
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
            title="Product Category"
            deleteId={deleteData}
            onHide={() => {
              setDeletePopup(false);
            }}
            apiFunction={async () => {
              await dispatch(
                deleteProductCategory({ prodId: deleteData?._id })
              );
              dispatch(throwSuccess("Product Category Deleted Successfully."));
              setDeletePopup(false);
              fetchProductCategory(tableData);
              return;
            }}
            handelSuccess={() => {
              fetchProductCategory(tableData);
            }}
          />
        ) : (
          ""
        ))}
      <div className="cps-24 cpe-24">
        <div className="d-flex justify-content-between align-items-center cmb-24">
          <div className="text-20-700 color-black-100">Product Category</div>
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
            isLoading={tableData.loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;

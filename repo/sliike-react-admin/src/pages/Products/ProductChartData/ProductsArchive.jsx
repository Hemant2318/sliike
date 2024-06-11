import Table from "components/layouts/Table/Table";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import { omit } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeArchive, fetchProduct } from "store/globalSlice";
import { icons } from "utils/constants";
import { titleCaseString } from "utils/helpers";

const ProductsArchive = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  // const [isDeletePopup, setIsDeletePopup] = useState(false);
  // const [deleteID, setDeleteID] = useState({});
  const [tableData, setTableData] = useState({
    category: "",
    type: "archive",
    chartSDate: "",
    chartEDate: "",
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    search: "",
    loading: true,
    data: [],
  });

  const getProductData = async (data) => {
    const payload = omit(data, ["data", "loading", "total"]);
    const response = await dispatch(fetchProduct(payload));
    console.log("response", response);

    if (response?.status === 200) {
      setTableData((prev) => {
        return {
          ...prev,
          data: response,
          total: response?.count || 0,
          loading: false,
        };
      });
    }
  };

  const handleArchive = async (Id, type, isDeleted) => {
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
      getProductData(tableData);
    }
  };

  useEffect(() => {
    getProductData(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const header = [
    {
      title: <div className="text-start ps-3">Vender</div>,
    },
    { title: "Category" },
    { title: <div className="text-nowrap">Register Date</div> },
    { title: <div className="text-nowrap">Total No. of Products</div> },
    { title: "Pending" },
    { title: "Purchased" },
    { title: "Cancelled" },
    { title: "Action" },
  ];

  // console.log("tableData", tableData?.data?.vendorData);

  const rowData = [];
  tableData?.data?.vendorData?.forEach((elem) => {
    const {
      _id,
      isDeleted,
      businessName,
      uid,
      logo,
      categoryName,
      createdAt,
      totalNoPrdoucts,
      pending,
      purchased,
      cancelled,
    } = elem;
    let obj = [
      {
        value: (
          <div className="text-start text-nowrap ps-3 d-flex align-items-center gap-2">
            <div>
              <UserProfileLayout isRounded url={logo} size="40" />
            </div>
            <div>
              <div
                className="text-13-500-21 pointer"
                onClick={() => {
                  navigate("/products/details/1");
                }}
              >{`${titleCaseString(businessName)}`}</div>
              <div className="text-9-500 color-blue-60">ID: {uid}</div>
            </div>
          </div>
        ),
      },
      {
        value: (
          <div className="color-dashboard-primary d-flex">
            {categoryName ? (
              <div className="d-flex">
                <div>Category</div>
                <Dropdown align="start">
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <img src={icons.downArrow} alt="dwn-arrow" />
                  </Dropdown.Toggle>
                  <DropdownMenu>
                    {categoryName?.map((elem, i) => {
                      const { productCategoryName } = elem;
                      return (
                        <DropdownItem key={i}>
                          <div className="color-dashboard-primary">
                            {productCategoryName}
                          </div>
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              "-"
            )}
          </div>
        ),
      },
      {
        value: (
          <div className="color-dashboard-primary">
            {moment(createdAt).format("DD MMM, YYYY")}
          </div>
        ),
      },
      {
        value: <div className="color-dashboard-primary">{totalNoPrdoucts}</div>,
      },
      {
        value: <div className="color-dashboard-primary">{pending}</div>,
      },
      {
        value: <div className="color-dashboard-primary">{purchased}</div>,
      },
      {
        value: <div className="color-dashboard-primary">{cancelled}</div>,
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
                  handleArchive(_id, "beautician", !isDeleted);
                }}
              >
                <span>
                  <img src={icons.archiveIcon} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">Unarchive</span>
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
                <span className="mt-1 color-dashboard-primary">Delete</span>
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        ),
      },
    ];
    rowData.push({ data: obj });
  });
  return (
    <div id="product-archive" className="cmt-24 position-relative">
      {/* {isDeletePopup && deleteID && (
        <DeleteConfirmPopup
          title="Vendor"
          deleteID={deleteID}
          onHide={() => {
            setIsDeletePopup(false);
          }}
          apiFunction={async () => {
            await dispatch(deleteBeautician(deleteID._id));
            dispatch(throwSuccess("Vendor Deleted Successfully."));
            setIsDeletePopup(false);
            return;
          }}
        />
      )} */}
      <div className="text-20-700 color-black-100 cmb-50">Archived Vendors</div>
      {isSuccess && (
        <div className="success-conteiner d-flex gap-2 align-items-center rounded">
          <span className="bg-white pt-1 pb-1 ps-1 pe-1 rounded">
            <i className="bi bi-check d-flex" />
          </span>
          <span className="text-14-500 color-white">Vender Unarchive</span>
        </div>
      )}
      <div>
        <Table
          header={header}
          rowData={rowData}
          isLoading={tableData?.loading}
          tableData={tableData}
          searchInputChange={(searchText) => {
            let oldData = { ...tableData, search: searchText, loading: true };
            setTableData(oldData);
            // fetchTableData(oldData);
          }}
          changeOffset={(newOffset, newLimit = tableData.limit) => {
            let oldData = {
              ...tableData,
              offset: newOffset,
              limit: newLimit,
              loading: true,
            };
            setTableData(oldData);
          }}
          isPagination
        />
      </div>
    </div>
  );
};

export default ProductsArchive;

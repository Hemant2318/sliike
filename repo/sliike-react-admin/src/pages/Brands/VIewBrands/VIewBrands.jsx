import React, { useEffect, useState } from "react";
import Button from "components/form/Button/Button";
import SearchInput from "components/form/SearchInput/SearchInput";
import { commonRoute, icons } from "utils/constants";
import Table from "components/layouts/Table/Table";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import StatusContainer from "components/layouts/StatusContainer/StatusContainer";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { objectToQueryParams, titleCaseString } from "utils/helpers";
import { omit } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  brandChangeStatus,
  brandDelete,
  fetchBrandCategory,
  getAllBrands,
  throwSuccess,
} from "store/globalSlice";
import moment from "moment/moment";
import DeleteConfirmPopup from "components/layouts/DeleteConfirmPopup/DeleteConfirmPopup";
import MenuOption from "components/layouts/MenuOption/MenuOption";
import "./VIewBrands.scss";

const VIewBrands = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState();
  const [timer, setTimer] = useState("");
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState({});
  const [buttonText, setButtonText] = useState("Filter By");
  const [tableData, setTableData] = useState({
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    search: "",
    loading: true,
    data: [],
  });
  const { brandCategory, permissionsData } = useSelector((state) => ({
    brandCategory: state.global.brandCategory,
    permissionsData: state.global.permissionsData,
  }));

  const access = {
    brandsMenu: permissionsData?.brandSettings?.[0],
  };
  const brandPermission = access?.brandsMenu;

  const fetchAllBrand = async (obj) => {
    const payload = omit(obj, ["data", "loading", "total", "intervalLimit"]);
    const queryParams = objectToQueryParams(payload);
    const response = await dispatch(getAllBrands(queryParams));
    if (response?.status === 200) {
      setTableData((prev) => {
        return {
          ...prev,
          data: response?.data,
          total: response?.totalBrand,
          loading: false,
        };
      });
    }
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
    let time = timer;
    clearTimeout(time);
    time = setTimeout(() => {
      let oldData = { ...tableData, search: value, loading: true };
      setTableData(oldData);
      fetchAllBrand(oldData);
    }, 800);
    setTimer(time);
  };
  const handleFilter = (id) => {
    let oldVal = tableData;
    oldVal = { ...oldVal, brandCategoryId: id };
    setTableData(oldVal);
    fetchAllBrand(oldVal);
  };

  const initAPI = async () => {
    await dispatch(fetchBrandCategory());
  };

  useEffect(() => {
    if (brandPermission?.falsecount !== 3) {
      fetchAllBrand(tableData);
      initAPI();
    } else {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const header = [
    {
      title: <div className="ps-3">Brand</div>,
    },
    {
      title: "Category",
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
      title: <div className="text-nowrap">Postal Code</div>,
    },
    {
      title: "Start Date",
    },
    {
      title: "End Date",
    },
    {
      title: "Sliike Plan",
    },
    {
      title: "Action",
    },
  ];
  const rowData = [];
  tableData?.data?.forEach((elem) => {
    const {
      _id,
      uid,
      brandBanner,
      brandName,
      category,
      status,
      address,
      postalCode,
      city,
      province,
      endDate,
      startDate,
      sliikePlan,
    } = elem;
    let obj = [
      {
        value: (
          <div className="text-start ps-3 d-flex align-items-center gap-2">
            <div>
              <UserProfileLayout url={brandBanner} size="40" isSquare />
            </div>
            <div
              onClick={() => {
                navigate(`/brands/${_id}`);
              }}
            >
              <div className="text-13-500-21 color-black-100 pointer text-nowrap">
                {titleCaseString(brandName)}
              </div>
              <div className="text-11-500 color-blue-60 text-nowrap">
                ID:{uid}
              </div>
            </div>
          </div>
        ),
      },
      {
        value: <div className="text-nowrap text-13-500-21">{category}</div>,
      },
      {
        value: (
          <div className="d-flex align-items-center gap-2">
            <span className="color-black-100">
              {status === 1 ? "Active" : "Inactive"}
            </span>
            {brandPermission?.all && (
              <span>
                <StatusContainer
                  title="Brands"
                  data={elem}
                  apiFunction={async () => {
                    const payload = { status: !status };
                    return await dispatch(brandChangeStatus(payload, _id));
                  }}
                  handelSuccess={() => {
                    setTableData((prev) => {
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
        value: address,
      },
      {
        value: (
          <div className="text-nowrap text-13-500-21">
            {titleCaseString(city)}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap text-13-500-21">
            {titleCaseString(province)}
          </div>
        ),
      },
      {
        value: <div className="text-nowrap text-13-500-21">{postalCode}</div>,
      },
      {
        value: moment(startDate).format("DD/MM/YYYY"),
      },
      {
        value: moment(endDate).format("DD/MM/YYYY"),
      },
      {
        value: (
          <div className="text-nowrap text-13-500-21">
            {titleCaseString(sliikePlan)}
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
                  navigate(`/brands/${_id}`);
                }}
              >
                <span>
                  <img
                    src={icons.dashboardIcon2}
                    alt="dashboard"
                    className="color-dashboard-primary"
                  />
                </span>
                <span className="mt-1 color-dashboard-primary">
                  View dashboard
                </span>
              </Dropdown.Item>
              {brandPermission?.all && (
                <>
                  {/* <Dropdown.Item
                    href=""
                    className="d-flex align-items-center gap-2 mb-1"
                    // onClick={() => {
                    //   handelArchive({
                    //     Id: elem?._id,
                    //     type: "beautician",
                    //     isDeleted: !elem?.isDeleted,
                    //   });
                    // }}
                  >
                    <span>
                      <img src={icons.edit} alt="dashboard" />
                    </span>
                    <span className="mt-1 color-dashboard-primary">
                      Update brand
                    </span>
                  </Dropdown.Item> */}
                  <Dropdown.Item
                    href=""
                    className="d-flex align-items-center gap-2 mb-1"
                    onClick={() => {
                      setIsDeletePopup(true);
                      setDeleteId(elem);
                    }}
                  >
                    <span>
                      <img src={icons.trashIcon} alt="dashboard" />
                    </span>
                    <span className="mt-1 color-dashboard-primary">
                      Delete brand
                    </span>
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        ),
      },
    ];
    rowData?.push({ data: obj });
  });
  return (
    <div className="cmt-24 position-relative">
      {isDeletePopup && deleteId && (
        <DeleteConfirmPopup
          title="Brand"
          deleteId={deleteId}
          onHide={() => {
            setIsDeletePopup(false);
          }}
          apiFunction={async () => {
            await dispatch(brandDelete(deleteId._id));
            dispatch(throwSuccess("Brand Deleted Successfully."));
            setIsDeletePopup(false);
            fetchAllBrand();
            return;
          }}
          handelSuccess={() => {
            fetchAllBrand();
          }}
        />
      )}
      <div className="d-flex justify-content-between cmb-28">
        <div className="d-flex gap-3">
          <MenuOption
            icon={
              <Button btnText={buttonText} btnStyle="PLO" iconType="R-Filter" />
            }
            option={brandCategory?.map((o) => {
              return {
                text: o?.brandCategoryName,
                onClick: () => {
                  handleFilter(o?._id);
                  setButtonText(o?.brandCategoryName);
                },
              };
            })}
          />
          <SearchInput
            placeholder="Search brands"
            onChange={handleSearch}
            value={searchValue}
          />
        </div>
        {brandPermission?.all && (
          <Button
            btnText="ADD BRAND"
            btnStyle="PD"
            leftIcon={<img src={icons.addSquare} alt="add-brands" />}
            onClick={() => {
              navigate(commonRoute.addBrand);
            }}
          />
        )}
      </div>

      <div className="overflow-auto">
        <Table
          isPagination
          header={header}
          rowData={rowData}
          tableData={tableData}
          isLoading={tableData?.loading}
          changeOffset={(newOffset, newLimit = tableData?.limit) => {
            let oldData = {
              ...tableData,
              offset: newOffset,
              limit: newLimit,
              loading: true,
            };
            setTableData(oldData);
            fetchAllBrand(oldData);
          }}
        />
      </div>
    </div>
  );
};

export default VIewBrands;

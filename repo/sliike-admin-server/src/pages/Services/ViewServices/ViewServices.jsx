import Button from "components/form/Button/Button";
import Table from "components/layouts/Table/Table";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import React, { useEffect, useState } from "react";
import { commonRoute, icons } from "utils/constants";
import { useNavigate } from "react-router-dom";
import MenuOption from "components/layouts/MenuOption/MenuOption";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  changeArchive,
  deleteBeautician,
  getAllServices,
  getServicesCategories,
  throwSuccess,
} from "store/globalSlice";
import { omit } from "lodash";
import { getMonthList, titleCaseString } from "utils/helpers";
import moment from "moment";
import DeleteConfirmPopup from "components/layouts/DeleteConfirmPopup/DeleteConfirmPopup";
import SearchInput from "components/form/SearchInput/SearchInput";
import ServicesData from "./ServicesData";
import CustomeDropdown from "components/form/Dropdown/Dropdown";
import Loader from "components/layouts/Loader/Loader";
import ReportDownloadButton from "components/layouts/ReportDownloadButton/ReportDownloadButton";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewServices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [buttonText, setButtonText] = useState("Category");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [deleteID, setDeleteID] = useState({});
  const [searchValue, setSearchValue] = useState();
  const [timer, setTimer] = useState("");
  const [exportData, setExportData] = useState({ data: [], loader: false });
  const { servicesCategoryList } = useSelector((state) => ({
    servicesCategoryList: state.global.servicesCategoryList,
  }));
  const [yearText, setYearText] = useState("");

  const [tableData, setTableData] = useState({
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    search: "",
    type: "unarchive",
    category: categoryId || "",
    chartSDate: moment().startOf("month").format("YYYY-MM-DD"),
    chartEDate: moment().endOf("month").format("YYYY-MM-DD"),
    loading: true,
    data: [],
  });

  const exportHeader = [
    "Service sold",
    "Discount given",
    "GST/HST",
    "PST/QST",
    "Sliike fee",
    "Sliike GST/HST fee",
    "Sliike PST/QST fee",
    "Subscription fee",
    "Total Sliike revenue",
  ];

  const exportFinancialReport = async (returnData) => {
    let flagArray = [];
    flagArray = returnData?.map((o) => {
      const sliike_revenue =
        o?.totalSliikFees + o?.totalsliikFeeGST + o?.totalsliikFeePST;
      return [
        o?.totalSubTotal || 0.0,
        o?.discount || 0.0,
        o?.totalGSTORHST || 0.0,
        o?.totalPSTORQST || 0.0,
        o?.totalSliikFees || 0.0,
        o?.totalsliikFeeGST || 0.0,
        o?.totalsliikFeePST || 0.0,
        0.0,
        sliike_revenue || 0.0,
      ];
    });
    setExportData((prev) => {
      return {
        ...prev,
        data: flagArray,
        loader: false,
      };
    });
  };

  const fetchAllServices = async (obj) => {
    const payload = omit(obj, ["data", "loading", "total"]);
    const response = await dispatch(getAllServices(payload));
    setTableData((prev) => {
      return {
        ...prev,
        data: response?.allServices,
        total: response?.allServices?.count || 0,
        loading: false,
      };
    });
    exportFinancialReport(response?.allServices?.serviceTransction);
    setIsLoading(false);
  };

  const handelArchive = async ({ Id, type, isDeleted }) => {
    const payload = {
      Id: Id,
      type: type,
      isDeleted: isDeleted,
    };
    const response = await dispatch(changeArchive(payload));
    if (response?.status === 200) {
      // dispatch(throwSuccess("Vendor archived"));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
      fetchAllServices(tableData);
    }
  };

  const handelFilter = async ({ categoryId }) => {
    let oldData = tableData;
    oldData = { ...oldData, category: categoryId };
    setTableData(oldData);
    fetchAllServices(oldData);
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
    let time = timer;
    clearTimeout(time);
    time = setTimeout(() => {
      let oldData = { ...tableData, search: value, loading: true };
      setTableData(oldData);
      fetchAllServices(oldData);
    }, 800);
    setTimer(time);
  };

  useEffect(() => {
    fetchAllServices(tableData);
    setYearText(getMonthList(12)[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initAPI = async () => {
    await dispatch(getServicesCategories());
  };
  useEffect(() => {
    initAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const serviceFinancial = tableData?.data?.serviceTransction?.[0];
  const header = [
    {
      title: <div className="text-start ps-3">Beauty Businesses</div>,
    },
    {
      title: "Category",
    },
    {
      title: <div className="text-nowrap">Registered Date</div>,
    },
    {
      title: <div className="text-nowrap">Total No. of Services</div>,
    },
    {
      title: "Pending",
    },
    {
      title: "Delivered",
    },
    {
      title: "Cancelled",
    },
    {
      title: <div className="text-nowrap">No-show</div>,
    },
    {
      title: "Action",
    },
  ];

  const rowData = [];

  tableData?.data?.data?.forEach((elem) => {
    const {
      _id,
      profileImageURL,
      businessName,
      serviceName,
      createdAt,
      totalService,
      pending,
      delieverd,
      cancelled,
      noShow,
    } = elem;
    let obj = [
      {
        value: (
          <div className="text-start ps-3 d-flex align-items-center gap-2">
            <div>
              <UserProfileLayout
                isRounded
                // text={businessName ? `${businessName}` : "Business Name"}
                url={profileImageURL}
                size="40"
              />
            </div>
            <div>
              <div
                className="text-13-500-21 pointer text-nowrap"
                onClick={() => {
                  navigate(`/services/${_id}`);
                }}
              >
                {businessName
                  ? titleCaseString(`${businessName}`)
                  : "Business Name"}
              </div>
              {/* <div className="text-9-500 color-blue-60">ID: {user_id}</div> */}
            </div>
          </div>
        ),
      },
      {
        value: serviceName?.map((o) => {
          const { serviceCategoryName } = o;
          return (
            <ul className="color-dashboard-primary text-nowrap">
              <li className="text-nowrap">{serviceCategoryName}</li>
            </ul>
          );
        }),
      },
      {
        value: (
          <div className="color-dashboard-primary">
            {moment(createdAt).format("DD-MM-YYYY")}
          </div>
        ),
      },
      {
        value: <div className="color-dashboard-primary">{totalService}</div>,
      },
      {
        value: <div className="color-dashboard-primary">{pending}</div>,
      },
      {
        value: <div className="color-dashboard-primary">{delieverd}</div>,
      },
      {
        value: <div className="color-dashboard-primary">{cancelled}</div>,
      },
      {
        value: <div className="color-dashboard-primary">{noShow}</div>,
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
                  navigate(`/services/${_id}`);
                }}
              >
                <span>
                  <img src={icons.dashboardIcon} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">
                  View Dashboard
                </span>
              </Dropdown.Item>
              <Dropdown.Item
                href=""
                className="d-flex align-items-center gap-2 mb-1"
                onClick={() => {
                  handelArchive({
                    Id: elem?._id,
                    type: "beautician",
                    isDeleted: !elem?.isDeleted,
                  });
                }}
              >
                <span>
                  <img src={icons.archiveIcon} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">
                  Archive Vendor
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
                  Delete Vendor
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
    doc.autoTable({ html: "#service-financial-data-table" });
    const header = exportHeader;
    let row = [];
    row = tableData?.data?.serviceTransction?.map((o) => {
      const sliike_revenue = 25.21651;
      // o?.totalSliikFees + o?.totalsliikFeeGST + o?.totalsliikFeePST;
      return [
        o?.totalSubTotal.toFixed(2) || 0.0,
        o?.discount.toFixed(2) || 0.0,
        o?.totalGSTORHST.toFixed(2) || 0.0,
        o?.totalPSTORQST.toFixed(2) || 0.0,
        o?.totalSliikFees.toFixed(2) || 0.0,
        o?.totalsliikFeeGST.toFixed(2) || 0.0,
        o?.totalsliikFeePST.toFixed(2) || 0.0,
        0.0,
        sliike_revenue.toFixed(2) || 0.0,
      ];
    });
    doc.autoTable(header, row, {
      startY: false,
      theme: "grid",
      tableWidth: "auto",
      columnWidth: "wrap",
      showHeader: "everyPage",
      tableLineWidth: 0,
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
    doc.save("Service Financial.pdf");
  };
  return (
    <div id="service-container" className="cmt-24 bg-white">
      <div className="cps-24 cpe-24 cpt-25 cpb-25 d-flex justify-content-between align-items-center">
        <div className="color-dashboard-primary text-20-700">
          Service Financials
        </div>
        <div className="d-flex gap-3">
          <CustomeDropdown
            placeholder="Year"
            value={yearText}
            optionValue="name"
            options={getMonthList(12).map((o) => {
              return { ...o, name: o.id };
            })}
            onChange={(e) => {
              let oldData = {
                ...tableData,
                chartSDate: moment(e.target.value)
                  .startOf("month")
                  .format("YYYY-MM-DD"),
                chartEDate: moment(e.target.value)
                  .endOf("month")
                  .format("YYYY-MM-DD"),
                loader: true,
              };
              setYearText(e.target.value);
              setTableData(oldData);
              fetchAllServices(oldData);
            }}
          />

          <ReportDownloadButton
            btnStyle="PD"
            btnText="DOWNLOAD REPORT"
            iconType="L-Download-White"
            data={exportData?.data}
            headers={exportHeader}
            filename={`Service Financial.csv`}
            pdfFile={() => {
              Print();
            }}
          />

          {/* <CSVLink
            data={exportData?.data}
            headers={exportHeader}
            filename={`Service Financial.csv`}
            className="text-decoration-none pointer"
          >
            <Button
              btnText="DOWNLOAD REPORT"
              className="text-nowrap"
              leftIcon={
                <img
                  src={icons.downloadBlack}
                  alt="download"
                  className="white-icon"
                />
              }
              btnStyle="PD"
            />
          </CSVLink> */}
        </div>
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="sm" />
        </div>
      ) : (
        <ServicesData serviceFinancial={serviceFinancial} />
      )}
      <div className="cpt-24 cmb-10 position-relative">
        {isDeletePopup &&
          (deleteID ? (
            <DeleteConfirmPopup
              title="Beauty Business"
              deleteID={deleteID}
              onHide={() => {
                setIsDeletePopup(false);
              }}
              apiFunction={async () => {
                await dispatch(deleteBeautician(deleteID._id));
                dispatch(throwSuccess("Beauty Business Deleted Successfully."));
                setIsDeletePopup(false);
                fetchAllServices();
                return;
              }}
              handelSuccess={() => {
                fetchAllServices();
              }}
            />
          ) : (
            ""
          ))}
        <div className="title-value-block d-flex align-items-center gap-2 cmb-24 cps-10">
          <div className="text-20-700 color-black-100">Beauty Businesses</div>
        </div>
        <div className="d-flex gap-3 bg-white cpt-20 cpb-20 cps-10">
          <div>
            <MenuOption
              icon={
                <Button
                  btnText={buttonText}
                  btnStyle="PLO"
                  iconType="R-Filter"
                />
              }
              option={servicesCategoryList.map((o) => {
                const { serviceCategoryName, _id } = o;
                return {
                  text: serviceCategoryName,
                  onClick: () => {
                    setButtonText(serviceCategoryName);
                    setCategoryId(_id);
                    handelFilter({ categoryId: _id });
                  },
                };
              })}
            />
          </div>

          <Button
            btnText="ARCHIVE"
            btnStyle="PLO"
            iconType="L-Archive"
            onClick={() => {
              navigate(commonRoute.servicesArchive);
            }}
          />

          <SearchInput
            placeholder="Search vendor"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        {isSuccess && (
          <div className="success-conteiner-2 d-flex gap-2 align-items-center rounded">
            <span className="bg-white pt-1 pb-1 ps-1 pe-1 rounded">
              <i className="bi bi-check d-flex" />
            </span>
            <span className="text-14-500 color-white">
              Service Provider Archived
            </span>
          </div>
        )}
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
              fetchAllServices(oldData);
            }}
            isPagination
          />
        </div>
      </div>
    </div>
  );
};

export default ViewServices;

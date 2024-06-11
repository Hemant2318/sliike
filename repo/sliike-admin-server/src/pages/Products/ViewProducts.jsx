import Button from "components/form/Button/Button";
import ProductChartData from "./ProductChartData/ProductChartData";
import MenuOption from "components/layouts/MenuOption/MenuOption";
import { commonRoute, icons } from "utils/constants";
import Table from "components/layouts/Table/Table";
import { useEffect, useState } from "react";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import { Dropdown } from "react-bootstrap";
import CustomDropdown from "components/form/Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeArchive,
  fetchProduct,
  getProductCategory,
} from "store/globalSlice";
import { omit } from "lodash";
import { getMonthList, titleCaseString } from "utils/helpers";
import moment from "moment";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import SearchInput from "components/form/SearchInput";
import "./ViewProducts.scss";
import jsPDF from "jspdf";
import ReportDownloadButton from "components/layouts/ReportDownloadButton";
const ViewProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [exportData, setExportData] = useState({ data: [], loader: false });
  const [yearText, setYearText] = useState("");
  const [searchValue, setSearchValue] = useState();
  const [timer, setTimer] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("Category");
  const { productCategoryList } = useSelector((state) => ({
    productCategoryList: state.global.productCategoryList,
  }));
  const [categoryId, setCategoryId] = useState("");
  const [tableData, setTableData] = useState({
    category: categoryId || "",
    type: "unarchive",
    chartSDate: moment().startOf("month").format("YYYY-MM-DD"),
    chartEDate: moment().endOf("month").format("YYYY-MM-DD"),
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    search: "",
    loading: true,
    data: [],
  });

  const exportHeader = [
    "Product sales",
    "Discount given",
    "GST/HST",
    "PST/QST",
    "Sliike fee",
    "Sliike GST/HST fee",
    "Sliike PST/QST fee",
    "Shipping",
    "Total amount earned",
    "Total Sliike revenue",
  ];

  const productFinancialReport = async (data) => {
    let flagArray = [];
    flagArray = data?.map((elm) => {
      return [
        elm?.productSales.toFixed(2) || 0.0,
        elm?.discount.toFixed(2) || 0.0,
        elm?.totalGSTORHST.toFixed(2) || 0.0,
        elm?.totalPSTORQST.toFixed(2) || 0.0,
        elm?.totalSliikFees.toFixed(2) || 0.0,
        elm?.totalsliikFeeGST.toFixed(2) || 0.0,
        elm?.totalsliikFeePST.toFixed(2) || 0.0,
        elm?.totalShipping.toFixed(2) || 0.0,
        elm?.totalAmountEarned.toFixed(2) || 0.0,
        elm?.sllikrevnue.toFixed(2) || 0.0,
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

  const getProductData = async (data) => {
    const payload = omit(data, ["data", "loading", "total"]);
    const response = await dispatch(fetchProduct(payload));
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
    productFinancialReport(response?.productFinacial);
  };

  const handelFilter = async ({ categoryId }) => {
    let oldData = tableData;
    oldData = { ...oldData, category: categoryId };
    setTableData(oldData);
    getProductData(oldData);
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

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
    let time = timer;
    clearTimeout(time);
    time = setTimeout(() => {
      let oldData = { ...tableData, search: value, loading: true };
      setTableData(oldData);
      getProductData(oldData);
    }, 800);
    setTimer(time);
  };

  const initAPI = async () => {
    await dispatch(getProductCategory());
  };
  useEffect(() => {
    getProductData(tableData);
    initAPI();
    setYearText(getMonthList(12)[0].id);
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
                  navigate(`/products/details/${_id}`);
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
              >
                <span>
                  <img src={icons.dashboard} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">
                  View Dashboard
                </span>
              </Dropdown.Item>
              <Dropdown.Item
                href=""
                className="d-flex align-items-center gap-2 mb-1"
                onClick={(e) => {
                  handleArchive(_id, "beautician", !isDeleted);
                  // setIsSuccess(true);
                  // setTimeout(() => {
                  //   setIsSuccess(false);
                  // }, 2000);
                }}
              >
                <span>
                  <img src={icons.archiveIcon} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">
                  Archive Product
                </span>
              </Dropdown.Item>
              <Dropdown.Item
                href=""
                className="d-flex align-items-center gap-2 mb-1"
              >
                <span>
                  <img src={icons.trashIcon} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">
                  Delete Product
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
    doc.autoTable({ html: "#product-financial-data-table" });
    const header = exportHeader;
    let row = exportData?.data;
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
    doc.save("Product Financial.pdf");
  };
  return (
    <div id="products-container" className="cmt-24">
      <div className="text-20-700">Products</div>
      <div className="d-flex justify-content-between align-items-center cps-24 cpe-24 card-effect cmb-24 cpt-25 cpb-25">
        <div className="text-20-700 color-dashboard-primary">
          Product Financial
        </div>
        <div className="d-flex gap-3">
          <CustomDropdown
            placeholder="Year"
            value={yearText}
            options={getMonthList(12).map((o) => {
              return { ...o, name: o.id };
            })}
            optionValue="name"
            onChange={(e) => {
              let oldData = {
                ...tableData,
                chartSDate: moment(e.target.value)
                  .startOf("month")
                  .format("DD-MM-YYYY"),
                chartEDate: moment(e.target.value)
                  .endOf("month")
                  .format("DD-MM-YYYY"),
                loading: true,
              };
              setYearText(e.target.value);
              setTableData(oldData);
              getProductData(oldData);
            }}
          />
          <ReportDownloadButton
            btnStyle="PD"
            btnText="DOWNLOAD REPORT"
            iconType="L-Download-White"
            data={exportData?.data}
            headers={exportHeader}
            filename={`Product Financial.csv`}
            pdfFile={() => {
              Print();
            }}
          />
        </div>
      </div>
      <ProductChartData
        tableData={tableData}
        setTableData={setTableData}
        getProductData={getProductData}
      />
      {/* <div className="product-chart-data cmt-24 cmb-56">
      </div> */}

      <div className="cpt-40 cmb-10 position-relative">
        <div className="text-20-700 cmb-15">Vendors List</div>
        <div className="d-flex gap-3 cps-24 bg-white cpt-15 cpb-15">
          <div>
            <MenuOption
              icon={
                <Button
                  btnText={buttonText}
                  btnStyle="PLO"
                  iconType="R-Filter"
                />
              }
              option={productCategoryList.map((o) => {
                const { productCategoryName, _id } = o;
                return {
                  text: productCategoryName,
                  onClick: () => {
                    setButtonText(productCategoryName);
                    setCategoryId(_id);
                    handelFilter({ categoryId: _id });
                  },
                };
              })}
            />
          </div>
          <Button
            btnText="Archive"
            btnStyle="PLO"
            iconType="L-Archive"
            onClick={() => {
              navigate(commonRoute.productsArchive);
            }}
          />
          <SearchInput
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search vendor"
          />
        </div>
        {isSuccess && (
          <div className="success-conteiner-2 d-flex gap-2 align-items-center rounded">
            <span className="bg-white pt-1 pb-1 ps-1 pe-1 rounded">
              <i className="bi bi-check d-flex" />
            </span>
            <span className="text-14-500 color-white">Vender Archived</span>
          </div>
        )}
        <div className="overflow-auto">
          <Table
            header={header}
            rowData={rowData}
            isLoading={tableData?.loading}
            tableData={tableData}
            searchInputChange={(searchText) => {
              let oldData = { ...tableData, search: searchText, loading: true };
              setTableData(oldData);
              getProductData(oldData);
            }}
            changeOffset={(newOffset, newLimit = tableData.limit) => {
              let oldData = {
                ...tableData,
                offset: newOffset,
                limit: newLimit,
                loading: true,
              };
              setTableData(oldData);
              getProductData(oldData);
            }}
            isPagination
          />
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;

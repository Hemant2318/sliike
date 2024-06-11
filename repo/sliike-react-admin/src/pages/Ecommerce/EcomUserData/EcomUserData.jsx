import CheckBox from "components/form/CheckBox";
import ReportDownloadButton from "components/layouts/ReportDownloadButton";
import Table from "components/layouts/Table";
import UserProfileLayout from "components/layouts/UserProfileLayout";
import { omit } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { getECommerceUserData } from "store/globalSlice";
import { icons } from "utils/constants";
import { objectToQueryParams, titleCaseString } from "utils/helpers";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EcomUserData = () => {
  const dispatch = useDispatch();
  const [checkedUsers, setCheckedUsers] = useState([]);

  const [exportSingleData, setExportSingleData] = useState({
    data: [],
    loader: false,
  });
  const [tableData, setTableData] = useState({
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    loading: true,
    data: [],
  });

  const fetchEComUserData = async (obj) => {
    const queryParams = objectToQueryParams(
      omit(obj, ["data", "loading", "total"])
    );
    const response = await dispatch(getECommerceUserData(queryParams));
    if (response?.status === 200) {
      setTableData((prev) => {
        return {
          ...prev,
          data: response?.data?.beauticianData,
          total: response?.data?.count,
          loading: false,
        };
      });
    }

    exportTotalUsers(response?.data?.beauticianData);
  };

  const headers = [
    "Business Name",
    "Id",
    "Business type",
    "Registered Date",
    "Full Name",
    "Phone",
    "Email",
    "Address",
    "Language",
    "City",
    "Province",
    "Country",
    "Demographic",
    "Gender",
    "of Products",
    "of Clients",
    "Product Category",
    "Sales Tax",
    "GST/HST",
    "QST/PST",
    "Profile Completion",
  ];
  let csvData = [];
  csvData = checkedUsers?.map((o) => {
    const {
      businessName,
      uid,
      business_type = "Beauty Product Shop",
      registeredDate,
      firstName,
      lastName,
      businessNumber,
      email,
      addressDetails,
      language,
      city,
      provinceDetails,
      country,
      demographys,
      gender,
      numOfProducts,
      numOfClients,
      categoryDetails,
      taxProvinceDetails,
      screenStatus,
      totalProducts,
      stripe_id,
    } = o;
    const businessDetails = screenStatus >= 4 ? 25 : 0;
    const addProduct = totalProducts >= 3 ? 25 : 0;
    const bankDetails = stripe_id !== null ? 25 : 0;
    const salesTax = taxProvinceDetails !== null ? 25 : 0;
    const profileCcompletion =
      businessDetails + addProduct + bankDetails + salesTax;
    const demography = demographys?.map((el) => {
      return el?.demographyName;
    });
    const category = categoryDetails?.map((o) => {
      return o?.productCategoryName;
    });
    return [
      businessName,
      uid,
      business_type,
      moment(registeredDate).format("DD MMM, YYYY"),
      titleCaseString(`${firstName} ${lastName}`),
      businessNumber,
      email,
      `${addressDetails?.[0]?.apartment} ${addressDetails?.[0]?.street} ${addressDetails?.[0]?.address} ${addressDetails?.[0]?.city} ${addressDetails?.[0]?.zipCode}`,
      language,
      city,
      provinceDetails?.[0]?.name,
      country,
      demography,
      gender !== null ? gender : "-",
      numOfProducts,
      numOfClients,
      category,
      taxProvinceDetails === null ? "No" : "Yes",
      taxProvinceDetails?.GSTNumber === null
        ? taxProvinceDetails?.HSTNumber === null
          ? "-"
          : taxProvinceDetails?.HSTNumber
        : taxProvinceDetails?.GSTNumber,

      taxProvinceDetails?.QSTNumber === null
        ? taxProvinceDetails?.PSTNumber === null
          ? "-"
          : taxProvinceDetails?.PSTNumber
        : taxProvinceDetails?.QSTNumber,
      profileCcompletion && `${profileCcompletion}%`,
    ];
  });

  const singleUserData = (data) => {
    const {
      businessName,
      uid,
      business_type = "Beauty Product Shop",
      registeredDate,
      firstName,
      lastName,
      businessNumber,
      email,
      addressDetails,
      language,
      city,
      provinceDetails,
      country,
      demographys,
      gender,
      numOfProducts,
      numOfClients,
      categoryDetails,
      taxProvinceDetails,
      screenStatus,
      totalProducts,
      stripe_id,
    } = data;
    const businessDetails = screenStatus >= 4 ? 25 : 0;
    const addProduct = totalProducts >= 3 ? 25 : 0;
    const bankDetails = stripe_id !== null ? 25 : 0;
    const salesTax = taxProvinceDetails !== null ? 25 : 0;
    const profileCcompletion =
      businessDetails + addProduct + bankDetails + salesTax;
    const demography = demographys?.map((el) => {
      return el?.demographyName;
    });
    const category = categoryDetails?.map((o) => {
      return o?.productCategoryName;
    });
    let flagArray = [
      businessName,
      uid,
      business_type,
      moment(registeredDate).format("DD MMM, YYYY"),
      titleCaseString(`${firstName} ${lastName}`),
      businessNumber,
      email,
      `${addressDetails?.[0]?.apartment} ${addressDetails?.[0]?.street} ${addressDetails?.[0]?.address} ${addressDetails?.[0]?.city} ${addressDetails?.[0]?.zipCode}`,
      language,
      city,
      provinceDetails?.[0]?.name,
      country,
      demography,
      gender !== null ? gender : "-",
      numOfProducts,
      numOfClients,
      category,
      taxProvinceDetails === null ? "No" : "Yes",
      taxProvinceDetails?.GSTNumber === null
        ? taxProvinceDetails?.HSTNumber === null
          ? "-"
          : taxProvinceDetails?.HSTNumber
        : taxProvinceDetails?.GSTNumber,

      taxProvinceDetails?.QSTNumber === null
        ? taxProvinceDetails?.PSTNumber === null
          ? "-"
          : taxProvinceDetails?.PSTNumber
        : taxProvinceDetails?.QSTNumber,
      profileCcompletion && `${profileCcompletion}%`,
    ];

    setExportSingleData((prev) => {
      return {
        ...prev,
        data: flagArray,
        loader: false,
      };
    });
  };

  const handleChangeAll = (e) => {
    if (e.target.checked) {
      const allUsers = tableData?.data?.map((o) => o);
      setCheckedUsers(allUsers);
    } else {
      setCheckedUsers([]);
    }
  };

  const handleSingleChange = (e, elem) => {
    if (e.target.checked) {
      setCheckedUsers([...checkedUsers, elem]);
    } else {
      setCheckedUsers(checkedUsers.filter((item) => item !== elem));
    }
  };
  const exportTotalUsers = async (userData) => {
    let allUsersData = [];
    allUsersData = userData?.map((elem) => {
      const {
        businessName,
        uid,
        business_type = "Beauty Product Shop",
        registeredDate,
        firstName,
        lastName,
        businessNumber,
        email,
        addressDetails,
        language,
        city,
        provinceDetails,
        country,
        demographys,
        gender,
        numOfProducts,
        numOfClients,
        categoryDetails,
        taxProvinceDetails,
        screenStatus,
        totalProducts,
        stripe_id,
      } = elem;

      const businessDetails = screenStatus >= 4 ? 25 : 0;
      const addProduct = totalProducts >= 3 ? 25 : 0;
      const bankDetails = stripe_id !== null ? 25 : 0;
      const salesTax = taxProvinceDetails !== null ? 25 : 0;
      const profileCcompletion =
        businessDetails + addProduct + bankDetails + salesTax;
      const demography = demographys?.map((el) => {
        return el?.demographyName;
      });
      const category = categoryDetails?.map((o) => {
        return o?.productCategoryName;
      });
      return [
        businessName,
        uid,
        business_type,
        moment(registeredDate).format("DD MMM, YYYY"),
        titleCaseString(`${firstName} ${lastName}`),
        businessNumber,
        email,
        `${addressDetails?.[0]?.apartment} ${addressDetails?.[0]?.street} ${addressDetails?.[0]?.address} ${addressDetails?.[0]?.city} ${addressDetails?.[0]?.zipCode}`,
        language,
        city,
        provinceDetails?.[0]?.name,
        country,
        demography,
        gender !== null ? gender : "-",
        numOfProducts,
        numOfClients,
        category,
        taxProvinceDetails === null ? "No" : "Yes",
        taxProvinceDetails?.GSTNumber === null
          ? taxProvinceDetails?.HSTNumber === null
            ? "-"
            : taxProvinceDetails?.HSTNumber
          : taxProvinceDetails?.GSTNumber,

        taxProvinceDetails?.QSTNumber === null
          ? taxProvinceDetails?.PSTNumber === null
            ? "-"
            : taxProvinceDetails?.PSTNumber
          : taxProvinceDetails?.QSTNumber,
        profileCcompletion && `${profileCcompletion}%`,
      ];
    });
    setExportSingleData((prev) => {
      return { ...prev, data: allUsersData, loader: true };
    });
  };

  useEffect(() => {
    fetchEComUserData(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const dummyData = [
  //   {
  //     id: 1,
  //     business_name: "Queens Beauty Store",
  //     bId: "ID: SLKB0000001+",
  //     business_type: "Beauty Product Shop",
  //     registerd_data: "12 jun, 2023",
  //     full_name: "Jake Sully",
  //     phone: "000-000-0000",
  //     email: "11223345@gmail.com",
  //     address: "Route Du 3e-rang,Collingwood, qc, Canada",
  //     language: "English",
  //     city: "Toronto",
  //     province: "Ontario",
  //     country: "Canada",
  //     demography: "Black",
  //     gender: "Male",
  //     no_of_products: 102,
  //     no_of_clients: 80,
  //     product_category: "Make Up",
  //     sales_tax: "Yes",
  //     gst_hst: "000000000 RT0001",
  //     qst_pst: "0000000000 TQ0001",
  //     profile_completion: "100%",
  //   },
  //   {
  //     id: 2,
  //     business_name: "Queens Beauty Store",
  //     bId: "ID: SLKB0000001+",
  //     business_type: "Beauty Product Shop",
  //     registerd_data: "12 jun, 2023",
  //     full_name: "Jake Sully",
  //     phone: "000-000-0000",
  //     email: "11223345@gmail.com",
  //     address: "Route Du 3e-rang,Collingwood, qc, Canada",
  //     language: "English",
  //     city: "Toronto",
  //     province: "Ontario",
  //     country: "Canada",
  //     demography: "Black",
  //     gender: "Male",
  //     no_of_products: 102,
  //     no_of_clients: 80,
  //     product_category: "Make Up",
  //     sales_tax: "Yes",
  //     gst_hst: "000000000 RT0001",
  //     qst_pst: "0000000000 TQ0001",
  //     profile_completion: "100%",
  //   },
  //   {
  //     id: 3,
  //     business_name: "Queens Beauty Store",
  //     bId: "ID: SLKB0000001+",
  //     business_type: "Beauty Product Shop",
  //     registerd_data: "12 jun, 2023",
  //     full_name: "Jake Sully",
  //     phone: "000-000-0000",
  //     email: "11223345@gmail.com",
  //     address: "Route Du 3e-rang,Collingwood, qc, Canada",
  //     language: "English",
  //     city: "Toronto",
  //     province: "Ontario",
  //     country: "Canada",
  //     demography: "Black",
  //     gender: "Male",
  //     no_of_products: 102,
  //     no_of_clients: 80,
  //     product_category: "Make Up",
  //     sales_tax: "Yes",
  //     gst_hst: "000000000 RT0001",
  //     qst_pst: "0000000000 TQ0001",
  //     profile_completion: "100%",
  //   },
  //   {
  //     id: 4,
  //     business_name: "Queens Beauty Store",
  //     bId: "ID: SLKB0000001+",
  //     business_type: "Beauty Product Shop",
  //     registerd_data: "12 jun, 2023",
  //     full_name: "Jake Sully",
  //     phone: "000-000-0000",
  //     email: "11223345@gmail.com",
  //     address: "Route Du 3e-rang,Collingwood, qc, Canada",
  //     language: "English",
  //     city: "Toronto",
  //     province: "Ontario",
  //     country: "Canada",
  //     demography: "Black",
  //     gender: "Male",
  //     no_of_products: 102,
  //     no_of_clients: 80,
  //     product_category: "Make Up",
  //     sales_tax: "Yes",
  //     gst_hst: "000000000 RT0001",
  //     qst_pst: "0000000000 TQ0001",
  //     profile_completion: "100%",
  //   },
  //   {
  //     id: 5,
  //     business_name: "Queens Beauty Store",
  //     bId: "ID: SLKB0000001+",
  //     business_type: "Beauty Product Shop",
  //     registerd_data: "12 jun, 2023",
  //     full_name: "Jake Sully",
  //     phone: "000-000-0000",
  //     email: "11223345@gmail.com",
  //     address: "Route Du 3e-rang,Collingwood, qc, Canada",
  //     language: "English",
  //     city: "Toronto",
  //     province: "Ontario",
  //     country: "Canada",
  //     demography: "Black",
  //     gender: "Male",
  //     no_of_products: 102,
  //     no_of_clients: 80,
  //     product_category: "Make Up",
  //     sales_tax: "Yes",
  //     gst_hst: "000000000 RT0001",
  //     qst_pst: "0000000000 TQ0001",
  //     profile_completion: "100%",
  //   },
  // ];
  const header = [
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600 d-flex align-items-center gap-2">
          <CheckBox
            className="header-user-data-checkbox"
            id="all"
            onChange={handleChangeAll}
            checked={checkedUsers.length === tableData?.data?.length}
          />
          Business Name
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Business type
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Registered Date
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Full Name
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Phone
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Email
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Address
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Language
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          City
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Province
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Country
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Demographic
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Gender
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          No. of Products
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          No. of Clients
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Product Category
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Sales Tax
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          GST/HST
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          QST/PST
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Profile Completion
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Action
        </div>
      ),
    },
  ];

  let rowData = [];
  tableData?.data?.forEach((elem) => {
    const {
      logo,
      businessName,
      uid,
      business_type = "Beauty Product Shop",
      registeredDate,
      firstName,
      lastName,
      businessNumber,
      email,
      addressDetails,
      language,
      city,
      provinceDetails,
      country,
      demographys,
      gender,
      numOfProducts,
      numOfClients,
      categoryDetails,
      taxProvinceDetails,
      screenStatus,
      totalProducts,
      stripe_id,
    } = elem;
    const businessDetails = screenStatus >= 4 ? 25 : 0;
    const addProduct = totalProducts >= 3 ? 25 : 0;
    const bankDetails = stripe_id !== null ? 25 : 0;
    const salesTax = taxProvinceDetails !== null ? 25 : 0;
    const profileCcompletion =
      businessDetails + addProduct + bankDetails + salesTax;
    let obj = [
      {
        value: (
          <div className="text-nowrap d-flex align-items-center gap-2">
            <div>
              <CheckBox
                className="user-data-checkbox"
                id="single-check"
                checked={checkedUsers.includes(elem)}
                onChange={(e) => {
                  handleSingleChange(e, elem);
                }}
              />
            </div>
            <div>
              <UserProfileLayout
                text={businessName}
                size="40"
                isSquare
                url={logo}
              />
            </div>
            <div className="text-nowrap color-black-80">
              <div className="color-black-100 text-13-500-21">
                {titleCaseString(businessName)}
              </div>
              <div className="color-black-100 text-13-500-21">{uid}</div>
            </div>
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">{business_type}</div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {moment(registeredDate).format("DD MMM, YYYY")}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {titleCaseString(`${firstName} ${lastName}`)}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">{businessNumber}</div>
        ),
      },
      {
        value: <div className="text-nowrap color-black-80">{email}</div>,
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            <div>
              {addressDetails?.length > 0
                ? addressDetails?.[0]?.apartment
                : "-"}
            </div>
            <div>
              {" "}
              {addressDetails?.length > 0 ? addressDetails?.[0]?.street : "-"}
            </div>

            <div>
              {addressDetails?.length > 0 ? addressDetails?.[0]?.address : "-"}
            </div>
          </div>
        ),
      },
      {
        value: <div className="text-nowrap color-black-80">{language}</div>,
      },
      {
        value: <div className="text-nowrap color-black-80">{city}</div>,
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {provinceDetails.length ? provinceDetails?.[0]?.name : "-"}
          </div>
        ),
      },
      {
        value: <div className="text-nowrap color-black-80">{country}</div>,
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {demographys.length ? (
              <div className="d-flex">
                <div>Demography</div>
                <Dropdown align="start">
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <img src={icons.downArrow} alt="dwn-arrow" />
                  </Dropdown.Toggle>
                  <DropdownMenu>
                    {demographys?.map((elem, i) => {
                      const { demographyName } = elem;
                      return (
                        <DropdownItem key={i}>
                          <div className="color-dashboard-primary">
                            {demographyName}
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
        value: <div className="text-nowrap color-black-80">{gender}</div>,
      },
      {
        value: (
          <div className="text-nowrap color-black-80">{numOfProducts}</div>
        ),
      },
      {
        value: <div className="text-nowrap color-black-80">{numOfClients}</div>,
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {categoryDetails.length ? (
              <div className="d-flex">
                <div>Category</div>
                <Dropdown align="start">
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <img src={icons.downArrow} alt="dwn-arrow" />
                  </Dropdown.Toggle>
                  <DropdownMenu>
                    {categoryDetails?.map((elem, i) => {
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
          <div className="text-nowrap color-black-80">
            {taxProvinceDetails === null ? "No" : "Yes"}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {taxProvinceDetails?.GSTNumber === null
              ? taxProvinceDetails?.HSTNumber === null
                ? "-"
                : taxProvinceDetails?.HSTNumber
              : taxProvinceDetails?.GSTNumber}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">
            {taxProvinceDetails?.QSTNumber === null
              ? taxProvinceDetails?.PSTNumber === null
                ? "-"
                : taxProvinceDetails?.PSTNumber
              : taxProvinceDetails?.QSTNumber}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap color-black-80">{`${Math.round(
            profileCcompletion.toFixed(2)
          )}%`}</div>
        ),
      },
      {
        value: (
          <div
            className="text-nowrap color-black-80"
            onClick={() => {
              singleUserData(elem);
            }}
          >
            <CSVLink
              data={[exportSingleData?.data]}
              headers={headers}
              filename={`singleUserData.csv`}
              className="text-decoration-none pointer"
            >
              <div className="d-flex gap-2 align-items-center">
                <span className="text-13-500-21 color-black-80">Download</span>
                <img src={icons.downloadBlack} alt="add-brands" />
              </div>
            </CSVLink>
          </div>
        ),
      },
    ];

    rowData.push({ data: obj });
  });

  const doc = new jsPDF("landscape");
  const Print = () => {
    doc.autoTable({
      html: "#my-table",
      columnStyles: { 3: { cellWidth: 100 } },
    });
    const tHeaders = headers;
    let row = [];
    let checkRow = csvData;
    let allRows = exportSingleData?.data;
    row = checkedUsers.length ? checkRow : allRows;
    doc.autoTable(tHeaders, row, {
      startY: false,
      theme: "grid",
      horizontalPageBreak: true,
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
    doc.save("User Data.pdf");
    setCheckedUsers([]);
  };
  return (
    <div id="ecom-user-data" className="bg-white cpt-24 cpe-24 cpb-24 cps-24">
      <div className="d-flex justify-content-between align-items-center cmb-25">
        <div className="text-17-600 color-ieie">
          E-commerce businesses
          <span className="color-blue-60">{` (${tableData?.total})`}</span>
        </div>
        <ReportDownloadButton
          btnStyle="PD"
          btnText="DOWNLOAD REPORT"
          iconType="L-Download-White"
          headers={headers}
          setCheckUser={setCheckedUsers}
          data={checkedUsers.length ? csvData : exportSingleData?.data}
          filename="UserData.csv"
          pdfFile={() => {
            Print();
          }}
          isCheck
        />
      </div>

      <div className="overflow-auto">
        <Table
          header={header}
          rowData={rowData}
          tableData={tableData}
          isLoading={tableData?.loading}
          tHead="bg-blue-10"
          isPagination
          changeOffset={(newOffset, newLimit = tableData.limit) => {
            let oldData = {
              ...tableData,
              offset: newOffset,
              limit: newLimit,
              loading: true,
            };
            setTableData(oldData);
            fetchEComUserData(oldData);
          }}
        />
      </div>
    </div>
  );
};

export default EcomUserData;

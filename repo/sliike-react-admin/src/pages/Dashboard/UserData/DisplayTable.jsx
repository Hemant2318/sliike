import Table from "components/layouts/Table/Table";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import React, { useState } from "react";
import { icons } from "utils/constants";

const DisplayTable = ({ userType, tableData, setTableData }) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpenService, setIsOpenService] = useState(false);
  //   const toggleClass = () => {
  //     setActive(!isActive);
  //   };

  // const handleClick = () => {
  //   console.log("length", rowData?.length);
  // };

  const [clickedCellIndex, setClickedCellIndex] = useState(null);
  const handleCellClick = (index) => {
    if (index !== clickedCellIndex) {
      setClickedCellIndex(index);
    } else {
      setClickedCellIndex(0);
    }
  };

  const header =
    userType === "Beautician"
      ? [
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Business Name
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Business Type
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
                No. of Services
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
                Service Category
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Service Types
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Product Names
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                License
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
        ]
      : [
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Client Name
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
                Age
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Service Booked
              </div>
            ),
          },
          {
            title: (
              <div className="text-nowrap color-dashboard-primary text-13-600">
                Products Orders
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
      address,
      bName,
      cName,
      businessType,
      city,
      county,
      demography,
      email,
      fullName,
      gender,
      gstHst,
      language,
      license,
      noOfClients,
      noOfProducts,
      noOfService,
      phone,
      productName,
      profileCompletion,
      province,
      qstPst,
      rDate,
      salesTax,
      serviceCategory,
      serviceType,
      user_id,
      age,
      serviceBook,
      productsOrder,
    } = elem;

    let obj =
      userType === "Beautician"
        ? [
            {
              value: (
                <div className="text-nowrap d-flex align-items-center gap-2">
                  <div>
                    <UserProfileLayout text={bName} size="40" />
                  </div>
                  <div className="text-nowrap color-black-80">
                    <div className="color-black-100 text-13-500-21">
                      {bName}
                    </div>
                    <div className="color-blue-60 text-11-500-18">
                      {user_id}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{businessType}</div>
              ),
            },
            {
              value: <div className="text-nowrap color-black-80">{rDate}</div>,
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{fullName}</div>
              ),
            },
            {
              value: <div className="text-nowrap color-black-80">{phone}</div>,
            },
            {
              value: <div className="text-nowrap color-blue">{email}</div>,
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{address}</div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{language}</div>
              ),
            },
            {
              value: <div className="text-nowrap color-black-80">{city}</div>,
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{province}</div>
              ),
            },
            {
              value: <div className="text-nowrap color-black-80">{county}</div>,
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{demography}</div>
              ),
            },
            {
              value: <div className="text-nowrap color-black-80">{gender}</div>,
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{noOfService}</div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{noOfProducts}</div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{noOfClients}</div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {serviceCategory}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap list-items">
                  <div className="list-title">
                    <span className="color-black-80">View services</span>
                    <i className="bi bi-chevron-down toggle-btn" />
                  </div>
                  {serviceType?.map((e, i) => {
                    return (
                      <div className="list-content color-black-80" key={i}>
                        {e}
                      </div>
                    );
                  })}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap list-items">
                  <div className="list-title">
                    <span className="color-black-80">View products</span>
                    <i className="bi bi-chevron-down toggle-btn" />
                  </div>
                  {productName?.map((e, i) => {
                    return (
                      <div className="list-content color-black-80" key={i}>
                        {e}
                      </div>
                    );
                  })}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{license}</div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{salesTax}</div>
              ),
            },
            {
              value: <div className="text-nowrap color-black-80">{gstHst}</div>,
            },
            {
              value: <div className="text-nowrap color-black-80">{qstPst}</div>,
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {profileCompletion}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap d-flex gap-2 align-items-center pointer">
                  <span className="text-13-500-21 color-black-80">
                    Download
                  </span>
                  <img src={icons.downloadBlack} alt="add-brands" />
                </div>
              ),
            },
          ]
        : [
            {
              value: (
                <div className="text-nowrap d-flex align-items-center gap-2">
                  <div>
                    <UserProfileLayout text={cName} size="40" />
                  </div>
                  <div className="text-nowrap color-black-80">
                    <div className="color-black-100 text-13-500-21">
                      {cName}
                    </div>
                    <div className="color-blue-60 text-11-500-18">
                      {user_id}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              value: <div className="text-nowrap color-black-80">{rDate}</div>,
            },
            {
              value: <div className="text-nowrap color-black-80">{phone}</div>,
            },
            {
              value: <div className="text-nowrap color-blue">{email}</div>,
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{address}</div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{language}</div>
              ),
            },
            {
              value: <div className="text-nowrap color-black-80">{city}</div>,
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{province}</div>
              ),
            },
            {
              value: <div className="text-nowrap color-black-80">{county}</div>,
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{demography}</div>
              ),
            },
            {
              value: <div className="text-nowrap color-black-80">{gender}</div>,
            },
            {
              value: <div className="text-nowrap color-black-80">{age}</div>,
            },
            {
              value: (
                <div className="text-nowrap color-black-80">{serviceBook}</div>
              ),
            },
            {
              value: (
                <div className="text-nowrap color-black-80">
                  {productsOrder}
                </div>
              ),
            },

            {
              value: (
                <div className="text-nowrap color-black-80">
                  {profileCompletion}
                </div>
              ),
            },
            {
              value: (
                <div className="text-nowrap d-flex gap-2 align-items-center pointer">
                  <span className="text-13-500-21 color-black-80">
                    Download
                  </span>
                  <img src={icons.downloadBlack} alt="add-brands" />
                </div>
              ),
            },
          ];
    rowData.push({ data: obj });
  });

  return (
    <div className="overflow-auto">
      <Table
        header={header}
        rowData={rowData}
        tableData={tableData}
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
        }}
        clickedCellIndex={clickedCellIndex}
        onCellClick={handleCellClick}
      />
    </div>
  );
};

export default DisplayTable;

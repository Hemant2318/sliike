import React, { useState } from "react";
import Button from "components/form/Button/Button";
import UsersJourneyTable from "./UsersJourneyTable";
import "./UsersJourney.scss";
import { useEffect } from "react";
import { omit } from "lodash";
import { useDispatch } from "react-redux";
import { getAllUsers } from "store/globalSlice";
import { objectToQueryParams, titleCaseString } from "utils/helpers";
import Table from "components/layouts/Table/Table";
import { useNavigate } from "react-router-dom";

const UsersJourney = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [detailsData, setDetailsData] = useState(null);

  // const [userType, setUserType] = useState("beauticians");
  // let dummyData = [
  //   {
  //     id: 1,
  //     name: "Queens Beauty Place",
  //     user_id: "SLKB0000001+",
  //     status: 8,
  //   },
  //   {
  //     id: 2,
  //     name: "Kings cutz",
  //     user_id: "SLKB0000002",
  //     status: 2,
  //   },
  //   {
  //     id: 3,
  //     name: "Beauty Place",
  //     user_id: "SLKB0000003",
  //     status: 9,
  //   },
  //   {
  //     id: 4,
  //     name: "SPA Haven",
  //     user_id: "SLKB0000004",
  //     status: 5,
  //   },
  //   {
  //     id: 5,
  //     name: "Qim house",
  //     user_id: "SLKB0000005",
  //     status: 3,
  //   },
  //   {
  //     id: 6,
  //     name: "Lorels",
  //     user_id: "SLKB0000006",
  //     status: 7,
  //   },
  // ];
  const [tableData, setTableData] = useState({
    type: "Beautician",
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    loading: true,
    data: [],
  });

  const fetchAllUSers = async (obj) => {
    const queryParams = objectToQueryParams(
      omit(obj, ["data", "loading", "total"])
    );

    const response = await dispatch(getAllUsers(queryParams));
    if (response?.status === 200) {
      setTableData((prev) => {
        return {
          ...prev,
          data: response?.data?.journeyData,
          total: response?.data?.count || 0,
          loading: false,
        };
      });
    }
  };
  useEffect(() => {
    fetchAllUSers(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const header = [
    {
      title: (
        <div className="text-nowrap color-dashboard-primary">
          {tableData?.type === "Beautician" ? "Beautician" : "Client"}
        </div>
      ),
    },
    {
      title: <div className="text-nowrap color-dashboard-primary">Status</div>,
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary d-flex justify-content-end">
          Action
        </div>
      ),
    },
  ];

  const rowData = [];
  tableData?.data?.forEach((elem) => {
    const {
      _id: id,
      businessName,
      firstName,
      lastName,
      uid,
      stripe_id,
      serviceCount,
      screenStatus,
      isLicensed,
      taxProvinceDetails,
      countInvitaion,
      addressValue,
      DOB,
      demography = 0,
      gender,
      unSuccessfulSearch,
      serviceType,
      favoriteService = 0,
    } = elem;

    const businessDetails = screenStatus >= 4 ? 14.3 : 0;
    const businessHours = screenStatus === 7 ? 14.3 : 0;
    const license = isLicensed === 1 ? 14.3 : 0;
    const services = serviceCount >= 3 ? 14.3 : 0;
    const bankDetails = stripe_id !== null ? 14.3 : 0;
    const importCount = countInvitaion === 1 ? 14.3 : 0;
    const serviceTax = taxProvinceDetails !== null ? 14.3 : 0;

    const status =
      businessDetails +
      businessHours +
      license +
      services +
      bankDetails +
      importCount +
      serviceTax;

    const addValue = addressValue > 0 ? 14.3 : 0;
    const dobValue = DOB !== null ? 14.3 : 0;
    const demographyVal = demography === 1 ? 14.3 : 0;
    const genderVal = gender !== null ? 14.3 : 0;
    const unSuccessService = unSuccessfulSearch >= 3 ? 14.3 : 0;
    const unFinishBooking = serviceType?.length !== 0 ? 14.3 : 0;
    const favoriteServiceVal = favoriteService >= 2 ? 14.3 : 0;

    const clientStatus =
      addValue +
      dobValue +
      demographyVal +
      genderVal +
      unSuccessService +
      unFinishBooking +
      favoriteServiceVal;
    let obj = [
      {
        value: (
          <div className="text-nowrap">
            <div className="text-13-500-21 color-black-100">
              {tableData?.type === "Beautician"
                ? businessName
                  ? titleCaseString(businessName)
                  : "Business Name"
                : titleCaseString(`${firstName} ${lastName}`)}
            </div>
            <div className="text-11-500 color-blue-60">ID: {uid}</div>
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap d-flex gap-2">
            <div className="text-15-700 color-black-80">
              {tableData?.type === "Beautician"
                ? `${Math.round(status.toFixed(2))}%`
                : `${Math.round(clientStatus.toFixed(2))}%`}
            </div>
            <div className="text-15-500 color-black-60">Progress</div>
          </div>
        ),
      },
      {
        value: (
          <div className="d-flex justify-content-end">
            <Button
              btnText="View Details"
              btnStyle="BLB"
              className="h-30 cpt-18 cpb-18"
              onClick={() => {
                // setDetailsData(elem);
                navigate(`/dashboard/users-journey/details/${id}`, {
                  state: { ...elem, userType: tableData?.type },
                });
              }}
            />
          </div>
        ),
      },
    ];
    rowData.push({ data: obj });
  });
  return (
    <div className="user-journey bg-white cps-24 cpt-24 cpe-24 cpb-24 rounded">
      <div className="heading text-15-500 color-dashboard-primary cmb-25">
        Monitor all pending registrations and bookings in progress.
      </div>
      <div className="d-flex gap-3 cmb-25">
        <Button
          className="rounded-pill"
          btnText="Beauticians"
          btnStyle={tableData?.type === "Beautician" ? "PD" : "BD"}
          onClick={() => {
            let oldData = { ...tableData, type: "Beautician", loading: true };
            setTableData(oldData);
            fetchAllUSers(oldData);
          }}
        />
        <Button
          className="rounded-pill"
          btnText="Clients"
          btnStyle={tableData?.type === "Client" ? "PD" : "BD"}
          onClick={() => {
            let oldData = { ...tableData, type: "Client", loading: true };
            setTableData(oldData);
            fetchAllUSers(oldData);
          }}
        />
      </div>
      <div className="text-20-700 color-black-100 cmb-25">
        {tableData?.type === "Beautician" ? "Beauticians" : "Clients"}
      </div>

      <div className="overflow-auto">
        <Table
          header={header}
          rowData={rowData}
          tableData={tableData}
          isLoading={tableData?.loading}
          changeOffset={(newOffset, newLimit = tableData.limit) => {
            let oldData = {
              ...tableData,
              offset: newOffset,
              limit: newLimit,
              loading: true,
            };
            setTableData(oldData);
            fetchAllUSers(oldData);
          }}
          isPagination
        />
      </div>

      {/* <UsersJourneyTable
        // userType={userType}
        tableData={tableData}
        setTableData={setTableData}
        handleSuccess={() => {
          fetchAllUSers(tableData);
        }}
      /> */}
    </div>
  );
};

export default UsersJourney;

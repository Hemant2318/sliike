import Button from "components/form/Button";
import Table from "components/layouts/Table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { objectToQueryParams, titleCaseString } from "utils/helpers";
import { omit } from "lodash";
import { getECommerceUserJourney } from "store/globalSlice";
import "./EcomUserJourney.scss";

const EcomUserJourney = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    loading: true,
    data: [],
  });

  const fetchEComUserJourney = async (obj) => {
    const queryParams = objectToQueryParams(
      omit(obj, ["data", "loading", "total"])
    );
    const response = await dispatch(getECommerceUserJourney(queryParams));
    if (response?.status === 200) {
      setUserData((prev) => {
        return {
          ...prev,
          data: response?.data?.beauticianData,
          total: response?.data?.count,
          loading: false,
        };
      });
    }
  };

  useEffect(() => {
    fetchEComUserJourney(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const dummyData = [
  //   {
  //     id: 1,
  //     business_name: "Queens Beauty Store",
  //     bId: "ID: SLKB0000001+",
  //     status: "80% Progress",
  //   },
  //   {
  //     id: 2,
  //     business_name: "Queens Beauty Store",
  //     bId: "ID: SLKB0000001+",
  //     status: "80% Progress",
  //   },
  //   {
  //     id: 3,
  //     business_name: "Queens Beauty Store",
  //     bId: "ID: SLKB0000001+",
  //     status: "80% Progress",
  //   },
  //   {
  //     id: 4,
  //     business_name: "Queens Beauty Store",
  //     bId: "ID: SLKB0000001+",
  //     status: "80% Progress",
  //   },
  //   {
  //     id: 5,
  //     business_name: "Queens Beauty Store",
  //     bId: "ID: SLKB0000001+",
  //     status: "80% Progress",
  //   },
  // ];
  const header = [
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
          Status
        </div>
      ),
    },

    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600 d-flex justify-content-end">
          Action
        </div>
      ),
    },
  ];

  let rowData = [];
  userData?.data?.forEach((elem) => {
    const {
      _id: id,
      businessName,
      uid,
      screenStatus,
      totalProducts,
      stripe_id,
      taxProvinceDetails,
    } = elem;
    const businessDetails = screenStatus >= 4 ? 25 : 0;
    const addProduct = totalProducts >= 3 ? 25 : 0;
    const bankDetails = stripe_id !== null ? 25 : 0;
    const salesTax = taxProvinceDetails !== null ? 25 : 0;

    const status = businessDetails + addProduct + bankDetails + salesTax;

    let obj = [
      {
        value: (
          <div className="text-nowrap color-black-80">
            <div className="color-black-100 text-13-500-21">
              {titleCaseString(businessName)}
            </div>
            <div className="color-black-100 text-13-500-21">{uid}</div>
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap d-flex gap-2">
            <div className="text-15-700 color-black-80">
              {`${Math.round(status.toFixed(2))}%`}
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
                navigate(`/e-commerce/user-journey/${id}`, {
                  state: elem,
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
    <div id="ecom-user-journey">
      <div className="heading text-15-500 color-dashboard-primary cmb-25">
        Monitor all pending registrations and bookings in progress.
      </div>
      <div className="overflow-auto">
        <Table
          header={header}
          rowData={rowData}
          tableData={userData}
          isLoading={userData?.loading}
          tHead="bg-blue-10"
          changeOffset={(newOffset, newLimit = userData?.limit) => {
            let oldData = {
              ...userData,
              offset: newOffset,
              limit: newLimit,
              loading: true,
            };
            setUserData(oldData);
            fetchEComUserJourney(oldData);
          }}
          isPagination
        />
      </div>
    </div>
  );
};

export default EcomUserJourney;

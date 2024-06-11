import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllReferrals } from "store/globalSlice";
import { titleCaseString } from "utils/helpers";
import moment from "moment";
import Button from "components/form/Button";
import Table from "components/layouts/Table";
import { useNavigate } from "react-router-dom";
import "./Referrals.scss";

const Referrals = () => {
  const [referralsData, setReferralsData] = useState({
    data: [],
    loading: true,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllReferrals = async () => {
    const response = await dispatch(fetchAllReferrals());
    if (response?.status === 200) {
      setReferralsData((prev) => {
        return {
          ...prev,
          data: response?.data,
          loading: false,
        };
      });
    }
  };

  useEffect(() => {
    getAllReferrals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headers = [
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Serial No.
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Referee ID No
        </div>
      ),
    },
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
          Date Sent
        </div>
      ),
    },
    // {
    //   title: (
    //     <div className="text-nowrap color-dashboard-primary text-13-600">
    //       Credited to Business
    //     </div>
    //   ),
    // },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Recipients
        </div>
      ),
    },
  ];

  const rowData = [];
  referralsData?.data?.forEach((elem, index) => {
    const { referralCode, referralId, businessName, createdAt } = elem;
    let obj = [
      {
        value: index + 1,
      },
      {
        value: <div className="text-nowrap">{referralCode}</div>,
      },
      {
        value: (
          <div className="text-nowrap">{titleCaseString(businessName)}</div>
        ),
      },
      {
        value: <div>{moment(createdAt).format("DD-MM-YYYY")}</div>,
      },
      //   {
      //     value: <div>Credited amount</div>,
      //   },
      {
        value: (
          <div className="d-flex">
            <Button
              btnText="View Recipients"
              className="text-13-600 h-35"
              btnStyle="LSB"
              iconType="R-Arrow"
              onClick={() => {
                navigate(`/referrals/recipient/${referralId}`);
              }}
            />
          </div>
        ),
      },
    ];
    rowData.push({ data: obj });
  });
  return (
    <div id="referrals-container" className="cmt-24 rounded cps-24 cpe-24">
      <div className="referrals-title text-20-700 color-dashboard-primary cmb-20">
        Referrals
      </div>

      <div className="overflow-auto">
        <Table
          tHead="bg-blue-10"
          header={headers}
          rowData={rowData}
          isLoading={referralsData?.loading}
          tableData={referralsData}
        />
      </div>
    </div>
  );
};

export default Referrals;

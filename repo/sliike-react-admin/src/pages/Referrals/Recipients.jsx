import Table from "components/layouts/Table";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRecipient } from "store/globalSlice";
import { titleCaseString } from "utils/helpers";

const Recipients = () => {
  const [recipientsData, setRecipientsData] = useState({
    data: [],
    loading: true,
  });
  const dispatch = useDispatch();
  const params = useParams();

  const getRecipient = async () => {
    const response = await dispatch(fetchRecipient(params?.id));
    if (response?.status === 200) {
      setRecipientsData((prev) => {
        return {
          ...prev,
          data: response?.data,
          loading: false,
        };
      });
    }
  };

  useEffect(() => {
    getRecipient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headers = [
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Recipient Name
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Referral Link
        </div>
      ),
    },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          Referral Status
        </div>
      ),
    },
    // {
    //   title: (
    //     <div className="text-nowrap color-dashboard-primary text-13-600">
    //       Credited to Recipient
    //     </div>
    //   ),
    // },
    {
      title: (
        <div className="text-nowrap color-dashboard-primary text-13-600">
          App Download Date
        </div>
      ),
    },
  ];

  const rowData = [];
  recipientsData?.data?.forEach((elem) => {
    const { firstName, lastName, appDownloadDate, referralCode } = elem;
    let obj = [
      {
        value: (
          <div className="text-nowrap">
            {titleCaseString(`${firstName} ${lastName}`)}
          </div>
        ),
      },
      {
        value: <div className="text-nowrap">{referralCode}</div>,
      },
      {
        value: (
          <div className="text-nowrap">
            <span className="color-success">Accepted</span> (
            {moment(appDownloadDate).format("DD-MM-YYYY")})
          </div>
        ),
      },
      //   {
      //     value: <div>credited amount</div>,
      //   },
      {
        value: (
          <div className="text-nowrap">
            {moment(appDownloadDate).format("DD-MM-YYYY")}
          </div>
        ),
      },
    ];
    rowData.push({ data: obj });
  });

  return (
    <div id="recipients-container" className="cmt-24 rounded cps-24 cpe-24">
      <div className="recipients-title text-20-700 color-dashboard-primary cmb-20">
        Recipients
      </div>

      <div className="overflow-auto">
        <Table
          tHead="bg-blue-10"
          header={headers}
          rowData={rowData}
          isLoading={recipientsData?.loading}
          tableData={recipientsData}
        />
      </div>
    </div>
  );
};

export default Recipients;

import Dropdown from "components/form/Dropdown/Dropdown";
import Loader from "components/layouts/Loader/Loader";
import { omit, uniq } from "lodash";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllDiscount } from "store/globalSlice";
import {
  getMonthList,
  objectToQueryParams,
  titleCaseString,
} from "utils/helpers";

const RecentDiscount = () => {
  const [yearText, setYearText] = useState("");
  const [discountData, setDiscountData] = useState({
    startDate: moment().startOf("month").format("DD-MM-YYYY"),
    endDate: moment().endOf("month").format("DD-MM-YYYY"),
    loading: true,
    data: [],
  });
  const dispatch = useDispatch();

  const fetchAllDiscount = async (obj) => {
    const payload = omit(obj, ["loading", "data"]);
    const queryParams = objectToQueryParams(payload);
    const response = await dispatch(getAllDiscount(queryParams));
    if (response.status === 200) {
      setDiscountData((prev) => {
        return {
          ...prev,
          data: response?.data?.discountData || [],
          loading: false,
        };
      });
    }
  };

  useEffect(() => {
    fetchAllDiscount(discountData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setYearText(getMonthList(12)[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="cpt-24 cpe-24 cpb-24 cps-24 rounded bg-white">
      <div className="text-20-700 black-100 cmb-24">Recent Discounts</div>
      <div className="d-flex cmb-24" style={{ maxWidth: "150px" }}>
        <Dropdown
          placeholder="year"
          value={yearText}
          options={getMonthList(12).map((o) => {
            return { ...o, name: o.id };
          })}
          optionValue="name"
          onChange={(e) => {
            let oldData = {
              ...discountData,
              startDate: moment(e.target.value)
                .startOf("month")
                .format("DD-MM-YYYY"),
              endDate: moment(e.target.value)
                .endOf("month")
                .format("DD-MM-YYYY"),
              loading: true,
            };
            setDiscountData(oldData);
            fetchAllDiscount(oldData);
            setYearText(e.target.value);
          }}
        />
      </div>
      {discountData?.loading ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="md" />
        </div>
      ) : discountData?.data?.length ? (
        discountData?.data?.map((elem, index) => {
          const clientList = uniq(
            elem?.clientDetails?.map((e) => {
              return titleCaseString(`${e?.firstName} ${e?.lastName}`);
            })
          );
          let count = clientList.length - 2;
          let clientString = `${clientList.slice(0, 2).join(", ")} ${
            count > 0 ? `+${count}` : ""
          }`;

          return (
            <div
              className="d-flex bg-white box-shadow cmb-24"
              style={{
                maxWidth: "542px",
              }}
              key={index}
            >
              <div
                className="text-17-600 color-dashboard-primary bg-blue-10 rounded-start text-center d-flex flex-column justify-content-center align-items-center"
                style={{ width: "141px" }}
              >
                <span>
                  {elem?.isDiscPercentage === 0
                    ? `$${elem?.discount}`
                    : `${elem?.discount}%`}{" "}
                </span>
                <span>Discount</span>
              </div>
              <div
                className="p-3 d-flex flex-column justify-content-center"
                style={{
                  width: "100%",
                  border: "1px solid rgba(212, 242, 251, 1)",
                  borderLeft: "none",
                  borderRadius: "5px",
                }}
              >
                <div className="text-13-500-21 color-dashboard-primary cmb-4">
                  {elem?.discountCode}
                </div>
                {/* <div className="text-15-700 color-dashboard-primary">
                  {elem?.isDiscPercentage === 0
                    ? `$${elem?.discount}`
                    : `${elem?.discount}%`}{" "}
                  Discount
                </div> */}
                <div className="text-13-500-21 color-dashboard-primary cmb-8">
                  {moment(elem?.startDate).format("DD MMM")} -{" "}
                  {moment(elem?.endDate).format("DD MMM,YYYY")}
                </div>
                <div className="text-15-600 color-dashboard-primary">
                  {clientString}
                </div>

                <div className="text-15-500 color-dashboard-primary lh-base text-break  cmb-8">
                  {elem?.description}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div
          className="d-flex justify-content-center align-items-center pt-5 pb-5 text-17-500"
          // style={{
          //   maxWidth: "542px",
          // }}
        >
          No records found
        </div>
      )}
    </div>
  );
};

export default RecentDiscount;

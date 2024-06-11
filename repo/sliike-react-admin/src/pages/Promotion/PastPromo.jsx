import Button from "components/form/Button/Button";
import SearchInput from "components/form/SearchInput/SearchInput";
import MenuOption from "components/layouts/MenuOption/MenuOption";
import Table from "components/layouts/Table/Table";
import { omit } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPastPromotion } from "store/globalSlice";
import { objectToQueryParams, titleCaseString } from "utils/helpers";

const PastPromo = () => {
  // const dispatch = useDispatch();
  // const { servicesCategoryList } = useSelector((state) => ({
  //     servicesCategoryList: state.global.servicesCategoryList,
  //   }));
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState("service");
  const [searchValue, setSearchValue] = useState();
  const [timer, setTimer] = useState("");
  const [pastPromoData, setPastPromoData] = useState({
    promotionFor: "service",
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    search: "",
    loading: true,
    data: [],
  });

  const getPastPromotion = async (obj) => {
    const queryParams = `${objectToQueryParams(
      omit(obj, ["loading", "data", "total"])
    )}`;
    const response = await dispatch(fetchPastPromotion(queryParams));
    if (response?.status === 200) {
      setPastPromoData((prev) => {
        return {
          ...prev,
          data: response?.data?.promotionList,
          total: response?.data?.totalData,
          loading: false,
        };
      });
    }
  };

  useEffect(() => {
    getPastPromotion(pastPromoData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //

  // const initAPI = async () => {
  //   await dispatch(getServicesCategories());
  // };

  // useEffect(() => {
  //   initAPI();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleFilter = async ({ stype }) => {
    let oldData = pastPromoData;
    oldData = { ...oldData, promotionFor: stype };
    setPastPromoData(oldData);
    getPastPromotion(oldData);
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
    let time = timer;
    clearTimeout(time);
    time = setTimeout(() => {
      let oldData = { ...pastPromoData, search: value, loading: true };
      setPastPromoData(oldData);
      getPastPromotion(oldData);
    }, 800);
    setTimer(time);
  };

  const header = [
    {
      title: <div className="text-nowrap">Promo Title</div>,
    },
    {
      title: <div className="text-nowrap">Promo Code</div>,
    },
    {
      title: <div className="text-nowrap">Assign To</div>,
    },
    {
      title: <div className="text-nowrap">Business Type</div>,
    },
    {
      title: <div className="text-nowrap">Description</div>,
    },
    {
      title: <div className="text-nowrap">Start Date</div>,
    },
    {
      title: <div className="text-nowrap">End Date</div>,
    },
    {
      title: <div className="text-nowrap">Promo Discount</div>,
    },
    {
      title: "Status",
    },
  ];

  const rowData = [];
  pastPromoData?.data?.forEach((elem) => {
    const {
      promotionTitle,
      referenceCode,
      businessName,
      promotionFor,
      description,
      startDate,
      endDate,
      discount,
      isDiscPercentage,
    } = elem;
    let obj = [
      {
        value: (
          <div className="text-nowrap text-13-500">
            {titleCaseString(promotionTitle)}
          </div>
        ),
      },
      {
        value: <div className="text-nowrap text-13-500">{referenceCode}</div>,
      },
      {
        value: (
          <div className="text-nowrap text-13-500">
            {titleCaseString(businessName)}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap text-13-500">
            {titleCaseString(promotionFor)}
          </div>
        ),
      },
      {
        value: (
          <div className="text-13-500 text-nowrap">
            {titleCaseString(description)}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap text-13-500">
            {moment(startDate).format("DD MMM,YYYY")}
          </div>
        ),
      },
      {
        value: (
          <div className="text-nowrap text-13-500">
            {moment(endDate).format("DD MMM,YYYY")}
          </div>
        ),
      },
      {
        value: isDiscPercentage === 0 ? `$${discount}` : `${discount}%`,
      },
      {
        value: "Completed",
      },
    ];
    rowData.push({ data: obj });
  });
  return (
    <div className="past-promo-container cmt-20">
      <div className="text-17-700 black-100">
        Past Promo List
        <div className="d-flex gap-3 bg-white cpt-22 cpb-22">
          <MenuOption
            icon={
              <Button btnText={buttonText} btnStyle="PLO" iconType="R-Filter" />
            }
            option={[
              {
                text: "service",
                onClick: () => {
                  handleFilter({ stype: "service" });
                  setButtonText("service");
                },
              },
              // {
              //   text: "product",
              //   onClick: () => {
              //     handleFilter({ stype: "product" });
              //     setButtonText("product");
              //   },
              // },
            ]}
          />

          <SearchInput
            placeholder="Search vendor"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="overflow-auto">
        <Table
          header={header}
          rowData={rowData}
          isLoading={pastPromoData?.loading}
          tableData={pastPromoData}
          // searchText={pastPromoData?.search}
          // searchInputChange={(searchText) => {
          //   let oldData = {
          //     ...pastPromoData,
          //     search: searchText,
          //     loading: true,
          //   };
          //   setPastPromoData(oldData);
          //   getPastPromotion(oldData);
          // }}
          changeOffset={(newOffset, newLimit = pastPromoData.limit) => {
            let oldData = {
              ...pastPromoData,
              offset: newOffset,
              limit: newLimit,
              loading: true,
            };
            setPastPromoData(oldData);
            getPastPromotion(oldData);
          }}
          isPagination
        />
      </div>
    </div>
  );
};

export default PastPromo;

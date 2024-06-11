import { icons } from "utils/constants";
import ServicePurchaseSummary from "./ServicePurchaseSummary";
import ChartView from "./ChartView";
import { useDispatch, useSelector } from "react-redux";
import { getProductSummary, getSingleClient } from "store/globalSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import Loader from "components/layouts/Loader/Loader";
import { omit } from "lodash";
import ReportDownloadButton from "components/layouts/ReportDownloadButton/ReportDownloadButton";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Dropdown from "components/form/Dropdown/Dropdown";
import { getMonthList } from "utils/helpers";
import "./ClientDetails.scss";
import ProductPurchaseSummary from "./ProductPurchaseSummary";

const ClientDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // const clientId = { clientId: params?.id };
  const [isLoading, setIsLoading] = useState(true);
  const [exportData, setExportData] = useState({ data: [], loader: false });
  const [yearText, setYearText] = useState("");
  const { permissionsData } = useSelector((state) => ({
    permissionsData: state.global.permissionsData,
  }));

  const access = {
    clientsMenu: permissionsData?.clientSettings?.[0],
  };

  const clientPermission = access.clientsMenu;

  // const [serviceData, setServiceData] = useState({});

  const [tableData, setTableData] = useState({
    clientId: params?.id,
    chartSDate: moment().startOf("month").format("DD-MM-YYYY"),
    chartEDate: moment().endOf("month").format("DD-MM-YYYY"),
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    loading: true,
    data: [],
  });
  const [productSummary, setProductSummary] = useState({
    clientId: params?.id,
    offset: 0,
    limit: 10,
    intervalLimit: 10,
    total: 0,
    loading: true,
    data: [],
  });

  const exportHeader = [
    "Upcoming",
    "Completed",
    "Cancelled",
    "No-show",
    "Total",
  ];

  const exportClientPurchaseData = async (returnData) => {
    let flagArray = [];
    flagArray = returnData?.userdata?.map((o) => {
      const total = o?.upcoming + o?.completed + o?.cancelled + o?.noShow;
      return [o?.upcoming, o?.completed, o?.cancelled, o?.noShow, total];
    });
    setExportData((prev) => {
      return {
        ...prev,
        data: flagArray,
        loader: false,
      };
    });
  };

  const fetchClientDetails = async (obj) => {
    const payload = omit(obj, ["data", "loading", "total"]);
    const response = await dispatch(getSingleClient(payload));
    setTableData((prev) => {
      return {
        ...prev,
        data: response?.data,
        total: response?.data?.count || 0,
        loading: false,
      };
    });
    // const clientData = response?.data?.userdata[0];
    // setClientData(clientData);
    // const serviceData = response?.data;
    // setServiceData(serviceData);
    exportClientPurchaseData(response?.data);
    setIsLoading(false);
  };

  const fetchProductSummary = async (obj) => {
    const payload = omit(obj, ["data", "loading", "total"]);
    const response = await dispatch(getProductSummary(payload));
    if (response?.status === 200) {
      setProductSummary((prev) => {
        return {
          ...prev,
          data: response?.data?.productSales,
          total: response?.data?.productCount,
          loading: false,
        };
      });
    }
    // setProductSummary((prev) => {
    //   return {
    //     ...prev,
    //     data: response?.data,
    //     total: response?.data?.count || 0,
    //     loading: false,
    //   };
    // });
    // const clientData = response?.data?.userdata[0];
    // setClientData(clientData);
    // const serviceData = response?.data;
    // setServiceData(serviceData);
  };

  useEffect(() => {
    fetchClientDetails(tableData);
    fetchProductSummary(productSummary);
    setYearText(getMonthList(12)[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clientData = tableData?.data?.userdata?.[0];
  // const { firstName } = clientData;

  const doc = new jsPDF();
  const Print = () => {
    doc.autoTable({ html: "#client-table" });
    const header = exportHeader;
    let row = [];
    row = tableData?.data?.userdata?.map((o) => {
      const total = o?.upcoming + o?.completed + o?.cancelled + o?.noShow;
      return [o?.upcoming, o?.completed, o?.cancelled, o?.noShow, total];
    });

    doc.autoTable(header, row);
    doc.save("Client.pdf");
  };

  return (
    <div className="cmt-24">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="md" />
        </div>
      ) : (
        <>
          <div className="card-effect shadow">
            <div className="d-flex cps-24 cpt-24 cpb-24">
              <div className="d-flex pe-3 gap-3">
                <div
                  className="bg-blue-5 color-blue-60 text-20-700 d-flex align-items-center justify-content-center"
                  style={{
                    width: "196px",
                    height: "177px",
                    borderRadius: "5px",
                  }}
                >
                  {clientData?.profileImage ? (
                    <img
                      src={clientData?.profileImage}
                      alt="profileImages"
                      style={{
                        width: "196px",
                        height: "177px",
                        borderRadius: "5px",
                      }}
                      onError={(e) => {
                        e.target.src = icons.defaultImage;
                      }}
                    />
                  ) : (
                    <img
                      src={icons.defaultImage}
                      alt="beautician"
                      style={{
                        objectFit: "cover",
                        width: "196px",
                        height: "177px",
                        borderRadius: "5px",
                      }}
                    />
                  )}
                </div>
                <div>
                  <div className="text-17-600 color-dashboard-primary">
                    {clientData?.firstName} {clientData?.lastName}
                  </div>
                  <div className="text-13-500-21 color-blue-60">
                    ID: {clientData?.uid}
                  </div>
                  <div className="text-13-500-21 color-dashboard-primary mt-2">
                    <img src={icons.mapIcon} alt="location" className="me-2" />
                    {clientData?.address[0]?.apartment}{" "}
                    {clientData?.address[0]?.street}{" "}
                    {clientData?.address[0]?.address}
                  </div>
                  <div className="d-flex justify-content-between gap-3 mt-3 text-13-500-21 color-blue-60">
                    <div>
                      <div>Reg date:</div>
                      <div className="bg-dashboard-primary color-white rounded-pill ps-3 pe-3 pt-1 text-center mt-1">
                        {moment(clientData?.createdAt).format("DD-MM-YYYY")}
                      </div>
                    </div>
                    <div>
                      <div>Status:</div>
                      <div className="bg-success color-white rounded-pill ps-3 pe-3 pt-1 text-center mt-1">
                        {clientData?.userDetails[0]?.isActiveUser === 1
                          ? "Active"
                          : "Inactive"}
                      </div>
                    </div>
                    {/* <div>
                  <div>Demography:</div>
                  <div className="bg-blue color-white rounded-pill ps-3 pe-3 pt-1 text-center mt-1">
                    Black
                  </div>
                </div> */}
                  </div>
                </div>
              </div>
              <div className="ps-3 pe-3 border-start border-end">
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <img src={icons.smsIcon} alt="sms" />
                  </span>
                  <span className="text-13-500 color-dashboard-primary">
                    {clientData?.userDetails[0]?.email}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <span>
                    <img src={icons.callIcon} alt="sms" />
                  </span>
                  <span className="text-13-500 color-dashboard-primary">
                    {clientData?.userDetails[0]?.phoneNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-effect cmt-40 cmb-30 rounded">
            <div className="d-flex justify-content-between align-items-center cps-24 cpt-24 cpb-24 cpe-24">
              <div className="text-20-700 color-dashboard-primary">
                Client Purchase and Financial Reports
              </div>
              <div className="d-flex gap-3">
                {/* <Button btnText="Nov 2022" iconType="R-Filter" btnStyle="PLO" /> */}
                <Dropdown
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
                    };
                    setYearText(e.target.value);
                    setTableData(oldData);
                    fetchClientDetails(oldData);
                  }}
                />

                {clientPermission?.viewAndDownload && (
                  <ReportDownloadButton
                    btnStyle="PD"
                    btnText="DOWNLOAD REPORT"
                    iconType="L-Download-White"
                    data={exportData?.data}
                    headers={exportHeader}
                    filename={`Client.csv`}
                    pdfFile={() => {
                      Print();
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="card-effect rounded cpt-24 cpb-24 cpe-24 cps-24">
            <ChartView clientData={clientData} />
          </div>
          <div className="text-17-600 color-dashboard-primary cmt-56 cmb-24">
            Service Purchase Summary
          </div>
          <div className="bg-white pt-2">
            <ServicePurchaseSummary
              tableData={tableData}
              setTableData={setTableData}
              fetchClientDetails={fetchClientDetails}
            />
          </div>
          <div className="text-17-600 color-dashboard-primary cmt-56 cmb-24">
            Product Purchase Summary
          </div>
          <div className="bg-white pt-2">
            <ProductPurchaseSummary
              productSummary={productSummary}
              setProductSummary={setProductSummary}
              fetchProductSummary={fetchProductSummary}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default ClientDetails;

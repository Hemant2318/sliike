import { useEffect, useState } from "react";
import AdminList from "./AdminList/AdminList";
import NoAdminFound from "./NoAdminFound";
import { useDispatch, useSelector } from "react-redux";
import { getAdmins } from "store/globalSlice";
import { omit } from "lodash";
import { objectToQueryParams } from "utils/helpers";
import Loader from "components/layouts/Loader";
import "./Admins.scss";
import { useNavigate } from "react-router-dom";

const Admins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isData, setIsData] = useState(false);
  const { permissionsData } = useSelector((state) => ({
    permissionsData: state.global.permissionsData,
  }));
  const access = {
    adminsMenu: permissionsData?.adminSettings?.[0],
  };
  const adminsPermission = access?.adminsMenu;
  const [isLoading, setIsLoading] = useState(true);
  const [adminsData, setAdminsData] = useState({
    data: [],
    loader: true,
    search: "",
    type: "unarchive",
    count: "",
    status: "",
  });
  const fetchAllAdmin = async (data) => {
    const queryParams = objectToQueryParams(
      omit(data, ["data", "loader", "count"])
    );
    const response = await dispatch(getAdmins(queryParams));
    if (response?.status === 200) {
      setAdminsData((prev) => {
        return {
          ...prev,
          data: response?.data,
          loader: false,
          count: response?.count,
        };
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (adminsPermission?.falsecount !== 3) fetchAllAdmin(adminsData);
    else navigate(-1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center cpt-100 cpb-100">
          <Loader />
        </div>
      ) : adminsData?.count ? (
        <AdminList
          adminsData={adminsData}
          setAdminsData={setAdminsData}
          fetchAllAdmin={fetchAllAdmin}
        />
      ) : (
        <NoAdminFound />
      )}
    </>
  );
};
export default Admins;

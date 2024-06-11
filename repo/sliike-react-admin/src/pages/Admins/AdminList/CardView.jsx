import CheckBox from "components/form/CheckBox";
import Loader from "components/layouts/Loader";
import StatusContainer from "components/layouts/StatusContainer";
import UserProfileLayout from "components/layouts/UserProfileLayout";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  adminStatusUpdate,
  deleteAdmins,
  throwSuccess,
} from "store/globalSlice";
import { icons } from "utils/constants";
import { titleCaseString } from "utils/helpers";

const CardView = ({
  adminsData,
  setAdminsData,
  fetchAllAdmin,
  multipleArchiveIds,
  setMultipleArchiveIds,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { permissionsData } = useSelector((state) => ({
    permissionsData: state.global.permissionsData,
  }));
  const access = {
    adminsMenu: permissionsData?.adminSettings?.[0],
  };
  const adminsPermission = access?.adminsMenu;

  const handleArchive = async (id) => {
    const payload = { adminIds: [id] };
    const response = await dispatch(deleteAdmins(payload));
    if (response?.status === 200) {
      fetchAllAdmin(adminsData);
      dispatch(throwSuccess(response.message));
    }
  };

  const handelChange = (e, id) => {
    if (e.target.checked) {
      setMultipleArchiveIds([...multipleArchiveIds, id]);
    } else {
      setMultipleArchiveIds(multipleArchiveIds?.filter((item) => item !== id));
    }
  };
  return (
    <div className="admin-list-item-container">
      {adminsData?.loader && (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5 w-100">
          <Loader />
        </div>
      )}
      {!adminsData?.loader &&
        (adminsData?.data?.length === 0 ? (
          <div className="text-center pt-5 pb-5">No Records Found.</div>
        ) : (
          adminsData?.data?.map((elem, index) => {
            const {
              profileImage,
              firstName,
              lastName,
              uid,
              role,
              status,
              _id: id,
            } = elem;
            return (
              <div className="card-effect admin-list-item" key={index}>
                <div className={`d-flex justify-content-between `}>
                  {adminsPermission?.all && (
                    <span className={status ? "" : "opacity-50"}>
                      <CheckBox
                        id={id}
                        checked={multipleArchiveIds.includes(id)}
                        onChange={(e) => {
                          handelChange(e, id);
                        }}
                      />
                    </span>
                  )}
                  {multipleArchiveIds.length === 0 && (
                    <span>
                      <Dropdown align="end">
                        <Dropdown.Toggle variant="" id="dropdown-basic">
                          <img
                            src={icons.threeDots}
                            alt="options"
                            className="pointer"
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            href=""
                            className="d-flex align-items-center gap-2 mb-1"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/admins/profile-details/${id}`);
                            }}
                          >
                            <span>
                              <img src={icons.viewDetails} alt="details" />
                            </span>
                            <span className="mt-1">View Details</span>
                          </Dropdown.Item>
                          {adminsPermission?.all && (
                            <Dropdown.Item
                              href=""
                              className="d-flex align-items-center gap-2"
                              // onClick={() => {
                              //   setAdminsDeleteId(id);
                              //   setIsDeletePopup(true);
                              // }}
                              onClick={() => {
                                handleArchive(id);
                              }}
                            >
                              <span>
                                <img src={icons.trash} alt="trash" />
                              </span>
                              <span className="mt-1">Delete Admin</span>
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>
                  )}
                </div>
                <div
                  className={`center-profile-block cmt-16 ${
                    status ? "" : "opacity-50"
                  }`}
                >
                  <div className="profile-ind">
                    <UserProfileLayout url={profileImage} size="60" />
                    <img
                      src={icons.userChat}
                      alt="chat"
                      className="chat-icons"
                    />
                  </div>
                </div>
                <div
                  className={`text-15-500 text-center ${
                    status ? "" : "opacity-50"
                  }`}
                >
                  {titleCaseString(`${firstName} ${lastName}`)}
                </div>
                <div
                  className={`text-13-500 text-center color-blue-60 ${
                    status ? "" : "opacity-50"
                  }`}
                >
                  {uid}
                </div>
                <div
                  className={`text-13-500 bg-blue-10 text-center rounded-pill color-dashboard-primary pt-1 pb-1 mt-2 ${
                    status ? "" : "opacity-50"
                  }`}
                >
                  {titleCaseString(role)}
                </div>
                <div className="border-top mt-3 mb-3" />
                <div className="d-flex justify-content-end gap-2">
                  <span className="text-13-500 color-black-100">
                    {status === 1 ? "Active" : "Inactive"}
                  </span>
                  {adminsPermission?.all && (
                    <span>
                      <StatusContainer
                        title="Admin"
                        data={elem}
                        apiFunction={async () => {
                          const payload = {
                            adminId: id,
                            status: !status,
                          };
                          return await dispatch(adminStatusUpdate(payload));
                        }}
                        handelSuccess={() => {
                          setAdminsData((prev) => {
                            let oldVal = prev?.data;
                            oldVal.map((el) => {
                              let newObj = el;
                              if (newObj?._id === elem?._id) {
                                newObj.status = elem?.status === 1 ? 0 : 1;
                              }
                              return newObj;
                            });
                            return { ...prev, data: oldVal };
                          });
                        }}
                      />
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ))}
    </div>
  );
};
export default CardView;

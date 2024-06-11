import { useEffect, useState } from "react";
import { icons } from "utils/constants";
import ChangePassword from "./ChangePassword";
import ProfileDetails from "./ProfileDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProfile,
  getSubAdminDetails,
  setIsSuccessPasswordPopup,
  setIsSuccessPopup,
  setSubAdminData,
} from "store/globalSlice";
import Loader from "components/layouts/Loader/Loader";
import { useParams } from "react-router-dom";
import SuccessMessagePopup from "components/layouts/SuccessMessagePopup";
import ChangePasswordPopup from "components/layouts/ChangePasswordPopup";
import "./UserProfile.scss";

const UserProfile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id: subAdminId } = params;

  const isLoginAdmin = params.id === "myProfile";

  const { isSuccessPopup, isSuccessPasswordPopup, permissionsData } =
    useSelector((state) => ({
      isSuccessPopup: state.global.isSuccessPopup,
      isSuccessPasswordPopup: state.global.isSuccessPasswordPopup,
      permissionsData: state.global.permissionsData,
    }));

  const access = {
    adminsMenu: permissionsData?.adminSettings?.[0],
  };
  const adminsPermission = access?.adminsMenu;
  const [type, setType] = useState(0);
  const [isChangePassword, setIsChangePassword] = useState(null);

  const [fetchedData, setFetchedData] = useState({});
  const [subAdminsData, setSubAdminsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    const response = await dispatch(getAdminProfile());
    const profileData = response?.data;
    setFetchedData(profileData);
    setIsLoading(false);
  };

  const fetchSubAdminsDetails = async () => {
    const response = await dispatch(getSubAdminDetails(subAdminId));
    dispatch(setSubAdminData(response?.data));
    setSubAdminsData(response?.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoginAdmin) {
      fetchProfile();
    } else {
      fetchSubAdminsDetails();
      setTimeout(() => {
        dispatch(setIsSuccessPopup(false));
        dispatch(setIsSuccessPasswordPopup(false));
      }, 3000);
    }
    // return()=>{
    //   dispatch(setSubAdminData({}));
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const profileImage = fetchedData?.profileImage || subAdminsData?.profileImage;
  return (
    <div id="user-profile-container">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Loader size="md" />
        </div>
      ) : (
        <div className="container">
          {isSuccessPopup && (
            <SuccessMessagePopup
              className="success-message d-flex gap-2 align-items-center rounded"
              message="Profile Successfully Updated"
            />
          )}

          <div className="row">
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  {type === 0 && (
                    <div className="p-3 card-effect mb-3 change-profile-container fadeIn">
                      <img
                        src={profileImage}
                        alt="camera"
                        style={{
                          width: "200px",
                          height: "150px",
                          borderRadius: "10px",
                        }}
                        onError={(e) => {
                          e.target.src = icons.defaultImage;
                        }}
                      />
                      {/* {profileImage ? (
                        <img
                          src={profileImage}
                          alt="camera"
                          style={{
                            width: "200px",
                            height: "150px",
                            borderRadius: "10px",
                          }}
                        />
                      ) : (
                        <div
                          className="no-logo color-dashboard-primary d-flex justify-content-center align-items-center"
                          style={{
                            width: "200px",
                            height: "150px",
                            borderRadius: "10px",
                          }}
                        >
                          <i className="bi bi-exclamation color-dashboard-primary text-24-700" />
                          No Image
                        </div>
                      )} */}
                      {/* <div className="change-profile-block">
                        <div className="camera-icon-block">
                          <img src={icons.camera} alt="camera" />
                        </div>
                      </div>
                      <div className="cmt-16 text-block">Change Photo</div> */}
                    </div>
                  )}
                  {type === 0 ? (
                    adminsPermission?.all && (
                      <div className="p-3 card-effect mb-3 change-password-block fadeIn">
                        {isSuccessPasswordPopup && (
                          <div className="success-message-password d-flex gap-2 align-items-center rounded">
                            <span className="bg-white pt-1 pb-1 ps-1 pe-1 rounded">
                              <i className="bi bi-check d-flex" />
                            </span>
                            <span className="text-14-500 color-white">
                              Password Successfully Changed
                            </span>
                          </div>
                        )}
                        <div className="text-17-600 color-dashboard-primary d-flex align-items-center gap-3">
                          <span className="pb-1">
                            <img src={icons.lock} alt="lock" />
                          </span>
                          <span>Account Password</span>
                        </div>
                        <div className="text-13-500 color-black-80">
                          You can change your account password as often as you
                          need to.
                        </div>
                        <div
                          className="color-blue-crayola text-15-600 text-decoration-underline pointer"
                          onClick={() => {
                            if (isLoginAdmin) {
                              setType(1);
                            } else {
                              setIsChangePassword(true);
                            }
                          }}
                        >
                          Change Password
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="p-3 card-effect mb-3 change-password-block fadeIn">
                      <div className="text-17-600 color-dashboard-primary d-flex align-items-center gap-3">
                        <span className="pb-1">
                          <img src={icons.lock} alt="lock" />
                        </span>
                        <span>Profile Details</span>
                      </div>
                      <div className="text-13-500 color-black-80">
                        You can change your profile details as often as you need
                        to.
                      </div>
                      <div
                        className="color-blue-crayola text-15-600 text-decoration-underline pointer"
                        onClick={() => {
                          setType(0);
                        }}
                      >
                        Edit Profile
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-8">
              {isChangePassword && (
                <ChangePasswordPopup
                  subAdminsData={subAdminsData}
                  onHide={() => {
                    setIsChangePassword(null);
                  }}
                />
              )}
              <div className="p-3 card-effect">
                {type === 0 ? (
                  <ProfileDetails
                    isLoginAdmin={isLoginAdmin}
                    subAdminsData={subAdminsData}
                    fetchedData={fetchedData}
                    handleSuccess={() => {
                      fetchProfile();
                    }}
                  />
                ) : (
                  <ChangePassword />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserProfile;

import { useEffect, useState } from "react";
import { icons } from "utils/constants";
import ChangePassword from "./ChangePassword";
import ProfileDetails from "./ProfileDetails";
import "./UserProfile.scss";
import { useDispatch } from "react-redux";
import { getAdminProfile } from "store/globalSlice";
import Loader from "components/layouts/Loader/Loader";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState(0);
  const [fetchedData, setFetchedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    const response = await dispatch(getAdminProfile());
    const profileData = response?.data;
    setFetchedData(profileData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log("fetchedData", fetchedData?.profileImage);

  const profileImage = fetchedData?.profileImage;
  return (
    <div id="user-profile-container">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Loader size="md" />
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  {type === 0 && (
                    <div className="p-3 card-effect mb-3 change-profile-container fadeIn">
                      {profileImage ? (
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
                      )}
                      {/* <div className="change-profile-block">
                        <div className="camera-icon-block">
                          <img src={icons.camera} alt="camera" />
                        </div>
                      </div>
                      <div className="cmt-16 text-block">Change Photo</div> */}
                    </div>
                  )}
                  {type === 0 ? (
                    <div className="p-3 card-effect mb-3 change-password-block fadeIn">
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
                          setType(1);
                        }}
                      >
                        Change Password
                      </div>
                    </div>
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
              <div className="p-3 card-effect">
                {type === 0 ? (
                  <ProfileDetails
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

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "utils/constants";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { handelLogout } from "store/globalSlice";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";

const Header = ({ isBack, headerText }) => {
  const { adminData } = useSelector((state) => ({
    adminData: state.global.adminData,
  }));

  const { firstName, lastName, profileImage } = adminData;

  const myRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProfile, setIsProfile] = useState(false);
  const handleClickOutside = (e) => {
    if (myRef.current && !myRef.current.contains(e.target)) {
      setIsProfile(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div id="header-container" className="position-relative">
      <div className="cps-24 d-flex gap-4 align-items-center">
        {isBack && (
          <img
            src={icons.back}
            alt="back"
            className="pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
        )}
        {headerText && (
          <div className="text-20-700 color-black-100">{headerText}</div>
        )}
      </div>
      <div className="right-header-block">
        {/* <div className="notification-block">
          <img src={icons.bell} alt="bell" />
          <div className="outer-block">
            <div className="counter-block">3</div>
          </div>
        </div> */}
        <div className="profile-header-block">
          {profileImage && (
            <UserProfileLayout
              isRounded
              text={`${firstName} ${lastName}`}
              url={profileImage}
              size="50"
            />
          )}
        </div>
        <div className="user-name-header-block">
          <div className="name-block">
            <span>
              {firstName} {lastName}
            </span>
            <span
              className="d-flex pointer"
              onClick={() => {
                setIsProfile(!isProfile);
              }}
            >
              <i className="bi bi-chevron-down" />
            </span>
            {isProfile && (
              <div className="profile-option-block shadow" ref={myRef}>
                <div
                  className="item-block"
                  onClick={() => {
                    navigate("/admins/profile-details/myProfile");
                  }}
                >
                  <span className="icon-c-block">
                    <img src={icons.profile} alt="profile" />
                  </span>
                  <span>Profile</span>
                </div>
                <div
                  className="item-block"
                  onClick={() => {
                    dispatch(handelLogout());
                  }}
                >
                  <span className="icon-c-block">
                    <img src={icons.logout} alt="profile" />
                  </span>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
          <div className="role-block">
            {adminData?.role === "superAdmin" && "Admin"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;

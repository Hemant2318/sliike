import React, { useState } from "react";
import Button from "components/form/Button";
import PasswordInput from "components/form/PasswordInput";
import TextInput from "components/form/TextInput";
import { commonRoute, icons } from "utils/constants";
import "./ChangePassword.scss";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  // const params = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div id="change-password-continer">
      <div className="change-password-block">
        <div className="change-password-heading-block bg-dashboard-primary cmb-24 cpt-16">
          <div className="change-password-logo-block cpb-8">
            <img src={icons.Sliikelogo4} alt="sliike-logo" />
          </div>
          <div className="change-password-logo-text text-17-500 color-blue-10">
            Welcome to Sliike admin portal
          </div>
        </div>
        <div className="change-password-content-block cpt-40 cpb-40 cps-32 cpe-32">
          <div className="change-password-content-block-heading cmb-24">
            <div className="text-17-600  color-black-100">CHANGE PASSWORD</div>
            <div className="text-15-500 color-black-80">
              Change to password of you choice
            </div>
          </div>

          <div>
            <div className="cmb-24">
              <TextInput
                label="Enter New Password"
                placeholder="Password102++"
                id="newPassword"
                value={newPassword}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setNewPassword(e.target.value);
                }}
              />
            </div>

            <div className="cmb-24">
              <PasswordInput
                label="Confirm New Password"
                placeholder="Password102++"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>

            <div>
              <Button
                btnText="SIGN IN"
                btnStyle={newPassword && confirmPassword ? "PD" : "DD"}
                onClick={() => {
                  navigate(commonRoute?.login);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

import Button from "components/form/Button";
import { useNavigate } from "react-router-dom";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { setSubAdminData } from "store/globalSlice";
import { useDispatch, useSelector } from "react-redux";

const ProfileDetails = ({
  fetchedData,
  handleSuccess,
  isLoginAdmin,
  subAdminsData,
}) => {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    Id: "",
    oldEmail: "",
  });
  const { permissionsData } = useSelector((state) => ({
    permissionsData: state.global.permissionsData,
  }));
  const access = {
    adminsMenu: permissionsData?.adminSettings?.[0],
  };
  const adminsPermission = access?.adminsMenu;
  const dispatch = useDispatch();

  // const dispatch = useDispatch();
  // const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  // const initialValues = {
  //   firstName: firstName || "",
  //   lastName: lastName || "",
  //   email: email || "",
  //   phoneNumber: phoneNumber || "",
  //   role: role || "",
  //   Id: id,
  //   oldEmail: email || "",
  // };

  // const handleSave = async (values) => {
  //   const payload = values;
  //   const formData = objectToFormData(payload);
  //   console.log("payload", payload);
  //   console.log("formData", formData);
  //   setBtnLoading(true);
  //   const response = await dispatch(updateAdminProfile(formData));
  //   if (response?.status === 200) {
  //     dispatch(throwSuccess("Profile Updated Successfully"));
  //     handleSuccess();
  //   }
  //   setBtnLoading(false);
  // };
  useEffect(() => {
    if (isLoginAdmin) {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        _id: id,
      } = fetchedData || {};
      setInitialValues({
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        phoneNumber: phoneNumber || "",
        role: role || "",
        Id: id,
        oldEmail: email || "",
      });
    } else {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        _id: id,
      } = subAdminsData || {};
      setInitialValues({
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        phoneNumber: phoneNumber || "",
        role: role || "",
        Id: id,
      });
    }
    return () => {
      if (isLoginAdmin) {
        dispatch(setSubAdminData({}));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fadeIn">
      <div className="text-17-600 color-black cmb-20">Profile Details</div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        // onSubmit={handleSave}
      >
        {(props) => {
          const { values, handleChange } = props;
          const { firstName, lastName, email, phoneNumber, role, Id } = values;
          return (
            <form className="row">
              {/* <div className="col-md-4">
                <div className="row">
                  <div className="col-md-12">
                    <div className="p-3 card-effect mb-3 change-profile-container fadeIn">
                      <div className="change-profile-block">
                        <div className="camera-icon-block">
                          <img src={icons.camera} alt="camera" />
                        </div>
                      </div>
                      <div className="cmt-16 text-block">Change Photo</div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-md-6 cmb-30">
                <TextInput
                  label="First Name"
                  id="firstName"
                  value={firstName}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="col-md-6 cmb-30">
                <TextInput
                  label="Last Name"
                  id="lastName"
                  value={lastName}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="col-md-6 cmb-30">
                <TextInput
                  label="Email Address"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="col-md-6 cmb-30">
                <TextInput
                  label="Phone Number (Optional)"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="col-md-6 cmb-30">
                <TextInput
                  label="Role"
                  id="role"
                  value={role}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div>
                {/* <Button
                  btnText="EDIT"
                  btnStyle="PD"
                  onClick={submitForm}
                  btnLoading={btnLoading}
                /> */}
                {adminsPermission?.all && (
                  <Button
                    btnText="EDIT"
                    btnStyle="PD"
                    onClick={() => {
                      navigate(`/admins/${Id}`);
                    }}
                  />
                )}
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
export default ProfileDetails;

import Button from "components/form/Button";
import { useNavigate } from "react-router-dom";
import TextInput from "components/form/TextInput/TextInput";
import { Formik } from "formik";

const ProfileDetails = ({ fetchedData, handleSuccess }) => {
  // const dispatch = useDispatch();
  // const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    _id: id,
  } = fetchedData || {};
  const initialValues = {
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    phoneNumber: phoneNumber || "",
    role: role || "",
    Id: id,
    oldEmail: email || "",
  };

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
          const { firstName, lastName, email, phoneNumber, role } = values;
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
                {/* <DisabledField label="First Name" value="Rachel" /> */}
              </div>
              <div className="col-md-6 cmb-30">
                <TextInput
                  label="Last Name"
                  id="lastName"
                  value={lastName}
                  onChange={handleChange}
                  disabled
                />
                {/* <DisabledField label="Last Name" value="Vince" /> */}
              </div>
              <div className="col-md-6 cmb-30">
                <TextInput
                  label="Email Address"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  disabled
                />
                {/* <DisabledField
                  label="Email Address"
                  value="rachieangel@sliike.com"
                /> */}
              </div>
              <div className="col-md-6 cmb-30">
                <TextInput
                  label="Phone Number (Optional)"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                  disabled
                />
                {/* <DisabledField
                  label="Phone Number (Optional)"
                  value="123-456-789"
                /> */}
              </div>
              <div className="col-md-6 cmb-30">
                <TextInput
                  label="Role"
                  id="role"
                  value={role}
                  onChange={handleChange}
                  disabled
                />
                {/* <DisabledField label="Role" value="Super Admin" /> */}
              </div>
              <div>
                {/* <Button
                  btnText="EDIT"
                  btnStyle="PD"
                  onClick={submitForm}
                  btnLoading={btnLoading}
                /> */}
                <Button
                  btnText="EDIT"
                  btnStyle="PD"
                  onClick={() => {
                    navigate(`/admins/${id}`);
                  }}
                />
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
export default ProfileDetails;

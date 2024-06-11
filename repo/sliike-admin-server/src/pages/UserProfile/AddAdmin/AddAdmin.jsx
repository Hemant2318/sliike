import Button from "components/form/Button";
import TextInput from "components/form/TextInput";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import AccessibilitySettings from "./AccessibilitySettings";
import "./AddAdmin.scss";
import { useDispatch } from "react-redux";
import {
  getAdminProfile,
  throwError,
  throwSuccess,
  updateAdminProfile,
} from "store/globalSlice";
import Loader from "components/layouts/Loader/Loader";
import { Formik } from "formik";
import { objectToFormData } from "utils/helpers";
import { isEqual } from "lodash";
import ImageCropper from "components/layouts/ImageCropper/ImageCropper";

const AddAdmin = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();
  const params = useParams();
  const [showAS, setShowAS] = useState(false);
  const [cropFile, setCropFile] = useState(null);
  const isEdit = params?.type !== "add-admin";
  // const data = {
  //   first_name: isEdit ? "Rachel" : "",
  //   last_name: isEdit ? "Vince" : "",
  //   email: isEdit ? "rachieangel@sliike.com" : "",
  //   phone_number: isEdit ? "" : "",
  //   role: isEdit ? "Super Admin" : "",
  //   image: isEdit
  //     ? "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  //     : "",
  // };

  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [fetchedData, setFetchedData] = useState({});
  const {
    profileImage,
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    _id: id,
  } = fetchedData || {};

  const fetchProfile = async () => {
    const response = await dispatch(getAdminProfile());
    const profileData = response?.data;
    setFetchedData(profileData);
    setIsLoading(false);
  };

  const initialValues = {
    profileImage: profileImage || "",
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    phoneNumber: phoneNumber || "",
    role: role || "",
    Id: id,
    oldEmail: email || "",
  };

  const handleSave = async (values) => {
    const payload = values;
    const formData = objectToFormData(payload);

    setBtnLoading(true);
    const response = await dispatch(updateAdminProfile(formData));
    if (response?.status === 200) {
      dispatch(throwSuccess("Profile Updated Successfully"));

      fetchProfile();
      // if (formRef.current) {
      //   formRef.current.resetForm();
      // }
    } else {
      // console.log("else res", response?.message);
      throwError(response?.message);
    }
    setBtnLoading(false);
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="add-admin-container">
      {showAS && (
        <AccessibilitySettings
          onHide={() => {
            setShowAS(false);
          }}
        />
      )}
      <div className="card-effect block-content">
        <div className="text-20-700 color-dashboard-primary cmb-40">
          {isEdit ? "Edit Admin" : "Add Admin"}
        </div>
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Loader size="md" />
        </div>
      ) : (
        <Formik
          enableReinitialize
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={handleSave}
        >
          {(props) => {
            const {
              values,
              handleChange,
              submitForm,
              handleReset,
              setFieldValue,
            } = props;
            const {
              profileImage,
              firstName,
              lastName,
              email,
              phoneNumber,
              role,
            } = values;
            return (
              <form className="form-block">
                <div className="row">
                  {/* <div className="card-effect cmb-44 change-profile-container w-100">
                    <div className="change-profile-block bg-blue-5">
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
                            // backgroundColor: "GrayText",
                          }}
                        >
                          <i className="bi bi-exclamation color-dashboard-primary text-24-700" />
                          No Image
                        </div>
                      )}
                      {cropFile && (
                        <ImageCropper
                          onHide={() => {
                            setCropFile(null);
                          }}
                          fileURL={cropFile}
                          handelCropImage={(file) => {
                            setFieldValue("profileImage", file || "");
                          }}
                        />
                      )}
                    </div>
                    {isEdit ? (
                      <div
                        className="product-upload text-15-500 color-dashboard-primary align-items-center"
                        style={{ backgroundColor: "lightblue" }}
                      >
                        <div className="text-15-500 color-blue cmt-16">
                          Change Photo
                        </div>
                        <input
                          type="file"
                          className="fileType pointer"
                          name="Product Image"
                          onChange={(e) => {
                            var files = e?.target?.files;
                            var extension = files[0]?.type;

                            if (
                              ["image/png", "image/jpg", "image/jpeg"].includes(
                                extension
                              )
                            ) {
                              if (e?.target?.files[0]) {
                                setCropFile(
                                  URL.createObjectURL(e?.target?.files[0])
                                );
                              }
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="cmt-16 text-13-500">
                        Upload User photo
                      </div>
                    )}
                  </div> */}
                  <div className="card-effect cmb-44 change-profile-container w-100 position-relative">
                    <div className="change-profile-block bg-blue-5">
                      {profileImage ? (
                        <img
                          src={imgData ? imgData : profileImage}
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
                      {cropFile && (
                        <ImageCropper
                          onHide={() => {
                            setCropFile(null);
                          }}
                          fileURL={cropFile}
                          handelCropImage={(file) => {
                            setFieldValue("profileImage", file || "");
                          }}
                        />
                      )}
                    </div>
                    {isEdit ? (
                      <div className="product-upload">
                        <div className="cmt-16 text-block">Change Photo</div>
                        <input
                          type="file"
                          className="fileType pointer"
                          name="Product Image"
                          onChange={(e) => {
                            var files = e?.target?.files;
                            var extension = files[0]?.type;

                            if (
                              ["image/png", "image/jpg", "image/jpeg"].includes(
                                extension
                              )
                            ) {
                              if (e?.target?.files[0]) {
                                setCropFile(
                                  URL.createObjectURL(e?.target?.files[0])
                                );

                                const reader = new FileReader();
                                reader.addEventListener("load", () => {
                                  setImgData(reader.result);
                                });
                                reader.readAsDataURL(e.target.files[0]);
                              }
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="cmt-16 text-13-500">
                        Upload User photo
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 cmb-24">
                    <TextInput
                      label="First Name"
                      id="firstName"
                      value={firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 cmb-24">
                    <TextInput
                      label="Last Name"
                      id="lastName"
                      value={lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 cmb-24">
                    <TextInput
                      label="Email Address"
                      id="email"
                      value={email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 cmb-24">
                    <TextInput
                      label="Phone Number (Optional)"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex align-items-end gap-4">
                    <div className="flex-grow-1 cmb-40">
                      <TextInput
                        label="Role"
                        id="role"
                        value={role}
                        onChange={handleChange}
                        disabled
                      />
                      {/* <TextInput
                        label="Select Role"
                        value={data.role}
                        onChange={() => {}}
                      /> */}
                    </div>
                    {/* <div className="d-flex cmb-40">
                      <Button
                        value="Accessibility Settings"
                        btnStyle="btn-primary-darker-outline"
                        className="cps-20 cpe-20"
                        leftIcon={
                          <img
                            src={icons.setting}
                            alt="setting"
                            className="me-2"
                          />
                        }
                        onClick={() => {
                          setShowAS(true);
                        }}
                      />
                    </div> */}
                  </div>

                  <div className="col-md-6 cmb-40">
                    <Button
                      btnText="CANCEL"
                      btnStyle="BO"
                      onClick={handleReset}
                    />
                  </div>
                  <div className="col-md-6 cmb-40">
                    <Button
                      btnText={isEdit ? "SAVE CHANGES" : "ADD USER"}
                      btnStyle={isEdit ? "PD" : "BDD"}
                      onClick={submitForm}
                      btnLoading={btnLoading}
                      disabled={isEqual(values, initialValues)}
                    />
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      )}
    </div>
  );
};
export default AddAdmin;

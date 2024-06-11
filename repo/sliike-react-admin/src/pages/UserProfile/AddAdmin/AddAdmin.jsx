import Button from "components/form/Button";
import TextInput from "components/form/TextInput";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AccessibilitySettings from "./AccessibilitySettings";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdminUser,
  getAdminProfile,
  setIsSuccessPopup,
  setSubAdminData,
  throwError,
  throwSuccess,
  updateAdminProfile,
  updateSubAdminDetails,
} from "store/globalSlice";
import Loader from "components/layouts/Loader/Loader";
import { Formik } from "formik";
import { objectToFormData } from "utils/helpers";
import { isEmpty, isEqual, omit } from "lodash";
import ImageCropper from "components/layouts/ImageCropper/ImageCropper";
import { adminRoles, icons } from "utils/constants";
import Dropdown from "components/form/Dropdown";
import CancelConfirmPopup from "components/layouts/CancelConfirmPopup/CancelConfirmPopup";
import "./AddAdmin.scss";

const AddAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();
  const params = useParams();

  const [initialValues, setInitialValues] = useState({
    profileImage: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    Id: "",
    oldEmail: "",
    password: 123456,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelPopup, setIsCancelPopup] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [fetchedData, setFetchedData] = useState({});
  const [showAS, setShowAS] = useState(false);
  const [cropFile, setCropFile] = useState(null);
  const [settingsData, setSettingsData] = useState([
    {
      keyTitle: "Dashboard",
      key: "dashboardSettings",
      value: [
        {
          value: "All action",
          key: "all",
          isCheck: true,
        },
        {
          value: "View only",
          key: "viewOnly",
          isCheck: true,
        },
        {
          value: "View & download",
          key: "viewAndDownload",
          isCheck: true,
        },
      ],
    },
    {
      keyTitle: "Beauticians",
      key: "beauticianSettings",
      value: [
        {
          value: "All action",
          key: "all",
          isCheck: true,
        },
        {
          value: "View only",
          key: "viewOnly",
          isCheck: true,
        },
        {
          value: "View & download",
          key: "viewAndDownload",
          isCheck: true,
        },
      ],
    },
    {
      keyTitle: "Clients",
      key: "clientSettings",
      value: [
        {
          value: "All action",
          key: "all",
          isCheck: true,
        },
        {
          value: "View only",
          key: "viewOnly",
          isCheck: true,
        },
        {
          value: "View & download",
          key: "viewAndDownload",
          isCheck: true,
        },
      ],
    },
    {
      keyTitle: "Products",
      key: "productSettings",
      value: [
        {
          value: "All action",
          key: "all",
          isCheck: true,
        },
        {
          value: "View only",
          key: "viewOnly",
          isCheck: true,
        },
        {
          value: "View & download",
          key: "viewAndDownload",
          isCheck: true,
        },
      ],
    },
    {
      keyTitle: "Brands",
      key: "brandSettings",
      value: [
        {
          value: "All action",
          key: "all",
          isCheck: true,
        },
        {
          value: "View only",
          key: "viewOnly",
          isCheck: true,
        },
        {
          value: "View & download",
          key: "viewAndDownload",
          isCheck: true,
        },
      ],
    },
    {
      keyTitle: "Gists",
      key: "gistSettings",
      value: [
        {
          value: "All action",
          key: "all",
          isCheck: true,
        },
        {
          value: "View only",
          key: "viewOnly",
          isCheck: true,
        },
        {
          value: "View & download",
          key: "viewAndDownload",
          isCheck: true,
        },
      ],
    },
    {
      keyTitle: "Promotions",
      key: "promotionSettings",
      value: [
        {
          value: "All action",
          key: "all",
          isCheck: true,
        },
        {
          value: "View only",
          key: "viewOnly",
          isCheck: true,
        },
        {
          value: "View & download",
          key: "viewAndDownload",
          isCheck: true,
        },
      ],
    },
    {
      keyTitle: "Admins",
      key: "adminSettings",
      value: [
        {
          value: "All action",
          key: "all",
          isCheck: true,
        },
        {
          value: "View only",
          key: "viewOnly",
          isCheck: true,
        },
        {
          value: "View & download",
          key: "viewAndDownload",
          isCheck: true,
        },
      ],
    },
  ]);
  const { subAdminData, adminData } = useSelector((state) => ({
    subAdminData: state.global.subAdminData,
    adminData: state.global.adminData,
  }));
  const isIdMatched = adminData?._id === fetchedData?._id;
  const isAddAdmin = params?.type === "add-admin";
  // const isEdit = params?.type !== "add-admin";
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

  // const handleSaveSettings = (updatedData) => {
  //   setSettingsData(updatedData);
  // };

  const fetchProfile = async () => {
    const response = await dispatch(getAdminProfile());
    const profileData = response?.data;
    setFetchedData(profileData);
    setIsLoading(false);
  };

  // const initialValues = {
  //   profileImage: !isAddAdmin ? profileImage : "",
  //   firstName: !isAddAdmin ? firstName : "",
  //   lastName: !isAddAdmin ? lastName : "",
  //   email: !isAddAdmin ? email : "",
  //   phoneNumber: !isAddAdmin ? phoneNumber : "",
  //   role: !isAddAdmin ? role : "",
  //   Id: id,
  //   oldEmail: !isAddAdmin ? email : "",
  //   password: 123456,
  // };

  const handleSave = async (values) => {
    setBtnLoading(true);
    if (isAddAdmin) {
      handleAdd(values);
    } else {
      handleUpdate(values);
    }
  };

  const handleAdd = async (values) => {
    setBtnLoading(true);
    let newPayload = new FormData();
    settingsData?.forEach((parentItem) => {
      // Iterate through the child value array
      parentItem.value.forEach((childItem) => {
        // Append the formatted key to FormData
        newPayload.append(
          `${parentItem.key}[0][${childItem.key}]`,
          childItem.isCheck
        );
      });
    });

    const payload = omit(values, ["Id", "oldEmail"]);
    for (const key in payload) {
      newPayload.append(key, payload[key]);
    }

    const response = await dispatch(addAdminUser(newPayload));
    if (response.status === 200) {
      dispatch(throwSuccess(response?.message));
      if (formRef.current) {
        formRef.current.resetForm();
      }
      navigate("/admins");
    } else {
      dispatch(throwError(response?.message));
    }

    setBtnLoading(false);
  };
  const handleUpdate = async (values) => {
    setBtnLoading(true);
    const payload = omit(values, ["password"]);
    const formData = objectToFormData(payload);

    if (!isEmpty(subAdminData)) {
      //update details of admins module
      const response = await dispatch(updateSubAdminDetails(formData));
      if (response?.status === 200) {
        dispatch(throwSuccess(response.message));
        dispatch(setIsSuccessPopup(true));
        navigate(`/admins/profile-details/${initialValues?.adminId}`);
        if (formRef.current) {
          formRef.current.resetForm();
        }
      } else {
        throwError(response?.message);
      }
    } else {
      // update details of login admin
      const response = await dispatch(updateAdminProfile(formData));
      if (response?.status === 200) {
        dispatch(throwSuccess("Profile Updated Successfully"));
        fetchProfile();
        navigate(`/admins/profile-details/myProfile`);
        // if (formRef.current) {
        //   formRef.current.resetForm();
        // }
      } else {
        throwError(response?.message);
      }
    }
    setBtnLoading(false);
  };
  const handleForm = async () => {
    if (!isEmpty(subAdminData)) {
      //this block working for only update sub admins and super admin of admin module
      const {
        profileImage,
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        _id: id,
      } = subAdminData || {};
      setInitialValues({
        profileImage: profileImage || "",
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        phoneNumber: phoneNumber || "",
        role: role || "",
        adminId: id,
      });
    } else if (fetchedData) {
      //this block working for only update login admin details
      const {
        profileImage,
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        _id: id,
      } = fetchedData || {};
      setInitialValues({
        profileImage: profileImage || "",
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        oldEmail: email || "",
        phoneNumber: phoneNumber || "",
        role: role || "",
        password: 123456,
        Id: id,
      });
    } else {
      //nothing
    }
  };
  useEffect(() => {
    fetchProfile();
    return () => {
      dispatch(setSubAdminData({}));
      setInitialValues({
        profileImage: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        role: "",
        Id: "",
        oldEmail: "",
        password: 123456,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    handleForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddAdmin ? isAddAdmin : fetchedData]);

  // console.log(isIdMatched);
  // console.log(settingsData);
  return (
    <div id="add-admin" className="bg-white">
      {showAS && (
        <AccessibilitySettings
          onHide={() => {
            setShowAS(false);
          }}
          // sendDataToParent={sendDataToParent}
          setSettingsData={setSettingsData}
          settingsData={settingsData}
        />
      )}
      <div className="card-effect block-content">
        <div className="text-20-700 color-dashboard-primary cmb-40">
          {isAddAdmin ? "Add Admin" : "Edit Admin"}
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
                {isCancelPopup && (
                  <CancelConfirmPopup
                    onHide={() => {
                      setIsCancelPopup(false);
                    }}
                    handleReset={() => {
                      handleReset();
                      setIsCancelPopup(false);
                    }}
                  />
                )}
                <div className="row">
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
                          onError={(e) => {
                            e.target.src = icons.defaultImage;
                          }}
                        />
                      ) : (
                        <>
                          <img
                            src={icons.defaultImage}
                            alt="camera"
                            style={{
                              objectFit: "cover",
                              width: "196px",
                              height: "177px",
                              borderRadius: "5px",
                            }}
                          />
                          {/* <div
                          className="no-logo color-dashboard-primary d-flex justify-content-center align-items-center"
                          style={{
                            width: "200px",
                            height: "150px",
                            borderRadius: "10px",
                          }}
                        >
                          <i className="bi bi-exclamation color-dashboard-primary text-24-700" />
                          No Image
                        </div> */}
                        </>
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
                      <div className="camera-icon-block">
                        <img src={icons.roundCameraIcon} alt="camera-icon" />
                      </div>
                    </div>

                    <div className="product-upload">
                      <div
                        className={
                          isAddAdmin
                            ? "cmt-16 text-13-500 color-dashboard-primary"
                            : "cmt-16 text-block"
                        }
                      >
                        {isAddAdmin ? "Upload User photo" : "Change Photo"}
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
                    {/* {!isAddAdmin ? (
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
                    )} */}
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
                      {/* <TextInput
                        label={isAddAdmin ? "Select Role" : "Role"}
                        id="role"
                        value={role}
                        onChange={handleChange}
                        disabled
                      /> */}
                      <Dropdown
                        label={isAddAdmin ? "Select Role" : "Role"}
                        placeholder="Select a role"
                        id="role"
                        onChange={handleChange}
                        options={adminRoles}
                        optionValue="value"
                        value={role}
                      />
                    </div>
                    {isAddAdmin && (
                      <div className="d-flex cmb-40">
                        <Button
                          // value="Accessibility Settings"
                          // btnStyle="primary-outline"
                          className="cps-20 cpe-20 primary-outline"
                          btnText="Accessibility Settings"
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
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 cmb-40">
                    <Button
                      btnText="CANCEL"
                      btnStyle="BO"
                      onClick={() => {
                        if (isAddAdmin) {
                          setIsCancelPopup(true);
                        } else {
                          handleReset();
                        }
                      }}
                    />
                  </div>
                  <div className="col-md-6 cmb-40">
                    <Button
                      btnText={isAddAdmin ? "ADD USER" : "SAVE CHANGES"}
                      btnStyle={isEqual(values, initialValues) ? "BDD" : "PD"}
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

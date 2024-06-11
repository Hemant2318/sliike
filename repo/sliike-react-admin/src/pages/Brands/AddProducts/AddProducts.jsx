import React, { useState } from "react";
import { icons, sizeSelectList } from "utils/constants";
import TextInput from "components/form/TextInput/TextInput";
import TextArea from "components/form/TextArea/TextArea";
import Button from "components/form/Button/Button";
import SizeSelector from "components/form/SizeSelector/SizeSelector";
import AddFeaturesPopup from "./AddFeaturesPopup";
import { Formik } from "formik";
import * as Yup from "yup";
import ImageCropper from "components/layouts/ImageCropper/ImageCropper";
import { useNavigate, useParams } from "react-router-dom";
import { titleCaseString } from "utils/helpers";
import { setBrandProductList } from "store/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { isEqual } from "lodash";
import "./AddProducts.scss";

const AddProducts = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [cropFile, setCropFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [keyFeaturesList, setKeyFeaturesList] = useState([]);
  // const [imageURL, setImageURL] = useState(null);
  // const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const { brandProductList } = useSelector((state) => ({
    brandProductList: state.global.brandProductList,
  }));

  const initialValues = {
    imagePath: "",
    images: "",
    productImageName: "",
    productName: "",
    productPrice: "",
    productUnit: "",
    productSize: "",
    description: "",
    keyFeatures: "",
    weightUnit: "",
    weightValue: "",
  };

  const validationSchema = Yup.object().shape({
    images: Yup.mixed().required("Product image is required."),
    productName: Yup.string().required("Product name is required."),
    productPrice: Yup.string()
      .required("Product price is required.")
      .matches(/^[0-9\s]+$/, "Only numbers allowed."),
    productUnit: Yup.string().required("Product unit is required"),
    productSize: Yup.string().required("Product size is required"),
    weightValue: Yup.string().required("Product weight is required"),
    weightUnit: Yup.string().required("Product weight unit is required"),
    description: Yup.string().required("Description is required."),
  });

  const handleSave = (value) => {
    // const payload = value?.testImage?.target.files;

    // dispatch(setBrandProductList([...brandProductList, payload]));
    // navigate(`/brands/add-brand/product-list/step-2/${params?.id}`);

    setBtnLoading(true);
    const payload = {
      ...value,
      imagePath: productImage,
      keyFeatures: keyFeaturesList,
    };
    dispatch(setBrandProductList([...brandProductList, payload]));
    navigate(`/brands/add-brand/product-list/step-2/${params?.id}`);
    setBtnLoading(false);

    // let fetchData = [];
    // const productList = JSON.parse(localStorage.getItem("data"));
    // if (productList) {
    //   fetchData = productList;
    // }
    // let newData = {
    //   ...value,
    //   id: productList?.[productList?.length - 1]?.id + 1 || 1,
    // };
    // console.log("newData", newData);
    // fetchData.push(newData);
    // console.log("fetchData", fetchData);
    // console.log("JSON.stringify(fetchData)", JSON.stringify(fetchData));
    // localStorage.setItem("data", JSON.stringify(fetchData));
  };

  const handleSaveKeyFeatures = (list) => {
    setKeyFeaturesList([...list]);
  };

  return (
    <div id="add-product-container" className="cmt-24">
      <div className="cps-24 cpt-24 bg-white rounded">
        <div className="text-20-700 color-dashboard-primary d-flex gap-3 cmb-24 align-items-center">
          Add Products
          <div className="text-17-600 color-blue">STEP-2</div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {(props) => {
            const {
              values,
              errors,
              handleChange,
              setFieldValue,
              handleSubmit,
            } = props;
            const {
              images,
              productName,
              productPrice,
              productUnit,
              productSize,
              description,
              weightValue,
              weightUnit,
            } = values;

            return (
              <form className="row">
                <div className="product-upload-section cmb-48 col-md-6">
                  <div className="text-15-600 color-dashboard-primary cmb-16">
                    Upload product photo
                  </div>
                  <div className="upload-product-container d-flex justify-content-center align-items-center cpt-85 cpb-85 cmb-24">
                    {images ? (
                      <img
                        src={productImage ? productImage : images}
                        alt="add-product"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          borderRadius: "10px",
                        }}
                        onError={(e) => {
                          e.target.src = icons.defaultImage;
                        }}
                      />
                    ) : (
                      <img
                        src={icons.defaultImage}
                        alt="add-product"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          borderRadius: "10px",
                        }}
                      />
                    )}
                    <div className="product-upload text-15-500 color-dashboard-primary align-items-center">
                      <div className="d-flex justify-content-center cmb-15">
                        <img src={icons.roundCameraIcon} alt="add-product" />
                      </div>
                      <div>Upload from local file</div>
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
                                setProductImage(reader.result);
                              });
                              reader.readAsDataURL(e.target.files[0]);
                            }
                          }
                          setFieldValue("productImageName", files[0]?.name);
                        }}
                      />
                    </div>
                    {cropFile && (
                      <ImageCropper
                        onHide={() => {
                          setCropFile(null);
                        }}
                        fileURL={cropFile}
                        handelCropImage={(file) => {
                          setFieldValue("images", file || "");
                        }}
                      />
                    )}
                  </div>
                  <>
                    <span
                      className="col-md-4 text-13-500"
                      style={{ color: "red" }}
                    >
                      {errors?.images}
                    </span>
                  </>
                </div>
                <div className="col-md-6" />

                <div className="col-md-3 cmb-24">
                  <TextInput
                    label="Product name"
                    id="productName"
                    value={productName}
                    onChange={handleChange}
                    error={errors?.productName}
                  />
                </div>
                <div className="col-md-3">
                  <TextInput
                    label="Product price"
                    id="productPrice"
                    value={productPrice}
                    onChange={handleChange}
                    error={errors?.productPrice}
                  />
                </div>
                <div className="col-md-6" />
                <div className="col-md-3 cmb-24">
                  <SizeSelector
                    label="Product size"
                    id="productUnit"
                    value={productUnit}
                    onChange={handleChange}
                    options={sizeSelectList}
                    optionValue="value"
                    optionKey="id"
                    textId="productSize"
                    textInput={productSize}
                    errorUnit={errors?.productUnit}
                    error={errors?.productSize}
                  />
                </div>

                <div className="col-md-3 cmb-24">
                  <SizeSelector
                    label="Product weight"
                    id="weightUnit"
                    value={weightUnit}
                    onChange={handleChange}
                    options={sizeSelectList}
                    optionValue="value"
                    optionKey="id"
                    textId="weightValue"
                    textInput={weightValue}
                    errorUnit={errors?.weightUnit}
                    error={errors?.weightValue}
                  />
                </div>
                <div className="col-md-6" />

                <div className="col-md-3">
                  <div
                    className="d-flex gap-2 text-15-500 color-blue text-nowrap align-items-center pointer"
                    onClick={() => {
                      setShowPopup(true);
                    }}
                  >
                    {!keyFeaturesList?.length && (
                      <>
                        {" "}
                        <img src={icons.addSquareBlue} alt="add-key-features" />
                        <div>
                          Add key features{" "}
                          <span className="color-black-40">(optional)</span>
                        </div>
                      </>
                    )}
                  </div>
                  {keyFeaturesList?.length > 0 && (
                    <>
                      <div className="text-17-600 black-100">Key Features</div>
                      <div className="d-flex flex-column features-list">
                        {keyFeaturesList?.map((elem, index) => {
                          return (
                            <ul
                              className="text-15-500-25 color-black cmb-10 cps-15"
                              key={index}
                            >
                              <li>{titleCaseString(elem)}</li>
                            </ul>
                          );
                        })}
                      </div>
                      <div
                        className="d-flex gap-2 text-15-500-25 color-blue text-nowrap align-items-center pointer"
                        onClick={() => {
                          setShowPopup(true);
                        }}
                      >
                        <img
                          src={icons.addSquareBlue}
                          alt="add-key-features"
                          style={{ width: "24px", height: "24px" }}
                          className="color-blue"
                        />
                        <div>Add more</div>
                      </div>
                    </>
                  )}
                </div>
                <div className="col-md-9" />

                <div className="col-md-6 cmb-24 cmt-24">
                  <TextArea
                    label="Description"
                    id="description"
                    value={description}
                    onChange={handleChange}
                    error={errors?.description}
                  />
                </div>
                <div className="col-md-6" />
                <div className="col-md-6">
                  <Button
                    btnText={
                      isEqual(values, initialValues) ? "GO TO REVIEW" : "SAVE"
                    }
                    btnStyle={isEqual(values, initialValues) ? "DD" : "PD"}
                    disabled={isEqual(values, initialValues)}
                    onClick={handleSubmit}
                    btnLoading={btnLoading}
                  />
                </div>
              </form>
            );
          }}
        </Formik>
      </div>

      {showPopup && (
        <AddFeaturesPopup
          onHide={() => {
            setShowPopup(false);
          }}
          handleSaveKeyFeatures={handleSaveKeyFeatures}
          keyFeaturesList={keyFeaturesList}
        />
      )}
    </div>
  );
};

export default AddProducts;

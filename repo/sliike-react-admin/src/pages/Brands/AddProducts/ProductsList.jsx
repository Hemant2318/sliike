import Button from "components/form/Button/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addBrandProduct } from "store/globalSlice";
import { icons } from "utils/constants";
import { titleCaseString } from "utils/helpers";

const ProductsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [btnLoading, setBtnLoading] = useState(false);
  const { brandProductList } = useSelector((state) => ({
    brandProductList: state.global.brandProductList,
  }));

  const handleAddBrandProduct = async (value) => {
    setBtnLoading(true);
    let images = value?.map((val, i) => {
      return val?.images;
    });

    let finalData = new FormData();
    for (let i = 0; i < images.length; i++) {
      finalData.append(`images`, images[i]);
    }
    finalData.append("brandId", params?.id);

    const payload = value?.map(({ imagePath, images, ...rest }) => ({
      ...rest,
    }));
    let products = [];
    products.push(...payload);

    products.forEach((prod, ind) => {
      Object.entries(prod).forEach(([key, values]) => {
        if (key === "keyFeatures") {
          values.forEach((feature, featureIndex) => {
            finalData.append(
              `products[${ind}][${key}][${featureIndex}]`,
              feature
            );
          });
        } else {
          finalData.append(`products[${ind}][${key}]`, values);
        }
      });
    });

    const response = await dispatch(addBrandProduct(finalData));
    if (response?.status === 201) {
      navigate(`/brands/add-brand/product-list/review/step-3/${params?.id}`);
    }

    setBtnLoading(false);
  };

  return (
    <div
      className="product-list-container bg-white"
      id="product-list-review-container"
    >
      <div className="text-20-700 color-dashboard-primary d-flex gap-3 cmb-24 align-items-center p-2">
        Add Products
        <div className="text-17-600 color-blue">STEP-2</div>
      </div>

      <div className="text-15-600 d-flex gap-1 p-2">
        <div className="color-dashboard-primary">Products</div>
        <div className="color-blue-60">({brandProductList?.length})</div>
      </div>
      <div className="product-list cmb-40 row g-0">
        {brandProductList?.map((elem, index) => {
          return (
            <div className="p-2 col-md-4" key={index}>
              <div className="card-effect products-items">
                <div
                  style={{
                    height: "209px",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                >
                  <img
                    src={elem?.imagePath}
                    alt="product"
                    className="fill-image"
                    style={{
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  />
                </div>

                <div className="cmt-16 cps-16 cmb-30">
                  <div className="text-17-500 color-black-2 cmb-5">
                    {titleCaseString(elem?.productName)}
                  </div>
                  <div className="text-17-600 color-black-100">
                    {elem?.productPrice && `$${elem?.productPrice}`}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="d-flex col-md-3 gap-2 text-15-500 color-blue align-items-center cmb-98 pointer"
        onClick={() => {
          navigate(`/brands/add-brand/product/step-2/${params?.id}`);
        }}
      >
        <img src={icons.addSquareBlue} alt="add-key-features" />
        <div>ADD NEW PRODUCT</div>
      </div>

      <Button
        btnText="GO TO REVIEW"
        btnStyle="PD"
        className="text-nowrap w-50"
        disabled={brandProductList?.length === 0}
        onClick={() => {
          handleAddBrandProduct(brandProductList);
        }}
        btnLoading={btnLoading}
      />
    </div>
  );
};

export default ProductsList;

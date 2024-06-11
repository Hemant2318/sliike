import Button from "components/form/Button/Button";
import React from "react";
import { commonRoute, icons } from "utils/constants";
import "./AddProducts.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { omit } from "lodash";
import {
  completeBrandSteps,
  getBrandProductList,
  throwSuccess,
} from "store/globalSlice";
import Loader from "components/layouts/Loader/Loader";

const GetBrandProductList = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    id: param?.id,
    data: [],
    loading: true,
  });

  const fetchBrandProductList = async (value) => {
    const payload = omit(value, ["data", "loading"]);
    const response = await dispatch(getBrandProductList(payload?.id));
    if (response?.status === 200) {
      setProductData((prev) => {
        return {
          ...prev,
          data: response?.data,
          loading: false,
        };
      });
    }
  };
  useEffect(() => {
    fetchBrandProductList(productData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDone = async (id) => {
    setBtnLoading(true);
    const response = await dispatch(completeBrandSteps({ brandId: id }));
    if (response?.status === 200) {
      dispatch(throwSuccess("Steps completed"));
      navigate(commonRoute.brands);
    }
    setBtnLoading(false);
  };

  const brandBannerImg = productData?.data?.[0]?.brandBanner;
  const brandLogoImg = productData?.data?.[0]?.brandLogo;
  const productList = productData?.data?.[0]?.productDeatils;

  return (
    <div
      className="product-review-container-3 bg-white"
      id="product-list-review-container-3"
    >
      <div className="text-20-700 color-dashboard-primary d-flex gap-3 cmb-24 align-items-center p-2">
        Set up review
        <div className="text-17-600 color-blue">STEP-3</div>
      </div>

      {productData?.loading ? (
        <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
          <Loader size="md" />
        </div>
      ) : (
        <>
          <div className="banner-logo-container p-2">
            <div className="brand-banner">
              <img
                src={brandBannerImg}
                alt="brand-banner"
                className="review-banner-image"
              />
            </div>
            <div className="brand-logo">
              <img
                src={brandLogoImg}
                alt="brand-logo"
                className="review-logo-image"
              />
            </div>
          </div>

          <div className="text-20-700 d-flex gap-1 p-2">
            <div className="color-dashboard-primary">LAKME BEAUTY PRODUCTS</div>
          </div>
          <div className="product-list cmb-40 row g-0">
            {productList?.map((elem, index) => {
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
                        src={elem?.productImageName && elem?.productImageName}
                        alt="product"
                        className="fill-image"
                        style={{
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                        }}
                        onError={(e) => {
                          e.target.src = icons.defaultImage;
                        }}
                      />
                    </div>

                    <div className="cmt-16 cps-16 cmb-30">
                      <div className="text-17-500 color-black-2 cmb-5">
                        {elem?.productName && elem?.productName}
                      </div>
                      <div className="text-17-600 color-black-100">
                        {elem?.productPrice && `$${elem?.productPrice}`}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="col-md-4" />

            <div className="p-2 col-md-4">
              <Button
                btnText="DONE"
                btnStyle="PD"
                className="text-nowrap"
                onClick={() => {
                  handleDone(param?.id);
                }}
                btnLoading={btnLoading}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GetBrandProductList;

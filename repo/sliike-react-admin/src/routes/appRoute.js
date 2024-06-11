import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { commonRoute } from "utils/constants";
import Dashboard from "pages/Dashboard";
import Layout from "pages/Layout";
import UserProfile from "pages/UserProfile";
import AddAdmin from "pages/UserProfile/AddAdmin/AddAdmin";
import Admins from "pages/Admins";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Beauticians from "pages/Beauticians/Beauticians";
import ApprovalPage from "pages/Beauticians/ApprovalPage";
import Clients from "pages/Clients";
import Gist from "pages/Gist";
import MyGist from "pages/Gist/MyGist";
import GistDetails from "pages/Gist/GistDetails";
import ClientDetails from "pages/Clients/ClientDetails";
import Temp from "pages/Temp";
import ApprovalDetail from "pages/Beauticians/ApprovalDetail";
import Archive from "pages/Beauticians/Archive";
import AddBeautician from "pages/Beauticians/AddBeautician";
import BeauticianDetails from "pages/Beauticians/BeauticianDetails/BeauticianDetails";
import VIewBrands from "pages/Brands/VIewBrands/VIewBrands";
import BrandDetails from "pages/Brands/BrandDetails/BrandDetails";
import AddBrand from "pages/Brands/AddBrand/AddBrand";
import AddProducts from "pages/Brands/AddProducts/AddProducts";
import ViewServices from "pages/Services/ViewServices/ViewServices";
import ServicesDetails from "pages/Services/ServicesDetails/ServicesDetails";
import ClientArchive from "pages/Clients/ViewClients/ClientArchive";
import ViewProducts from "pages/Products/ViewProducts";
import ProductsArchive from "pages/Products/ProductChartData/ProductsArchive";
import ProductDetails from "pages/Products/ProductDetails/ProductDetails";
import Promotion from "pages/Promotion/Promotion";
import AddPromotion from "pages/Promotion/AddPromotion/AddPromotion";
import PromotionSummary from "pages/Promotion/AddPromotion/PromotionSummary";
import MoreOptions from "pages/MoreOptions/MoreOptions";
import ServiceSubCategory from "pages/MoreOptions/ServiceSubCategory/ServiceSubCategory";
import Province from "pages/MoreOptions/Province/Province";
import ServiceArchive from "pages/Services/ViewServices/ServiceArchive";
import TermsPolicy from "pages/TermsPolicy/TermsPolicy";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProfile,
  getAllClient,
  getSubAdminsAccessibility,
} from "store/globalSlice";
import Demography from "pages/MoreOptions/Demography/Demography";
import HealthSafety from "pages/MoreOptions/HealthSafety/HealthSafety";
import Amenities from "pages/MoreOptions/Amenities/Amenities";
import Faq from "pages/Faq/Faq";
import Feedback from "pages/Feedback/Feedback";
import ContactUs from "pages/ContactUs/ContactUs";
import ProductCategory from "pages/MoreOptions/Products/ProductCategory";
import PushNotification from "pages/Dashboard/PushNotification";
import UsersJourney from "pages/Dashboard/UsersJourney";
import UserData from "pages/Dashboard/UserData";
import Discount from "pages/Dashboard/Discount";
import NewMessage from "pages/Dashboard/PushNotification/NewMessage";
import RecentMessages from "pages/Dashboard/PushNotification/RecentMessages";
import UsersJourneyDetails from "pages/Dashboard/UsersJourney/UsersJourneyDetails";
import NewDiscount from "pages/Dashboard/Discount/NewDiscount";
import DiscountOverView from "pages/Dashboard/Discount/DiscountOverView";
import RecentDiscount from "pages/Dashboard/Discount/RecentDiscount";
// import AddProducts from "pages/Brands/AddProducts/AddProducts";
import ProductsList from "pages/Brands/AddProducts/ProductsList";
import GetBrandProductList from "pages/Brands/AddProducts/GetBrandProductList";
import AddBeauticianSteps from "pages/Beauticians/AddBeauticianSteps/AddBeauticianSteps";
import BrandCategory from "pages/MoreOptions/BrandCategory";
import Referrals from "pages/Referrals";
import Recipients from "pages/Referrals/Recipients";
import AddClient from "pages/Clients/AddClient";
import UpdateBeautician from "pages/Beauticians/UpdateBeautician";
import Ecommerce from "pages/Ecommerce";
import EcomUserJourney from "pages/Ecommerce/EcomUserJourney";
import EcomUserData from "pages/Ecommerce/EcomUserData";
import ProductOrderData from "pages/Ecommerce/ProductOrderData";
import ProductListData from "pages/Ecommerce/ProductListData";
import AdminArchive from "pages/Admins/AdminArchive";
import ProgressBarInit from "components/layouts/ProgressBarInit";
import EcomUserJourneyDetails from "pages/Ecommerce/EcomUserJourney/EcomUserJourneyDetails";

const AppRoute = () => {
  // const [isAccess, setIsAccess] = useState({});
  const [isLoader, setIsLoader] = useState(true);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [redirectRoute, setRedirectRoute] = useState(commonRoute.dashboard);
  const { permissionsData } = useSelector((state) => ({
    permissionsData: state.global.permissionsData,
  }));
  // const access = {
  //   dashboardRoute: permissionsData?.dashboardSettings?.[0]?.falsecount !== 3,
  //   beauticiansRoute:
  //     permissionsData?.beauticianSettings?.[0]?.falsecount !== 3,
  //   clientsRoute: permissionsData?.clientSettings?.[0]?.falsecount !== 3,
  //   brandsRoute: permissionsData?.brandSettings?.[0]?.falsecount !== 3,
  //   productsRoute: permissionsData?.productSettings?.[0]?.falsecount !== 3,
  //   promotionsRoute: permissionsData?.promotionSettings?.[0]?.falsecount !== 3,
  //   gistsRoute: permissionsData?.gistSettings?.[0]?.falsecount !== 3,
  //   adminsRoute: permissionsData?.adminSettings?.[0]?.falsecount !== 3,
  //   eCommerceRoute: true,
  //   moreOptionsRoute: true,
  // };

  const globalApis = async () => {
    await dispatch(getAdminProfile());
    await dispatch(getAllClient());
    await dispatch(getSubAdminsAccessibility());
    setTimeout(() => {
      setIsLoader(false);
    }, 2000);
  };

  useEffect(() => {
    globalApis();
    getAllClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (progressBarValue < 100) {
        setProgressBarValue((prevValue) => Math.min(prevValue + 5, 100));
      }
    }, 200);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressBarValue]);

  // useEffect(() => {
  //   if (permissionsData?.dashboardSettings)
  //     setIsAccess({
  //       dashboardRoute:
  //         permissionsData?.dashboardSettings?.[0]?.falsecount !== 3,
  //       beauticiansRoute:
  //         permissionsData?.beauticianSettings?.[0]?.falsecount !== 3,
  //       clientsRoute: permissionsData?.clientSettings?.[0]?.falsecount !== 3,
  //       brandsRoute: permissionsData?.brandSettings?.[0]?.falsecount !== 3,
  //       productsRoute: permissionsData?.productSettings?.[0]?.falsecount !== 3,
  //       promotionsRoute:
  //         permissionsData?.promotionSettings?.[0]?.falsecount !== 3,
  //       gistsRoute: permissionsData?.gistSettings?.[0]?.falsecount !== 3,
  //       adminsRoute: permissionsData?.adminSettings?.[0]?.falsecount !== 3,
  //       eCommerceRoute: true,
  //       moreOptionsRoute: true,
  //     });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [permissionsData]);

  const routeArray = [
    //dashboard
    {
      layoutId: "dashboard-container",
      path: commonRoute.dashboardType,
      // component: "dashboard",
      component: <Dashboard />,
      // isRouting: isAccess?.dashboardRoute && isAccess?.dashboardRoute,
    },
    {
      path: commonRoute.dashboard,
      to: `${commonRoute.dashboard}/dashboard-view`,
      isNavigate: true,
      // isNavigate: isAccess?.dashboardRoute ? true : false,
    },
    {
      layoutId: "push-notification-container",
      path: commonRoute.pushNotification,
      component: <PushNotification />,
    },

    {
      layoutId: "new-message-container",
      path: commonRoute.newMessage,
      component: <NewMessage />,
      isBack: true,
    },
    {
      layoutId: "recent-message-container",
      path: commonRoute.recentMessage,
      component: <RecentMessages />,
      isBack: true,
    },
    {
      layoutId: "user-journey-container",
      path: commonRoute.usersJourney,
      component: <UsersJourney />,
    },
    {
      layoutId: "user-detail-container",
      path: commonRoute.usersJourneyDetail,
      component: <UsersJourneyDetails />,
      isBack: true,
      headerText: "Users Journey",
    },
    {
      layoutId: "user-data-container",
      path: commonRoute.userData,
      component: <UserData />,
      headerText: "Users Data",
    },
    {
      layoutId: "discount-container",
      path: commonRoute.discount,
      component: <Discount />,
    },
    {
      layoutId: "new-discount-container",
      path: commonRoute.newDiscount,
      component: <NewDiscount />,
      isBack: true,
    },
    {
      layoutId: "discount-overview-container",
      path: commonRoute.newDiscountSummary,
      component: <DiscountOverView />,
      isBack: true,
    },
    {
      layoutId: "recent-discount-container",
      path: commonRoute.recentDiscount,
      component: <RecentDiscount />,
      isBack: true,
    },
    //beautician
    {
      layoutId: "beauticians-container",
      path: commonRoute.beauticians,
      component: <Beauticians />,
      // isRouting: isAccess?.beauticiansRoute,
    },
    {
      layoutId: "beautician-detail-container",
      path: commonRoute.beauticianDashboard,
      component: <BeauticianDetails />,
      isBack: true,
    },
    {
      layoutId: "beautician-detail-container",
      path: commonRoute.beauticianDetails,
      component: <ApprovalDetail />,
      isBack: true,
    },
    {
      layoutId: "add-beauticians-container",
      path: commonRoute.registerBeautician,
      component: <AddBeautician />,
      isBack: true,
    },
    {
      layoutId: "edit-beauticians-container",
      path: commonRoute.editRegisterBeautician,
      component: <UpdateBeautician />,
      isBack: true,
    },
    {
      layoutId: "add-beauticians-register-container",
      path: commonRoute.addBeautician,
      component: <AddBeauticianSteps />,
      // isBack: true,
    },
    {
      layoutId: "approval-beauticians-container",
      path: commonRoute.approvalPage,
      component: <ApprovalPage />,
      isBack: true,
    },
    {
      layoutId: "archived-container",
      path: commonRoute.archive,
      component: <Archive />,
      isBack: true,
    },
    {
      layoutId: "approval-details",
      path: commonRoute.approvalDetail,
      component: <ApprovalDetail />,
      isBack: true,
    },

    //client
    {
      layoutId: "clients-container",
      path: commonRoute.clients,
      component: <Clients />,
      // isRouting: isAccess?.clientsRoute,
    },
    {
      layoutId: "clients-archive-container",
      path: commonRoute.clientsArchived,
      component: <ClientArchive />,
      isBack: true,
    },
    {
      layoutId: "add-client-container",
      path: commonRoute.registerClient,
      component: <AddClient />,
      isBack: true,
    },
    {
      layoutId: "clients-details-container",
      path: commonRoute.clientDetails,
      component: <ClientDetails />,
      isBack: true,
    },

    //brand
    {
      layoutId: "brands-container",
      path: commonRoute.brands,
      component: <VIewBrands />,
      // isRouting: isAccess?.brandsRoute,
    },
    {
      layoutId: "brands-details-container",
      path: commonRoute.brandsDetails,
      component: <BrandDetails />,
      isBack: true,
    },
    {
      layoutId: "add-brand-container",
      path: commonRoute.addBrand,
      component: <AddBrand />,
      isBack: true,
    },
    {
      layoutId: "add-product-container",
      path: commonRoute.addBrandProduct,
      component: <AddProducts />,
      isBack: true,
    },
    {
      layoutId: "product-list-review-container",
      path: commonRoute.brandProductStep2,
      component: <ProductsList />,
      isBack: true,
    },
    {
      layoutId: "product-list-review-container-3",
      path: commonRoute.brandProductReviewList,
      component: <GetBrandProductList />,
      isBack: true,
    },
    // {
    //   layoutId: "add-product-container",
    //   path: commonRoute.addProduct,
    //   component: <AddProducts />,
    // },

    //service
    {
      layoutId: "services-container",
      path: commonRoute.services,
      component: <ViewServices />,
      // isRouting: true,
    },
    {
      layoutId: "archive-services-container",
      path: commonRoute.servicesArchive,
      component: <ServiceArchive />,
      isBack: true,
    },
    {
      layoutId: "services-details",
      path: commonRoute.servicesDetails,
      component: <ServicesDetails />,
      isBack: true,
    },

    //product
    {
      layoutId: "products-container",
      path: commonRoute.products,
      // component: "products",
      component: <ViewProducts />,
      // isRouting: isAccess?.productsRoute,
    },
    {
      layoutId: "archive-product",
      path: commonRoute.productsArchive,
      component: <ProductsArchive />,
      isBack: true,
    },
    {
      layoutId: "product-details",
      path: commonRoute.productsDetails,
      component: <ProductDetails />,
      isBack: true,
    },

    //e-commerce
    {
      layoutId: "eCommerce-container",
      path: commonRoute.eCommerceType,
      component: <Ecommerce />,
      // isRouting: isAccess?.eCommerceRoute,
    },
    {
      path: commonRoute.eCommerce,
      to: `${commonRoute.eCommerce}/overview`,
      isNavigate: true,
      // isNavigate: isAccess?.eCommerceRoute ? true : false,
    },
    {
      layoutId: "eCommerce-user-journey-container",
      path: commonRoute.eComUserJourney,
      component: <EcomUserJourney />,
    },
    {
      layoutId: "ecom-user-journey-details",
      path: commonRoute.eComUserJourneyDetails,
      component: <EcomUserJourneyDetails />,
      isBack: true,
      headerText: "Users Journey",
    },
    {
      layoutId: "eCommerce-user-data-container",
      path: commonRoute.eComUserData,
      component: <EcomUserData />,
    },
    {
      layoutId: "eCommerce-product-order-container",
      path: commonRoute.productOrderData,
      component: <ProductOrderData />,
    },
    {
      layoutId: "eCommerce-product-list-container",
      path: commonRoute.productListData,
      component: <ProductListData />,
    },

    //promotion
    {
      layoutId: "promotions-container",
      path: commonRoute.promotions,
      // component: "promotions",
      component: <Promotion />,
      // isRouting: isAccess?.promotionsRoute,
    },
    {
      layoutId: "add-promotion-container",
      path: commonRoute.addPromotion,
      component: <AddPromotion />,
      isBack: true,
    },
    {
      layoutId: "add-promotion-summary-container",
      path: commonRoute.addSummary,
      component: <PromotionSummary />,
      isBack: true,
    },

    //referrals
    {
      layoutId: "referrals-container",
      path: commonRoute.referrals,
      component: <Referrals />,
      // isRouting: true,
      // isBack: true,
    },

    {
      layoutId: "recipient-container",
      path: commonRoute.recipient,
      component: <Recipients />,
      isBack: true,
    },

    //gist
    {
      layoutId: "gist-container",
      path: commonRoute.gist,
      // component: "gist",
      component: <Gist />,
      // isRouting: isAccess?.gistsRoute,
    },
    {
      layoutId: "my-gist-container",
      path: commonRoute.myGist,
      component: <MyGist />,
      isBack: true,
    },
    {
      layoutId: "gist-details-container",
      path: commonRoute.gistDetails,
      component: <GistDetails />,
      isBack: true,
    },

    //admin
    {
      layoutId: "admins-container",
      path: commonRoute.admins,
      // component: "admin",
      component: <Admins />,
      // isRouting: isAccess?.adminsRoute,
    },
    {
      layoutId: "my-profile-container",
      path: commonRoute.myProfile,
      component: <UserProfile />,
      isBack: true,
    },
    {
      layoutId: "add-admin-container",
      path: commonRoute.addAdmin,
      component: <AddAdmin />,
      isBack: true,
    },
    {
      layoutId: "admin-archive-container",
      path: commonRoute.adminArchive,
      component: <AdminArchive />,
      isBack: true,
    },
    // {
    //   layoutId: "add-admin-container",
    //   path: commonRoute.addAdmin,
    //   component: <AddAdmin />,
    // },
    //terms policy
    {
      layoutId: "terms-policy-container",
      path: commonRoute.termsPolicy,
      // component: "TermsPolicy",
      component: <TermsPolicy />,
      // isRouting: true,
    },

    //faq
    {
      layoutId: "faq-container",
      path: commonRoute.faq,
      // component: "faq",
      component: <Faq />,
      // isRouting: true,
    },
    //feedback
    {
      layoutId: "feedback-container",
      path: commonRoute.feedback,
      // component: "feedback",
      component: <Feedback />,
      // isRouting: true,
    },
    //contact us
    {
      layoutId: "contact-us-container",
      path: commonRoute.contactUs,
      // component: "contact us",
      component: <ContactUs />,
      // isRouting: true,
    },

    //more options
    {
      layoutId: "options-container",
      path: commonRoute.moreOptionsType,
      // component: "MoreOptions",
      component: <MoreOptions />,
      // isRouting: isAccess?.moreOptionsRoute,
    },
    {
      path: commonRoute.moreOptions,
      to: `${commonRoute.moreOptions}/service-category`,
      isNavigate: true,
      // isNavigate: isAccess?.moreOptionsRoute ? true : false,
    },
    {
      layoutId: "service-subCategory",
      path: commonRoute.serviceSubCategory,
      // component: "ServiceSubCategory",
      component: <ServiceSubCategory />,
    },
    {
      layoutId: "brand-category",
      path: commonRoute.brandCategory,
      component: <BrandCategory />,
    },
    {
      layoutId: "product-category",
      path: commonRoute.productCategory,
      //component: "Product category"
      component: <ProductCategory />,
    },
    {
      layoutId: "province-container",
      path: commonRoute.province,
      // component: "Province",
      component: <Province />,
    },

    {
      layoutId: "demography-container",
      path: commonRoute.demography,
      // component: "demography",
      component: <Demography />,
    },
    {
      layoutId: "demography-container",
      path: commonRoute.hsRules,
      // component: "hs rules",
      component: <HealthSafety />,
    },
    {
      layoutId: "demography-container",
      path: commonRoute.amenities,
      // component: "amenities",
      component: <Amenities />,
    },

    //temp
    {
      layoutId: "temp-container",
      path: "/temp",
      component: <Temp />,
    },
  ];

  const handleNavigateRoute = async (newPermissionData) => {
    if (
      newPermissionData?.dashboardSettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
    ) {
      // setRedirectRoute(commonRoute?.dashboardType);
      navigate(commonRoute?.dashboard);
    } else if (
      newPermissionData?.beauticianSettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
      // window?.location?.pathname.includes("beauticians")
    ) {
      // setRedirectRoute(commonRoute?.beauticians);
      navigate(commonRoute?.beauticians);
    } else if (
      window?.location?.pathname.split("/").includes("dashboard-view") &&
      newPermissionData?.clientSettings?.[0]?.falsecount !== 3
    ) {
      navigate(commonRoute?.clients);
      // setRedirectRoute(commonRoute?.clients);
    } else if (
      newPermissionData?.brandSettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
    ) {
      // setRedirectRoute(commonRoute?.brands);
      navigate(commonRoute?.brands);
    } else if (
      newPermissionData?.serviceSettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
    ) {
      // setRedirectRoute(commonRoute?.services);
      navigate(commonRoute?.services);
    } else if (
      newPermissionData?.productSettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
    ) {
      // setRedirectRoute(commonRoute?.products);
      navigate(commonRoute?.products);
    } else if (
      newPermissionData?.eCommerceSettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
    ) {
      // setRedirectRoute(commonRoute?.eCommerceType);
      navigate(commonRoute?.eCommerceType);
    } else if (
      newPermissionData?.promotionSettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
    ) {
      // setRedirectRoute(commonRoute?.promotions);
      navigate(commonRoute?.promotions);
    } else if (
      newPermissionData?.referralsSettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
    ) {
      // setRedirectRoute(commonRoute?.referrals);
      navigate(commonRoute?.referrals);
    } else if (
      newPermissionData?.gistSettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
    ) {
      // setRedirectRoute(commonRoute?.gist);
      navigate(commonRoute?.gist);
    } else if (
      newPermissionData?.adminSettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
    ) {
      // setRedirectRoute(commonRoute?.admins);
      navigate(commonRoute?.admins);
    } else if (
      newPermissionData?.termsPolicySettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
    ) {
      // setRedirectRoute(commonRoute?.termsPolicy);
      navigate(commonRoute?.termsPolicy);
    } else if (
      newPermissionData?.faqSettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
    ) {
      // setRedirectRoute(commonRoute?.faq);
      navigate(commonRoute?.faq);
    } else if (
      newPermissionData?.feedbackSettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
    ) {
      // setRedirectRoute(commonRoute?.feedback);
      navigate(commonRoute?.feedback);
    } else if (
      newPermissionData?.contactUsSettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
    ) {
      // setRedirectRoute(commonRoute?.contactUs);
      navigate(commonRoute?.contactUs);
    } else if (
      newPermissionData?.moreOptionsSettings?.[0]?.falsecount !== 3 &&
      window?.location?.pathname.split("/").includes("dashboard-view")
    ) {
      // setRedirectRoute(commonRoute?.moreOptionsType);
      navigate(commonRoute?.moreOptionsType);
    } else {
      //nothing
    }
  };

  const manageRoutes = async (newPermissionData) => {
    if (newPermissionData?.dashboardSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.dashboardType);
    } else if (newPermissionData?.beauticianSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.beauticians);
    } else if (newPermissionData?.clientSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.clients);
    } else if (newPermissionData?.brandSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.brands);
    } else if (newPermissionData?.serviceSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.services);
    } else if (newPermissionData?.productSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.products);
    } else if (newPermissionData?.eCommerceSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.eCommerceType);
    } else if (newPermissionData?.promotionSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.promotions);
    } else if (newPermissionData?.referralsSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.referrals);
    } else if (newPermissionData?.gistSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.gist);
    } else if (newPermissionData?.adminSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.admins);
    } else if (newPermissionData?.termsPolicySettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.termsPolicy);
    } else if (newPermissionData?.faqSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.faq);
    } else if (newPermissionData?.feedbackSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.feedback);
    } else if (newPermissionData?.contactUsSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.contactUs);
    } else if (newPermissionData?.moreOptionsSettings?.[0]?.falsecount !== 3) {
      setRedirectRoute(commonRoute?.moreOptionsType);
    } else {
      //nothing
    }
  };

  useEffect(() => {
    if (permissionsData?.dashboardSettings) {
      const newPermissionData = {
        ...permissionsData,
        serviceSettings: [{ falsecount: 0 }],
        eCommerceSettings: [{ falsecount: 0 }],
        referralsSettings: [{ falsecount: 0 }],
        termsPolicySettings: [{ falsecount: 0 }],
        faqSettings: [{ falsecount: 0 }],
        feedbackSettings: [{ falsecount: 0 }],
        contactUsSettings: [{ falsecount: 0 }],
        moreOptionsSettings: [{ falsecount: 0 }],
      };
      handleNavigateRoute(newPermissionData);
      manageRoutes(newPermissionData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionsData]);

  return (
    <div>
      {isLoader ? (
        <ProgressBarInit loadingValue={progressBarValue} />
      ) : (
        <div className="">
          <Routes>
            {routeArray?.map((elem, index) => {
              const { layoutId, isBack, headerText, isNavigate, path, to } =
                elem;

              return (
                <Route
                  exact
                  key={index}
                  path={path}
                  element={
                    isNavigate ? (
                      <Navigate to={to} replace />
                    ) : (
                      <Layout
                        layoutId={layoutId || ""}
                        isBack={isBack}
                        headerText={headerText}
                      >
                        {elem.component}
                      </Layout>
                    )
                  }
                />
              );
            })}
            {/* {routeArray.map((elem, index) => {
          const {
            layoutId,
            isBack,
            headerText,
            isNavigate,
            path,
            to,
            isRouting,
          } = elem;

          return (
            <Route
              exact
              key={index}
              path={path}
              element={
                isNavigate ? (
                  <Navigate to={to} replace />
                ) : (
                  <Layout
                    layoutId={layoutId || ""}
                    isBack={isBack}
                    headerText={headerText}
                  >
                    {elem.component}
                  </Layout>
                )
              }
            />
          );
        })} */}
            <Route
              exact
              path="/"
              element={<Navigate to={redirectRoute} replace />}
            />
            <Route
              exact
              path="*"
              element={<Navigate to={redirectRoute} replace />}
            />
          </Routes>
        </div>
      )}
    </div>
  );
};
export default AppRoute;

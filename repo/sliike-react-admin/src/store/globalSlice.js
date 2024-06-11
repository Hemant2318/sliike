import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "services";
import { storeLocalStorageData } from "utils/helpers";
const initialState = {
  userState: null,
  apiError: {},
  servicesCategoryList: [],
  provinceList: [],
  adminData: {},
  businessList: [],
  clientList: [],
  checkClientList: [],
  brandCategory: [],
  demographyList: [],
  // featuresList: [],
  brandProductList: [],
  stepThreeData: [],
  fetchSubServiceType: [],
  productCategoryList: [],
  beauticianPhoneNumber: "",
  subAdminData: {},
  isSuccessPopup: false,
  isSuccessPasswordPopup: false,
  permissionsData: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUserState(state, action) {
      state.userState = action.payload;
    },
    setApiError(state, action) {
      state.apiError = action.payload;
    },
    setServicesCategoryList(state, action) {
      state.servicesCategoryList = action.payload;
    },
    setProvinceList(state, action) {
      state.provinceList = action.payload;
    },

    setAdminData(state, action) {
      state.adminData = action.payload;
    },

    setBusinessList(state, action) {
      state.businessList = action.payload;
    },

    setClientList(state, action) {
      state.clientList = action.payload;
    },

    setCheckClientList(state, action) {
      state.checkClientList = action.payload;
    },
    setBrandCategory(state, action) {
      state.brandCategory = action.payload;
    },
    setDemographyList(state, action) {
      state.demographyList = action.payload;
    },
    // setFeaturesList(state, action) {
    //   state.featuresList = action.payload;
    // },
    setBrandProductList(state, action) {
      state.brandProductList = action.payload;
    },

    setStepThreeData(state, action) {
      state.stepThreeData = action.payload;
    },

    setFetchSubServiceType(state, action) {
      state.fetchSubServiceType = action.payload;
    },
    setProductCategoryList(state, action) {
      state.productCategoryList = action.payload;
    },
    setBeauticianPhoneNumber(state, action) {
      state.beauticianPhoneNumber = action.payload;
    },
    setSubAdminData(state, action) {
      state.subAdminData = action.payload;
    },
    setIsSuccessPopup(state, action) {
      state.isSuccessPopup = action.payload;
    },
    setIsSuccessPasswordPopup(state, action) {
      state.isSuccessPasswordPopup = action.payload;
    },
    setPermissionsData(state, action) {
      state.permissionsData = action.payload;
    },

    reset: () => initialState,
  },
});

//sub admin permission
export const getSubAdminsAccessibility = () => async (dispatch) => {
  try {
    const res = await api.get("/admin/adminAccessDetails");
    const response = await dispatch(handelResponse(res));
    await dispatch(setPermissionsData(response?.settings));
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//admin login
export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/auth/admin-signIn", formData);
    const response = await dispatch(handelResponse(res));
    if (response?.status === 200) {
      storeLocalStorageData({ token: res?.token });
      dispatch(setUserState(JSON.stringify({ token: res?.token })));
    }
    return response;
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const handelLogout = () => async (dispatch) => {
  localStorage.clear();
  dispatch(setUserState(new Date().toLocaleString()));
  dispatch(reset());
};

//get details admin
export const getAdminProfile = () => async (dispatch) => {
  try {
    const res = await api.get("/admin/getProfile");
    const response = await dispatch(handelResponse(res));
    if (response?.status === 200) {
      dispatch(setAdminData(response?.data || {}));
    }
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//update admin profile
export const updateAdminProfile = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/admin/updateProfile", formData, {
      "Content-Type": "multipart/form-data",
    });
    return await dispatch(handelResponse(res));
  } catch (error) {
    return await dispatch(handelCatch(error));
  }
};

//change passowrd
export const handlePassword = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/changePassword", payload);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return await dispatch(handelCatch(error));
  }
};

//dashboard
export const getdashboardData = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/dashbordSummary?${queryParams}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

// dashboard bar chart
export const getPeriodicBarChart = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(
      `/admin/getPeriodicBusinessBarChart?${queryParams}`
    );
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const getRegisteredBarChart = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getRegisteredBarChart?${queryParams}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const getFinancialBarChart = (queryParams) => async (dispatch) => {
  try {
    const res = await api?.get(
      `/admin/getPeriodicFinancialBarChart?${queryParams}`
    );
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const getActiveInactiveClient = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(
      `/admin/getActiveInactiveData/client?${queryParams}`
    );
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const getActiveInactiveBeautician =
  (queryParams) => async (dispatch) => {
    try {
      const res = await api.get(
        `/admin/getActiveInactiveData/beautician?${queryParams}`
      );
      return dispatch(handelResponse(res));
    } catch (error) {
      return dispatch(handelCatch(error));
    }
  };

//push notification
//add
export const addNotification = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/addNotification", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get all
export const getAllNotification = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/getNotifications", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//update
export const editNotification = (payload) => async (dispatch) => {
  try {
    const res = await api.put("/admin/updateNotification", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//quick users journey vew
//get all
export const getAllUsers = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getUserJourneyList?${queryParams}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//user data
//get all
export const getAllUsersData = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getAllData?${queryParams}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//discount

//get all client
export const getAllClient = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getClientList?${queryParams}`);
    const response = await dispatch(handelResponse(res));
    if (response?.status === 200) {
      dispatch(setClientList(response?.data?.clientData) || []);
    }
    return response;
    // return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get all discount
export const getAllDiscount = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getDiscountList?${queryParams}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};
//create discount
export const createDiscount = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/addDiscount", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//beautician
export const getAllBeautician = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/getAllBeautician", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const fetchBeauticianDashboard = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/beauticianDashboard", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const changeRecommendStatus = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/updateRecomandedStatus", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const getSingleBeautician = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getSingleBeautician/${id}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const getProductSaleReport = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/productSalesReports", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const deleteBeautician = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/admin/removeBeautician/${id}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//send invitation to beautician
export const sendInvitation = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/sendInvtaion", payload);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//step 1
export const stepOne = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/addBeauticianBusinessDetails", payload);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return await dispatch(handelCatch(error));
  }
};

//step 2
export const stepTwo = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/addBeauticianBusinessType", payload);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return await dispatch(handelCatch(error));
  }
};

//step 3
export const stepThree = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/admin/addBeauticianServices", formData, {
      "Content-Type": "multipart/form-data",
    });
    return await dispatch(handelResponse(res));
  } catch (error) {
    return await dispatch(handelCatch(error));
  }
};

//step 4
export const stepFour = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/addBeauticianWorkingHours", payload);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return await dispatch(handelCatch(error));
  }
};

//edit beautician
export const editBeautician = (payload, id) => async (dispatch) => {
  try {
    const res = await api.post(`/admin/updateBeautician/${id}`, payload);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return await dispatch(handelCatch(error));
  }
};

//get details of beautician
export const getDetailsOfBeautician = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getDetailsOfBeautician/${id}`);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return await dispatch(handelCatch(error));
  }
};

//fetch sub services
export const getAllSubServices = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/option/fetchServiceTypes/${id}`);
    const response = await dispatch(handelResponse(res));

    if (response?.status === 200) {
      dispatch(setFetchSubServiceType(response?.data || []));
    }
    return response;
  } catch (error) {
    return await dispatch(handelCatch(error));
  }
};

//client

export const getAllClients = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/getAllClient", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const deleteClient = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/admin/removeClient/${id}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const getSingleClient = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/getSingleClient", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const getProductSummary = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/getClientSalesSummary", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};
//brands
//get all brands
export const getAllBrands = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getBrand?${queryParams}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//brand status
export const brandChangeStatus = (payload, id) => async (dispatch) => {
  try {
    const res = await api.post(`/admin/updateStatus/${id}`, payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//brand delete
export const brandDelete = (id) => async (dispatch) => {
  try {
    const res = await api.post(`/admin/deleteBrand/${id}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//brand dashboard
export const fetchBrandDashboard = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/getBrandDashboard", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//add brand
export const addBrand = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/admin/addBrand", formData, {
      "Content-Type": "multipart/form-data",
    });
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//add brand product
export const addBrandProduct = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/admin/addBrandProducts", formData, {
      "Content-Type": "multipart/form-data",
    });
    return await dispatch(handelResponse(res));
  } catch (error) {
    return await dispatch(handelCatch(error));
  }
};

//get brand product list
export const getBrandProductList = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getBrandDetails/${id}`);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return await dispatch(handelCatch(error));
  }
};

//complete brand steps
export const completeBrandSteps = (id) => async (dispatch) => {
  try {
    const res = await api.post("/admin/completeBrandSteps", id);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return await dispatch(handelCatch(error));
  }
};

//service
export const getAllServices = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/getAllServices", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const getSingleService = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/getServiceDashboard", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//products
//product dashboard
export const fetchProduct = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/getProductDashord", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//product details dashboard
export const fetchSingleProductDetail = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/getSingleProductDashboard", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//eCommerce
//dashboard
export const getECommerceDashboard = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/eCommerceDashboard?${queryParams}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//eCom User Journey
export const getECommerceUserJourney = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(
      `/admin/eCommerceBeauticianJourney?${queryParams}`
    );
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//eCom user data
export const getECommerceUserData = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/eCommerceBusinessesData?${queryParams}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//eCom order data
export const getECommerceOrderData = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/eCommerceOrderData?${queryParams}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//eCom product list
export const getECommerceProductList = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/eCommerceProductListData?${queryParams}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//promotions
//add
export const addPromotion = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/addPromotion", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get beautician list
export const getBusinessList = () => async (dispatch) => {
  try {
    const res = await api.get("/admin/getBusinessNameList");
    const response = await dispatch(handelResponse(res));
    if (response?.status === 200) {
      dispatch(setBusinessList(response?.data) || []);
    }
    return response;
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get service list
export const getserviceList = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getServicesList/${id}`);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get product list
export const getProductList = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getProductList/${id}`);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get current promotion
export const fetchCurrentPromotion = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getPromotionList/current?${queryParams}`);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get past promotion
export const fetchPastPromotion = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getPromotionList/past?${queryParams}`);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//referrals
//get referrals
export const fetchAllReferrals = () => async (dispatch) => {
  try {
    const res = await api.get("/admin/getReferrals");
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get recipients
export const fetchRecipient = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getRecipients/${id}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//gists
//get all gists
export const fetchAllGists = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/client/getAllGist?${queryParams}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get single gist details
export const fetchSingleGistDetails = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/client/getSingleGist/${queryParams}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get my gist detail
export const fetchMyGistDetail = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/client/getMyGist?${queryParams}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//create gist
export const gistCreate = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/client/createGist", formData, {
      "Content-Type": "multipart/form-data",
    });
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//response gist
export const responseGist = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/client/sendResponse", formData, {
      "Content-Type": "multipart/form-data",
    });
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//admins
//get admins
export const getAdmins = (queryParams) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getAdmins?${queryParams}`);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//admin status change
export const adminStatusUpdate = (payload) => async (dispatch) => {
  try {
    const res = await api.put("/admin/changeAdminStatus", payload);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//add admins
export const addAdminUser = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/admin/addAdmins", formData, {
      "Content-Type": "multipart/form-data",
    });
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get single admins details
export const getSubAdminDetails = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/getSingleAdminDetails/${id}`);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//update single admins
export const updateSubAdminDetails = (formData) => async (dispatch) => {
  try {
    const res = await api.put("/admin/chnageAdminProfile", formData, {
      "Content-Type": "multipart/form-data",
    });
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//update admins password
export const updateAdminPassword = (payload) => async (dispatch) => {
  try {
    const res = await api.put("/admin/updatePassword", payload);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//delete or archive admins
export const deleteAdmins = (id) => async (dispatch) => {
  try {
    const res = await api.put("/admin/removeAdmin", id);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//unarchive admins
export const unArchiveAdmins = (id) => async (dispatch) => {
  try {
    const res = await api.post("/admin/removeFromArchive", id);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//terms & condition
//get
export const getTerms = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/getTerms", payload);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//edit
export const updateTerms = (id, payload) => async (dispatch) => {
  try {
    const res = await api.put(`/admin/updateTerms/${id}`, payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//add faq
export const addFAQ = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/help/addFAQ", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get faq
export const getFAQ = (type) => async (dispatch) => {
  try {
    const res = await api.get(`/help/getFAQList/${type}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//delete faq
export const deleteFAQ = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/help/deleteFAQ/${id}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get feedback
export const getFeedback = (type) => async (dispatch) => {
  try {
    const res = await api.get(`/help/getFeedBackList/${type}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get contact us
export const getContactUs = (type) => async (dispatch) => {
  try {
    const res = await api.get(`/help/getContactUserList/${type}`);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//option list
//add service category
export const addServicesCategory = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/option/addServiceCategory", formData, {
      "Content-Type": "multipart/form-data",
    });
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//all services category list
export const getServicesCategories = () => async (dispatch) => {
  try {
    const res = await api.get("/option/fetchServiceCategories");
    const response = await dispatch(handelResponse(res));
    if (response?.status === 200) {
      dispatch(setServicesCategoryList(response?.data || []));
    }
    return response;
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get single service category
export const getSingleCategory = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/option/getSingleCategory/${id}`);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//update service category
export const updateServiceCategory = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/option/updateServiceCategory/${id}`, formData, {
      "Content-Type": "multipart/form-data",
    });
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//delete service category
export const deleteServiceCategory = (id) => async (dispatch) => {
  try {
    const res = await api.delete("/option/deleteServiceCategory", id);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get service sub-category
export const getAllServiceSubCategory = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/option/fetchServiceWithList", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//add service sub category
export const addServiceSubCategory = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/option/addServiceType", payload);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

// edit service sub type category
export const updateServiceSubCategory = (id, payload) => async (dispatch) => {
  try {
    const res = await api.put(`/option/updateServiceType/${id}`, payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//delete service sub category
export const deleteServiceSubCategory = (id) => async (dispatch) => {
  try {
    const res = await api.delete("/option/deleteServiceType", id);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//brand category
//get
export const fetchBrandCategory = () => async (dispatch) => {
  try {
    const res = await api.get("/option/getBrandCategory");
    const response = await dispatch(handelResponse(res));
    if (response?.status === 200) {
      dispatch(setBrandCategory(response?.data) || []);
    }
    return response;
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//add
export const addBrandCategory = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/option/addBrandCategory", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//update
export const updateBrandCategory = (id, payload) => async (dispatch) => {
  try {
    const res = await api.put(`/option/updateBrandCategory/${id}`, payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//delete
export const deleteBrandCategory = (id) => async (dispatch) => {
  try {
    const res = await api.delete("/option/deleteBrandCategory", id);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//product category
//get
export const getProductCategory = () => async (dispatch) => {
  try {
    const res = await api.get("/option/getProductCatList");
    const response = await dispatch(handelResponse(res));
    if (response?.status === 200) {
      dispatch(setProductCategoryList(response?.data) || []);
    }
    return response;
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//add
export const addProductCategory = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/option/addProductCategory", payload);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//update
export const updateProductCategory = (id, payload) => async (dispatch) => {
  try {
    const res = await api.put(`/option/updateProductCategory/${id}`, payload);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//delete
export const deleteProductCategory = (id) => async (dispatch) => {
  try {
    const res = await api.delete("/option/deleteProductCategory", id);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//province
//add
export const addProvinceTax = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/option/addProvince", payload);
    return await dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//fetch
export const getProvinceList = () => async (dispatch) => {
  try {
    const res = await api.get("/option/getProvinceList");
    const response = await dispatch(handelResponse(res));
    if (response?.status === 200) {
      dispatch(setProvinceList(response?.data || []));
    }
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//edit
export const editprovince = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/option/updateProvinceList", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//delete
export const deleteProvince = (id) => async (dispatch) => {
  try {
    const res = await api.delete("/option/deleteProvince", id);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get demography
export const getDemography = () => async (dispatch) => {
  try {
    const res = await api.get("/option/getDemography");
    const response = await dispatch(handelResponse(res));
    if (response?.status === 200) {
      dispatch(setDemographyList(response?.data) || []);
    }
    return response;
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//update demography
export const updateDemography = (id, payload) => async (dispatch) => {
  try {
    const res = await api.put(`/option/updateDemography/${id}`, payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//add demography
export const addDemography = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/option/addDemography", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//delete demography
export const deleteDemography = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/option/deleteDemography`, id);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//add amenities
export const addAmenities = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/option/addAmenity", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    handelCatch(error);
  }
};

//get amenities
export const getAmenities = () => async (dispatch) => {
  try {
    const res = await api.get("/option/getAmenityList");
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//update amenities
export const updateAmenities = (id, payload) => async (dispatch) => {
  try {
    const res = await api.put(`/option/updateAmenity/${id}`, payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//delete amenities
export const deleteAmenities = (id) => async (dispatch) => {
  try {
    const res = await api.delete("/option/deleteAmenity", id);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//get health safety
export const getHealthSafety = () => async (dispatch) => {
  try {
    const res = await api.get("/option/getHealthSafetyList");
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//add health safety
export const addHealthSafety = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/option/addHealthSafety", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//update health safety
export const updateHealthSafety = (id, payload) => async (dispatch) => {
  try {
    const res = await api.put(`/option/updateHealthSafety/${id}`, payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//delete health safety
export const deleteHealthSafety = (id) => async (dispatch) => {
  try {
    const res = await api.delete("/option/deleteHealthSafety", id);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

//common
export const changeStatus = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/changeStatus", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const changeArchive = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/changeArchive", payload);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

// get location from lat long
export const getLocationFromGeo = (payload) => async (dispatch) => {
  try {
    const geoURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${payload.lat},${payload.long}&sensor=false&key=${process.env.REACT_APP_MAP_API}`;
    const res = await axios.get(geoURL);
    return dispatch(handelResponse(res));
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

// response, success, error, catch
export const throwSuccess = (msg) => async (dispatch) => {
  let message = msg || "Operation Done Successfully.";
  dispatch(
    setApiError({
      show: true,
      message: message,
      type: "success",
    })
  );
};

export const throwError = (res) => async (dispatch) => {
  // let message = res?.message;
  let message = res;
  message = message || "Something went wrong!";
  dispatch(
    setApiError({
      show: true,
      message: message,
      type: "danger",
    })
  );
};
export const handelResponse = (res) => async (dispatch) => {
  let returnValue = null;
  const status = res?.status;
  switch (status) {
    case 200:
      returnValue = res;
      break;
    case 201:
      returnValue = res;
      break;
    case 400:
      // dispatch(throwError(res));
      returnValue = res;
      // returnValue = null;
      break;
    case 401:
      dispatch(handelLogout());
      break;
    case 403:
      dispatch(handelLogout());
      break;
    default:
      throwError({ message: "Something went wrong!" });
      returnValue = null;
      break;
  }

  return returnValue;
};
export const handelCatch = (error) => async (dispatch) => {
  let status = error?.response?.status;
  let message = error?.response?.data?.message;
  if (status === 401 || status === 403) {
    dispatch(handelLogout());
  } else {
    message = message || "Something went wrong!";
    dispatch(
      setApiError({
        show: true,
        message: message,
        type: "danger",
      })
    );
  }
  return null;
};

export const {
  setUserState,
  setApiError,
  setServicesCategoryList,
  setProvinceList,
  setAdminData,
  setBusinessList,
  setClientList,
  setCheckClientList,
  setBrandCategory,
  setDemographyList,
  // setFeaturesList,
  setBrandProductList,
  setStepThreeData,
  setFetchSubServiceType,
  setProductCategoryList,
  setBeauticianPhoneNumber,
  setSubAdminData,
  setIsSuccessPopup,
  setIsSuccessPasswordPopup,
  setPermissionsData,
  reset,
} = globalSlice.actions;

export default globalSlice.reducer;

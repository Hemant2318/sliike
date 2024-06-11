export const commonRoute = {
  login: "/login",
  subLogin: "/login/:secreat",
  cardList: "/card-list",

  //dashboard
  dashboard: "/dashboard",
  dashboardType: "/dashboard/:dType",
  pushNotification: "/dashboard/push-notification",
  newMessage: "/dashboard/push-notification/:mType",
  recentMessage: "/dashboard/push-notification/recent-message",

  usersJourney: "/dashboard/users-journey",
  usersJourneyDetail: "/dashboard/users-journey/details/:id",
  userData: "/dashboard/user-data",
  discount: "/dashboard/discount",
  newDiscount: "/dashboard/discount/:dType",
  newDiscountSummary: "/dashboard/discount/summary",
  recentDiscount: "/dashboard/discount/recent-discount",

  //beautician
  beauticians: "/beauticians",
  // beauticianDetails: "/beauticians/:id",
  beauticianDetails: "/beauticians/details/:id",
  beauticianDashboard: "/beauticians/beautician-dashboard/:id",
  registerBeautician: "/beauticians/register",
  editRegisterBeautician: "/beauticians/update/:bId",
  addBeautician: "/beauticians/add-beautician/:bId/:fType",
  approvalPage: "/beauticians/approval",
  archive: "/beauticians/archive",
  approvalDetail: "/beauticians/:type/:type",

  //client
  clients: "/clients",
  registerClient: "/clients/register",
  clientsArchived: "/clients/archive",
  clientDetails: "/clients/details/:id",

  //brand
  brands: "/brands",
  brandsDetails: "/brands/:id",
  addBrand: "/brands/add-brand/step-1",
  addBrandProduct: "/brands/add-brand/product/step-2/:id",
  brandProductStep2: "/brands/add-brand/product-list/step-2/:id",
  brandProductReviewList: "/brands/add-brand/product-list/review/step-3/:id",
  // addProduct: "/brands/add-product",

  //service
  services: "/services",
  servicesDetails: "/services/:id",
  servicesArchive: "/services/archive",

  //product
  products: "/products",
  productsArchive: "/products/archive",
  productsDetails: "/products/details/:id",

  //e-commerce
  eCommerce: "/e-commerce",
  eCommerceType: "/e-commerce/:eType",
  eComUserJourney: "/e-commerce/user-journey",
  eComUserJourneyDetails: "/e-commerce/user-journey/:id",
  eComUserData: "/e-commerce/users-data",
  productOrderData: "/e-commerce/product-order-data",
  productListData: "/e-commerce/product-list-data",

  //promotion
  promotions: "/promotions",
  addPromotion: "/promotions/add-promotions",
  addSummary: "/promotions/promotion-summary",

  //referrals
  referrals: "/referrals",
  recipient: "/referrals/recipient/:id",

  //gist
  cardPieChart: "/card-pie-chart",
  gist: "/gist",
  myGist: "/gist/my-gist",
  gistDetails: "/gist/:id",

  //admin
  admins: "/admins",
  addAdmin: "/admins/:type",
  // editAdmin: "/admins/:type/:id",
  myProfile: "/admins/profile-details/:id",
  changePassword: "/admins/change-password",
  adminArchive: "/admins/archive",

  //terms policy
  termsPolicy: "/terms-policy",

  //faq
  faq: "/faq",

  //feedback
  feedback: "/feedback",

  //contact us
  contactUs: "/contact-us",

  //more options
  moreOptions: "/more-options",
  moreOptionsType: "/more-options/:cType",
  serviceSubCategory: "/more-options/service-sub-category",
  brandCategory: "/more-options/brand-category",
  productCategory: "/more-options/product-category",
  province: "/more-options/province",
  demography: "/more-options/demography",
  hsRules: "/more-options/health-safety-rules",
  amenities: "/more-options/amenities",
};

import { useNavigate } from "react-router-dom";
import { commonRoute, icons } from "utils/constants";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Sidebar.scss";

const Sidebar = () => {
  const [showCardMenu, setShowCardMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showEcomMenu, setShowEcomMenu] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const { permissionsData } = useSelector((state) => ({
    permissionsData: state.global.permissionsData,
  }));

  const access = {
    dashboardMenu: permissionsData?.dashboardSettings?.[0]?.falsecount !== 3,
    beauticiansMenu: permissionsData?.beauticianSettings?.[0]?.falsecount !== 3,
    clientsMenu: permissionsData?.clientSettings?.[0]?.falsecount !== 3,
    brandsMenu: permissionsData?.brandSettings?.[0]?.falsecount !== 3,
    productsMenu: permissionsData?.productSettings?.[0]?.falsecount !== 3,
    promotionsMenu: permissionsData?.promotionSettings?.[0]?.falsecount !== 3,
    gistsMenu: permissionsData?.gistSettings?.[0]?.falsecount !== 3,
    adminsMenu: permissionsData?.adminSettings?.[0]?.falsecount !== 3,
  };

  const leftMenu = [
    {
      id: 1,
      title: "Dashboard",
      icon: icons.dashboardIcon,
      menuIcon: icons.arrowLeft,
      url: "/dashboard",
      // isTrue: true,
      isTrue: false,
      isViewOnly: access?.dashboardMenu,
      redirect: commonRoute.dashboard,
      // cardSubmenu: true,
      cardSubMenu: [
        {
          id: 1,
          title: "Dashboard",
          url: "/dashboard-view",
          redirect: `${commonRoute.dashboard}/dashboard-view`,
          cardSubMenuIcon: icons.tickCircleIcon,
          subTitle: "General dashboard metrics.",
        },
        {
          id: 1,
          title: "Push Notification",
          url: "/push-notification",
          redirect: commonRoute.pushNotification,
          cardSubMenuIcon: icons.tickCircleIcon,
          subTitle: "Send instant message all at once.",
        },
        {
          id: 1,
          title: "Quick Users Journey View",
          url: "/users-journey",
          redirect: commonRoute.usersJourney,
          cardSubMenuIcon: icons.tickCircleIcon,
          subTitle: "Track users progress.",
        },
        {
          id: 1,
          title: "User Data",
          url: "/user-data",
          redirect: commonRoute.userData,
          cardSubMenuIcon: icons.tickCircleIcon,
          subTitle: "Access all users data",
        },
        {
          id: 1,
          title: "Discount",
          url: "/discount",
          redirect: commonRoute.discount,
          cardSubMenuIcon: icons.tickCircleIcon,
          subTitle: "Assign discount in group or individually.",
        },
      ],
    },
    {
      id: 2,
      title: "Beauticians",
      icon: icons.beautician,
      url: "/beauticians",
      isTrue: false,
      isViewOnly: access?.beauticiansMenu,
      redirect: commonRoute.beauticians,
    },
    {
      id: 3,
      title: "Clients",
      icon: icons.people,
      url: "/clients",
      isTrue: false,
      isViewOnly: access?.clientsMenu,
      redirect: commonRoute.clients,
    },
    {
      id: 4,
      title: "Brands",
      icon: icons.brandsIcon,
      url: "/brands",
      isTrue: false,
      isViewOnly: access?.brandsMenu,
      redirect: commonRoute.brands,
    },
    {
      id: 5,
      title: "Services",
      icon: icons.services,
      url: "/services",
      isTrue: false,
      isViewOnly: true,
      redirect: commonRoute.services,
    },
    {
      id: 6,
      title: "Products",
      icon: icons.product,
      url: "/products",
      isTrue: false,
      isViewOnly: access?.productsMenu,

      redirect: commonRoute.products,
    },
    {
      id: 7,
      title: "Ecommerce",
      menuIcon: icons.arrowDown,
      menuOpenIcon: icons.arrowUp,
      // url: "/e-commerce",
      isTrue: false,
      isViewOnly: true,
      redirect: commonRoute.eCommerce,
      borderTopBottom: true,
      eComMenu: [
        {
          id: 1,
          title: "Overview",
          url: "/overview",
          redirect: `${commonRoute.eCommerce}/overview`,
        },
        {
          id: 1,
          title: "Users Journey",
          url: "/user-journey",
          redirect: commonRoute.eComUserJourney,
        },
        {
          id: 1,
          title: "Users Data",
          url: "/users-data",
          redirect: commonRoute.eComUserData,
        },
        {
          id: 1,
          title: "Product Order Data",
          url: "/product-order-data",
          redirect: commonRoute.productOrderData,
        },
        {
          id: 1,
          title: "Product List Data",
          url: "/product-list-data",
          redirect: commonRoute.productListData,
        },
      ],
    },
    {
      id: 8,
      title: "Promotions",
      icon: icons.promotion,
      url: "/promotions",
      isTrue: false,
      isViewOnly: access?.promotionsMenu,

      redirect: commonRoute.promotions,
    },
    {
      id: 9,
      title: "Referrals",
      icon: icons.referralIcon,
      url: "/referrals",
      isTrue: false,
      isViewOnly: true,
      redirect: commonRoute.referrals,
    },
    {
      id: 10,
      title: "Gist",
      icon: icons.gist,
      url: "/gist",
      isTrue: false,
      redirect: commonRoute.gist,
      isViewOnly: access?.gistsMenu,
    },
    {
      id: 11,
      title: "Admins",
      icon: icons.admin,
      url: "/admins",
      isTrue: false,
      isViewOnly: access?.adminsMenu,

      redirect: commonRoute.admins,
    },
    {
      id: 12,
      title: "Terms & Policy",
      icon: icons.policy,
      url: "/terms-policy",
      isTrue: false,
      isViewOnly: true,
      redirect: commonRoute.termsPolicy,
    },
    {
      id: 13,
      title: "FAQ",
      icon: icons.faq,
      url: "/faq",
      isTrue: false,
      isViewOnly: true,
      redirect: commonRoute.faq,
    },
    {
      id: 14,
      title: "Feedback",
      icon: icons.feedback,
      url: "/feedback",
      isTrue: false,
      isViewOnly: true,
      redirect: commonRoute.feedback,
    },
    {
      id: 15,
      title: "Contact Us",
      icon: icons.contactUs,
      url: "/contact-us",
      isTrue: false,
      isViewOnly: true,
      redirect: commonRoute.contactUs,
    },
    {
      id: 16,
      title: "More Options",
      icon: icons.moreOptions,
      url: "/more-options",
      isTrue: false,
      isViewOnly: true,
      redirect: commonRoute.moreOptions,
      subMenu: [
        {
          id: 1,
          title: "Service Category",
          url: "/service-category",
          redirect: `${commonRoute.moreOptions}/service-category`,
        },
        {
          id: 1,
          title: "Service Sub-Category",
          url: "/service-sub-category",
          redirect: commonRoute.serviceSubCategory,
        },
        {
          id: 1,
          title: "Brand Category",
          url: "/brand-category",
          redirect: commonRoute.brandCategory,
        },
        {
          id: 1,
          title: "Product Category",
          url: "/product-category",
          redirect: commonRoute.productCategory,
        },
        {
          id: 1,
          title: "Province Tax",
          url: "/province",
          redirect: commonRoute.province,
        },
        {
          id: 1,
          title: "Demography",
          url: "/demography",
          redirect: commonRoute.demography,
        },
        {
          id: 1,
          title: "H&S Rules",
          url: "/health-safety-rules",
          redirect: commonRoute.hsRules,
        },
        {
          id: 1,
          title: "Amenities",
          url: "/amenities",
          redirect: commonRoute.amenities,
        },
      ],
    },
  ];

  const handleClickOutside = (e) => {
    if (ref && ref?.current && !ref.current.contains(e.target)) {
      setShowCardMenu(false);
    }
    if (e?.target?.id === "Dashboard") {
      setShowCardMenu(!showCardMenu);
    }
    if (e.target?.id === "More Options") {
      setShowSubMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <div id="left-side-block">
      <div className="top-icon-block">
        <img src={icons.Sliikelogo4} alt="icon" />
      </div>
      <div className="menu-list-container d-flex flex-column gap-3">
        {leftMenu?.map((elem, index) => {
          const {
            url,
            title,
            icon,
            borderTopBottom,
            menuIcon,
            redirect,
            subMenu,
            cardSubMenu,
            eComMenu,
            menuOpenIcon,
            isViewOnly,
          } = elem;
          /* const isActive =
            url === `/${window.location.pathname?.split("/")[1]}`; */

          return (
            <React.Fragment key={index}>
              <div
                className={
                  isViewOnly
                    ? `${`menu-list-item ${
                        showEcomMenu
                          ? borderTopBottom && "unset-eCom-border-bottom"
                          : borderTopBottom && "border-top-bottom"
                      } ${
                        window.location.pathname.includes(url)
                          ? "active-menu-item"
                          : "inactive-menu-item"
                      }`}`
                    : "d-none"
                }
                key={index}
                onClick={(e) => {
                  if (cardSubMenu) {
                  } else if (subMenu) {
                    setShowSubMenu(true);
                  } else if (eComMenu) {
                    setShowEcomMenu(!showEcomMenu);
                  } else {
                    navigate(isViewOnly && redirect);
                  }
                }}
              >
                {icon && (
                  <span>
                    <img src={icon} alt="icon" className="menuIcon" />
                  </span>
                )}
                <span id={title}>{title}</span>
                {menuIcon && (
                  <span>
                    <img
                      src={`${
                        showEcomMenu
                          ? menuOpenIcon
                            ? menuOpenIcon
                            : menuIcon
                          : menuIcon
                      }`}
                      alt="icon"
                      className="rightMenuIcon"
                    />
                  </span>
                )}
              </div>

              {/*for eCommerce sub menu*/}
              {showEcomMenu && eComMenu && (
                <div className={showEcomMenu && "eCom-border-bottom"} ref={ref}>
                  {eComMenu?.map((eElem, eIndex) => {
                    return (
                      <div
                        ref={ref}
                        key={eIndex}
                        className={`eCom-sub-menu-item ${
                          window.location.pathname.includes(eElem?.url)
                            ? "active-eCom-sub-menu-item"
                            : "inactive-sub-menu-item"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!window.location.pathname.includes(eElem?.url)) {
                            navigate(eElem?.redirect);
                          }
                        }}
                      >
                        {eElem?.title}
                      </div>
                    );
                  })}
                </div>
              )}

              {/*for dashboard submenu*/}
              {showCardMenu && cardSubMenu && (
                <div className="cardSubMenu-item-container" ref={ref}>
                  {cardSubMenu?.map((cElem, cIndex) => {
                    return (
                      <div
                        href={cElem?.href}
                        key={cIndex}
                        className={`cardSubMenu-item ${
                          window.location.pathname.includes(cElem?.url)
                            ? "active-cardSubMenu-item"
                            : "inactive-cardSubMenu-item"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!window.location.pathname.includes(cElem?.url)) {
                            navigate(cElem?.redirect);
                          }
                        }}
                      >
                        <div>
                          <div>{cElem?.title}</div>
                          <div className="text-13-500-21 color-black-60">
                            {cElem?.subTitle}
                          </div>
                        </div>
                        {window.location.pathname.includes(cElem?.url) && (
                          <div>
                            <img
                              src={cElem?.cardSubMenuIcon}
                              alt="icon"
                              className="rightMenuIcon"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {showSubMenu && subMenu?.length > 0 && (
                <div className="">
                  {subMenu?.map((cElem, cIndex) => {
                    return (
                      <div
                        href={cElem?.href}
                        key={cIndex}
                        className={`sub-menu-item ${
                          window.location.pathname.includes(cElem?.url)
                            ? "active-sub-menu-item"
                            : "inactive-sub-menu-item"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!window.location.pathname.includes(cElem?.url)) {
                            navigate(cElem?.redirect);
                          }
                        }}
                      >
                        {cElem?.title}
                      </div>
                    );
                  })}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
    // <div id="left-side-block">
    //   <div className="top-icon-block">
    //     <img src={icons.Sliikelogo4} alt="icon" />
    //   </div>
    //   <div className="menu-list-container d-flex flex-column gap-3">
    //     {leftMenu.map((elem, index) => {
    //       const { url, title, icon, menuIcon, redirect, subMenu } = elem;
    //       const isActive =
    //         url === `/${window.location.pathname?.split("/")[1]}`;

    //       return (
    //         <React.Fragment key={index}>
    //           <div
    //             className={`menu-list-item ${
    //               window.location.pathname.includes(url)
    //                 ? "active-menu-item"
    //                 : "inactive-menu-item"
    //             }`}
    //             key={index}
    //             onClick={() => {
    //               navigate(redirect);
    //             }}
    //           >
    //             <span>
    //               <img src={icon} alt="icon" className="menuIcon" />
    //             </span>
    //             <span>{title}</span>
    //             {menuIcon && (
    //               <span>
    //                 <img src={menuIcon} alt="icon" className="rightMenuIcon" />
    //               </span>
    //             )}
    //           </div>
    //           {isActive && subMenu?.length > 0 && (
    //             <div className="">
    //               {subMenu?.map((cElem, cIndex) => {
    //                 return (
    //                   <div
    //                     href={cElem?.href}
    //                     key={cIndex}
    //                     className={`sub-menu-item ${
    //                       window.location.pathname.includes(cElem?.url)
    //                         ? "active-sub-menu-item"
    //                         : "inactive-sub-menu-item"
    //                     }`}
    //                     onClick={(e) => {
    //                       e.preventDefault();
    //                       e.stopPropagation();
    //                       if (!window.location.pathname.includes(cElem?.url)) {
    //                         navigate(cElem?.redirect);
    //                       }
    //                     }}
    //                   >
    //                     {cElem?.title}
    //                   </div>
    //                 );
    //               })}
    //             </div>
    //           )}
    //         </React.Fragment>
    //       );
    //     })}
    //   </div>
    // </div>
  );
};
export default Sidebar;

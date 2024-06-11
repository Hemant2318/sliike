import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import RecommendContainer from "components/layouts/RecommendContainer/RecommendContainer";
import Table from "components/layouts/Table/Table";
import UserProfileLayout from "components/layouts/UserProfileLayout/UserProfileLayout";
import moment from "moment";
import React from "react";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { icons } from "utils/constants";
import { titleCaseString } from "utils/helpers";
import BootrsapTable from "react-bootstrap/Table";
import ItemsTable from "./ItemsTable";

//create style for pdf
const styles = StyleSheet.create({
  //   page: {
  //     flexDirection: "row",
  //     backgroundColor: "#E4E4E4",
  //   },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  row: {
    display: "flex",
    gap: "15px",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  columnBlock: {
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "27px",
    textAlign: "left",
    verticalAlign: "middle",
  },
  rowBlock: {
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "27px",
    textAlign: "left",
    verticalAlign: "middle",
  },
  // So Declarative and unDRY 👌
});

const MyDocument = ({ tableData }) => {
  const header = [
    {
      title: "Business Name",
    },
    {
      title: "Address",
    },
    // {
    //   title: "Working Days",
    // },
    {
      title: "Recommend",
    },
    {
      title: "Status",
    },
    {
      title: "Business Setup Level",
    },
    {
      title: "Profile Completion",
    },
  ];
  //   const rowData = [];
  //   tableData?.data?.forEach((elem) => {
  //     const {
  //       profileImage,
  //       businessName,
  //       _id,
  //       uid,
  //       address,
  //       // userDetails,
  //       workHours,
  //       isRecommended,
  //       status,
  //       screenStatus,
  //       // isActiveBeautician,
  //     } = elem;
  //     // const status = userDetails?.isActiveBeautician;
  //     const currentDay = moment().format("dddd");
  //     const currentDayTime = workHours?.dayDetails?.find(
  //       (o) => o.day === currentDay
  //     );

  //     const profileCompletion = ((screenStatus * 100 * 100) / 700).toFixed();

  //     let obj = [
  //       {
  //         value: businessName,
  //       },
  //     ];
  //     rowData.push({ data: obj });
  //   });

  //   console.log("tabledate", tableData);

  const rowData = [];
  tableData?.data?.forEach((elem) => {
    const {
      profileImage,
      businessName,
      _id,
      uid,
      address,
      // userDetails,
      workHours,
      isRecommended,
      status,
      screenStatus,
      // isActiveBeautician,
    } = elem;
    // const status = userDetails?.isActiveBeautician;
    const currentDay = moment().format("dddd");
    const currentDayTime = workHours?.dayDetails?.find(
      (o) => o.day === currentDay
    );

    const profileCompletion = ((screenStatus * 100 * 100) / 700).toFixed();

    let obj = [
      {
        value: (
          <div className="text-start d-flex align-items-center gap-2 pointer">
            <div className="d-flex gap-2">
              {/* <RoundCheckBox id={elem?._id} /> */}
              <UserProfileLayout
                isRounded
                // text={businessName ? `${businessName}` : "Business Name"}
                url={profileImage}
                size="40"
              />
            </div>
            <div
            //   onClick={() => {
            //     navigate(`/beauticians/details/${_id}`);
            //   }}
            >
              <div className="text-13-500-21 color-black-100">
                {businessName
                  ? titleCaseString(`${businessName}`)
                  : "Business Name"}
              </div>
              <div className="text-13-400 color-black-60 text-nowrap">
                ID: {uid}
              </div>
            </div>
          </div>
        ),
      },
      {
        value: (
          <div className="text-13-500 color-black-100">
            <div className="">
              {address ? address?.address : "-"}
              {/* {country} */}
            </div>
          </div>
        ),
      },
      {
        value: (
          <div className="d-flex">
            {workHours ? (
              <div className="d-flex text-13-500 color-black-20 gap-2 text-nowrap">
                <div className="color-black-80">{currentDay}</div>
                {workHours && (
                  <div className="color-black-100">
                    |{" "}
                    {currentDayTime?.isOpen === false
                      ? "Closed"
                      : `${currentDayTime?.startTime} ${
                          currentDayTime?.startTime &&
                          currentDayTime?.endTime &&
                          " - "
                        } ${currentDayTime?.endTime}`}
                  </div>
                )}
                <Dropdown align="start">
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <img src={icons.downArrow} alt="dwn-arrow" />
                  </Dropdown.Toggle>
                  <DropdownMenu>
                    {workHours?.dayDetails.map((elm, i) => {
                      const { day, startTime, endTime, isOpen } = elm;
                      return (
                        <DropdownItem className="">
                          <div
                            className="d-flex justify-content-between text-13-500 color-black-20 gap-2"
                            key={i}
                          >
                            <div className="color-black-80 w-50">{day}</div>

                            <div className="">
                              {(startTime || endTime || isOpen === false) &&
                                "|"}
                            </div>
                            <div className="color-black-100">
                              {isOpen === false
                                ? "Closed"
                                : `${startTime} ${
                                    startTime && endTime && " - "
                                  } ${endTime}`}
                              {/* {startTime}
                            {startTime && endTime && " - "}
                            {endTime} */}
                            </div>
                          </div>
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              "-"
            )}
          </div>
        ),
      },
      {
        value: (
          <div className="d-flex gap-2">
            <span className="text-13-500 color-black-100">
              {isRecommended === 1 ? "Yes" : "No"}
            </span>
          </div>
        ),
      },
      {
        value: (
          <div className="d-flex gap-2">
            <span className="text-13-500 color-black-100">
              {status === 1 ? "Active" : "Inactive"}
            </span>
          </div>
        ),
      },
      {
        value: (
          <div className="d-flex">
            {screenStatus ? `${screenStatus}/7` : "-"}
          </div>
        ),
      },
      {
        value: <div>{profileCompletion && `${profileCompletion}%`}</div>,
      },
    ];
    rowData.push({ data: obj });
  });

  return (
    <Document>
      <Page orientation="landscape">
        <View style={styles.table}>
          <View style={[styles.row, styles.bold, styles.header]}>
            {header?.map((elem, index) => {
              return (
                <Text className="pe-4" key={index} style={styles.columnBlock}>
                  {elem?.title}
                </Text>
              );
            })}
          </View>

          {/* {rowData?.map((dataElem, dataIndex) => {
            return (
              <View style={styles.row} wrap={false}>
                <Text className="pe-4" key={dataIndex}>
                  {dataElem?.data?.map((dataEl, dataIn) => {
                    console.log("dataEl", dataEl);

                    return (
                      <Text key={dataIn} style={styles.rowBlock}>
                        {dataEl?.value}
                      </Text>
                    );
                  })}
                </Text>
              </View>
            );
          })} */}
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;

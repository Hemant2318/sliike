// import Button from "components/form/Button/Button";
// import Table from "components/layouts/Table/Table";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { titleCaseString } from "utils/helpers";

// const UsersJourneyTable = ({
//   userType,
//   tableData,
//   setTableData,
//   handleSuccess,
// }) => {
//   // console.log(
//   //   "🚀 ~ file: UsersJourneyTable.jsx:7 ~ UsersJourneyTable ~ tableData:",
//   //   tableData
//   // );
//   const navigate = useNavigate();
//   const header = [
//     {
//       title: (
//         <div className="text-nowrap color-dashboard-primary">
//           {tableData?.type === "Beautician" ? "Beautician" : "Client"}
//         </div>
//       ),
//     },
//     {
//       title: <div className="text-nowrap color-dashboard-primary">Status</div>,
//     },
//     {
//       title: (
//         <div className="text-nowrap color-dashboard-primary d-flex justify-content-end">
//           Action
//         </div>
//       ),
//     },
//   ];

//   const rowData = [];
//   tableData?.data?.forEach((elem) => {
//     // console.log(
//     //   "🚀 ~ file: UsersJourneyTable.jsx:34 ~ tableData?.data?.forEach ~ elem:",
//     //   elem
//     // );
//     const {
//       businessName,
//       uid,
//       stripe_id,
//       serviceCount,
//       screenStatus,
//       isLicensed,
//       taxProvinceDetails,
//       countInvitaion,
//     } = elem;

//     const businessDetails = screenStatus >= 4 ? 14.3 : 0;

//     const businessHours = screenStatus === 7 ? 14.3 : 0;

//     const license = isLicensed === 1 ? 14.3 : 0;

//     const services = serviceCount >= 3 ? 14.3 : 0;

//     const bankDetails = stripe_id !== null ? 14.3 : 0;

//     const importCount = countInvitaion === 1 ? 14.3 : 0;

//     const serviceTax = taxProvinceDetails !== null ? 14.3 : 0;

//     const status =
//       businessDetails +
//       businessHours +
//       license +
//       services +
//       bankDetails +
//       importCount +
//       serviceTax;
//     console.log(
//       "🚀 ~ file: UsersJourneyTable.jsx:63 ~ tableData?.data?.forEach ~ status:",
//       Math.round(status.toFixed(2))
//     );

//     let obj = [
//       {
//         value: (
//           <div className="text-nowrap">
//             <div className="text-13-500-21 color-black-100">
//               {businessName ? titleCaseString(businessName) : "Business Name"}
//             </div>
//             <div className="text-11-500 color-blue-60">{uid}</div>
//           </div>
//         ),
//       },
//       {
//         value: (
//           <div className="text-nowrap d-flex gap-2">
//             <div className="text-15-700 color-black-80">{`${Math.round(
//               status.toFixed(2)
//             )}%`}</div>
//             <div className="text-15-500 color-black-60">Progress</div>
//           </div>
//         ),
//       },
//       {
//         value: (
//           <div className="d-flex justify-content-end">
//             <Button
//               btnText="View Details"
//               btnStyle="BLB"
//               className="h-100 cpt-6 cpb-6 cps-12 cpe-12"
//               onClick={() => {
//                 // navigate(`/dashboard/users-journey/details/${id}`);
//               }}
//             />
//           </div>
//         ),
//       },
//     ];
//     rowData.push({ data: obj });
//   });

//   return (
//     <div className="overflow-auto">
//       <Table
//         header={header}
//         rowData={rowData}
//         tableData={tableData}
//         isLoading={tableData?.loading}
//         changeOffset={(newOffset, newLimit = tableData.limit) => {
//           let oldData = {
//             ...tableData,
//             offset: newOffset,
//             limit: newLimit,
//             loading: true,
//           };
//           setTableData(oldData);
//           handleSuccess(oldData);
//         }}
//         isPagination
//       />
//     </div>
//   );
// };

// export default UsersJourneyTable;

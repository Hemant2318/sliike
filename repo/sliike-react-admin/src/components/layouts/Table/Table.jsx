import React from "react";
import BootrsapTable from "react-bootstrap/Table";
import { Dropdown } from "react-bootstrap";
import Loader from "../Loader";
import "./Table.scss";

const Table = ({
  header,
  rowData,
  changeOffset,
  isLoading,
  tableData,
  isPagination,
  // isSearch,
  searchLabel,
  searchInputChange,
  searchText,
  tHead,
  clickedCellIndex,
  onCellClick,
  isClick,
}) => {
  // const [timer, setTimer] = useState("");
  // const [searchValue, setSearchValue] = useState(searchText);
  // const handelChangeInput = (e) => {
  //   let value = e.target.value;
  //   setSearchValue(value);
  //   let time = timer;
  //   clearTimeout(time);
  //   time = setTimeout(() => {
  //     searchInputChange(value);
  //   }, 800);
  //   setTimer(time);
  // };

  //new code
  const { total, offset, limit, intervalLimit } = tableData || {};
  // console.log({ total: total }, { offset: offset }, { limit: limit });
  const totalPage = Math.ceil(total / limit);
  const totalPage2 = Math.ceil(total / intervalLimit);

  // console.log("total limit", total, limit);

  // console.log("totalPage", totalPage);
  // const activePage = offset / limit + 1;
  // const activePage = offset / limit + 1;
  const activePage = offset / limit + 1;
  // console.log("limit", limit);
  // console.log("offset", offset);

  // console.log("activePage", activePage);
  // console.log("activePage ceil", Math.ceil(activePage));

  // let paginateArray = [];
  // let activePaginate = "";
  // Array.from({ length: totalPage }).forEach((_, i) => {
  //   let num = i + 1;
  //   let last = limit * num;
  //   let first = last - limit + 1;
  //   last = last < total ? last : total;
  //   if (activePage === i + 1) {
  //     activePaginate = `${first} - ${last}`;
  //   }
  //   paginateArray.push({ label: `${first} - ${last}`, page: first - 1 });
  // });
  // console.log("totalPage2", totalPage2);
  let paginate = [];
  Array.from({ length: totalPage2 }).forEach((_, i) => {
    let num = i + 1;
    paginate.push(num * intervalLimit);
  });

  //old code
  // const { total, offset, limit } = tableData || {};
  // const totalPage = Math.ceil(total / limit);
  // const activePage = offset / limit + 1;
  // let paginateArray = [];
  // let activePaginate = "";
  // Array.from({ length: totalPage }).forEach((_, i) => {
  //   let num = i + 1;
  //   let last = limit * num;
  //   let first = last - limit + 1;
  //   last = last < total ? last : total;
  //   if (activePage === i + 1) {
  //     activePaginate = `${first} - ${last}`;
  //   }
  //   paginateArray.push({ label: `${first} - ${last}`, page: first - 1 });
  // });
  return (
    <div id="table-container" className="iferp-scroll">
      {/* {isSearch && (
        <div className="mb-3 ms-2 col-md-3">
          <SearchInput
            placeholder={searchLabel || "Search..."}
            value={searchValue}
            onChange={handelChangeInput}
          />
        </div>
      )} */}
      <BootrsapTable>
        <thead className="table-header-container">
          <tr className="header-container">
            {header?.map((elem, index) => {
              return (
                <th key={index} className={tHead ? tHead : "column-block pe-4"}>
                  {elem?.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="table-body-container">
          {isLoading && (
            <tr className="loader-row">
              <td
                colSpan={header?.length}
                className="loader-cell text-center color-gray"
              >
                <Loader />
              </td>
            </tr>
          )}
          {!isLoading && (
            <>
              {rowData?.length === 0 ? (
                <tr className="no-record-found-row">
                  <td
                    colSpan={header?.length}
                    className="no-record-found-cell text-center color-gray"
                  >
                    No Records Found.
                  </td>
                </tr>
              ) : (
                rowData?.map((elem, index) => {
                  return (
                    <tr key={index} className="row-container">
                      {elem?.data?.map((cell, cellIndex) => {
                        return (
                          <td
                            key={cellIndex}
                            onClick={() =>
                              isClick &&
                              onCellClick(
                                index * elem?.data?.length + cellIndex
                              )
                            }
                            // className="row-block pe-4"
                            className={
                              clickedCellIndex ===
                              index * elem?.data?.length + cellIndex
                                ? "row-block pe-4 open"
                                : "row-block pe-4"
                            }
                          >
                            {cell?.value}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </>
          )}
        </tbody>
      </BootrsapTable>
      {rowData?.length > 0 && !isLoading && isPagination && (
        <div className="table-paginate">
          <div className="cms-24 pt-2 pb-1 d-flex align-items-center">
            <span className="text-13-500 color-dashboard-primary">
              Results:
            </span>
            <span className="page-drop ms-2 h-auto">
              <Dropdown align="bottom">
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  <span className="text-13-500">{limit}</span>
                  {/* <span className="text-13-500">{activePaginate}</span> */}
                  <span className="text-13-500">
                    <i className="bi bi-caret-down-fill pointer ms-2" />
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{
                    minWidth: "80px",
                  }}
                >
                  {paginate?.map((el, index) => {
                    return (
                      <Dropdown.Item
                        href=""
                        className="d-flex align-items-center gap-2 mb-1"
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          if (el?.label !== limit) {
                            changeOffset(0, el);
                          }
                        }}
                      >
                        <span className="mt-1 text-13-500">{el}</span>
                      </Dropdown.Item>
                    );
                  })}
                  {/* {paginateArray?.map((el, index) => {
                    return (
                      <Dropdown.Item
                        href=""
                        className="d-flex align-items-center gap-2 mb-1"
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          if (el.label !== activePaginate) {
                            changeOffset(0, el.page);
                          }
                        }}
                      >
                        <span className="mt-1 text-13-500">{el.label}</span>
                      </Dropdown.Item>
                    );
                  })} */}
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
          <div className="d-flex align-items-center gap-3 cme-30">
            <span
              className={activePage === 1 ? "inactive-link" : "active-link"}
              onClick={() => {
                if (activePage !== 1) {
                  changeOffset(tableData?.offset - tableData?.limit);
                }
              }}
            >
              Prev
            </span>
            {/* <span className="page-no">
                  {console.log("span activePage", activePage)}
                </span> */}

            <span className="page-no">{activePage}</span>
            <span
              className={
                activePage === totalPage ? "inactive-link" : "active-link"
              }
              onClick={() => {
                if (activePage !== totalPage) {
                  changeOffset(tableData?.offset + tableData?.limit);
                }
              }}
            >
              Next
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Table;

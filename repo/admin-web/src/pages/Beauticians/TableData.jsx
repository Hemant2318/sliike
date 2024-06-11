import RoundCheckBox from "components/form/RoundCheckBox";
import SwitchBox from "components/form/SwitchBox";
import React from "react";
import { Dropdown, Table } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { icons } from "utils/constants";

const TableData = ({ data, handelActiveInactive }) => {
  return (
    <div>
      <div className="table-container" style={{ overflowX: "auto" }}>
        <Table responsive className="table">
          <thead className="">
            <tr className="text-13-600 bg-blue-5 color-dashboard-primary">
              <th>Business Name</th>
              <th>Address</th>
              <th>Working Days/Hours</th>
              <th>Status</th>
              <th>Business Setup Level</th>
            </tr>
          </thead>
          <tbody>
            {data.map((elem, index) => {
              const {
                img,
                name,
                id,
                address,
                addressState,
                addressCountry,
                workingDay,
                workingHours,
                status,
                setupLevel,
              } = elem;
              return (
                <tr style={{ backgroundColor: "white" }} key={index}>
                  <td>
                    <div className="d-flex gap-1">
                      <span>
                        <RoundCheckBox />
                      </span>
                      <img
                        src={img}
                        alt="profile-logo"
                        className="user-profile"
                      />
                      <div>
                        <div className="text-13-500 color-black-100">
                          {name}
                        </div>
                        <div className="text-11-500 color-blue-60">{id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-13-500 color-black-100 text-wrap">
                      <div>{address}</div>
                      <div>{addressState}</div>
                      <div>{addressCountry}</div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex">
                      <div className="d-flex text-13-500 color-black-20 gap-2">
                        <div className="color-black-80">{workingDay}</div> |
                        <div className="color-black-100">{workingHours}</div>
                        <Dropdown align="end">
                          <Dropdown.Toggle variant="" id="dropdown-basic">
                            <img src={icons.downArrow} alt="dwn-arrow" />
                          </Dropdown.Toggle>
                          <DropdownMenu>
                            <DropdownItem>
                              <div className="d-flex text-13-500 color-black-20 gap-2">
                                <div className="color-black-80">Monday</div> |
                                <div className="color-black-100">
                                  9:00 - 17:00
                                </div>
                              </div>
                            </DropdownItem>
                            <DropdownItem>
                              <div className="d-flex text-13-500 color-black-20 gap-2">
                                <div className="color-black-80">Tuesday</div> |
                                <div className="color-black-100">
                                  9:00 - 17:00
                                </div>
                              </div>
                            </DropdownItem>
                            <DropdownItem>
                              <div className="d-flex text-13-500 color-black-20 gap-2">
                                <div className="color-black-80">Wednesday</div>{" "}
                                |
                                <div className="color-black-100">
                                  9:00 - 17:00
                                </div>
                              </div>
                            </DropdownItem>
                            <DropdownItem>
                              <div className="d-flex text-13-500 color-black-20 gap-2">
                                <div className="color-black-80">Thursday</div> |
                                <div className="color-black-100">
                                  9:00 - 17:00
                                </div>
                              </div>
                            </DropdownItem>
                            <DropdownItem>
                              <div className="d-flex text-13-500 color-black-20 gap-2">
                                <div className="color-black-80">Friday</div> |
                                <div className="color-black-100">
                                  9:00 - 17:00
                                </div>
                              </div>
                            </DropdownItem>
                            <DropdownItem>
                              <div className="d-flex text-13-500 color-black-20 gap-2">
                                <div className="color-black-80">Saturday</div> |
                                <div className="color-black-100">Closed</div>
                              </div>
                            </DropdownItem>
                            <DropdownItem>
                              <div className="d-flex text-13-500 color-black-20 gap-2">
                                <div className="color-black-80">Sunday</div> |
                                <div className="color-black-100">Closed</div>
                              </div>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <span className="text-13-500 color-black-100">
                        {status ? "Active" : "Inactive"}
                      </span>
                      <span>
                        <SwitchBox
                          checked={status}
                          onChange={() => {
                            handelActiveInactive(elem);
                            // console.log(elem);
                          }}
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="text-13-500 color-black-100">
                      {setupLevel}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TableData;

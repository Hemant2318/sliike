import { icons } from "utils/constants";
import Table from "components/layouts/Table/Table";
import RoundCheckBox from "components/form/RoundCheckBox/RoundCheckBox";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import Button from "components/form/Button/Button";
import "./ApprovalPage.scss";
import { useNavigate } from "react-router-dom";

const ApprovalPage = () => {
  const navigate = useNavigate();
  const beauticiansData = [
    {
      img: icons.unApproveB1,
      name: "Queens Beauty Place",
      id: "ID: SLKB0000001+",
      address: "Route Du 3e-",
      addressState: "rang,Collingwood, qc,",
      addressCountry: "Canada",
      workingDay: "Monday",
      workingHours: "9:00 - 17:00",
      status: 1,
    },
    {
      img: icons.unApproveB2,
      name: "Queens Beauty Place",
      id: "ID: SLKB0000002+",
      address: "Route Du 3e-",
      addressState: "rang,Collingwood, qc,",
      addressCountry: "Canada",
      workingDay: "Monday",
      workingHours: "9:00 - 17:00",
      status: 1,
    },
  ];

  const header = [
    {
      title: "Business Name",
    },
    {
      title: "Address",
    },
    {
      title: "Working Days/Hours",
    },
    {
      title: "Status",
    },
    {
      title: "Action",
    },
  ];

  const rowData = [];
  beauticiansData.forEach((elem, index) => {
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
    } = elem;
    let obj = [
      {
        value: (
          <div className="d-flex gap-1">
            <span>
              <RoundCheckBox />
            </span>
            <img src={img} alt="profile-logo" className="user-profile" />
            <div>
              <div className="text-13-500 color-black-100">{name}</div>
              <div className="text-11-500 color-blue-60">{id}</div>
            </div>
          </div>
        ),
      },
      {
        value: (
          <div className="text-13-500 color-black-100 text-nowrap">
            <div>
              {address}
              {addressState}
            </div>
            <div>{addressCountry}</div>
          </div>
        ),
      },
      {
        value: (
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
                      <div className="color-black-100">9:00 - 17:00</div>
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="d-flex text-13-500 color-black-20 gap-2">
                      <div className="color-black-80">Tuesday</div> |
                      <div className="color-black-100">9:00 - 17:00</div>
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="d-flex text-13-500 color-black-20 gap-2">
                      <div className="color-black-80">Wednesday</div> |
                      <div className="color-black-100">9:00 - 17:00</div>
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="d-flex text-13-500 color-black-20 gap-2">
                      <div className="color-black-80">Thursday</div> |
                      <div className="color-black-100">9:00 - 17:00</div>
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="d-flex text-13-500 color-black-20 gap-2">
                      <div className="color-black-80">Friday</div> |
                      <div className="color-black-100">9:00 - 17:00</div>
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
        ),
      },
      {
        value: (
          <div className="text-13-500 color-blue text-nowrap">
            {status === 0 ? "Approved" : "Unapproved"}
          </div>
        ),
      },
      {
        value: (
          <div>
            <Button
              btnText="More Details"
              btnStyle="PD"
              onClick={() => {
                navigate("/beauticians/approval/details");
              }}
            />
          </div>
        ),
      },
    ];
    rowData.push({ data: obj });
  });
  return (
    <div className="approval-container">
      <div className="heading-section cmb-40 cps-24 cpt-24 cpe-24">
        <div className="text-20-700 color-black-100">Approval Page</div>
        <div className="desc-block text-15-500 color-dashboard-primary d-flex text-break cps-16 cpt-12 cpb-12 cpe-16">
          Approve beauticians to enable them to be visible to clients on
          Sliike’s client app.
        </div>
      </div>

      {/* <TableData data={beauticiansData} /> */}
      <Table header={header} rowData={rowData} />
    </div>
  );
};

export default ApprovalPage;

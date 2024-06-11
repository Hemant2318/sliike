import Button from "components/form/Button/Button";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { CSVLink } from "react-csv";
import "./ReportDownloadButton.scss";
import { useState } from "react";

const ReportDownloadButton = ({
  pdfFile,
  data,
  headers,
  filename,
  btnStyle,
  iconType,
  btnText,
  checkUser,
  setCheckUser,
  isCheck,
  // isLoading,
}) => {
  // let styleObject = {
  //   DD: "disabled-dark",
  //   BDD: "black-disabled-dark",
  //   PD: "primary-dark",
  //   PO: "primary-outline",
  //   PLO: "primary-lignt-outline",
  //   BO: "black-outline",
  //   DO: "delete-orange",
  //   GO: "gray-outline",
  //   BD: "blue-dark",
  //   PW: "primary-white",
  // };
  // let newBtnSrtyle = styleObject[btnStyle] || "disabled-dark";
  return (
    <div id="report-download-button">
      <Dropdown align="end">
        <Dropdown.Toggle variant="" id="dropdown-basic">
          <Button iconType={iconType} btnText={btnText} btnStyle={btnStyle} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <CSVLink
            headers={headers}
            data={data}
            filename={filename}
            className="text-decoration-none pointer"
            onClick={() => {
              if (isCheck) {
                setTimeout(() => {
                  setCheckUser([]);
                }, 1000);
              }
            }}
          >
            <Button
              btnText="Excel File"
              btnStyle="PW"
              className="text-15-500"
            />
          </CSVLink>

          <Button
            btnText="PDF File"
            btnStyle="PW"
            onClick={() => {
              pdfFile();
              if (isCheck) {
                setCheckUser([]);
              }
            }}
            className="text-15-500"
          />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ReportDownloadButton;

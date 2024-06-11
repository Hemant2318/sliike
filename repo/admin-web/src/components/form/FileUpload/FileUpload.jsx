import { useEffect, useState } from "react";
import Label from "../LabelText";
import "./FileUpload.scss";

const FileUpload = ({
  error,
  onChange,
  id,
  fileText,
  disabled,
  label,
  required,
  labelClass,
}) => {
  const [fileName, setFileName] = useState("");

  // const getBase64 = (file, res) => {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     res(reader.result);
  //   };
  //   reader.onerror = function (error) {
  //     console.log("Error: ", error);
  //   };
  // };
  const handelOnChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({ target: { id: id, value: file, fileName: file["name"] } });
      // getBase64(file, (result) => {
      //   setFileName(file["name"]);
      //   onChange({ target: { id: id, value: result, fileName: file["name"] } });
      // });
    }
  };
  useEffect(() => {
    setFileName(fileText);
  }, [fileText]);

  return (
    <div id="file-upload-container">
      {label && (
        <Label label={label} required={required} className={labelClass} />
      )}
      <div
        className={`file-upload-data ${disabled ? " disabled-file-block" : ""}`}
      >
        <div className="file-upload-block">
          <span className="file-upload-input">
            <div className="choose_file">
              <span className="btn-block pointer">
                <span className="me-2">
                  <i className="bi bi-upload" />
                </span>
                <span>Upload</span>
              </span>
              <input
                name="Select File"
                type="file"
                onChange={handelOnChange}
                accept="image/png, image/jpeg, image/jpg, application/pdf"
                // multiple
                multiple
              />
            </div>
          </span>
          <span className="file-upload-name">{fileName}</span>
        </div>
      </div>
      {error && (
        <div className="text-13-500 pt-1">
          <span style={{ color: "red" }}>{error}</span>
        </div>
      )}
    </div>
  );
};
export default FileUpload;

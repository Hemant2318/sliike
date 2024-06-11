import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { icons } from "utils/constants";

const LicensePopup = ({ onHide, imag }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const downloadImage = () => {
    fetch(imag)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary anchor element

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;

        // Extract the filename from the URL

        // const filename = imag.substring(imag.lastIndexOf("/") + 1);
        const fileExtension = imag.substring(imag.lastIndexOf(".") + 1);
        const filename = `License.${fileExtension}`;

        // Set the download attribute and filename
        link.setAttribute("download", filename);
        document.body.appendChild(link);

        // Simulate a click on the anchor element to start the download
        link.click();

        // Clean up the temporary anchor element
        link.parentNode.removeChild(link);

        // Set the downloaded image URL to display on the page
        setImageUrl(url);
      })
      .catch((error) => {
        // console.error("Error downloading image:", error);
      });
  };

  return (
    <Modal
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-567"
      centered
      show
    >
      <Modal.Body className="cps-40 cpe-40 cpt-40 cpb-40">
        <div className="d-flex justify-content-end cmb-20">
          <img
            src={icons.closeSquare}
            alt="close"
            className="pointer"
            onClick={onHide}
          />
        </div>
        <div className="cmb-20" style={{ maxHeight: "344px" }}>
          <img
            src={imag}
            alt="license"
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "344px",
              objectFit: "cover",
              borderRadius: "2px",
            }}
          />
        </div>
        <div className="d-flex gap-2 align-items-center justify-content-end">
          <span
            className="text-15-500 color-dashboard-primary pointer"
            onClick={downloadImage}
          >
            Download
          </span>
          <span>
            <img
              src={icons.downloadPrimary}
              alt="add-brands"
              className="color-dashboard-primary pointer"
            />
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LicensePopup;

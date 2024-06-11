import { useRef } from "react";
import Cropper from "react-cropper";
import Button from "components/form/Button";
import Modal from "../Modal";
import "cropperjs/dist/cropper.css";

const ImageCropper = ({ fileURL, handelCropImage, onHide }) => {
  const cropperRef = useRef();
  const dataURLtoFile = async (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };
  const getCropData = async () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      let bString = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      let date = new Date();
      let getfile = await dataURLtoFile(bString, `${date.getTime()}.png`);
      handelCropImage(getfile);
      onHide();
    }
  };

  return (
    <Modal onHide={onHide} size="md">
      <Cropper
        src={fileURL}
        style={{ height: 395, width: "100%" }}
        aspectRatio={1}
        guides={false}
        ref={cropperRef}
        minCropBoxHeight={250}
        minCropBoxWidth={250}
      />
      <div className="d-flex justify-content-center mt-3 gap-3 w-100">
        <Button
          hideAnimation
          btnText="CANCEL"
          btnStyle="BO"
          className="cps-50 cpe-50"
          onClick={onHide}
        />
        <Button
          hideAnimation
          btnText="UPLOAD"
          btnStyle="PD"
          className="cps-50 cpe-50"
          onClick={getCropData}
        />
      </div>
    </Modal>
  );
};
export default ImageCropper;

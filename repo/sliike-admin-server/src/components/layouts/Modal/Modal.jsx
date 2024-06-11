import BootrsapModal from "react-bootstrap/Modal";
import "./Modal.scss";

const Modal = ({ children, onHide, width, title, size }) => {
  let newWidth = window.innerWidth < 700 ? "100%" : width || "500px";
  return (
    <BootrsapModal
      className="iferp-scroll modal-block-custom"
      onHide={onHide}
      size={size || "lg"}
      centered
      show
    >
      <BootrsapModal.Body id="modal-container" style={{ minWidth: newWidth }}>
        {onHide && (
          <i className="bi bi-x modal-close-button pointer" onClick={onHide} />
        )}
        <div className="col-md-12 text-center d-flex justify-content-center text-25-600 color-raisin-black">
          {title}
        </div>

        {children}
      </BootrsapModal.Body>
    </BootrsapModal>
  );
};

export default Modal;

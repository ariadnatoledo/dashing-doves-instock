import "./DeleteModal.scss";
import closeIcon from "../../assets/Icons/close-24px.svg";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const DeleteModal = ({
  isModalOpen,
  title,
  content,
  closeModal,
  deleteItem,
}) => {
  return (
    <ReactModal
      isOpen={isModalOpen}
      ariaHideApp={false}
      contentLabel={content}
      onRequestClose={closeModal}
      className={"modal"}
      overlayClassName={"modal__overlay"}
    >
      <button
        onClick={closeModal}
        className="modal__icon-container"
        aria-label="Close"
      >
        <img src={closeIcon} alt="close-icon"></img>
      </button>
      <h1 className="modal__title">{title}</h1>
      <p>{content}</p>
      <div className="modal__buttons-container">
        <button
          onClick={closeModal}
          className="modal__cancel-button"
          aria-label="Cancel"
        >
          Cancel
        </button>
        <button
          onClick={deleteItem}
          className="modal__delete-button"
          aria-label="Delete"
        >
          Delete
        </button>
      </div>
    </ReactModal>
  );
};

export default DeleteModal;

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterSuccess.css";

const RegisterSuccess = ({ handleCloseModal, handleOpenLoginModal }) => {
  const switchModal = (e) => {
    e.preventDefault();
    handleOpenLoginModal();
  };

  return (
    <ModalWithForm
  title="Registration successfully completed!"
  onClose={handleCloseModal}
  className="registeration"
  onClick={handleOpenLoginModal}
  handleOpenLoginModal={handleOpenLoginModal}
>
  <div className="registeration__content">
    <button
      className="modal__switch-signin"
      type="button"
      onClick={switchModal}
    >
      <div className="modal__signin">Sign in</div>
    </button>
  </div>
</ModalWithForm>
   
  );
};

export default RegisterSuccess;

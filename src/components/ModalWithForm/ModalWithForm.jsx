import "./ModalWithForm.css";

const ModalWithForm = ({ 
  name, 
  title, 
  onClose, 
  onSubmit, 
  children, 
 
   }) => {
    return (
      <div className={`modal ${name}`}>
        <div className="modal__content">
        <button type="button" className="modal__button-close" onClick={onClose}>
          {" "}
        </button>
        
          <h1 className="modal__title">{title}</h1>
          <form name={name} className="modal__form" onSubmit={onSubmit}>
            {children}
           
          </form>
         
        </div>
        </div>
        
    );
  };
  
  export default ModalWithForm;

  
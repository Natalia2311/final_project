import React, { useState, useEffect } from 'react';
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  handleCloseModal,
  handleOpenLoginModal,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(""); // Name error state
  const [password, setPassword] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState(""); 
   const [isFormValid, setIsFormValid] = useState(false);
   const [serverError, setServerError] = useState(""); // State for server-side error
   

   const handleNameChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
    // Validate name only if it's not empty
    if (nameValue === "") {
      setNameError("Name cannot be empty");
    } else {
      setNameError(""); // Clear error if name is valid
    }
  };



  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    // Clear server error when the user types
    setServerError("");

    // Validate email only if it is not empty
    if (emailValue) {
      const isValid = validateEmail(emailValue);
      if (!isValid) {
        setEmailError("Invalid email address");
      } else {
        setEmailError(""); // Clear error if email is valid
      }
    } else {
      setEmailError(""); // Clear error if email is empty
    }
  };
  
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    // Validate password only if it is not empty
    if (passwordValue) {
      const isValid = validatePassword(passwordValue);
      if (!isValid) {
        setPasswordError("Password must be at least 8 characters");
      } else {
        setPasswordError(""); // Clear error if password is valid
      }
    } else {
      setPasswordError(""); // Clear error if password is empty
    }
  };

  const validateEmail = (email) => {
    const emailParts = email.split('@');
    if (emailParts.length === 2 && emailParts[1].includes('.')) {
      setEmailError(""); // Clear error if email is valid
      return true;
    }
    setEmailError("Invalid email address");
    return false;
  };
  
  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    setPasswordError(""); // Clear error if password is valid
    return true;
  };
  // Validate the form (including name, email, and password)
  const validateForm = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isNameValid = name !== ""; // Check if name is not empty
    setIsFormValid(isEmailValid && isPasswordValid && isNameValid);
  };

  useEffect(() => {
    validateForm();
  }, [email, password, name, emailError, passwordError, nameError]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        // Simulate server call with `onSubmit`
        await onSubmit(name, email, password); // Pass the arguments directly

        // Clear form after successful submission
        setName("");
        setEmail("");
        setPassword("");
      } catch (error) {
        if (error.response && error.response.data.error === "Email already exists") {
          setServerError("This email is not available");
        } else {
          setServerError("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  const switchModal = (e) => {
    e.preventDefault();
    handleOpenLoginModal();
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={"Sign Up"}
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
      className="register"
      onClick={handleOpenLoginModal}
      handleOpenLoginModal={handleOpenLoginModal}
    >
      <label className="modal__label">
        Email
        <input
          className={`modal__form-input ${email ? "modal__input-active" : ""}`}

          name="email"
          type="email"
          placeholder="Enter email"
          required
          value={email}
          onChange={handleEmailChange}
        ></input>
         
          {serverError && <span className="modal__error-message">{serverError}</span>}
      </label>

      <label className="modal__label">
        Password
        <input
          className={`modal__form-input ${
            password ? "modal__input-active" : ""
          }`}
          name="password"
          type="password"
          placeholder="Enter password"
          required
          value={password}
          onChange={handlePasswordChange}
        ></input>
         
      </label>

      <label className="modal__label">
        Username
        <input
          className={`modal__form-input ${
            name ? "modal__input-active" : ""
          }`}
          name="name"
          type="name"
          placeholder="Enter your username"
          required
          value={name}
          onChange={handleNameChange}
        ></input>
         {nameError && <span className="modal__error-message">{nameError}</span>}
      </label>
 
        <button 
        className={`modal__submit-signupbutton ${isFormValid ? "active" : ""}`}
        type="submit"
        disabled={!isFormValid}>
          Sign up
        </button>
        <button
        className="modal__switch-button"
        type="button"
        onClick={switchModal}
      >
        <span className="modal__or">or</span>
        <span className="modal__sign-up">Sign in</span>
      </button>
     
    </ModalWithForm>
  );
};

export default RegisterModal;



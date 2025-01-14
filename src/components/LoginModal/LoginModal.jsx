import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";


const LoginModal = ({
  handleCloseModal,
  onSubmit,
  handleOpenSignupModal,
  handleOpenLoginModal,
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // Error message state
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // Error message state
  const [isFormValid, setIsFormValid] = useState(false);



  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

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


  // Basic email validation: check if email contains '@' and '.' using split
  const validateEmail = (email) => {
    const emailParts = email.split('@');
    if (emailParts.length === 2 && emailParts[1].includes('.')) {
      setEmailError(""); // Clear error if email is valid
      return true;
    }
    setEmailError("Invalid email address");
    return false;
  };

  // Password validation: check if password has at least 6 characters
  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    setPasswordError(""); // Clear error if password is valid
    return true;
  };
  // Validate the form (both email and password)
  

  const validateForm = () => {
    const isEmailValid = !emailError && email !== "";
    const isPasswordValid = !passwordError && password !== "";
    setIsFormValid(isEmailValid && isPasswordValid);
  };

   // Revalidate form whenever email or password changes
   useEffect(() => {
    validateForm();
  }, [email, password, emailError, passwordError]);


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(email, password); // This should call the handleLoginModal function
    }
  };

  const switchModal = (e) => {
    e.preventDefault();
    handleOpenSignupModal();
  };

  return (
    <ModalWithForm
      title="Sign in"
      buttonText={"Sign in"}
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
      handleOpenLoginModal={handleOpenLoginModal}
      className="sign in"
      onClick={handleOpenSignupModal}
      
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
        />
         {email && emailError && (
          <span className="modal__error-message">{emailError}</span>
        )}
      </label>

      <label className="modal__label">
        Password
        <input
          className={`modal__form-input ${password ? "modal__input-active" : ""}`}
          name="password"
          type="password"
          placeholder="Enter password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        {password && passwordError && (
          <span className="modal__error-message">{passwordError}</span>
        )}
      </label>

      <button
        className={`modal__submit-button ${isFormValid ? "active" : ""}`}
        type="submit"
        disabled={!isFormValid}

      >
        Sign in
      </button>

      <button
        className="modal__switch-button"
        type="button"
        onClick={switchModal}
      >
        <span className="modal__or">or</span>
        <span className="modal__sign-up">Sign up</span>
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;

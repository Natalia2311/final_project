import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  handleCloseModal,
  onSubmit,
  handleOpenSignupModal,
  handleOpenLoginModal,
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (emailValue) {
      const isValid = validateEmail(emailValue);
      if (!isValid) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue) {
      const isValid = validatePassword(passwordValue);
      if (!isValid) {
        setPasswordError("Password must be at least 8 characters");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  };

  const validateEmail = (email) => {
    const emailParts = email.split("@");
    if (emailParts.length === 2 && emailParts[1].includes(".")) {
      setEmailError("");
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
    setPasswordError("");
    return true;
  };

  const validateForm = () => {
    const isEmailValid = !emailError && email !== "";
    const isPasswordValid = !passwordError && password !== "";
    setIsFormValid(isEmailValid && isPasswordValid);
  };

  useEffect(() => {
    validateForm();
  }, [email, password, emailError, passwordError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(email, password);
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
          className={`modal__form-input ${
            password ? "modal__input-active" : ""
          }`}
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

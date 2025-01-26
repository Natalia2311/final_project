import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  handleCloseModal,
  handleOpenLoginModal,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);

    if (nameValue === "") {
      setNameError("Name cannot be empty");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    setServerError("");

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
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isNameValid = name !== "";
    setIsFormValid(isEmailValid && isPasswordValid && isNameValid);
  };

  useEffect(() => {
    validateForm();
  }, [email, password, name, emailError, passwordError, nameError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        await onSubmit(name, email, password);

        setName("");
        setEmail("");
        setPassword("");
      } catch (error) {
        if (
          error.response &&
          error.response.data.error === "Email already exists"
        ) {
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
        {serverError && (
          <span className="modal__error-message">{serverError}</span>
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
        ></input>
      </label>

      <label className="modal__label">
        Username
        <input
          className={`modal__form-input ${name ? "modal__input-active" : ""}`}
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
        disabled={!isFormValid}
      >
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

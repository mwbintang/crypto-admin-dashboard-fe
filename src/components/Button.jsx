import React from "react";

const Button = ({ children, variant = "primary", onClick, disabled = false, type = "button" }) => {
  return (
    <button
      type={type}
      className={`button ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

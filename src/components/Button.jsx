import React from "react";

const Button = ({ children, onClick, variant = "primary", disabled = false }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition duration-200";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;

import React from "react";
import Button from "./Button";

const handleLogout = () => {
  // Clear stored auth data
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Optionally show a message or alert
  console.log("Logging out...");

  // Redirect to login page
  window.location.href = "/login";
};

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow p-4 flex justify-end items-center sticky top-0">
      <Button onClick={handleLogout}>Logout</Button>
    </header>
  );
};

export default Navbar;

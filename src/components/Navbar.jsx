import React from "react";
import Button from "./Button";

const handleLogout = () => {
  // your logout logic here
  console.log("Logging out...");
};

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow p-4 flex justify-end items-center sticky top-0">
      <Button onClick={handleLogout}>Logout</Button>
    </header>
  );
};

export default Navbar;

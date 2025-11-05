import React from "react";

const StatCard = ({ title, value, className = "" }) => {
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-200 border-l-4 ${className}`}
    >
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
};

export default StatCard;

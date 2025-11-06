import React from "react";
import Button from "./Button";

/**
 * fields: array of filter field definitions
 *  e.g.
 *  [
 *    { name: "search", type: "text", placeholder: "Search...", icon: Search },
 *    { name: "status", type: "select", options: ["Completed", "Pending", "Failed"] },
 *    { name: "date", type: "date" },
 *  ]
 *
 * filters: object with current values
 * onFilterChange: callback when value changes
 * onApply: callback when apply button clicked
 * buttonProps: optional props for the apply button
 */
const FilterBar = ({ fields = [], filters, onFilterChange, onApply, buttonProps = {} }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-5">
      <div className={`grid grid-cols-1 md:grid-cols-${fields.length + 1} gap-4 items-end`}>
        {fields.map((field) => {
          const value = filters[field.name] || "";

          // Input with icon
          if (field.type === "text") {
            const Icon = field.icon;
            return (
              <div key={field.name} className="relative">
                {Icon && (
                  <Icon
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                )}
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder || ""}
                  value={value}
                  onChange={onFilterChange}
                  className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2 border rounded-lg focus:ring focus:ring-primary/30 outline-none`}
                />
              </div>
            );
          }

          // Select
          if (field.type === "select") {
            return (
              <select
                key={field.name}
                name={field.name}
                value={value}
                onChange={onFilterChange}
                className="border rounded-lg px-3 py-2 focus:ring focus:ring-primary/30 outline-none"
              >
                <option value="">{field.placeholder || "All"}</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            );
          }

          // Date
          if (field.type === "date") {
            return (
              <input
                key={field.name}
                type="date"
                name={field.name}
                value={value}
                onChange={onFilterChange}
                className="border rounded-lg px-3 py-2 focus:ring focus:ring-primary/30 outline-none"
              />
            );
          }

          return null;
        })}

        {/* Apply Button */}
        <div className="flex justify-end">
          <Button onClick={onApply} {...buttonProps}>
            {buttonProps.children || "Apply Filters"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

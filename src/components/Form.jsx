import React from "react";

const Form = ({ fields = [], onChange, onSubmit, className = "" }) => {
  return (
    <form onSubmit={onSubmit} className={`flex flex-col space-y-4 ${className}`}>
      {fields.map((field, idx) => (
        <div key={idx}>
          {field.label && (
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              {field.label}
            </label>
          )}
          <div className="flex items-center border rounded-lg px-3">
            {field.icon && (
              <field.icon size={18} className="text-gray-400 mr-2" />
            )}
            <input
              type={field.type || "text"}
              name={field.name}
              value={field.value}
              onChange={(e) => onChange(e)}
              className="w-full py-2 outline-none bg-transparent pl-2"
              placeholder={field.placeholder || ""}
              required={field.required}
            />
          </div>
        </div>
      ))}
    </form>
  );
};

export default Form;

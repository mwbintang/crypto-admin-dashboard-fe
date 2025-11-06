import React, { useEffect } from "react";
import { X } from "lucide-react";
import Button from "./Button";

const Alert = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2">
      <div
        className={`alert ${type} flex items-center justify-between min-w-[260px] px-3 py-2 rounded-lg shadow-lg font-medium`}
      >
        <span>{message}</span>

        <Button
          variant="secondary"
          onClick={onClose}
          className="!bg-transparent !text-white hover:opacity-80 !p-0 ml-2 flex items-center justify-center"
        >
          <X size={16} strokeWidth={2.5} className="m-0" />
        </Button>
      </div>
    </div>
  );
};

export default Alert;

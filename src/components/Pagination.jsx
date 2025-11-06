import React, { useState, useEffect } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, visibleCount = 5 }) => {
  const [pageGroup, setPageGroup] = useState(1);

  const totalGroups = Math.ceil(totalPages / visibleCount);

  useEffect(() => {
    // Adjust page group when currentPage changes (e.g., when clicking first/last)
    const newGroup = Math.ceil(currentPage / visibleCount);
    if (newGroup !== pageGroup) setPageGroup(newGroup);
  }, [currentPage]);

  const startPage = (pageGroup - 1) * visibleCount + 1;
  const endPage = Math.min(startPage + visibleCount - 1, totalPages);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const handlePrevGroup = () => {
    if (pageGroup > 1) setPageGroup(pageGroup - 1);
  };

  const handleNextGroup = () => {
    if (pageGroup < totalGroups) setPageGroup(pageGroup + 1);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6 select-none">
      {/* First Page Button */}
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          First
        </button>
      )}

      {/* Prev Group Arrow */}
      {pageGroup > 1 && (
        <button
          onClick={handlePrevGroup}
          className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          ‹
        </button>
      )}

      {/* Page Buttons */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
            currentPage === page
              ? "bg-green-500 text-white border-green-500 shadow-sm"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Group Arrow */}
      {pageGroup < totalGroups && (
        <button
          onClick={handleNextGroup}
          className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          ›
        </button>
      )}

      {/* Last Page Button */}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          Last
        </button>
      )}
    </div>
  );
};

export default Pagination;

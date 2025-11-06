import React from "react";

/**
 * Generic table row component.
 * @param {Object} props.data - The row data object.
 * @param {Array} props.columns - List of column keys to display.
 * @param {Function} [props.renderCell] - Optional custom cell renderer.
 */
const TableRow = ({ data, columns, renderCell }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      {columns.map((col) => (
        <td key={col} className="px-6 py-3 text-sm text-gray-700">
          {renderCell ? renderCell(col, data[col], data) : data[col]}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;

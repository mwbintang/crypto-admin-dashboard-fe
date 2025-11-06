import React from "react";
import TableRow from "./TableRow";

/**
 * A fully generic, reusable Table component.
 * @param {Array} data - Array of data objects.
 * @param {Array} columns - List of keys to render.
 * @param {Object} columnLabels - Optional mapping for column headers.
 * @param {Function} [renderCell] - Optional function for custom cell rendering.
 */
const Table = ({ data = [], columns = [], columnLabels = {}, renderCell }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-6 py-3">
                {columnLabels[col] || col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <TableRow
                key={i}
                data={row}
                columns={columns}
                renderCell={renderCell}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

import React, { useState } from "react";
import { useTheme } from "../Hooks/ThemeContext"; // ✅ استخدمنا الـ context

interface Column<T> {
  key: keyof T;
  label: string;
  showLabel?: boolean;
  render?: (value: [], row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  charLimit?: number;
  pageSize?: number;
}

const Table = <T extends { id?: string }>({
  columns,
  data,
  charLimit = 25,
  pageSize = 10,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [popupContent, setPopupContent] = useState<string | null>(null);
  const { theme } = useTheme(); 

  const truncateText = (text: string): string => {
    if (!text) return "";
    return text.length > charLimit ? text.substring(0, charLimit) + "..." : text;
  };

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div
      className={`overflow-x-auto rounded-lg relative border ${
        theme === "dark" ? "border-gray-700" : "border-gray-300"
      } transition-colors duration-300`}
    >
      <table
        className={`min-w-full text-sm text-left ${
          theme === "dark" ? "text-gray-200" : "text-black"
        }`}
      >
        <thead
          className={`${
            theme === "dark" ? "bg-black/80" : "bg-gray-100"
          } transition-colors duration-300`}
        >
          <tr>
            {columns.map(
              (col) =>
                col.showLabel !== false && (
                  <th
                    key={String(col.key)}
                    className={`px-4 py-3 font-semibold border ${
                      theme === "dark"
                        ? "border-gray-700 text-maincolor"
                        : "border-gray-300 text-maincolor"
                    }`}
                  >
                    {col.label}
                  </th>
                )
            )}
          </tr>
        </thead>

        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, idx) => (
              <tr
                key={(row.id as string) || idx}
                className={`cursor-pointer transition-colors ${
                  theme === "dark"
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-200"
                }`}
              >
           {columns.map((col) => {
  const value = row[col.key];
  const isTruncated = typeof value === "string" && value.length > charLimit;

  return (
    <td
      key={String(col.key)}
      className="px-4 py-3"
      onClick={() =>
        isTruncated && !col.render ? setPopupContent(String(value)) : null
      }
    >
      {col.render ? (
        <div onClick={(e) => e.stopPropagation()}>
          {col.render(value, row, startIndex + idx)}
        </div>
      ) : (
        truncateText(String(value ?? ""))
      )}
    </td>
  );
})}

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className={`px-4 py-6 text-center ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div
        className={`sticky bottom-0 left-0 w-full p-4 ${
          theme === "dark" ? "bg-black/80" : "bg-gray-100"
        } transition-colors duration-300`}
      >
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded disabled:opacity-50 ${
              theme === "dark"
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded transition ${
                currentPage === i + 1
                  ? "bg-maincolor text-white"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded disabled:opacity-50 ${
              theme === "dark"
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Popup */}
      {popupContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            className={`p-6 rounded-lg shadow-lg max-w-lg w-full ${
              theme === "dark" ? "bg-black" : "bg-white"
            } transition-colors duration-300`}
          >
            <h2
              className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Full Data
            </h2>
            <p
              className={`break-words ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {popupContent}
            </p>
            <button
              onClick={() => setPopupContent(null)}
              className="px-4 py-2 mt-4 text-white rounded bg-maincolor hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;

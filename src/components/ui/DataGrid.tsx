"use client";

import { useMemo, useState } from "react";
import EmptyState from "./EmptyState";

export type GridColumn<T> = {
  key: string;
  title: string;
  sortable?: boolean;
  width?: number | string;
  render: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
};

export default function DataGrid<T>({
  rows,
  columns,
  rowKey,
  emptyTitle,
}: {
  rows: T[];
  columns: GridColumn<T>[];
  rowKey: (row: T) => string | number;
  emptyTitle?: string;
}) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows;
    const column = columns.find((item) => item.key === sortKey);
    if (!column?.sortable) return rows;
    const getter = column.sortValue ?? ((row: T) => String(column.render(row) ?? ""));
    return [...rows].sort((a, b) => {
      const av = getter(a);
      const bv = getter(b);
      const result = typeof av === "number" && typeof bv === "number"
        ? av - bv
        : String(av).localeCompare(String(bv), "fa");
      return sortDirection === "asc" ? result : -result;
    });
  }, [columns, rows, sortDirection, sortKey]);

  if (rows.length === 0) return <EmptyState title={emptyTitle} />;

  return (
    <div className="app-grid-scroll">
      <table className="app-grid">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={{ width: column.width }}>
                {column.sortable ? (
                  <button
                    type="button"
                    className="grid-sort-button"
                    onClick={() => {
                      if (sortKey === column.key) {
                        setSortDirection((value) => value === "asc" ? "desc" : "asc");
                      } else {
                        setSortKey(column.key);
                        setSortDirection("asc");
                      }
                    }}
                  >
                    {column.title}
                    <span>{sortKey === column.key ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</span>
                  </button>
                ) : column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((column) => <td key={column.key}>{column.render(row)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

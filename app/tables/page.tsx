"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTableState } from "@/hooks";
import { MockDataService } from "@/services";
import { TableColumn } from "@/types";

interface TableUser {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
  lastLogin: Date;
  isActive: boolean;
}

export default function TablesPage() {
  const mockUsers = useMemo(() => MockDataService.generateTableData(100), []);

  const {
    data: paginatedUsers,
    state,
    totalPages,
    totalItems,
    updateSort,
    updateSearch,
    updateFilters,
    updatePage,
    updateItemsPerPage,
  } = useTableState<TableUser>(mockUsers);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showExport, setShowExport] = useState(false);

  const columns: TableColumn<TableUser>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              row.isActive ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "admin"
              ? "bg-purple-100 text-purple-800"
              : value === "moderator"
              ? "bg-blue-100 text-blue-800"
              : value === "editor"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : value === "inactive"
              ? "bg-red-100 text-red-800"
              : value === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "lastLogin",
      label: "Last Login",
      sortable: true,
      render: (value) => {
        const date = new Date(value);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
      },
    },
  ];

  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedUsers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedUsers.map((user) => user.id));
    }
  };

  const handleBulkAction = (action: string) => {
    alert(`${action} action performed on ${selectedRows.length} rows`);
    setSelectedRows([]);
  };

  const handleExport = () => {
    const csvContent = [
      columns.map((col) => col.label).join(","),
      ...paginatedUsers.map((user) =>
        columns
          .map((col) => {
            const value = user[col.key];
            return typeof value === "string" ? `"${value}"` : value;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "table-data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    setShowExport(false);
  };

  const statusOptions = ["active", "inactive", "pending", "suspended"];
  const roleOptions = ["admin", "user", "moderator", "editor"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Automation Testing Site
              </Link>
              <span className="ml-4 text-gray-500">/</span>
              <span className="ml-4 text-gray-700">Tables</span>
            </div>
            <div className="flex items-center">
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tables & Data Management
          </h1>
          <p className="mt-2 text-gray-600">
            Test sorting, filtering, pagination, and bulk operations
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>User Management Table</CardTitle>
                <CardDescription>
                  {totalItems} users total • Page {state.currentPage} of{" "}
                  {totalPages}
                </CardDescription>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowExport(true)}
                  data-testid="export-button"
                >
                  Export CSV
                </Button>
                {selectedRows.length > 0 && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction("Delete")}
                      data-testid="bulk-delete-button"
                    >
                      Delete ({selectedRows.length})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction("Activate")}
                      data-testid="bulk-activate-button"
                    >
                      Activate ({selectedRows.length})
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search users..."
                  value={state.searchQuery}
                  onChange={(e) => updateSearch(e.target.value)}
                  data-testid="search-input"
                  className="max-w-sm"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={state.filters.status || ""}
                  onChange={(e) =>
                    updateFilters({ status: e.target.value || null })
                  }
                  data-testid="status-filter"
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">All Statuses</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <select
                  value={state.filters.role || ""}
                  onChange={(e) =>
                    updateFilters({ role: e.target.value || null })
                  }
                  data-testid="role-filter"
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">All Roles</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  onClick={() => {
                    updateSearch("");
                    updateFilters({ status: null, role: null });
                  }}
                  data-testid="clear-filters-button"
                >
                  Clear
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="users-table">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={
                            selectedRows.length === paginatedUsers.length &&
                            paginatedUsers.length > 0
                          }
                          onChange={handleSelectAll}
                          data-testid="select-all-checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      {columns.map((column) => (
                        <th
                          key={column.key as string}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column.sortable ? (
                            <button
                              onClick={() => updateSort(column.key as string)}
                              className="flex items-center hover:text-gray-700"
                              data-testid={`sort-${column.key}`}
                            >
                              {column.label}
                              <svg
                                className="ml-1 w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                />
                              </svg>
                            </button>
                          ) : (
                            column.label
                          )}
                        </th>
                      ))}
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedUsers.map((user, index) => (
                      <tr
                        key={user.id}
                        className={`hover:bg-gray-50 ${
                          selectedRows.includes(user.id) ? "bg-blue-50" : ""
                        }`}
                        data-testid={`user-row-${index}`}
                      >
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(user.id)}
                            onChange={() => handleRowSelect(user.id)}
                            data-testid={`select-row-${index}`}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        {columns.map((column) => (
                          <td
                            key={column.key as string}
                            className="px-4 py-4 whitespace-nowrap text-sm text-gray-900"
                            data-testid={`cell-${column.key}-${index}`}
                          >
                            {column.render
                              ? column.render(user[column.key], user)
                              : String(user[column.key])}
                          </td>
                        ))}
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => alert(`View ${user.name}`)}
                              data-testid={`view-user-${index}`}
                            >
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => alert(`Edit ${user.name}`)}
                              data-testid={`edit-user-${index}`}
                            >
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {paginatedUsers.length === 0 && (
                <div className="text-center py-8" data-testid="no-data-message">
                  <p className="text-gray-500">
                    No users found matching your criteria.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <span className="text-sm text-gray-700">Rows per page:</span>
                <select
                  value={state.itemsPerPage}
                  onChange={(e) => updateItemsPerPage(parseInt(e.target.value))}
                  data-testid="items-per-page-select"
                  className="flex h-8 rounded-md border border-input bg-background px-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updatePage(1)}
                  disabled={state.currentPage === 1}
                  data-testid="first-page-button"
                >
                  First
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updatePage(state.currentPage - 1)}
                  disabled={state.currentPage === 1}
                  data-testid="prev-page-button"
                >
                  Previous
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page =
                      Math.max(
                        1,
                        Math.min(totalPages - 4, state.currentPage - 2)
                      ) + i;
                    return (
                      <Button
                        key={page}
                        variant={
                          page === state.currentPage ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => updatePage(page)}
                        data-testid={`page-${page}-button`}
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updatePage(state.currentPage + 1)}
                  disabled={state.currentPage === totalPages}
                  data-testid="next-page-button"
                >
                  Next
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updatePage(totalPages)}
                  disabled={state.currentPage === totalPages}
                  data-testid="last-page-button"
                >
                  Last
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Modal */}
        {showExport && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            data-testid="export-modal"
          >
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Export Table Data</h3>
              <p className="text-gray-600 mb-6">
                Export the current table data ({totalItems} rows) to a CSV file?
              </p>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowExport(false)}
                  data-testid="cancel-export-button"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleExport}
                  data-testid="confirm-export-button"
                >
                  Export CSV
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Testing Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Table Features</CardTitle>
              <CardDescription>
                Available functionality for testing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Sortable columns (click headers)</li>
                <li>• Global search functionality</li>
                <li>• Status and role filters</li>
                <li>• Row selection (individual & bulk)</li>
                <li>• Pagination with configurable page sizes</li>
                <li>• Bulk actions (delete, activate)</li>
                <li>• CSV export functionality</li>
                <li>• Responsive design</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Testing Scenarios</CardTitle>
              <CardDescription>Common test cases to practice</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Search for specific users</li>
                <li>• Filter by status/role combinations</li>
                <li>• Sort by different columns</li>
                <li>• Select individual rows</li>
                <li>• Select all rows</li>
                <li>• Navigate through pages</li>
                <li>• Change page size</li>
                <li>• Export data</li>
                <li>• Perform bulk actions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

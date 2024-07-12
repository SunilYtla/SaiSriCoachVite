import { useState } from "react";

interface SortConfig<T> {
  label: string;
  sortValue?: (data: T) => string | number;
  render: (rowData: any) => React.ReactNode | JSX.Element | string | number;
}

interface SortResult<T> {
  sortOrder: string | null;
  sortBy: string | null;
  sortedData: T[];
  setSortColumn: (label: string) => void;
}

function useSort<T>(data: T[], config: SortConfig<T>[]): SortResult<T> {
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const setSortColumn = (label: string) => {
    if (sortBy && label !== sortBy) {
      setSortOrder("asc");
      setSortBy(label);
      return;
    }

    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  // Only sort data if sortOrder && sortBy are not null
  // Make a copy of the 'data' prop
  // Find the correct sortValue function and use it for sorting
  let sortedData = data;
  if (sortOrder && sortBy) {
    // const { sortValue } = config.find((column) => column.label === sortBy);
    const sortConfig = config.find((column) => column.label === sortBy);
    const sortValue = sortConfig ? sortConfig.sortValue : undefined;
    if (sortValue !== undefined) {
      sortedData = [...data].sort((a, b) => {
        const valueA = sortValue!(a);
        const valueB = sortValue!(b);

        const reverseOrder = sortOrder === "asc" ? 1 : -1;

        if (typeof valueA === "string") {
          return valueA.localeCompare(valueB as string) * reverseOrder;
        } else {
          return ((valueA as number) - (valueB as number)) * reverseOrder;
        }
      });
    }
  }

  return {
    sortOrder,
    sortBy,
    sortedData,
    setSortColumn,
  };
}

export default useSort;

import { GoArrowDown, GoArrowUp } from "react-icons/go";
import Table from "./Table";
import useSort from "../hooks/useSort";
import { useEffect, useState } from "react";

type TableColumn<T> = {
  label: string;
  sortValue?: (data: T) => string | number;
  render: (rowData: any) => React.ReactNode | JSX.Element | string | number;
};

interface SortableTableProps<T> {
  config: TableColumn<T>[];
  data: any[];
  keyFn: (rowData: any) => React.Key;
}

function SortableTable<T>(props: SortableTableProps<T>) {
  const { config: initialConfig, data } = props;
  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(
    data,
    initialConfig
  );
  const [ConfigOrder, setConfigOrder] = useState(initialConfig);

  useEffect(() => {
    setConfigOrder(initialConfig);
  }, [initialConfig]);

  const onDragStart = (e: React.DragEvent, columnIndex: number) => {
    e.dataTransfer.setData("text/plain", columnIndex.toString());
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent, targetIndex: number) => {
    const draggedColumnIndex = parseInt(
      e.dataTransfer.getData("text/plain"),
      10
    );
    const newColumns = [...ConfigOrder];
    const [draggedColumn] = newColumns.splice(draggedColumnIndex, 1);
    newColumns.splice(targetIndex, 0, draggedColumn);
    setConfigOrder(newColumns);
  };

  const updatedConfig = ConfigOrder.map((column, index) => {
    if (!column.sortValue) {
      return {
        ...column,
        header: () => (
          <th
            className=" py-2 px-2 border-b-2 border-gray-200  text-sm font-semibold text-gray-600 uppercase tracking-wider"
            key={index}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, index)}
          >
            <div className="cursor-grab">{column.label}</div>
          </th>
        ),
      };
    }

    return {
      ...column,
      header: () => (
        <th
          className=" py-2 px-2 border-b-2 border-gray-200  text-sm font-semibold text-gray-600 uppercase tracking-wider"
          onClick={() => setSortColumn(column.label)}
          key={index}
          draggable
          onDragStart={(e) => onDragStart(e, index)}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, index)}
        >
          <div className="flex items-center justify-start  ">
            <div className="cursor-pointer hover:bg-gray-100">
              {getIcons(column.label, sortBy, sortOrder)}
            </div>
            <div className="cursor-grab   ">{column.label}</div>
          </div>
        </th>
      ),
    };
  });

  return <Table {...props} data={sortedData} config={updatedConfig} />;
}

function getIcons(
  label: string,
  sortBy: string | null,
  sortOrder: string | null
) {
  if (label !== sortBy) {
    return <div> </div>;
  }

  if (sortOrder === null) {
    return (
      <div>
        <GoArrowUp />
        <GoArrowDown />
      </div>
    );
  } else if (sortOrder === "asc") {
    return (
      <div>
        <GoArrowUp />
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div>
        <GoArrowDown />
      </div>
    );
  }
}

export default SortableTable;

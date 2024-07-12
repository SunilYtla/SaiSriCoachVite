import { Fragment } from "react";

interface TableColumn<T> {
  label: string;
  render: (rowData: T) => React.ReactNode | JSX.Element | string | number;
  header?: () => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  config: TableColumn<T>[];
  keyFn: (rowData: T) => React.Key;
}

function Table<T>({ data, config, keyFn }: TableProps<T>) {
  const renderedHeaders = config.map((column, index) => {
    if (column.header) {
      return <Fragment key={column.label + index}>{column.header()}</Fragment>;
    }

    return <th key={column.label + index}>{column.label}</th>;
  });

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td
          className="text-sm pl-2 border-b-2 whitespace-nowrap p-4 align-top"
          key={column.label}
        >
          {column.render(rowData)}
        </td>
      );
    });

    return (
      <tr className="border-b " key={keyFn(rowData)}>
        {renderedCells}
      </tr>
    );
  });

  return (
    <div className="">
      <div className=" rounded-sm ">
        <table className="w-full min-w-max ">
          <thead className="bg-slate-300  ">
            <tr className="text-left  text-sm ">{renderedHeaders}</tr>
          </thead>
          <tbody>{renderedRows}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;

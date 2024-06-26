/* eslint-disable react/display-name */
import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import SkeletionTable from "@/components/skeleton/Table";

const CustomTable = ({
  data,
  columns,
  title = "",
  actionModal,
  tableLoading,
}) => {
  const [staticOrder, setStaticOrder] = useState(null);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: staticOrder ? [staticOrder] : [],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    tableInstance.setSortBy(staticOrder ? [staticOrder] : []);
    setPageSize(5);
  }, [staticOrder]);

  const applyStaticOrder = (columnId, desc) => {
    setStaticOrder({
      id: columnId,
      desc,
    });
  };

  return (
    <>
      <p className="text-xl mt-12 mb-4 ">{title}</p>

      <Card bodyClass="pb-6 px-6 z-1000">

        <div className="overflow-x-auto pb-20 pt-10 z-1000  -mx-6 rounded-lg">
          <div className="inline-block min-w-full align-middle rounded-lg">
            <div className=" rounded-lg">
              {tableLoading ? (
                <>
                  <SkeletionTable rowCount={3} columnsCount={5} />
                </>
              ) : (
                <table
                  className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 rounded-lg"
                  {...getTableProps}
                >
                  <thead className="bg-slate-200 dark:bg-slate-700 rounded-lg">
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => {
                          return (
                            <th
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                              onClick={() =>
                                applyStaticOrder(
                                  column.id,
                                  !column.isSortedDesc
                                )
                              }
                              className=" table-th bg-[#e0d6c3] "
                            >
                              {column.render("Header")}
                              <span>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? " 🔽"
                                    : " 🔼"
                                  : ""}
                              </span>
                            </th>
                          );
                        })}
                      </tr>
                    ))}
                  </thead>
                  <tbody
                    className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                    {...getTableBodyProps()}
                  >
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr key={row.getRowProps().key} {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td
                              key={cell.getCellProps().key}
                              {...cell.getCellProps()}
                              className="table-td py-2"
                            >
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
              {data.length === 0 && (
                <div className="flex items-center justify-center pt-20 pb-14">
                  <p className="text text-slate-400 ">il n'y a aucun article</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {data.length !== 0 && (
          <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
            <div className=" flex items-center space-x-3 rtl:space-x-reverse">
              <select
                className="form-control py-2 w-max"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Page{" "}
                <span>
                  {pageIndex + 1} of {pageOptions.length}
                </span>
              </span>
            </div>
            <ul className="flex items-center  space-x-3  rtl:space-x-reverse flex-wrap">
              <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                <button
                  className={` ${
                    !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  <Icon icon="heroicons:chevron-double-left-solid" />
                </button>
              </li>
              <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                <button
                  className={` ${
                    !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Prev
                </button>
              </li>
              {pageOptions.map((page, pageIdx) => (
                <li key={pageIdx}>
                  <button
                    href="#"
                    aria-current="page"
                    className={` ${
                      pageIdx === pageIndex
                        ? "bg-slate-900  dark:text-slate-200 text-white font-medium "
                        : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                    }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                    onClick={() => gotoPage(pageIdx)}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
              <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                <button
                  className={` ${
                    !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Next
                </button>
              </li>
              <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                <button
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                  className={` ${
                    !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Icon icon="heroicons:chevron-double-right-solid" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </Card>
    </>
  );
};

export default CustomTable;

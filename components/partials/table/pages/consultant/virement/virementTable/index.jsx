/* eslint-disable react/display-name */
import React, { useState, useMemo, useEffect } from "react";

import Icon from "@/components/ui/Icon";
import Select from "react-select";
import {
  endOfMonth,
  endOfYear,
  format,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns";
import { fr } from "date-fns/locale"; // Import the French locale

import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { homeTable } from "@/constant/table-data";

const COLUMNS = [
  {
    Header: "Date",
    accessor: "createdAt",
    Cell: (row) => {
      return <span>{format(new Date(row?.cell?.value), "dd.MM.yyyy")}</span>;
    },
  },
  {
    Header: "titre",
    accessor: "title",
    Cell: (row) => {
      return (
        <div className="flex space-x-6 items-center rtl:space-x-reverse">
          {row?.cell?.row?.original?.typeVirement +
            " / " +
            format(new Date(row?.cell?.row?.original?.createdAt), "MMMM yyyy", {
              locale: fr,
            })}
        </div>
      );
    },
  },
  {
    Header: "Montant",
    accessor: "montant",
    Cell: (row) => {
      return <span>{row?.cell?.value}Є</span>;
    },
  },
];

const VirementTable = ({ title, virementData }) => {
  const [filteredData, setFilteredData] = useState(virementData);
  const [dateFilter, setDateFilter] = useState("tous");
  const [typeVirementFilter, setTypeVirementFilter] = useState("tous");

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => filteredData, [filteredData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 6,
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
    footerGroups,
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

  const { pageIndex, pageSize } = state;

  // Table instance setup remains the same

  useEffect(() => {
    let filtered = [...virementData]; // Make a copy of the original data

    const now = new Date();

    if (dateFilter !== "tous") {
      switch (dateFilter) {
        case "aujourd'hui":
          filtered = filtered.filter((item) =>
            isSameDay(new Date(item.createdAt), now)
          );
          break;
        case "7_Dernier_Jours":
          filtered = filtered.filter((item) =>
            isWithinInterval(new Date(item.createdAt), {
              start: subDays(now, 7),
              end: now,
            })
          );
          break;
        case "Dernier_Mois":
          filtered = filtered.filter((item) =>
            isWithinInterval(new Date(item.createdAt), {
              start: startOfMonth(subMonths(now, 1)),
              end: endOfMonth(subMonths(now, 1)),
            })
          );
          break;
        case "Derniére_Année":
          filtered = filtered.filter((item) =>
            isWithinInterval(new Date(item.createdAt), {
              start: startOfYear(subYears(now, 1)),
              end: endOfYear(subYears(now, 1)),
            })
          );
          break;
        default:
          break;
      }
    }

    if (typeVirementFilter !== "tous") {
      filtered = filtered.filter(
        (item) => item.typeVirement === typeVirementFilter
      );
    }

    setFilteredData(filtered);
  }, [dateFilter, typeVirementFilter, virementData]);

  return (
    <>
      <div className="bg-[#f7f5ef] p-6 rounded-lg">
        <div className="py-4 flex sm:flex-row flex-col sm:items-center justify-between">
          <p className="text-3xl font-semibold">{title}</p>
          <div className="flex items-center gap-2">
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: "12px",
                }),
              }}
              className="react-select"
              classNamePrefix="select"
              // Update for date filter select
              onChange={(option) => setDateFilter(option.value)}
              // Existing styles and className configurations
              placeholder="dernier mois"
              options={[
                { label: "tous", value: "tous" },
                { label: "Aujourd'hui", value: "aujourd'hui" },
                { label: "7 Dernier Jours", value: "7_Dernier_Jours" },
                { label: "Dernier Mois", value: "Dernier_Mois" },
                { label: "Derniére Année", value: "Derniére_Année" },
              ]}
            />
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: "12px",
                }),
              }}
              className="react-select"
              classNamePrefix="select"
              // Update for type of virement select
              onChange={(option) => setTypeVirementFilter(option.value)}
              // Existing styles and className configurations
              placeholder="type de virement"
              options={[
                { label: "tous", value: "tous" },
                { label: "Participation", value: "Participation" },
                { label: "Cooptation", value: "Cooptation" },
              ]}
            />
          </div>
        </div>

        <div className="overflow-x-auto -mx-6 ">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
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
                              applyStaticOrder(column.id, !column.isSortedDesc)
                            }
                            className=" table-th bg-[#f7f5ef]  "
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
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    const { key, ...restRowProps } = row.getRowProps();
                    return (
                      <tr key={key} {...restRowProps}>
                        {row.cells.map((cell) => {
                          const { key, ...restCellProps } = cell.getCellProps();
                          return (
                            <td
                              key={key}
                              {...restCellProps}
                              className="table-td bg-[#f7f5ef] "
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-center mt-6 items-center">
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx + "sss"}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default VirementTable;

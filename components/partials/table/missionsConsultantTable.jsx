import React, { useState, useMemo } from "react";
import { advancedTable } from "@/constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "@/components/partials/table/GlobalFilter";
import { h } from "@fullcalendar/core/preact";
import { email } from '@/components/partials/app/email/store';
import Link from "next/link";

const COLUMNS = [
  {
    Header: "name",
    accessor: "name",
    Cell: (row) => {
      console.log(row?.cell?.row?.original);
      console.log(row?.cell?.row?.original?.personalInfo?.firstName?.value);
      return (
        <div>
          <span className="inline-flex items-center">
            <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
              {/* <img
                src={row?.cell?.row?.original?.image}
                alt=""
                className="object-cover w-full h-full rounded-full"
              /> */}
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize font-medium">
              {/* {row?.cell?.value.name} */}
              {row?.cell?.row?.original?.personalInfo?.firstName?.value}{" "}
              {row?.cell?.row?.original?.personalInfo?.lastName
?.value}
            </span>
          </span>
        </div>
      );
    },
  },
  {
    Header: "Email",
    accessor: "Email",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
         {row?.cell?.row?.original?.personalInfo?.email?.value}

        </span>
      );
    },
  },
  {
    Header: "Téléphone",
    accessor: "téléphone",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
          {row?.cell?.row?.original?.personalInfo?.phoneNumber
?.value}
          </span>

        </span>
      );
    },
  },

  {
    Header: "Nationalité",
    accessor: "nationalite",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-900 bg-slate-100 text-base px-3 py-2 border rounded-xl	 dark:text-slate-300">
          {row?.cell?.row?.original?.personalInfo?.nationality
?.value}
          </span>

        </span>
      );
    },
  },

  {
    Header: "action",
    accessor: "action",
    Cell: (row) => {
      return (
        <div className=" text-center">
          <Dropdown
            classMenuItems="right-0 w-[140px] bottom-[40%] z-1000  "
            label={
              <span className="text-xl text-center block w-full">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
            }
          >
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {actions.map((item, i) => (
                <Menu.Item key={i}>
                <Link href={`${item.redirect}/${row?.cell?.row?.original?._id}`}>
                  <div
                    className={`

                  ${
                    item.name === "delete"
                      ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                      :
                      "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                  >
                    <span className="text-base">
                      <Icon icon={item.icon} />
                    </span>
                    <span>{item.name}</span>
                  </div>
                  </Link>
                </Menu.Item>
              ))}
            </div>
          </Dropdown>
        </div>
      );
    },
  },
];

const actions = [
  {
    name: "Voir details",
    icon: "heroicons:pencil-square",
    redirect:"/rh/infoPerso"
  },
  {
    name: "CRA",
    icon: "heroicons-outline:eye",
    redirect:"/rh/consultant"
  },
  // {
  //   name: "delete",
  //   icon: "heroicons-outline:trash",
  //   redirect:"/"
  // },
];

// ...

const MissionConsultantTable = ({ title = "All transactions", consultants }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => consultants, [consultants]);
console.log(data)
console.log(consultants)
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 4,
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

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <Card noborder className="border border-[#EAE3D5] bg-white ">

        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps()}
              >
                <thead className=" border-t border-slate-100 dark:border-slate-800">
                  {headerGroups && headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers && headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          scope="col"
                          className=" table-th "
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
                      ))}
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
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()} className="table-td py-2">
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default MissionConsultantTable;



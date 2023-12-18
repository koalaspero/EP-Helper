import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import { SearchIcon } from "../icons/Icons";
import DebouncedInput from "./DebouncedInput";
import AddUser from "./Add";
import { apiBasUrl } from '../constants/formFields';
import UserRegistrationModal from "./UserRegistrationModal";
import review_2 from "../assets/review_2.svg";
import upload from "../assets/upload.svg";
import ViewResults from "./ViewResults";
const DiagnosisAdmin = () => {
  const users = [
      { User: 'John Doe', Date: '2022-01-01', Parkinson: true, Probability: 0.8 },
      { User: 'Jane Smith', Date: '2022-01-02', Parkinson: false, Probability: 0.2 },
      // Add more user objects here
  ];
  const [data, setData] = useState([]);
  const [rowSelected, setRowSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
   const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const columnHelper= createColumnHelper();
    const columns = [
    columnHelper.accessor("doctor", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Doctor",
    }),
    columnHelper.accessor("fecha", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Fecha",
    }),
    columnHelper.accessor("hasParkinson", {
      cell: (info) => <span>{info.getValue()?"Si":"No"}</span>,
      header: "Parkinson",
    }),
    columnHelper.accessor("probability", {
      cell:(info) => <span>{info.getValue()}</span>,
      header: "Probabilidad",
    }),
  ];
  const fetchUsers = async () => {
    const respone = await fetch(apiBasUrl + "results", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await respone.json();
    setData(data.data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const downloadFile = (row) => {
    //transformar archivo bob a file y descargar esta en row.original.result and rename the file to row.original.doctor
    const file = new Blob([row.original.result], {type: 'text/plain'});
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = row.original.doctor;
    link.click();
  }
  const verDiagnostico = (row) => {
    setRowSelected(row);
    handleShowModal();
  }
  return (
    <>
      <Header
        heading="Usuarios"
      />
      <div className="p-2 max-w-5xl mx-auto">
        <div className="flex justify-between mb-2">
          <div className="w-full flex items-center gap-1">
            <SearchIcon />
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="p-2 bg-transparent outline-none border-b-2 w-1/4 focus:w-1/3 duration-300 border-principal"
              placeholder="Buscar en todas las columnas..."
            />
          </div>
        </div>
        <div class="rounded">
          <table className="border border-slate-400 border-gray-700 w-full text-left rounded-md">
            <thead className="table-header">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="capitalize px-3.5 py-2 border border-slate-300 text-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                    <th className="capitalize px-3.5 py-2 border border-slate-300 text-center">
                      Descargar
                    </th>
                  <th className="capitalize px-3.5 py-2 border border-slate-300 text-center">
                      Revisar
                    </th>
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className="table-body data text-center"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3.5 py-2 border  border-slate-300">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                    <td className="text-center py-2 border  border-slate-300" >
                      <div class='has-tooltip'>
                        <span class='tooltip rounded shadow-lg p-1 text-gray-100 bg-gray-800 -mt-9 -ml-12'>Descargar archivo</span>
                        <img src={upload} onClick={() => downloadFile(row)} className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer mx-auto" />
                      </div>
                    </td>
                    <td className="text-center py-2 border  border-slate-300" >
                      <div class='has-tooltip'>
                        <span class='tooltip rounded shadow-lg p-1 text-gray-100 bg-gray-800 -mt-9 -ml-12'>Ver diagnostico</span>
                        <img src={review_2} onClick={() => verDiagnostico(row)} className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer mx-auto" />
                      </div>
                    </td>
                  </tr>
                ))
                
              ) : (
                <tr className="text-center h-32">
                  <td colSpan={12}>No se encontró ningún resultado</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
          {/* pagination */}
          <div className="flex items-center justify-end mt-2 gap-2">
            <button
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
              className="p-1 border border-gray-300 px-2 disabled:opacity-30"
            >
              {"<"}
            </button>
            <button
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
              className="p-1 border border-gray-300 px-2 disabled:opacity-30"
            >
              {">"}
            </button>

            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16 bg-transparent"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="p-2 bg-transparent"
            >
              {[10, 20, 30, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ViewResults show={showModal} onClose={handleCloseModal} row_selected={rowSelected? rowSelected.original : rowSelected}/>
    </>
  );
};

export default DiagnosisAdmin;


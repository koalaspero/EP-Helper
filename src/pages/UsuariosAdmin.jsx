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
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import AddUser from "./Add";
const data_fake = [
  {
    "username": "jsx1234",
    "nombre": "Juan",
    "apellido": "Perez",
    "rol": "Administrador"
  },
  {
    "username":"jsx1235",
    "nombre": "Pedro",
    "apellido": "Perez",
    "rol": "Administrador"
  },
  {
    "username": "jsx1236",
    "nombre": "Maria",
    "apellido": "Perez",
    "rol": "Administrador"
  },{
    "username": "jsx1237",
    "nombre": "Jose",
    "apellido": "Perez",
    "rol": "Administrador"
  },
  {
    "username": "jsx1238",
    "nombre": "Juan",
    "apellido": "Perez",
    "rol": "Administrador"
  },
  {
    "username": "jsx1239",
    "nombre": "Pedro",
    "apellido": "Perez",
    "rol": "Administrador"
  },
  {
    "username": "jsx1240",
    "nombre": "Maria",
    "apellido": "Perez",
    "rol": "Administrador"
  },{
    "username": "jsx1241",
    "nombre": "Jose",
    "apellido": "Perez",
    "rol": "Administrador"
  },
  {
    "username": "jsx1242",
    "nombre": "Juan",
    "apellido": "Perez",
    "rol": "Administrador"
  },
  {
    "username": "jsx1243",
    "nombre": "Pedro",
    "apellido": "Perez",
    "rol": "Administrador"
  },
  {
    "username": "jsx1244",
    "nombre": "Maria",
    "apellido": "Perez",
    "rol": "Administrador"
  },{
    "username": "jsx1245",
    "nombre": "Jose",
    "apellido": "Perez",
    "rol": "Administrador"
  },
  {
    "username": "jsx1246",
    "nombre": "Juan",
    "apellido": "Perez",
    "rol": "Administrador"
  },
  {
    "username": "jsx1247",
    "nombre": "Pedro",
    "apellido": "Perez",
    "rol": "Administrador"
  },
  {
    "username": "jsx1248",
    "nombre": "Maria",
    "apellido": "Perez",
    "rol": "Administrador"
  },{
    "username": "jsx1249",
    "nombre": "Jose",
    "apellido": "Perez",
    "rol": "Administrador"
  },
  {
    "username": "jsx1250",
    "nombre": "Juan",
    "apellido": "Perez",
    "rol": "Administrador"
  },
  {
    "username": "jsx1251",
    "nombre": "Pedro",
    "apellido": "Perez",
    "rol": "Administrador"
  },
  {
    "username": "jsx1252",
    "nombre": "Maria",
    "apellido": "Perez",
    "rol": "Administrador"
  }
]
const UsuariosAdmin = () => {
  const [data, setData] = useState([]);

  const columnHelper= createColumnHelper();
    const columns = [
    columnHelper.accessor("username", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Username",
    }),
    columnHelper.accessor("nombre", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Nombre",
    }),
    columnHelper.accessor("apellido", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Apellido",
    }),
    columnHelper.accessor("rol", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Rol",
    }),
  ];
  useEffect(() => {
    setData(data_fake);
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
            <AddUser data={data} fileName={"peoples"} />
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
                  <th className="capitalize px-3.5 py-2 border border-slate-300">
                      
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
                        <span class='tooltip rounded shadow-lg p-1 text-gray-100 bg-gray-800 -mt-9 -ml-12'>Editar Usuario</span>
                        <PencilIcon className="h-4 w-4 block mx-auto cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))
                
              ) : (
                <tr className="text-center h-32">
                  <td colSpan={12}>No se encontró ningún registro</td>
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
    </>
  );
};

export default UsuariosAdmin;

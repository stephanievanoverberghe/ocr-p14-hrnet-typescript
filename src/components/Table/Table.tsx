'use client';

import { useReactTable, getCoreRowModel, getSortedRowModel, createColumnHelper, flexRender, SortingState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import states from 'data/states';
import type { EmployeeFormData } from 'types/employee';

interface TableProps {
    data: EmployeeFormData[];
}

const columnHelper = createColumnHelper<EmployeeFormData>();

const getStateAbbreviation = (stateName: string) => {
    const state = states.find((s) => s.name === stateName);
    return state ? state.abbreviation : stateName;
};

const Table = ({ data }: TableProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const columns = useMemo(
        () => [
            columnHelper.accessor('firstName', { header: 'Prénom' }),
            columnHelper.accessor('lastName', { header: 'Nom' }),
            columnHelper.accessor('dateOfBirth', { header: 'Date de naissance', sortingFn: 'datetime' }),
            columnHelper.accessor('department', { header: 'Département' }),
            columnHelper.accessor('street', { header: 'Rue' }),
            columnHelper.accessor('startDate', { header: "Date d'embauche", sortingFn: 'datetime' }),
            columnHelper.accessor('city', { header: 'Ville' }),
            columnHelper.accessor('state', {
                header: 'État',
                cell: (info) => getStateAbbreviation(info.getValue()),
            }),
            columnHelper.accessor('zipCode', { header: 'CP' }),
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="mt-6 hidden lg:block overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#5a6f07] text-white">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const isSorted = header.column.getIsSorted();
                                return (
                                    <th key={header.id} className="p-3 text-left">
                                        <div className="flex items-center justify-center text-sm">
                                            <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                                            <div className="ml-2 flex flex-col items-center text-[10px] cursor-pointer" onClick={() => header.column.toggleSorting()}>
                                                <i className={`fa-solid fa-caret-up ${isSorted === 'asc' ? 'text-emerald-500' : ''} block`}></i>
                                                <i className={`fa-solid fa-caret-down ${isSorted === 'desc' ? 'text-red-500' : ''} block`}></i>
                                            </div>
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-t hover:bg-gray-100">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="p-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="p-3 text-center text-gray-500">
                                Aucun employé trouvé.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

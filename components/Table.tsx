"use client";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { IoCheckmark } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import { usePathname, useRouter } from 'next/navigation';


interface StickyHeadTableProps {
    columns: any;
    rows: JSX.Element | any;
    handleConfirm?: (rowId: string) => any;
    handleUpdate?: (rowId: string) => any;
    handleDelete?: (rowId: string) => any;
    onSelect?: (rowId: string) => any;
}


export default function StickyHeadTable({ columns, rows, handleConfirm, handleUpdate,onSelect, handleDelete }: StickyHeadTableProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState(rows || []);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleViewDetail = (rowId: string) => {
        router.push(`${pathname}/${rowId}`)
        router.refresh()
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 540 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Array.isArray(data) &&
                            data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id} >
                                        {columns.map((column) => {
                                            const columnId = Array.isArray(column.id) ? column.id : [column.id];
                                            const value = columnId.reduce((acc, curr) => acc?.[curr], row);
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {
                                                        column.id === 'confirm' && (
                                                            <button className='bg-green-500 p-2 text-xs text-white flex items-center rounded gap-2' onClick={() => handleConfirm(row.id)}>
                                                                Duyệt
                                                                <IoCheckmark size={16} />
                                                            </button>
                                                        )
                                                    }
                                                    {
                                                        column.id === 'update' && (
                                                            <button className='bg-green-500 p-2 text-xs text-white flex items-center rounded gap-2' onClick={() => handleViewDetail(row.id)}>
                                                                Xem chi tiết
                                                            </button>
                                                        )
                                                    }
                                                    {
                                                        column.id === 'cancel' && (
                                                            <button className='bg-red-500 p-2 text-xs text-white flex items-center rounded gap-2' onClick={() => handleDelete(row.id)}>
                                                                Huỷ
                                                                <TiDeleteOutline size={16} />
                                                            </button>
                                                        )
                                                    }
                                                    {
                                                        column.id === 'checkbox' && (
                                                            <input  onChange={() => onSelect(row.id)} name='checkbox' type="checkbox" />
                                                        )
                                                    }
                                                    {
                                                        (column.id === 'urlImage' || column.label === "Ảnh") && (
                                                            <img className='h-[100px] w-[100px]' src={value as string} alt="img" />
                                                        )
                                                    }
                                                    {
                                                        column.id !== 'confirm' && column.id !== 'cancel' && column.id !== 'urlImage' && column.label !== "Ảnh" && (
                                                            <span className='text-center'>
                                                                {(column.format && (typeof value === 'number' || typeof value === 'string'))
                                                                    ? column.format(value as number)
                                                                    : value}
                                                            </span>
                                                        )
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
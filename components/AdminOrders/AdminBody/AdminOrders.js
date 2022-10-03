import React, { useEffect, useState } from 'react';
import { FaFileExcel } from 'react-icons/fa'
import DataTable from 'react-data-table-component';
import { BiEditAlt } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
    exportTable: 'w-[100%] flex justify-between items-center',
    select: 'px-4 py-2 rounded-md shadow-lg',
    btnExport: 'px-4 py-2 rounded-md bg-[#5842BD] text-white flex items-center gap-2 shadow-lg'
}
const columns = [
    {
        name: 'ID',
        selector: (row) => row.id,
        sortable: true,
        reorder: true
    },
    {
        name: 'Customer',
        selector: (row) => row.customer,
        sortable: true,
        reorder: true
    },
    {
        name: 'Date',
        selector: (row) => row.date,
        sortable: true,
        reorder: true
    },

    {
        name: 'Amount',
        selector: (row) => row.amount,
        sortable: true,
        reorder: true
    },

    {
        name: 'Status',
        selector: (row) => row.status,
        sortable: true,
        reorder: true
    },
    {
        name: 'Action',
        selector: (row) => row.action,
    },
];
const data = [
    {
        id: 1,
        customer: 'Beetlejuice',
        date: '1988',
        amount: '$137.00',
        status: <div className='w-full flex justify-around items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-[50%]'></div>
                    <span>Approved</span>
                </div>,
        action: <div className='w-full flex justify-around item-center gap-2'>
                    <BiEditAlt className='cursor-pointer'></BiEditAlt>
                    <AiOutlineDelete className='cursor-pointer'></AiOutlineDelete>
                </div>
    },
    {
        id: 2,
        customer: 'Ghostbusters',
        date: '1984',
        amount: '$137.00',
        status: <div className='w-full flex justify-around items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-[50%]'></div>
                    <span>Approved</span>
                </div>,
        action: <div className='w-full flex justify-around item-center gap-2'>
                    <BiEditAlt className='cursor-pointer'></BiEditAlt>
                    <AiOutlineDelete className='cursor-pointer'></AiOutlineDelete>
                </div>
    },
    {
        id: 3,
        customer: 'Beetlejuice',
        date: '1988',
        amount: '$137.00',
        status: <div className='w-full flex justify-around items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-[50%]'></div>
                    <span>Approved</span>
                </div>,
        action: <div className='w-full flex justify-around item-center gap-2'>
                    <BiEditAlt className='cursor-pointer'></BiEditAlt>
                    <AiOutlineDelete className='cursor-pointer'></AiOutlineDelete>
                </div>
    },
    {
        id: 4,
        customer: 'Ghostbusters',
        date: '1984',
        amount: '$137.00',
        status: <div className='w-full flex justify-around items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-[50%]'></div>
                    <span>Approved</span>
                </div>,
        action: <div className='w-full flex justify-around item-center gap-2'>
                    <BiEditAlt className='cursor-pointer'></BiEditAlt>
                    <AiOutlineDelete className='cursor-pointer'></AiOutlineDelete>
                </div>
    },
    {
        id: 5,
        customer: 'Beetlejuice',
        date: '1988',
        amount: '$137.00',
        status: <div className='w-full flex justify-around items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-[50%]'></div>
                    <span>Approved</span>
                </div>,
        action: <div className='w-full flex justify-around item-center gap-2'>
                    <BiEditAlt className='cursor-pointer'></BiEditAlt>
                    <AiOutlineDelete className='cursor-pointer'></AiOutlineDelete>
                </div>
    },
    {
        id: 6,
        customer: 'Ghostbusters',
        date: '1984',
        amount: '$137.00',
        status: <div className='w-full flex justify-around items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-[50%]'></div>
                    <span>Approved</span>
                </div>,
        action: <div className='w-full flex justify-around item-center gap-2'>
                    <BiEditAlt className='cursor-pointer'></BiEditAlt>
                    <AiOutlineDelete className='cursor-pointer'></AiOutlineDelete>
                </div>
    },
    {
        id: 7,
        customer: 'Beetlejuice',
        date: '1988',
        amount: '$137.00',
        status: <div className='w-full flex justify-around items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-[50%]'></div>
                    <span>Approved</span>
                </div>,
        action: <div className='w-full flex justify-around item-center gap-2'>
                    <BiEditAlt className='cursor-pointer'></BiEditAlt>
                    <AiOutlineDelete className='cursor-pointer'></AiOutlineDelete>
                </div>
    },
    {
        id: 8,
        customer: 'Ghostbusters',
        date: '1984',
        amount: '$137.00',
        status: <div className='w-full flex justify-around items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-[50%]'></div>
                    <span>Approved</span>
                </div>,
        action: <div className='w-full flex justify-around item-center gap-2'>
                    <BiEditAlt className='cursor-pointer'></BiEditAlt>
                    <AiOutlineDelete className='cursor-pointer'></AiOutlineDelete>
                </div>
    },
    {
        id: 9,
        customer: 'Beetlejuice',
        date: '1988',
        amount: '$137.00',
        status: <div className='w-full flex justify-around items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-[50%]'></div>
                    <span>Approved</span>
                </div>,
        action: <div className='w-full flex justify-around item-center gap-2'>
                    <BiEditAlt className='cursor-pointer'></BiEditAlt>
                    <AiOutlineDelete className='cursor-pointer'></AiOutlineDelete>
                </div>
    },
    {
        id: 10,
        customer: 'Ghostbusters',
        date: '1984',
        amount: '$137.00',
        status: <div className='w-full flex justify-around items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-[50%]'></div>
                    <span>Approved</span>
                </div>,
        action: <div className='w-full flex justify-around item-center gap-2'>
                    <BiEditAlt className='cursor-pointer'></BiEditAlt>
                    <AiOutlineDelete className='cursor-pointer'></AiOutlineDelete>
                </div>
    },
    {
        id: 11,
        customer: 'Ghostbusters',
        date: '1984',
        amount: '$137.00',
        status: <div className='w-full flex justify-around items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-[50%]'></div>
                    <span>Approved</span>
                </div>,
        action: <div className='w-full flex justify-around item-center gap-2'>
                    <BiEditAlt className='cursor-pointer'></BiEditAlt>
                    <AiOutlineDelete className='cursor-pointer'></AiOutlineDelete>
                </div>
    },
];

const AdminOrders = (props) => {
    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);
    return (
        // Export File Excel
        <div className={styles.wrapper}> 
            <div className={styles.exportTable}>
                <select className={styles.select} defaultValue='All' title='select'>
                    <option value="All">All</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <button className={styles.btnExport}>
                    <FaFileExcel></FaFileExcel>
                    <span>Export</span>
                </button>
            </div>
            
            {/* Orders List Table */}

            <div>
                {hasWindow && <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    selectableRows
                />}
            </div>
        </div>
    );
};

export default AdminOrders;
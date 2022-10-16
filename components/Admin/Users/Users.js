import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import Image from 'next/image';
import Logo from '../../../static/Product1.png'
import Router from 'next/router';
import { BsEye } from 'react-icons/bs';
import userService from "../../../services/api/admin/userService";
import updateField from "../../../services/api/admin/updateField";
import { useDispatch } from "react-redux";
import * as TableServices from './TableServices'
import { chooseUser, setUser } from '../../../redux/actions/userAction';

const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
    feature: 'w-[100%] flex justify-between items-center gap-4 flex-wrap',
    selectGroup: 'flex w-[100%] items-center gap-4 sm:w-[70%]',
    select: 'px-4 py-2 rounded-md shadow-lg border w-[40%] sm: w-[30%]',
    btnAdd: 'px-4 py-2 rounded-md bg-[#5842BD] text-white flex items-center gap-2 shadow-lg select-none'
}


const Users = () => {
    const dispatch = useDispatch();
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [filteredData, setFilteredData] = useState([])
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'representative': { value: null, matchMode: FilterMatchMode.IN },
        'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'activity': { value: null, matchMode: FilterMatchMode.BETWEEN }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [users2, setUsers2] = useState([]);

    useEffect(() => {
        userService.getAllUsers().then(res => {
            setUsers2(res)
        })

        // userService.getUsersAll().then(res => {
        //     setUsers2([...users2, ...res])
        //     setFilteredData([...users2, ...res])
        // })
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <div className='flex items-center w-full gap-2'>
                {/* <Image alt="flag" field="images" header="Image" src={rowData.images[0]} className={`flag flag-${rowData.images[0]}`} width={28} height={28} /> */}
                <span className="image-text">{rowData.name}</span>
            </div>
        );
    }

    const onRowSelect = (event) => {
        dispatch(chooseUser(event.data))
        Router.push(`/admin/users/${event.data.email}`)
    }
    const onRowUnselect = (event) => {
        console.log(event)
    }
    const emailBodyTemplate = (rowData) => {
        return (rowData.email);
    }

    const phoneBodyTemplate = (rowData) => {
        return (rowData.phone);
    }

    const addressBodyTemplate = (rowData) => {
        return (rowData.address);
    }

    const balanceFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />
    }

    const header = renderHeader();

    return (
        <div className={styles.wrapper}>
            <div>
                <DataTable value={users2} 
                    paginator 
                    className="p-datatable-customers" 
                    header={header} 
                    rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
                    rowsPerPageOptions={[10, 25, 50]}
                    dataKey="email"
                    rowHover 
                    selectionMode="single"
                    selection={selectedCustomers} 
                    onSelectionChange={e => setSelectedCustomers(e.value)}
                    onRowSelect={onRowSelect} 
                    onRowUnselect={onRowUnselect}
                    globalFilterFields={['name', 'email', 'address', 'phone', 'date']} 
                    emptyMessage="No customers found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    editMode="row"
                    filters={filters}
                    filterDisplay="menu"
                    // loading={loading}
                    responsiveLayout="scroll"
                >
                    <Column
                        field="images"
                        header="Image"
                        body={TableServices.imageBodyTemplate}>
                    </Column>
                    <Column
                        field="name"
                        header="Name"
                        headerStyle={{ width: "100%", minWidth: "8rem" }}
                        sortable filterPlaceholder="Search by name"
                        body={nameBodyTemplate} />
                    <Column
                        field="email"
                        header="Email"
                        headerStyle={{ width: "100%", minWidth: "8rem" }}
                        sortable dataType="email"
                        body={emailBodyTemplate} />
                    <Column
                        field="address"
                        header="Address"
                        headerStyle={{ width: "90%", minWidth: "18rem" }}
                        sortable filterMenuStyle={{ width: '10rem' }}
                        style={{ minWidth: '16rem' }}
                        body={addressBodyTemplate} />
                    <Column
                        field="userDate"
                        header="Date"
                        headerStyle={{ width: "20%", minWidth: "8rem" }}
                        sortable filterField="date"
                        dataType="date"/>
                    <Column
                        field="phone"
                        header="Phone"
                        sortable dataType="phone"
                        style={{ minWidth: '6rem' }}
                        body={phoneBodyTemplate}
                        filterElement={balanceFilterTemplate} />
                </DataTable>
            </div>
        </div>
    );
}
export default Users;
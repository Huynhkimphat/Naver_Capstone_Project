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

const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
    feature: 'w-[100%] flex justify-between items-center gap-4 flex-wrap',
    selectGroup: 'flex w-[100%] items-center gap-4 sm:w-[70%]',
    select: 'px-4 py-2 rounded-md shadow-lg border w-[40%] sm: w-[30%]',
    btnAdd: 'px-4 py-2 rounded-md bg-[#5842BD] text-white flex items-center gap-2 shadow-lg select-none'
}


const Users = () => {
    const [selectedCustomers, setSelectedCustomers] = useState(null);
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
    const representatives = [
        { name: "Amy Elsner", image: 'amyelsner.png' },
        { name: "Anna Fali", image: 'annafali.png' },
        { name: "Asiya Javayant", image: 'asiyajavayant.png' },
        { name: "Bernardo Dominic", image: 'bernardodominic.png' },
        { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
        { name: "Ioni Bowcher", image: 'ionibowcher.png' },
        { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
        { name: "Onyama Limba", image: 'onyamalimba.png' },
        { name: "Stephen Shaw", image: 'stephenshaw.png' },
        { name: "XuXue Feng", image: 'xuxuefeng.png' }
    ];

    const statuses = [
        'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
    ];

    const [customers2, setCustomers2] = useState(null);

    useEffect(() => {
        setCustomers2([
            {
                id: "1000",
                "name": "Josephine Darakjy",
                "country": {
                    "name": "Algeria",
                    "code": "dz"
                },
                "company": "Benton, John B Jr",
                "date": "2015-09-13",
                "status": "unqualified",
                "verified": true,
                "activity": 17,
                "representative": {
                    "name": "Ioni Bowcher",
                    "image": "ionibowcher.png"
                },
                "balance": 70663,
                "email": "quockhanh123@gmail.com",
                "address": "289 Hoàng Văn Thụ",
                "phone": "0973256111"
            },
            {
                id: "1001",
                "name": "Leota Dilliard",
                "country": {
                    "name": "Egypt",
                    "code": "eg"
                },
                "company": "Chanay, Jeffrey A Esq",
                "date": "2019-02-09",
                "status": "proposal",
                "verified": true,
                "activity": 0,
                "representative": {
                    "name": "Amy Elsner",
                    "image": "amyelsner.png"
                },
                "balance": 82429,
                "email": "hoaian123@gmail.com",
                "address": "289 Hoàng Văn Thụ",
                "phone": "0973256222"
            },
            {
                id: "1002",
                "name": "Art Venere",
                "country": {
                    "name": "Panama",
                    "code": "pa"
                },
                "company": "Chemel, James L Cpa",
                "date": "2017-05-13",
                "status": "qualified",
                "verified": false,
                "activity": 63,
                "representative": {
                    "name": "Asiya Javayant",
                    "image": "asiyajavayant.png"
                },
                "balance": 28334,
                "email": "quockhanh123@gmail.com",
                "address": "289 Hoàng Văn Thụ",
                "phone": "0973256333"
            },
            {
                id: "1003",
                "name": "Lenna Paprocki",
                "country": {
                    "name": "Slovenia",
                    "code": "si"
                },
                "company": "Feltz Printing Service",
                "date": "2020-09-15",
                "status": "new",
                "verified": false,
                "activity": 37,
                "representative": {
                    "name": "Xuxue Feng",
                    "image": "xuxuefeng.png"
                },
                "balance": 88521,
                "email": "hoaian123@gmail.com",
                "address": "289 Hoàng Văn Thụ",
                "phone": "0973256444"
            },
            {
                id: "1004",
                "name": "Donette Foller",
                "country": {
                    "name": "South Africa",
                    "code": "za"
                },
                "company": "Printing Dimensions",
                "date": "2016-05-20",
                "status": "proposal",
                "verified": true,
                "activity": 33,
                "representative": {
                    "name": "Asiya Javayant",
                    "image": "asiyajavayant.png"
                },
                "balance": 93905,
                "email": "quockhanh123@gmail.com",
                "address": "289 Hoàng Văn Thụ",
                "phone": "0973256555",
                "myorder": "nvklal433",
                "createdBy": "Phạm Nam",
                "password": "43987597436"
            },
            {
                id: "1005",
                "name": "Simona Morasca",
                "country": {
                    "name": "Egypt",
                    "code": "eg"
                },
                "company": "Chapman, Ross E Esq",
                "date": "2018-02-16",
                "status": "qualified",
                "verified": false,
                "activity": 68,
                "representative": {
                    "name": "Ivan Magalhaes",
                    "image": "ivanmagalhaes.png"
                },
                "balance": 93905,
                "email": "hoaian123@gmail.com",
                "address": "289 Hoàng Văn Thụ",
                "phone": "0973256666",
                "myorder": "nvklal433",
                "createdBy": "Phạm Nam",
                "password": "43987597436"
            },
            {
                id: "1006",
                "name": "Mitsue Tollner",
                "country": {
                    "name": "Paraguay",
                    "code": "py"
                },
                "company": "Morlong Associates",
                "date": "2018-02-19",
                "status": "renewal",
                "verified": true,
                "activity": 54,
                "representative": {
                    "name": "Ivan Magalhaes",
                    "image": "ivanmagalhaes.png"
                },
                "balance": 93905,
                "email": "hoaian123@gmail.com",
                "address": "289 Hoàng Văn Thụ",
                "phone": "0973256777",
                "myorder": "nvklal433",
                "createdBy": "Phạm Nam",
                "password": "43987597436"
            },
            {
                id: "1007",
                "name": "Leota Dilliard",
                "country": {
                    "name": "Serbia",
                    "code": "rs"
                },
                "company": "Commercial Press",
                "date": "2019-08-13",
                "status": "renewal",
                "verified": true,
                "activity": 69,
                "representative": {
                    "name": "Onyama Limba",
                    "image": "onyamalimba.png"
                },
                "balance": 93905,
                "email": "hoaian123@gmail.com",
                "address": "289 Hoàng Văn Thụ",
                "phone": "0973256777",
                "myorder": "nvklal433",
                "createdBy": "Phạm Nam",
                "password": "43987597436"
            },
            {
                id: "1008",
                "name": "Sage Wieser",
                "country": {
                    "name": "Egypt",
                    "code": "eg"
                },
                "company": "Truhlar And Truhlar Attys",
                "date": "2018-11-21",
                "status": "unqualified",
                "verified": true,
                "activity": 76,
                "representative": {
                    "name": "Ivan Magalhaes",
                    "image": "ivanmagalhaes.png"
                },
                "balance": 93905,
                "email": "quockhanh123@gmail.com",
                "address": "289 Hoàng Văn Thụ",
                "phone": "0973256777",
                "myorder": "nvklal433",
                "createdBy": "Phạm Nam",
                "password": "43987597436"
            },
            {
                id: "1010",
                "name": "Kris Marrier",
                "country": {
                    "name": "Mexico",
                    "code": "mx"
                },
                "company": "King, Christopher A Esq",
                "date": "2015-07-07",
                "status": "proposal",
                "verified": false,
                "activity": 3,
                "representative": {
                    "name": "Onyama Limba",
                    "image": "onyamalimba.png"
                },
                "balance": 93905,
                "email": "quockhanh123@gmail.com",
                "address": "289 Hoàng Văn Thụ",
                "phone": "0973256777",
                "myorder": "nvklal433",
                "createdBy": "Phạm Nam",
                "password": "43987597436"
            },
            {
                id: "1011",
                "name": "Minna Amigon",
                "country": {
                    "name": "Romania",
                    "code": "ro"
                },
                "company": "Dorl, James J Esq",
                "date": "2018-11-07",
                "status": "qualified",
                "verified": false,
                "activity": 38,
                "representative": {
                    "name": "Anna Fali",
                    "image": "annafali.png"
                },
                "balance": 93905,
                "email": "quockhanh123@gmail.com",
                "address": "289 Hoàng Văn Thụ",
                "phone": "0973256777",
                "myorder": "nvklal433",
                "createdBy": "Phạm Nam",
                "password": "43987597436"
            },
            {
                id: "1012",
                "name": "Abel Maclead",
                "country": {
                    "name": "Singapore",
                    "code": "sg"
                },
                "company": "Rangoni Of Florence",
                "date": "2017-03-11",
                "status": "qualified",
                "verified": true,
                "activity": 87,
                "representative": {
                    "name": "Bernardo Dominic",
                    "image": "bernardodominic.png"
                },
                "balance": 93905,
                "email": "quockhanh123@gmail.com",
                "address": "289 Hoàng Văn Thụ",
                "phone": "0973256777",
                "myorder": "nvklal433",
                "createdBy": "Phạm Nam",
                "password": "43987597436"
            },
        ])
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
                <Image alt="flag" src={Logo} className={`flag flag-${rowData.country.code}`} width={28} height={28} />
                <span className="image-text">{rowData.name}</span>
            </div>
        );
    }
    const onRowSelect = (event) => {
        Router.push(`/admin/users/${event.data.id}`)
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
                <DataTable value={customers2} 
                    paginator 
                    className="p-datatable-customers" 
                    header={header} 
                    rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
                    rowsPerPageOptions={[10, 25, 50]}
                    dataKey="id"
                    rowHover 
                    selectionMode="single"
                    selection={selectedCustomers} 
                    onSelectionChange={e => setSelectedCustomers(e.value)}
                    onRowSelect={onRowSelect} 
                    onRowUnselect={onRowUnselect}
                    globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']} 
                    emptyMessage="No customers found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    editMode="row"
                    responsiveLayout="scroll"
                >
                    <Column
                        field="name"
                        header="Name"
                        headerStyle={{ width: "100%", minWidth: "8rem" }}
                        sortable filterPlaceholder="Search by name"
                        body={nameBodyTemplate} />
                    <Column
                        field="email"
                        header="Email"
                        headerStyle={{ width: "30%", minWidth: "8rem" }}
                        sortable dataType="email"
                        body={emailBodyTemplate} />
                    <Column
                        field="address"
                        header="Address"
                        headerStyle={{ width: "100%", minWidth: "8rem" }}
                        sortable filterMenuStyle={{ width: '10rem' }}
                        style={{ minWidth: '8rem' }}
                        body={addressBodyTemplate} />
                    <Column
                        field="date"
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
                    <Column
                        field="detail"
                        headerStyle={{ width: "10%", minWidth: "1rem" }}
                        bodyStyle={{ textAlign: "center"}}
                        body={<BsEye></BsEye>}
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
}
export default Users;
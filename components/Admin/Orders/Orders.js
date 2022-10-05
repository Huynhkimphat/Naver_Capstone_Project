import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import React, { useEffect, useState, useRef } from 'react';
import { FaFileExcel } from 'react-icons/fa'
// import DataTable from 'react-data-table-component';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Ripple } from "primereact/ripple";
import Router from "next/router";
import { BsEye } from "react-icons/bs";
const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
    exportTable: 'w-[100%] flex justify-between items-center',
    select: 'px-4 py-2 rounded-md shadow-lg',
    btnExport: 'px-4 py-2 rounded-md bg-[#5842BD] text-white flex items-center gap-2 shadow-lg'
}

const AdminOrders = (props) => {
    const [products2, setProducts2] = useState(null);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const [selectedProduct, setSelectedProduct] = useState(null)
    const statuses = [
        { label: "Approved", value: "APPROVED" },
        { label: "Pending", value: "PENDING" },
        { label: "Reject", value: "REJECT" }
    ];
    const dataTableFuncMap = {
        products2: setProducts2,
    };
    const template = {
        layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
        'PrevPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-3">Previous</span>
                    <Ripple />
                </button>
            )
        },
        'NextPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-3">Next</span>
                    <Ripple />
                </button>
            )
        },
        'PageLinks': (options) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                const className = classNames(options.className, { 'p-disabled': true });

                return <span className={className} style={{ userSelect: 'none' }}>...</span>;
            }

            return (
                <button type="button" className={options.className} onClick={options.onClick}>
                    {options.page + 1}
                    <Ripple />
                </button>
            )
        },
        'RowsPerPageDropdown': (options) => {
            const dropdownOptions = [
                { label: 5, value: 5 },
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 'All', value: options.totalRecords }
            ];

            return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />;
        },
        'CurrentPageReport': (options) => {
            return (
                <span className="mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    Go to <InputText size="2" className="ml-1" value={currentPage} tooltip={pageInputTooltip}
                        onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={onPageInputChange} />
                </span>
            )
        }
    };
    const onCustomPage = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        setCurrentPage(event.page + 1);
    }
    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
    }
    const onPageInputKeyDown = (event, options) => {
        if (event.key === 'Enter') {
            const page = parseInt(currentPage);
            if (page < 1 || page > options.totalPages) {
                setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
            }
            else {
                const first = currentPage ? options.rows * (page - 1) : 0;

                setFirst(first);
                setPageInputTooltip('Press \'Enter\' key to go to this page.');
            }
        }
    }
    useEffect(() => {
        setProducts2([
            {
                id: "1000",
                code: "f230fh0g3",
                name: "Bamboo Watch",
                description: "Product Description",
                image: "bamboo-watch.jpg",
                date: '1998',
                price: 65,
                category: "Accessories",
                quantity: 24,
                inventoryStatus: "INSTOCK",
                rating: 5,
                orderstatus: 'APPROVED'
            },
            {
                id: "1001",
                code: "nvklal433",
                name: "Black Watch",
                description: "Product Description",
                image: "black-watch.jpg",
                date: "1997",
                price: 72,
                category: "Accessories",
                quantity: 61,
                inventoryStatus: "OUTOFSTOCK",
                rating: 4,
                orderstatus: 'REJECT'
            },
            {
                id: "1001",
                code: "nvklal433",
                name: "Black Watch",
                description: "Product Description",
                image: "black-watch.jpg",
                date: "1997",
                price: 72,
                category: "Accessories",
                quantity: 61,
                inventoryStatus: "OUTOFSTOCK",
                rating: 4,
                orderstatus: 'REJECT'
            },
            {
                id: "1001",
                code: "nvklal433",
                name: "Black Watch",
                description: "Product Description",
                image: "black-watch.jpg",
                date: "1997",
                price: 72,
                category: "Accessories",
                quantity: 61,
                inventoryStatus: "OUTOFSTOCK",
                rating: 4,
                orderstatus: 'REJECT'
            },
            {
                id: "1001",
                code: "nvklal433",
                name: "Black Watch",
                description: "Product Description",
                image: "black-watch.jpg",
                date: "1997",
                price: 72,
                category: "Accessories",
                quantity: 61,
                inventoryStatus: "OUTOFSTOCK",
                rating: 4,
                orderstatus: 'REJECT'
            },
            {
                id: "1001",
                code: "nvklal433",
                name: "Black Watch",
                description: "Product Description",
                image: "black-watch.jpg",
                date: "1997",
                price: 72,
                category: "Accessories",
                quantity: 61,
                inventoryStatus: "OUTOFSTOCK",
                rating: 4,
                orderstatus: 'REJECT'
            },
            {
                id: "1001",
                code: "nvklal433",
                name: "Black Watch",
                description: "Product Description",
                image: "black-watch.jpg",
                date: "1997",
                price: 72,
                category: "Accessories",
                quantity: 61,
                inventoryStatus: "OUTOFSTOCK",
                rating: 4,
                orderstatus: 'REJECT'
            },
            {
                id: "1001",
                code: "nvklal433",
                name: "Black Watch",
                description: "Product Description",
                image: "black-watch.jpg",
                date: "1997",
                price: 72,
                category: "Accessories",
                quantity: 61,
                inventoryStatus: "OUTOFSTOCK",
                rating: 4,
                orderstatus: 'REJECT'
            }
        ])
    }, []);

    const getStatusLabel = (status) => {
        switch (status) {
            case "APPROVED":
                return "Approved";

            case "REJECT":
                return "Reject";

            case "PENDING":
                return "Pending";

            default:
                return "NA";
        }
    };
    const onRowEditComplete = (e) => {
        let _products2 = [...products2];
        let { newData, index } = e;

        _products2[index] = newData;

        setProducts2(_products2);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };
    const statusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                optionLabel="label"
                optionValue="value"
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select a Status"
                itemTemplate={(option) => {
                    return (
                        <span
                            className={`product-badge status-${option.value.toLowerCase()}`}
                        >
                            {option.label}
                        </span>
                    );
                }}
            />
        );
    };

    const priceEditor = (options) => {
        return (
            <InputNumber
                value={options.value}
                onValueChange={(e) => options.editorCallback(e.value)}
                mode="currency"
                currency="USD"
                locale="en-US"
            />
        );
    };

    const statusBodyTemplate = (rowData) => {
        return getStatusLabel(rowData.orderstatus);
    };

    const priceBodyTemplate = (rowData) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(rowData.price);
    };
    const onCellSelect = (e) => {
        setSelectedProduct(e.value)
        console.log(e.value)
        const path = e.value.rowData.code
        if(e.value.field==='detail')
            Router.push(`/admin/order/${path}`)
    }
    return (
        // Export File Excel
        <div className={styles.wrapper}>
            <div className={styles.exportTable}>
                <select className={styles.select} defaultValue='All'>
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
                <DataTable
                    value={products2}
                    editMode="row"
                    onRowEditComplete={onRowEditComplete}
                    responsiveLayout="scroll"
                    paginator
                    paginatorTemplate={template}
                    first={first} rows={rows}
                    onPage={onCustomPage}
                    selectionMode="single"
                    cellSelection
                    selection={selectedProduct}
                    onSelectionChange={onCellSelect}
                    dataKey="code"
                >
                    <Column
                        field="code"
                        header="Code"
                        sortable
                        editor={(options) => textEditor(options)}
                        style={{ width: "20%" }}
                    ></Column>
                    <Column
                        field="name"
                        header="Name"
                        sortable
                        editor={(options) => textEditor(options)}
                        style={{ width: "20%" }}
                    ></Column>
                    <Column
                        field="date"
                        header="Date"
                        sortable
                        style={{ width: "20%" }}
                    ></Column>
                    <Column
                        field="price"
                        header="Amount"
                        sortable
                        body={priceBodyTemplate}
                        editor={(options) => priceEditor(options)}
                        style={{ width: "20%" }}
                    ></Column>
                    <Column
                        field="orderstatus"
                        header="Status"
                        sortable
                        body={statusBodyTemplate}
                        editor={(options) => statusEditor(options)}
                        style={{ width: "20%" }}
                    ></Column>
                    <Column
                        rowEditor
                        headerStyle={{ width: "10%", minWidth: "8rem" }}
                        bodyStyle={{ textAlign: "center" }}
                    ></Column>
                    <Column
                        field="detail"
                        headerStyle={{ width: "10%", minWidth: "3rem" }}
                        bodyStyle={{ textAlign: "center" }}
                        body={<BsEye></BsEye>}
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default AdminOrders;
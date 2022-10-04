import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import React, { useEffect, useState, useRef } from 'react';
import { FaFileExcel } from 'react-icons/fa'
// import DataTable from 'react-data-table-component';
import { BiEditAlt } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
    exportTable: 'w-[100%] flex justify-between items-center',
    select: 'px-4 py-2 rounded-md shadow-lg',
    btnExport: 'px-4 py-2 rounded-md bg-[#5842BD] text-white flex items-center gap-2 shadow-lg'
}

const AdminOrders = (props) => {
    const [products2, setProducts2] = useState(null);
    const statuses = [
        { label: "Approved", value: "APPROVED" },
        { label: "Pending", value: "PENDING" },
        { label: "Reject", value: "REJECT" }
    ];
    const dataTableFuncMap = {
        products2: setProducts2,
    };
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
                orderstatus:'APPROVED'
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
                orderstatus:'REJECT'
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
                    dataKey="id"
                    onRowEditComplete={onRowEditComplete}
                    responsiveLayout="scroll"
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
                </DataTable>
            </div>
        </div>
    );
};

export default AdminOrders;
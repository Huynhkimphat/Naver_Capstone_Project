import React, { useEffect, useState } from 'react';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { IoIosAddCircle } from 'react-icons/io'
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
    feature: 'w-[100%] flex justify-between items-center gap-4 flex-wrap',
    selectGroup: 'flex w-[100%] items-center gap-4 sm:w-[70%]',
    select: 'px-4 py-2 rounded-md shadow-lg border w-[40%] sm: w-[30%]',
    btnAdd: 'px-4 py-2 rounded-md bg-[#5842BD] text-white flex items-center gap-2 shadow-lg select-none'
}


const AdProducts = (props) => {

    const [products2, setProducts2] = useState(null);
    const statuses = [
        { label: "In Stock", value: "INSTOCK" },
        { label: "Low Stock", value: "LOWSTOCK" },
        { label: "Out of Stock", value: "OUTOFSTOCK" }
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
                price: 65,
                category: "Accessories",
                quantity: 24,
                inventoryStatus: "INSTOCK",
                rating: 5,
            },
            {
                id: "1001",
                code: "nvklal433",
                name: "Black Watch",
                description: "Product Description",
                image: "black-watch.jpg",
                price: 72,
                category: "Accessories",
                quantity: 61,
                inventoryStatus: "OUTOFSTOCK",
                rating: 4,
            }
        ])
    }, []);

    const getStatusLabel = (status) => {
        switch (status) {
            case "INSTOCK":
                return "In Stock";

            case "LOWSTOCK":
                return "Low Stock";

            case "OUTOFSTOCK":
                return "Out of Stock";

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
        return getStatusLabel(rowData.inventoryStatus);
    };

    const priceBodyTemplate = (rowData) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(rowData.price);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.feature}>
                <div className={styles.selectGroup}>
                    <select className={styles.select} title='Category'>
                        <option>Category</option>
                        <option>All</option>
                        <option>Chair</option>
                        <option>Table</option>
                        <option>Decor Items</option>
                        <option>Brand</option>
                    </select>
                    <select className={styles.select}>
                        <option>Status</option>
                        <option>All</option>
                        <option>In Stock</option>
                        <option>Out of Stock</option>
                    </select>
                </div>
                <button className={styles.btnAdd}>
                    <IoIosAddCircle size='20px'></IoIosAddCircle>
                    <span>Add Product</span>
                </button>
            </div>
            <div>
                <DataTable
                    value={products2}
                    editMode="row"
                    dataKey="id"
                    onRowEditComplete={onRowEditComplete}
                    responsiveLayout="scroll"
                >
                    <Column
                        field="id"
                        header="ID"
                        sortable
                        editor={(options) => textEditor(options)}
                        style={{ width: "15%" }}
                    ></Column>
                    <Column
                        field="name"
                        header="Name"
                        sortable
                        editor={(options) => textEditor(options)}
                        style={{ width: "15%" }}
                    ></Column>
                    <Column
                        field="category"
                        header="Category"
                        sortable
                        style={{ width: "15%" }}
                    ></Column>
                    <Column
                        field="inventoryStatus"
                        header="Status"
                        sortable
                        body={statusBodyTemplate}
                        editor={(options) => statusEditor(options)}
                        style={{ width: "15%" }}
                    ></Column>
                    <Column
                        field="price"
                        header="Price"
                        sortable
                        body={priceBodyTemplate}
                        editor={(options) => priceEditor(options)}
                        style={{ width: "15%" }}
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

export default AdProducts;
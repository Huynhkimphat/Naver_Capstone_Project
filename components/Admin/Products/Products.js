import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import * as TableServices from './TableServices'
import Feature from './Feature/Feature';
import { BsEye } from 'react-icons/bs';
import AppSelector from "../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import productService from "../../../services/api/productService";
import { setProductList } from "../../../redux/actions/productAction";
import { Ripple } from "primereact/ripple";
import { InputText } from "primereact/inputtext";
import { classNames } from 'primereact/utils';
const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
    dataTable: 'mt-4',
    instock: "bg-green-500 px-2 py-1 rounded-lg text-white font-semibold",
    outofstock: "bg-red-500 px-2 py-1 rounded-lg text-white font-semibold",
    pending: "bg-yellow-500 px-2 py-1 rounded-lg text-white font-semibold"
}

const AdProducts = (props) => {
    const [products, setProducts] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const [selectedProduct, setSelectedProduct] = useState(null)
    const productList = useSelector((state) => AppSelector.getProduct(state));
    const dispatch = useDispatch();
    const statuses = [
        "INSTOCK",
        "OUTOFSTOCK",
    ];

    const statuses2 = [
        { label: "INSTOCK", value: "INSTOCK" },
        { label: "OUTOFSTOCK", value: "OUTOFSTOCK" },
    ];

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
                const className = classNames(options.className, { '': true });

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

    const onRowEditComplete = (e) => {
        let _products = [...products];
        let { newData, index } = e;

        _products[index] = newData;

        setProducts(_products);
    };
    const onCellSelect = (e) => {
        setSelectedProduct(e.value)
        const path = e.value.rowData.id
        if (e.value.field === 'detail')
            Router.push(`/admin/product/update/${path}`)
    }

    const statusBodyTemplate = (rowData) => {
        return (
            <span value={rowData.quantity ? "INSTOCK" : "OUTOFSTOCK"}
                className={`${rowData.quantity ? styles.instock : styles.outofstock}`}>
                {rowData.quantity ? "INSTOCK" : "OUTOFSTOCK"}
            </span>
        );
    };
    const statusItemTemplate = (option) => {
        return <span className={`${option}`}>{option}</span>;
    };
    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e) => { options.filterApplyCallback(e.value) }}
                itemTemplate={statusItemTemplate}
                placeholder="Select a Status"
                showClear
            />
        );
    };

    useEffect(() => {
        productService.getAllProducts().then(res => {
            productService.getAllProducts().then(res => {
                const pdl = res.map((product, index) => {
                    return {
                        ...product,
                        status: product.quantity ? "INSTOCK" : "OUTOFSTOCK"
                    }
                })
                dispatch(setProductList(pdl))
            })
        })
    }, [])
    return (
        <div className={styles.wrapper}>
            {/* Feature */}
            <Feature></Feature>
            {/* Datatable */}
            <div className={styles.dataTable}>
                <DataTable
                    value={productList}
                    editMode="row"
                    editable="true"
                    dataKey="id"
                    onRowEditComplete={onRowEditComplete}
                    paginator
                    paginatorTemplate={template}
                    rowsPerPageOptions={[5, 10, 20]}
                    first={first} rows={rows}
                    onPage={onCustomPage}
                    responsiveLayout="scroll"
                    selectionMode="single"
                    cellSelection
                    selection={selectedProduct}
                    onSelectionChange={onCellSelect}
                    filterDisplay="row"
                    showGridlines
                >
                    <Column
                        field="id"
                        header="ID"
                        sortable
                        filter
                        filterPlaceholder="Search by id"
                        editor={(options) => TableServices.textEditor(options)}
                        style={{
                            width: "20%",
                            minWidth: "16rem",
                            padding: "0 0 0 10px",
                            textAlign: "center"
                        }}
                    ></Column>
                    <Column
                        field="images"
                        header="Image"
                        body={TableServices.imageBodyTemplate}>
                    </Column>
                    <Column
                        field="name"
                        header="Name"
                        headerStyle={{ width: "20%", minWidth: "8rem" }}
                        sortable
                        filter
                        filterPlaceholder="Name"
                        editor={(options) => TableServices.textEditor(options)}
                        style={{
                            width: "20%",
                            minWidth: "15rem",
                            padding: "0 0 0 10px",
                            textAlign: "center"
                        }}
                    ></Column>
                    <Column
                        field="category"
                        header="Category"
                        sortable
                        filter
                        filterPlaceholder="Category"
                        style={{
                            width: "16%",
                            minWidth: "14rem",
                            padding: "0 0 0 10px",
                            textAlign: "center"
                        }}

                    ></Column>
                    <Column
                        field="status"
                        header="Status"
                        sortable
                        showFilterMenu={false}
                        filterMenuStyle={{ width: "14rem" }}
                        filter
                        body={statusBodyTemplate}
                        filterElement={statusRowFilterTemplate}
                        style={{
                            width: "20%",
                            minWidth: "8rem",
                            padding: "5px 0 5px 10px",
                            textAlign: "center"
                        }}
                    ></Column>
                    <Column
                        field="price"
                        header="Price"
                        sortable
                        body={TableServices.priceBodyTemplate}
                        editor={(options) => TableServices.priceEditor(options)}
                        filter
                        filterPlaceholder="Price"
                        style={{
                            width: "20%",
                            minWidth: "14rem",
                            padding: "0 0 0 10px",
                            textAlign: "center"
                        }}
                    ></Column>

                    <Column
                        field="detail"
                        headerStyle={{ width: "10%", minWidth: "1rem" }}
                        bodyStyle={{ textAlign: "center" }}
                        body={<BsEye></BsEye>}
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default AdProducts;

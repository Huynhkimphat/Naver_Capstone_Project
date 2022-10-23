import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.css";
import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Ripple } from "primereact/ripple";
import Router from "next/router";
import { BsEye } from "react-icons/bs";
import orderService from "../../../services/api/admin/orderService";
import updateField from "../../../services/api/admin/updateField";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { chooseOrder } from "../../../redux/actions/orderAction";
import { classNames } from "primereact/utils";

const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md gap-4',
    exportTable: 'w-[100%] flex justify-end items-center gap-2',
    select: 'px-4 py-2 rounded-md shadow-lg',
    btnExport: 'px-4 py-2 rounded-md bg-[#5842BD] text-white flex items-center gap-2 shadow-lg',
    approved: "bg-green-500 px-2 py-1 rounded-lg text-white font-semibold",
    reject: "bg-red-500 px-2 py-1 rounded-lg text-white font-semibold",
    pending: "bg-yellow-500 px-2 py-1 rounded-lg text-white font-semibold"
}

const AdminOrders = (props) => {
    const dispatch = useDispatch();
    const [products2, setProducts2] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [filteredData, setFilteredData] = useState([])
    const dt = useRef(null);
    const cols = [
        { field: 'code', header: 'Code' },
        { field: 'date', header: 'Date' },
        { field: 'totalPrice', header: 'Price' },
        { field: 'status', header: 'Status' }
    ];
    const statuses = [
        "APPROVED",
        "PENDING",
        "REJECT"
    ];
    const statuses2 = [
        { label: "APPROVED", value: "APPROVED" },
        { label: "PENDING", value: "PENDING" },
        { label: "REJECT", value: "REJECT" }
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
    useEffect(() => {
        orderService.getOrdersAll().then(res => {
            const orderExcuted = res.map((ord) => {
                const orDate = (new Date(ord.date.seconds * 1000)).toString().split("(")[0];
                return {
                    ...ord,
                    date: orDate
              }
            })
            setProducts2([...products2, ...orderExcuted])
            setFilteredData([...products2, ...orderExcuted])
        })
    }, []);

    const onRowEditComplete = (e) => {
        let _products2 = [...products2];
        let { newData, index } = e;

        _products2[index] = newData;

        setProducts2(_products2);
    };
    const statusEditor = (options) => {
        const handleChange = (e) => {
            // ID: options.rowData.code
            const orderID = options.rowData.code;
            // Value: e.value
            const value = e.value;
            options.editorCallback(e.value)
            console.log(orderID, value, options)
            updateField.byId(orderID, "status", value);
        }
        return (
            <Dropdown
                value={options.value}
                options={statuses2}
                optionLabel="label"
                optionValue="value"
                onChange={handleChange}
                placeholder="Select a Status"
                itemTemplate={(option) => {
                    return (
                        <span
                            className={`product-badge status-${option.value.toLowerCase()}`}>
                            {option.label}
                        </span>
                    );
                }}
            />
        );
    };

    const statusBodyTemplate = (rowData) => {
        const cssStyle = rowData.status.toLowerCase();
        return (
            <span className={styles[cssStyle]}>
                {rowData.status}
            </span>
        );
    };

    const priceBodyTemplate = (rowData) => {
        return new Intl.NumberFormat("vi", {
            style: "currency",
            currency: "VND"
        }).format(rowData.totalPrice);
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
    const onCellSelect = (e) => {
        setSelectedProduct(e.value)
        const path = e.value.rowData.code
        dispatch(chooseOrder(e.value.rowData))
        if (e.value.field === 'detail')
            Router.push(`/admin/order/${path}`)
    }

    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));
    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, filteredData);
                doc.save('products.pdf');
            })
        })
    }
    const exportCSV = () => {
        dt.current.exportCSV();
    }
    return (
        // Export File Excel & PDF
        <div className={styles.wrapper}>
            <div className={styles.exportTable}>
                <Button type="button"
                    icon="pi pi-file-pdf"
                    onClick={exportPdf}
                    className="p-button-warning mr-2"
                />
                <Button
                    icon="pi pi-file-excel"
                    className="p-button-success"
                    onClick={exportCSV} />
            </div>
            {/* Orders List Table */}
            <div>
                <DataTable
                    ref={dt}
                    value={products2}
                    editMode="row"
                    editable="true"
                    onRowEditComplete={onRowEditComplete}
                    responsiveLayout="scroll"
                    paginator
                    paginatorTemplate={template}
                    first={first}
                    rows={rows}
                    onPage={onCustomPage}
                    selectionMode="single"
                    cellSelection
                    filterDisplay="row"
                    selection={selectedProduct}
                    onSelectionChange={onCellSelect}
                    showGridlines
                    dataKey="code"
                    emptyMessage="No orders found."
                    onValueChange={ftData => setFilteredData(ftData)}
                >
                    <Column
                        field="code"
                        header="Code"
                        sortable
                        filter
                        filterPlaceholder="Search by code"
                        // editor={(options) => textEditor(options)}
                        style={{
                            width: "20%",
                            minWidth: "14rem",
                            padding: "0 0 0 10px",
                            textAlign: "center"
                        }}
                    ></Column>
                    <Column
                        field="date"
                        header="Date"
                        sortable
                        filter
                        filterPlaceholder="Date"
                        style={{
                            width: "20%",
                            minWidth: "14rem",
                            padding: "0 0 0 10px",
                            textAlign: "center"
                        }}
                    ></Column>
                    <Column
                        field="totalPrice"
                        header="Price"
                        sortable
                        body={priceBodyTemplate}
                        // editor={(options) => priceEditor(options)}
                        filter
                        filterPlaceholder="Price"
                        style={{
                            width: "20%",
                            minWidth: "10rem",
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
                        editor={(options) => statusEditor(options)}
                        filterElement={statusRowFilterTemplate}
                        style={{
                            width: "20%",
                            minWidth: "8rem",
                            padding: "5px 0 5px 10px",
                            textAlign: "center"
                        }}
                    ></Column>
                    {/* <Column
                        rowEditor
                        headerStyle={{ width: "10%", minWidth: "8rem" }}
                        bodyStyle={{ textAlign: "center" }}
                    ></Column> */}
                    <Column
                        field="detail"
                        header="Detail"
                        headerStyle={{ width: "10%", minWidth: "3rem", textAlign: "center" }}
                        bodyStyle={{
                            textAlign: "center",
                            textAlign: "center"
                        }}
                        body={<BsEye className="m-auto"></BsEye>}
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default AdminOrders;
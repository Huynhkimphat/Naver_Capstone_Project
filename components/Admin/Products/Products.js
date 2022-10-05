import React, { useEffect, useState, useRef } from 'react';
import Router from 'next/router';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Ripple } from 'primereact/ripple';
import { data } from './Data'
import * as TableServices from './TableServices'
import Feature from './Feature/Feature';
import { BsEye } from 'react-icons/bs';

const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
    dataTable: 'mt-4'
}

const AdProducts = (props) => {

    const [products2, setProducts2] = useState(null);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const [selectedProduct, setSelectedProduct] = useState(null)

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
        let _products2 = [...products2];
        let { newData, index } = e;

        _products2[index] = newData;

        setProducts2(_products2);
    };

    // Paginator
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

    useEffect(() => {
        setProducts2(data)
    }, []);

    useEffect(() => {
    }, [products2])

    const onCellSelect = (e) => {
        setSelectedProduct(e.value)
        console.log(e.value.rowData.id)
        const path = e.value.rowData.id
        if(e.value.field==='detail')
            Router.push(`/admin/product/update/${path}`)
    }
    return (
        <div className={styles.wrapper}>
            {/* Feature */}
            <Feature></Feature>
            {/* Datatable */}
            <div className={styles.dataTable}>
                <DataTable
                    value={products2}
                    editMode="row"
                    dataKey="id"
                    onRowEditComplete={onRowEditComplete}
                    paginator
                    paginatorTemplate={template}
                    first={first} rows={rows}
                    onPage={onCustomPage}
                    responsiveLayout="stack" breakpoint="960px"
                    selectionMode="single"
                    cellSelection
                    selection={selectedProduct}
                    onSelectionChange={onCellSelect}
                >
                    <Column
                        field="id"
                        header="ID"
                        sortable
                        filter
                        filterPlaceholder="Search by id"
                        editor={(options) => TableServices.textEditor(options)}
                        style={{ width: "15%" }}
                    ></Column>
                    <Column
                        header="Image"
                        body={TableServices.imageBodyTemplate(products2)}>
                    </Column>
                    <Column
                        field="name"
                        header="Name"
                        sortable
                        editor={(options) => TableServices.textEditor(options)}
                        style={{ width: "20%" }}
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
                        body={TableServices.statusBodyTemplate}
                        editor={(options) => TableServices.statusEditor(options)}
                        style={{ width: "20%" }}
                    ></Column>
                    <Column
                        field="price"
                        header="Price"
                        sortable
                        body={TableServices.priceBodyTemplate}
                        editor={(options) => TableServices.priceEditor(options)}
                        style={{ width: "15%" }}
                    ></Column>
                    <Column
                        rowEditor
                        headerStyle={{ width: "10%", minWidth: "8rem" }}
                        bodyStyle={{ textAlign: "center" }}
                    ></Column>
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
};

export default AdProducts;
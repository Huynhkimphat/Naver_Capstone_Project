import React, { useEffect, useState, useRef, useCallback } from 'react';
import Router from 'next/router';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import * as TableServices from './TableServices'
import Feature from './Feature/Feature';
import { BsEye } from 'react-icons/bs';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { onGetProductsList, onUpdateProductStatus } from '../../../redux/actions/products';
const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
    dataTable: 'mt-4'
}

const AdProducts = (props) => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
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
    const onRowEditComplete = (e) => {
        let _products = [...products];
        let { newData, index } = e;

        _products[index] = newData;

        setProducts(_products);
    };

    useEffect(() => {
        dispatch(onUpdateProductStatus('Loading fetch'))
        axios.get('https://dummyjson.com/products')
            .then(res => {
                const data = res.data.products;
                setProducts(data)
                dispatch(onGetProductsList(data))
                dispatch(onUpdateProductStatus('Success fetch'))
            })
            .catch(error => {
                console.log(error)
                dispatch(onUpdateProductStatus('Error fetch'))
            })
    },[]);

    const onCellSelect = (e) => {
        setSelectedProduct(e.value)
        console.log(e.value.rowData.id)
        const path = e.value.rowData.id
        if (e.value.field === 'detail')
            Router.push(`/admin/product/update/${path}`)
    }
    return (
        <div className={styles.wrapper}>
            {/* Feature */}
            <Feature></Feature>
            {/* Datatable */}
            <div className={styles.dataTable}>
                <DataTable
                    value={products}
                    editMode="row"
                    dataKey="id"
                    onRowEditComplete={onRowEditComplete}
                    paginator
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[5, 10, 20]}
                    first={first} rows={rows}
                    onPage={onCustomPage}
                    responsiveLayout="scroll"
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
                        body={TableServices.imageBodyTemplate(products)}>
                    </Column>
                    <Column
                        field="name"
                        header="Name"
                        headerStyle={{ width: "30%", minWidth: "8rem" }}
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
                        headerStyle={{ width: "30%", minWidth: "8rem" }}
                        sortable
                        body={TableServices.statusBodyTemplate}
                        editor={(options) => TableServices.statusEditor(options)}
                    //style={{ width: "50px", padding: "0px"}}
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
                        bodyStyle={{ textAlign: "center" }}
                        body={<BsEye></BsEye>}
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default AdProducts;
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
import {useDispatch, useSelector} from "react-redux";
import productService from "../../../services/api/productService";
import {setProductList} from "../../../redux/actions/productAction";
import {checkStatus} from "./TableServices";
const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
    dataTable: 'mt-4',
    approved: "bg-green-500 px-2 py-1 rounded-lg text-white font-semibold",
    reject: "bg-red-500 px-2 py-1 rounded-lg text-white font-semibold",
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
    const statuses = [
        "APPROVED",
        "PENDING",
        "REJECT"
    ];

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
        // (async () => {
        //     try {
        //         const data = await productApi.getAll()
        //         setProducts(data)
        //         dispatch(onGetProductsList(data))
        //         dispatch(onUpdateProductStatus('Success fetch'))
        //     } catch (error) {
        //         dispatch(onUpdateProductStatus('Error fetch'))
        //     }
        // })()
    }, []);

    const onCellSelect = (e) => {
        setSelectedProduct(e.value)
        console.log(e.value.rowData.id)
        const path = e.value.rowData.id
        if (e.value.field === 'detail')
            Router.push(`/admin/product/update/${path}`)
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    }

    // const statusItemTemplate = (option) => {
    //     return <span className={`customer-badge status-${option}`}>{option}</span>;
    // }

    const statusItemTemplate = (option) => {
        return <span className={`${option}`}>{option}</span>;
    };
    
    const statusRowFilterTemplate = (options) => {
        return (
        <Dropdown value={options.value} 
        options={statuses} 
        onChange={(e) => options.filterApplyCallback(e.value)} 
        itemTemplate={statusItemTemplate} 
        placeholder="Select a Status" 
     
        showClear />
        );
    }


    const dispatch = useDispatch();

    useEffect(() => {
        productService.getAllProducts().then((res) => dispatch(setProductList(res)));
    }, []);
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
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
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
                    <Column field="status"
                     header="Status"
                      showFilterMenu={false}
                      sortable
                      filter
                       filterMenuStyle={{ width: '7rem' }} 
                       style={{
                        width: "15%",
                        minWidth: "6rem",
                        padding: "5px 0 5px 10px",
                        textAlign: "center"
                        }}
                       editor={(options) => TableServices.statusEditor(options)}
                       body={statusBodyTemplate} 
                       filterElement={statusRowFilterTemplate}
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

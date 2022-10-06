import React, {useEffect, useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import InvoiceHeader from './InvoiceHeader/InvoiceHeader';
import InvoiceContent from './InvoiceContent/InvoiceContent';
import InvoiceTotal from './InvoiceTotal/InvoiceTotal';
const styles = {
    wrapper: 'mx-auto w-full p-4 mt-4 flex flex-col shadow-lg rounded-md',
    feature: 'w-[100%] flex justify-between items-center gap-4 flex-wrap',
}

const Invoice = () => {
    const [orderDetail, setorderDetail] = useState([]);

    useEffect(() => {
        setorderDetail([
            {
                id: "1000",
                code: "f230fh0g3",
                name: "Bamboo Watch",
                description: "Product Description",
                image: "bamboo-watch.jpg",
                price: 65,
                category: "Accessories",
                quantity: 2,
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
                quantity: 3,
                inventoryStatus: "OUTOFSTOCK",
                rating: 4,
            }
        ])
    }, []);

    const SumofProduct = (rowData)=> {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(rowData.price*rowData.quantity);
    }

    const priceBodyTemplate = (rowData) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(rowData.price);
    };

    return (
        <div className={styles.wrapper}>
            <div>
                <div>
                    <div>
                        <InvoiceHeader></InvoiceHeader>
                        <InvoiceContent></InvoiceContent>

                        {/*Data table*/}
                        <div>
                            <DataTable
                                value={orderDetail}
                                dataKey="id"
                                showGridlines
                                responsiveLayout="scroll"
                            >
                                <Column
                                    field="id"
                                    header="ID"
                                    sortable
                                    style={{ width: "20%" }}
                                ></Column>
                                <Column
                                    field="name"
                                    header="Name"
                                    sortable

                                    style={{ width: "20%" }}
                                ></Column>
                                <Column
                                    field="quantity"
                                    header="Quantity"
                                    sortable
                                    style={{ width: "20%" }}
                                ></Column>
                                <Column
                                    field="price"
                                    header="Price"
                                    sortable
                                    body={priceBodyTemplate}
                                    style={{ width: "20%" }}
                                ></Column>
                                <Column
                                    field="total"
                                    header="Total"
                                    sortable
                                    body={SumofProduct}
                                    style={{ width: "20%" }}
                                ></Column>

                            </DataTable>
                        </div>
                        {/*Total money pay*/}
                        <InvoiceTotal></InvoiceTotal>
                    </div>
                </div>
            </div>
        </div>);
};

export default Invoice;

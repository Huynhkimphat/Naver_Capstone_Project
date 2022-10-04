import React, { useEffect, useState } from 'react';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { data } from './Data'
import * as TableServices from './TableServices'
import Feature from './Feature/Feature';

const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
    dataTable: 'mt-4'
}

const AdProducts = (props) => {

    const [products2, setProducts2] = useState(null);


    useEffect(() => {
        setProducts2(data)
    }, []);
    const onRowEditComplete = (e) => {
        let _products2 = [...products2];
        let { newData, index } = e;

        _products2[index] = newData;

        setProducts2(_products2);
    };
    return (
        <div className={styles.wrapper}>
            <Feature></Feature>
            <div className={styles.dataTable}>
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
                </DataTable>
            </div>
        </div>
    );
};

export default AdProducts;
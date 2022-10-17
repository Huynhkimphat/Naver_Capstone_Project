import Image from "next/image"
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Ripple } from 'primereact/ripple';
import Product1 from '../../../static/Product1.png'
import Link from "next/link";
import React from "react";
const styles = {
    redSelect: 'w-[100%] bg-red-500 p-2 rounded-md text-sm text-white font-semibold',
    greenSelect: 'bg-green-500 p-2 rounded-md text-sm text-white font-semibold',
    yellowSelect: 'bg-yellow-500 p-2 rounded-md text-sm text-white font-semibold',
    inStock: "bg-green-500 px-2 py-1 rounded-lg text-white font-semibold",
    outStock: "bg-red-500 px-2 py-1 rounded-lg text-white font-semibold",
}
export const imageBodyTemplate = (rowData) => {
    return <div className='rounded-sm'>
        <Image
            src={rowData.images[0]}
            alt="" title=""
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"/>
    </div>
}

const statuses = [
    { label: "In Stock", value: "INSTOCK" },
    { label: "Low Stock", value: "LOWSTOCK" },
    { label: "Out of Stock", value: "OUTOFSTOCK" }
];

export const textEditor = (options) => {
    return (
        <InputText
            type="text"
            value={options.value}
            onChange={(e) => options.editorCallback(e.target.value)}
        />
    );
};
export const statusEditor = (options) => {
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
                        className={`product-badge status-${option.value.toLowerCase()} `}
                    >
                        {option.label}
                    </span>
                );
            }}
        />
    );
};

export const priceEditor = (options) => {
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

const getStatusLabel = (status) => {
    switch (status) {
        case "INSTOCK":
            return <span className={styles.greenSelect}>
                In Stock
            </span>;

        case "LOWSTOCK":
            return <span className={styles.yellowSelect}>
                Low Stock
            </span>;

        case "OUTOFSTOCK":
            return <span className={styles.redSelect}>
                Out of Stock
            </span>;

        default:
            return "NA";
    }
};

export const statusBodyTemplate = (rowData) => {
    return getStatusLabel(rowData.inventoryStatus)
};

export const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat("vi", {
        style: "currency",
        currency: "VND"
    }).format(rowData.price);
};

export const checkStatus = (rowData) => {

    return rowData.quantity > 1 ? (
        <span className={styles.inStock}>
                IN STOCK
            </span>
    ) : (
        <span className={styles.outStock}>
                OUT OF STOCK
            </span>
    )
};

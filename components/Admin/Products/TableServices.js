import Image from "next/image"
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import Product1 from '../../../static/Product1.png'
export const imageBodyTemplate = (rowData) => {
    return <div className='rounded-sm'>
        <Image
            src={Product1}
            alt="" title=""
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain" />
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
                        className={`product-badge status-${option.value.toLowerCase()}`}
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
            return "In Stock";

        case "LOWSTOCK":
            return "Low Stock";

        case "OUTOFSTOCK":
            return "Out of Stock";

        default:
            return "NA";
    }
};

export const statusBodyTemplate = (rowData) => {
    return getStatusLabel(rowData.inventoryStatus);
};

export const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(rowData.price);
};
import Image from "next/image"
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Ripple } from 'primereact/ripple';
import Product1 from '../../../static/Product1.png'
import Link from "next/link";
const styles = {
    redSelect: 'w-[100%] bg-red-500 p-2 rounded-md text-sm text-white font-semibold',
    greenSelect: 'bg-green-500 p-2 rounded-md text-sm text-white font-semibold',
    yellowSelect: 'bg-yellow-500 p-2 rounded-md text-sm text-white font-semibold',
}
export const imageBodyTemplate = (rowData) => {
    return <div className='rounded-sm'>
        <Image
            src={rowData.imageUrl}
            alt="" title=""
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"/>
    </div>
}

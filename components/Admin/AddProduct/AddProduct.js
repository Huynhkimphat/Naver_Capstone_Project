import React, { useState } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { IoIosAddCircle } from 'react-icons/io';

const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
    title: 'border-b-2 py-4 text-2xl font-semibold',
    formContainer: 'w-full flex justify-center',
    form: 'w-[60%] py-4 flex flex-col',
    label: ' font-medium mt-4',
    inputName: 'border-2 rounded-md p-2 text-lg mt-1',
    inputCategory: 'w-[40%] border-2 rounded-md p-2 text-lg mt-1',
    inputImages: 'text-lg mt-1',
    inputPrice: 'border-2 rounded-md p-2 text-lg mt-1 w-[40%]',
    description: 'border-2 rounded-md p-2 text-lg mt-1 h-32'
}
const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState([]);
    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Product Form</h1>
            <div className={styles.formContainer}>
                <form className={styles.form} action={'Send Data'}>
                    <label className={styles.label} htmlFor="productName">Product Name</label>
                    <input
                        className={styles.inputName}
                        type="text"
                        id="producName"
                        name="producName"
                        required
                        minLength={5}
                        maxLength={20} />
                    <label className={styles.label} htmlFor="productCategory">Product Category</label>
                    <select
                        className={styles.inputCategory}
                        id="productCategory"
                        name="productCategory"
                        required>
                        <option value="All">All</option>
                        <option value="Chair">Chair</option>
                        <option value="Table">Table</option>
                        <option value="Sofa">Sofa</option>
                    </select>
                    <label className={styles.label} htmlFor="imageProduct">Image of Product</label>
                    <input
                        className={styles.inputImages}
                        type="file"
                        name="imageProduct"
                        multiple
                        onChange={uploadToClient} />
                    <label className={styles.label} htmlFor="description">Additional Description</label>
                    <textarea
                        className={styles.description}
                        type="text"
                        id="description"
                        name="description"
                    />
                    <label className={styles.label} htmlFor="productPrice">Product Price</label>
                    <input
                        className={styles.inputPrice}
                        type="number"
                        id="productPrice"
                        name="productPrice"
                        required
                        title="It should be money"
                        placeholder='ex: $5'
                    />
                    <button className='w-fit flex items-center gap-2 text-white rounded-md mt-10 py-2 px-4 bg-[#5842BD]' type="submit">
                        <IoIosAddCircle size='20px'></IoIosAddCircle>
                        <span>Add Product</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
import React, { useState } from 'react';

const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
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
            <h1 className='border-b-2 py-4 text-2xl font-semibold'>Product Form</h1>
            <div className='w-full flex justify-center'>
                <form className='w-[60%] py-4 flex flex-col' action={'Send Data'}>
                    <label className=' font-medium' htmlFor="productName">Product Name</label>
                    <input
                        className='border-2 rounded-md p-2 text-lg mt-1'
                        type="text"
                        id="producName"
                        name="producName"
                        required
                        minLength={5}
                        maxLength={20} />
                    <label className=' font-medium mt-4' htmlFor="productCategory">Product Category</label>
                    <select
                        className='w-[40%] border-2 rounded-md p-2 text-lg mt-1'
                        id="productCategory"
                        name="productCategory"
                        required>
                        <option value="All">All</option>
                        <option value="Chair">Chair</option>
                        <option value="Table">Table</option>
                        <option value="Sofa">Sofa</option>
                    </select>
                    <label className=' font-medium mt-4' htmlFor="imageProduct">Image of Product</label>
                    <input
                        className='text-lg mt-1'
                        type="file"
                        name="imageProduct"
                        multiple
                        onChange={uploadToClient} />
                    <label className=' font-medium mt-4' htmlFor="description">Additional Description</label>
                    <textarea
                        className='border-2 rounded-md p-2 text-lg mt-1 h-32'
                        type="text"
                        id="description"
                        name="description"
                    />
                    <label className=' font-medium mt-4' htmlFor="productPrice">Product Price</label>
                    <input
                        className='border-2 rounded-md p-2 text-lg mt-1 w-[40%]'
                        type="number"
                        id="productPrice"
                        name="productPrice"
                        required 
                        title="It should be money"
                        placeholder='ex: $5'
                        />
                    <button className='w-fit text-white rounded-md mt-10 py-2 px-4 bg-[#5842BD]' type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
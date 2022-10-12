import React, { useEffect, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import Image from 'next/image';
import productService from '../../../services/api/admin/productService';
import countryAPI from '../../../services/api/countryAPI';
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
    description: 'border-2 rounded-md p-2 text-lg mt-1 h-32',
    imgContainer:
        'w-ful h-32 p-2 border-2 mt-4 flex gap-4 flex-wrap justify-center items-center overflow-y-scroll',
    submit:
        'w-fit flex items-center gap-2 text-white rounded-md mt-10 py-2 px-4 bg-[#5842BD]',
    configuration: "w-full flex flex-wrap border-2 rounded-md mt-2 gap-4 p-4",
    cfItem: 'flex flex-col',
}
const AddProduct = () => {
    const initialProduct = {
        name: '',
        categoryId: 0,
        configuration: {
            brand: "",
            color: "",
            height: "",
            madeIn: "NA",
            material: "",
            width: ""
        },
        description: '',
        price: '',
        quantity: 1
    }
    const [countryList, setCountryList] = useState([])
    const [images, setImages] = useState([]);
    const [createObjectURL, setCreateObjectURL] = useState([]);
    const [information, setInformation] = useState(initialProduct)
    // Upload images from Computer to Browser & Show all images in Form
    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImages([...images, i])
            setCreateObjectURL([...createObjectURL, URL.createObjectURL(i)]);
        }
    };
    // Remove selected image
    const handleRemove = (e) => {
        e.preventDefault();
        images.splice(e.target.value, 1);
        setImages([...images])
        createObjectURL.splice(e.target.value, 1);
        setCreateObjectURL([...createObjectURL]);
    }
    const imageList = createObjectURL.map((image, index) => {
        return (
            <div key={index} className=" flex flex-col gap-1 items-end bg-admin_color px-1 rounded-md pt-1">
                <button className='text-white mr-1' value={index} onClick={handleRemove}>X</button>
                <div>
                    <Image className='rounded-xl' src={image} width={100} height={100} alt=""></Image>
                </div>
            </div>
        )
    })
    const handleChange = (e) => {
        const data = e.target.name in information.configuration ? {
            ...information,
            configuration: {
                ...information.configuration,
                [e.target.name]: e.target.value,
            }
        } : {
            ...information,
            [e.target.name]: e.target.value
        }
        setInformation(data);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(information)
        productService.addProduct(information, images)
        setInformation(initialProduct)
    }
    useEffect(() => {
        (async () => {
            try {
                const ctList = await countryAPI.getAll();
                setCountryList(ctList)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    const countriesOption = countryList.map((country) => {
      return <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
    })
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Product Form</h1>
            <div className={styles.formContainer}>
                <form className={styles.form} action={'Send Data'} onSubmit={handleSubmit}>
                    <label className={styles.label} htmlFor="name">Product Name</label>
                    <input
                        className={styles.inputName}
                        type="text"
                        id='name'
                        name="name"
                        value={information.name}
                        required
                        minLength={5}
                        maxLength={20}
                        onChange={handleChange}
                    />
                    <label className={styles.label} htmlFor="categoryId">Product Category</label>
                    <select
                        className={styles.inputCategory}
                        id="categoryId"
                        name="categoryId"
                        value={information.categoryId}
                        onChange={handleChange}
                        required>
                        <option value="0">All</option>
                        <option value="1">Chair</option>
                        <option value="2">Table</option>
                        <option value="3">Sofa</option>
                    </select>
                    <label className={styles.label}>Configuration</label>
                    <div className={styles.configuration}>
                        <div className={styles.cfItem}>
                            <label htmlFor="brand">Branch</label>
                            <input
                                className={styles.inputName}
                                type="text"
                                id='brand'
                                name="brand"
                                value={information.configuration.brand}
                                maxLength={40}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.cfItem}>
                            <label htmlFor="color">Color</label>
                            <input
                                className={styles.inputName}
                                type="text"
                                id='color'
                                name="color"
                                value={information.configuration.color}
                                minLength={4}
                                maxLength={40}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.cfItem}>
                            <label htmlFor="width">Width</label>
                            <input
                                className={styles.inputName}
                                type="number"
                                id='width'
                                name="width"
                                value={information.configuration.width}
                                maxLength={40}
                                placeholder="(Cm)"
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.cfItem}>
                            <label htmlFor="height">Height</label>
                            <input
                                className={styles.inputName}
                                type="number"
                                id='height'
                                name="height"
                                value={information.configuration.height}
                                maxLength={40}
                                placeholder="(Cm)"
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.cfItem}>
                            <label htmlFor="material">Material</label>
                            <input
                                className={styles.inputName}
                                type="text"
                                id='material'
                                name="material"
                                value={information.configuration.material}
                                maxLength={40}
                                placeholder="Example: Made of Plastic"
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.cfItem}>
                            <label htmlFor="madeIn">Made In</label>
                            <select
                                className={styles.inputName}
                                id="madeIn"
                                name="madeIn"
                                value={information.configuration.madeIn}
                                onChange={handleChange}
                                required>
                                {countriesOption}
                            </select>
                        </div>
                    </div>
                    <label className={styles.label} htmlFor="imageProduct">Image of Product</label>
                    <input
                        id='uploadfile'
                        className={styles.inputImages}
                        type="file"
                        name="imageProduct"
                        title='Choose multiple images'
                        multiple
                        onChange={uploadToClient} />
                    <div className={styles.imgContainer}>
                        {imageList}
                    </div>
                    <label className={styles.label} htmlFor="description">Additional Description</label>
                    <textarea
                        className={styles.description}
                        type="text"
                        id="description"
                        name="description"
                        value={information.description}
                        onChange={handleChange}
                    />
                    <label className={styles.label} htmlFor="price">Product Price</label>
                    <input
                        className={styles.inputPrice}
                        type="number"
                        id="price"
                        name="price"
                        required
                        title="It should be money"
                        value={information.price}
                        placeholder='ex: $5'
                        onChange={handleChange}
                    />
                    <button className={styles.submit} type="submit">
                        <IoIosAddCircle size='20px'></IoIosAddCircle>
                        <span>Add Product</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
import Image from "next/image";
import ProductDetail1 from '../../../static/ProductDetail.png'
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import React, {useEffect, useRef, useState} from "react";
import { EditText, EditTextarea } from 'react-edit-text';
import {useDispatch, useSelector} from "react-redux";

import productService from "../../../services/api/admin/productService";
import {setProductDetail, setProductList} from "../../../redux/actions/productAction";
import AppSelector from "../../../redux/selector";
import { IoIosAddCircle } from 'react-icons/io';
import countryAPI from '../../../services/api/countryAPI';
import categoryService from '../../../services/api/admin/categoryService';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { Toast } from 'primereact/toast';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../../lib/firebase";

const styles = {
  wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
  title: 'border-b-2 py-4 text-2xl font-semibold',
  formContainer: 'w-full flex justify-center',
  form: 'w-[60%] py-4 flex flex-col',
  label: ' font-medium mt-4',
  inputName: 'border-2 rounded-md p-2 text-lg mt-1',
  inputCategory: 'w-[40%] border-2 rounded-md p-2 text-lg mt-1',
  inputImages: 'text-lg mt-1 text-transparent',
  inputPrice: 'border-2 rounded-md p-2 text-lg mt-1 w-[40%]',
  description: 'border-2 rounded-md p-2 text-lg mt-1 h-32',
  imgContainer:
      'w-ful h-32 p-2 border-2 mt-4 flex gap-4 flex-wrap justify-center items-center overflow-y-scroll',
  submit:
      'w-fit flex items-center gap-2 text-white rounded-md mt-10 py-2 px-4 bg-[#5842BD]',
  configuration: "w-full flex flex-wrap border-2 rounded-md mt-2 gap-4 p-4",
  cfItem: 'flex flex-col',
  btnCtSave: 'bg-admin_color px-4 py-2 rounded-md text-white',
  addCategory: 'bg-admin_color rounded-full text-white cursor-pointer',
  hiddenAddCt: 'rounded-full text-admin_color cursor-pointer',
};

const ProductDetail = (props) => {

  const initialProduct = useSelector((state) => AppSelector.getProductID(state));

  const dispatch = useDispatch();

  useEffect(() => {
     productService.getProductDetail(props.id).then((res) => dispatch(setProductDetail(res)));
  }, []);


  const toastBL = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [inputCt, setInputCt] = useState('');
  const [categories, setCategories] = useState(["All"])
  const [countryList, setCountryList] = useState([]);
  const [images, setImages] = useState([]);
  const [createObjectURL, setCreateObjectURL] = useState([]);
  const [information, setInformation] = useState(initialProduct);
  const [removeLink, setRemoveLink] = useState("");

  useEffect(() => {
    onSnapshot(doc(db, "product", props.id), (doc) => {
      setInformation(doc.data())
    });

  }, []);

  useEffect(() => {
    setCreateObjectURL(information?.images)
  }, [information?.images]);

  // Upload images from Computer to Browser & Show all images in Form
  const uploadToClient = (event) => {

    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImages([...images,i]);
      setCreateObjectURL([...createObjectURL, URL.createObjectURL(i)]);
    }
  };
  // Remove selected image
  const handleRemove = (e) => {
    e.preventDefault();
    images.splice(e.target.value, 1);
    setImages([])
    const link  = createObjectURL.splice(e.target.value, 1);
    setRemoveLink(link[0]);
    console.log("this is :",link[0])
    setCreateObjectURL([...createObjectURL]);
  }

  const imageList = createObjectURL?.map((image, index) => {
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
    productService.UpdateProduct(props.id, information,images);
    productService.DeleteProductImage(removeLink)
    setRemoveLink("");
    setImages([]);
    showBottomLeft()
  }
  const handleCtChange = (e) => {
    setInputCt(e.target.value);
  }
  const handleCtSave = (e) => {
    e.preventDefault();
    if(!inputCt) return;
    categoryService.addCategory(inputCt);
    setCategories([...categories, inputCt]);
    setInputCt('')
    setToggle(!toggle);
  }
  useEffect(() => {
    categoryService.getCategories().then(res => setCategories([...categories, ...res]));
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
  const printCategory = categories.map((category, index) => {
    return <option key={index} value={category}>{category}</option>
  })
  const showBottomLeft = () => {

    toastBL.current.show({severity:'success', summary: 'Successfully update', detail:'update new' +
          ' product', life: 3000});
  }
  return (
      <div className={styles.wrapper}>
        <Toast ref={toastBL} position="bottom-right" />
        <h1 className={styles.title}>Update Product</h1>
        <div className={styles.formContainer}>
          <form className={styles.form} action={'Send Data'} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="name">Product Name</label>
            <input
                className={styles.inputName}
                type="text"
                id='name'
                name="name"
                value={information?.name}
                required
                minLength={4}
                maxLength={40}
                title="Please type your new product name"
                onChange={handleChange}
            />
            <label className={styles.label} htmlFor="category">Product Category</label>
            <div className='flex items-center gap-4'>
              <select
                  className={styles.inputCategory}
                  id="category"
                  name="category"
                  value={information?.category}
                  onChange={handleChange}
                  required>
                {printCategory}
              </select>
              <IoIosAddCircle className={!toggle ? styles.addCategory: "hidden"} size={30} onClick={() => setToggle(!toggle)}></IoIosAddCircle>
              <AiFillEyeInvisible className={toggle ? styles.hiddenAddCt : "hidden"} size={30} onClick={() => setToggle(!toggle)}></AiFillEyeInvisible>
              <input
                  className={toggle ? `${styles.inputCategory}` : "hidden"}
                  type="text"
                  placeholder='Your category'
                  value = {inputCt}
                  onChange={handleCtChange}></input>
              <button className={toggle ? styles.btnCtSave : 'hidden'} onClick={handleCtSave}>Save</button>
            </div>
            <label className={styles.label}>Configuration</label>
            <div className={styles.configuration}>
              <div className={styles.cfItem}>
                <label htmlFor="brand">Branch</label>
                <input
                    className={styles.inputName}
                    type="text"
                    id='brand'
                    name="brand"
                    required
                    value={information?.configuration.brand}
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
                    required
                    value={information?.configuration.color}
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
                    required
                    value={information?.configuration.width}
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
                    required
                    value={information?.configuration.height}
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
                    required
                    value={information?.configuration.material}
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
                    value={information?.configuration.madeIn}
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
                title=" "
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
                value={information?.description}
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
                value={information?.price}
                placeholder='ex: $5'
                onChange={handleChange}
            />
            <label className={styles.label} htmlFor="quantity">Quantity</label>
            <input
                className={styles.inputPrice}
                type="number"
                id="quantity"
                name="quantity"
                required
                title="It should be the number"
                value={information?.quantity}
                placeholder='ex: 0 to Number'
                onChange={handleChange}
            />
            <button className={styles.submit} type="submit">
              <span>Update Product</span>
            </button>
          </form>
        </div>
      </div>
  );
};
export default ProductDetail;

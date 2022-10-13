import Image from "next/image";
import ProductDetail1 from '../../../static/ProductDetail.png'
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { useEffect, useState } from "react";
import { EditText, EditTextarea } from 'react-edit-text';

const styles = {
  wrapper: " container mx-auto flex flex-col lg:flex-row p-4 ",
  imageProduct: "flex overflow-hidden",
  detailContainer: "flex-1 p-2 sm:p-8 m-0 sm:m-6",
  productTitle: "text-4xl pt-1" ,
  productPrice: "flex text-2xl pb-4",
  descriptionTitle: "text-xl py-3", 
  descriptionContent: "",
  dimensionTitle: "text-xl py-1 pb-2",
  dimensionContent: " ",
  dimensionTable: "w-sm-table w-56 table-fixed",
  buyProduct: "flex justify-between items-center flex-col sm:flex-row ",
  contentQualityContainer:
    "flex py-4 items-center justify-center flex-wrap gap-2",
  quantityAmountTitle: "text-xl mr-5",
  contentQuantityAmount: "flex justify-center items-center",
  btnSave: "rounded-lg border p-3 bg-[#2A254B] text-white mt-6rem",
  id: 'text-black-800 font-thin pb-3',
};

const ProductDetail = (props) => {
  const [productDetail, setProductDetail] = useState({})
  useEffect(() => {
    setProductDetail(
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      price: "100.000",
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    }
    )
}, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageProduct}>
      <Image src={ProductDetail1} style={{ minWidth: '600', height: '300'}} alt='' />
      </div>
      <div className={styles.detailContainer}>
        <div style={{whiteSpace: 'nowrap'}}>
              <EditText className={styles.productTitle} 
              style={{ width: '275px', height: '55px', fontSize: '36px' , lineHeight: '40px'}} defaultValue="The Dandy Chair" inline/>
        </div>
        <div className={styles.productPrice} style={{whiteSpace: 'nowrap'}}>
              <EditText field="price"
              style={{ width: '90px', fontSize: '24px' , lineHeight: '32px'}} defaultValue={productDetail.price} inline/>
              VND
        </div>
        <span className={styles.id} field="id" >Code: #{props.id}</span>
        <div className={styles.descriptionTitle}>Description</div>
        <div className={styles.descriptionContent}>
              <EditTextarea  
              style={{ width: '500px', height: '80px'}} 
              defaultValue="A timeless design, with premium materials features as one of our most
              popular and iconic pieces. The dandy chair is perfect for any stylish
              living space with beech legs and lambskin leather upholstery." inline/>
        </div>
        <div className={styles.dimensionTitle} >Dimensions</div>
        <div className={styles.dimensionContent}>
          <table className={styles.dimensionTable}>
            <thead>
              <tr>
                <td>Width</td>
                <td>Heigh</td>
                <td>Depth</td>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td>
              <EditText field="price"
              style={{ width: '60px'}} defaultValue="200" inline/>
              </td>
              <td>
              <EditText field="price"
              style={{ width: '60px'}} defaultValue="150" inline/>
              </td>
              <td>
              <EditText field="price"
              style={{ width: '60px'}} defaultValue="60" inline/>
              </td>
              </tr>
              </tbody>
          </table>
        </div>
        {/*save product edit */}
        <div className={styles.buyProduct}>
          <div className={styles.btnSave} style={{ marginTop: "15px"}}>
            <button type="submit">Save Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
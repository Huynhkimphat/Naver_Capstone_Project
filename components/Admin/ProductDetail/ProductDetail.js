import Image from "next/image";
import ProductDetail1 from '../../../static/ProductDetail.png'
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
const styles = {
  wrapper: " container mx-auto flex flex-col lg:flex-row p-4 ",
  imageProduct: "flex overflow-hidden",
  detailContainer: "flex-1 p-1 sm:p-8 m-0 sm:m-12",
  productTitle: "text-4xl" ,
  productPrice: "text-2xl pb-4",
  descriptionTitle: "text-xl py-4",
  descriptionContent: "",
  dimensionTitle: "text-xl py-4",
  dimensionContent: " ",
  dimensionTable: "w-sm-table w-56 table-fixed",
  buyProduct: "flex justify-between items-center flex-col sm:flex-row ",
  contentQualityContainer:
    "flex py-4 items-center justify-center flex-wrap gap-2",
  quantityAmountTitle: "text-xl mr-5",
  contentQuantityAmount: "flex justify-center items-center",
  btnSave: "rounded-lg border p-3 bg-[#2A254B] text-white mt-6rem",
  id: 'text-black-800 font-thin',
};

const ProductDetail = (props) => {
   
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageProduct}>
      <Image src={ProductDetail1} width={600} height={320} alt='' />
      </div>
      <div className={styles.detailContainer}>
      <blockquote contenteditable="true" style={{ width: '268px', height: '55px' }}>
        <div className={styles.productTitle}>The Dandy Chair</div>
      </blockquote>
        <blockquote contenteditable="true" style={{ width: '140px' }}>
        <div className={styles.productPrice} >250000VND</div>
        </blockquote>
        <blockquote contenteditable="true" style={{ width: '140px' }}>
        <span className={styles.id} field="id" >Code: #{props.id}</span>
        </blockquote>
        <div className={styles.descriptionTitle}>Description</div>
        <blockquote contenteditable="true" style={{ width: '500px' }}>
        <div className={styles.descriptionContent}>
          A timeless design, with premium materials features as one of our most
          popular and iconic pieces. The dandy chair is perfect for any stylish
          living space with beech legs and lambskin leather upholstery.
        </div>
        </blockquote>

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
              <blockquote contenteditable="true" style={{ width: '72px'}}>
                <td>200</td>
                </blockquote>
                <td>150</td>
                <td>60</td>
              </tr>
              </tbody>
          </table>
        </div>
        {/*buy quality product  */}
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
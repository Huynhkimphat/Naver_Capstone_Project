import Image from "next/image";
import ProductDetailImage from "../../static/ProductDetail.png";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
const styles = {
  wrapper: " container mx-auto flex flex-col lg:flex-row p-4 ",
  imageProduct: "flex overflow-hidden",
  detailContainer: "flex-1 p-2 sm:p-8 m-0 sm:m-12",
  productTitle: "text-4xl",
  productPrice: "text-2xl py-4 pb-4",
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
  btnAddCart: "rounded-lg border p-4 bg-[#2A254B] text-white text-center",
};
const ProductDetail = ({ product }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageProduct}>
        <Image src={ProductDetailImage} alt="true" />
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.productTitle}>{product[0].name}</div>
        <div className={styles.productPrice}>{product[0].price}</div>
        <div className={styles.descriptionTitle}>Description</div>
        <div className={styles.descriptionContent}>
          {product[0].description}
        </div>
        <div className={styles.dimensionTitle}>Dimensions</div>
        <div className={styles.dimensionContent}>
          <table className={styles.dimensionTable}>
            <thead>
              <tr>
                <td>Width</td>
                <td>Height</td>
                <td>Depth</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{product[0].configuration.width}</td>
                <td>{product[0].configuration.height}</td>
                <td>{product[0].configuration.depth}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/*buy quality product  */}
        <div className={styles.buyProduct}>
          <div className={styles.contentQualityContainer}>
            <div className={styles.quantityAmountTitle}>Amount</div>

            <div className={styles.contentQuantityAmount}>
              <HiMinus className={styles.btnMinus} />
              <input
                className="mx-2 border text-center w-8"
                type="text"
                value={styles.quantityProduct}
              />
              <HiPlus className={styles.btnPus} />
            </div>
          </div>
          <div className={styles.btnAddCart}>
            <button type="submit">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;

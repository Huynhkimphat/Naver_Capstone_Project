import Image from "next/image";
import ProductDetailImage from "../../static/ProductDetail.png";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
const styles = {
  wrapper: "mx-auto flex ",
  imageProduct: "",
  detailContainer: "p-12",
  
};
const ProductDetail = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageProduct}>
        <Image src={ProductDetailImage} width={721} height={759} />
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.productTitle}>The Dandy Chair</div>
        <div className={styles.productPrice}>250VND</div>
        <div className={styles.descriptionTitle}>Description</div>
        <div className={styles.descriptionContent}>
          A timeless design, with premium materials features as one of our most
          popular and iconic pieces. The dandy chair is perfect for any stylish
          living space with beech legs and lambskin leather upholstery.
        </div>
        <div className={styles.dimensionTitle}>Dimensions</div>
        <div className={styles.dimensionContent}>
          <table>
            <tr>
              <th>Height</th>
              <th>Width</th>
              <th>Depth</th>
            </tr>

            <tr>
              <td>110</td>
              <td>75</td>
              <td>100</td>
            </tr>
          </table>
        </div>

        {/* <div className={styles.buyProduct}>
        <div className={styles.contentQuantityAmount}>
              <HiMinus className={styles.btnMinus} />
              <input
                className="mx-2 border text-center w-8"
                type="text"
                
                value={styles.quantityProduct}
              />
              <HiPlus className={styles.btnPus} />
            </div>
            <div className={styles.btnAddCart}>
                <button></button>
            </div>
        </div> */}
      </div>
    </div>
  );
};
export default ProductDetail;

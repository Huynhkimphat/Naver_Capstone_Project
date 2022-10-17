import { useState, useRef } from "react";
import Image from "next/image";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";

const styles = {
  wrapper: " container mx-auto flex flex-col lg:flex-row p-4 ",
  imageProduct: "flex overflow-hidden justify-center items-center",
  detailContainer: "flex-1 p-2 sm:p-8 m-0 sm:m-12",
  productTitle: "text-4xl font-bold",
  productSubtitle: "text-2xl text-[#cccccc] hover:text-[#000000]",
  productPrice: "text-2xl py-4 pb-4",
  descriptionTitle: "text-xl py-4",
  descriptionContent: "",
  dimensionTitle: "text-xl py-4",
  dimensionContent: " ",
  dimensionTable: "w-sm-table w-full table-fixed",
  buyProduct: "flex justify-between items-center flex-col sm:flex-row ",
  contentQualityContainer:
    "flex py-4 items-center justify-center flex-wrap gap-2",
  quantityAmountTitle: "text-xl mr-5",
  contentQuantityAmount: "flex justify-center items-center",
  btnAddCart: "rounded-lg border p-4 bg-[#2A254B] text-white text-center",
  btnMinus: "hover:bg-[#cccccc]",
  btnPus: "hover:bg-[#cccccc]",
};
const ProductDetail = ({ product }) => {
  const [valueInput, setValueInput] = useState(0);

  const handleAddToCart = () => {
    console.log(product);
    console.log(valueInput);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageProduct}>
        <Image
          src={product[0].images[0]}
          width={550}
          height={550}
          alt=""
          objectFit="contain"
        />
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.productTitle}>{product[0].name}</div>
        <div className={styles.productSubtitle}>
          Brand: {product[0].configuration.brand}
        </div>
        <div className={styles.productSubtitle}>
          Made In: {product[0].configuration.madeIn}
        </div>
        <div className={styles.productSubtitle}>
          Color: {product[0].configuration.color}
        </div>
        <div className={styles.productSubtitle}>
          Made By: {product[0].configuration.material}
        </div>
        <div className={styles.productPrice}>
          {product[0].price} - Left in stock: {product[0].quantity}
        </div>

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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{product[0].configuration.width}</td>
                <td>{product[0].configuration.height}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/*buy quality product  */}
        <div className={styles.buyProduct}>
          <div className={styles.contentQualityContainer}>
            <div className={styles.quantityAmountTitle}>Amount</div>

            <div className={styles.contentQuantityAmount}>
              <HiMinus
                className={styles.btnMinus}
                onClick={() =>
                  valueInput !== 0 && setValueInput(Number(valueInput) - 1)
                }
              />
              <input
                className="mx-2 border text-center w-8"
                type="text"
                value={valueInput}
                onChange={(e) =>
                  setValueInput(
                    Number(e.target.value) <= Number(0)
                      ? Number(0)
                      : Number(e.target.value) >= Number(product[0].quantity)
                      ? Number(product[0].quantity)
                      : Number(e.target.value)
                  )
                }
                max={product[0].quantity}
                min={0}
              />
              <HiPlus
                className={styles.btnPus}
                onClick={() =>
                  setValueInput(
                    valueInput >= product[0].quantity
                      ? product[0].quantity
                      : Number(valueInput) + 1
                  )
                }
              />
            </div>
          </div>
          <div className={styles.btnAddCart}>
            <button type="submit" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/actions/cartAction";
import AppSelector from "../../redux/selector";
import cartService from "../../services/api/cartService";
import { useRouter } from "next/router";

import { Carousel } from 'primereact/carousel';
import { motion } from "framer-motion"

const styles = {
  wrapper: " container mx-auto flex flex-col lg:flex-row p-4 ",
  imageProduct: "flex overflow-hidden justify-center items-center",
  detailContainer: "flex-1 p-2 flex flex-col gap-2 sm:p-8 m-0 sm:m-12",
  productTitle: "text-4xl font-bold",
  productSubtitle: "text-md font-medium text-slate-500 hover:text-[#000000] ",
  productPrice: "text-2xl py-1 text-white mt-4 bg-red-500 w-fit rounded-lg px-2 font-semibold",
  descriptionTitle: "text-xl py-4 font-semibold text-admin_color",
  descriptionContent: "",
  dimensionTitle: "text-xl py-4 font-semibold text-admin_color",
  dimensionContent: " ",
  dimensionTable: "w-sm-table w-full table-fixed",
  buyProduct: "flex justify-between items-center flex-col sm:flex-row ",
  contentQualityContainer:
    "flex py-4 items-center justify-center flex-wrap gap-2",
  quantityAmountTitle: "text-xl mr-5",
  contentQuantityAmount: "flex justify-center items-center bg-admin_color py-1 px-2 rounded-lg",
  btnAddCart: "rounded-lg border p-4 bg-[#2A254B] font-semibold cursor-pointer text-white text-center",
  btnMinus: " text-white cursor-pointer select-none",
  btnPus: " text-white cursor-pointer select-none",
  card: "w-[550px] h-[550px]"
};
const ProductDetail = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [valueInput, setValueInput] = useState(1);
  const cart = useSelector(state => AppSelector.getCart(state))
  const [isAdd, setIsAdd] = useState(false);

  const handleAddToCart = async () => {
    setIsAdd(true);
    const preparingProduct = {
      productId: product[0].id,
      amount: valueInput,
      total: product[0].price * valueInput,
    }
    dispatch(addProductToCart(preparingProduct));
  };

  useEffect(() => {
    if (isAdd) {
      cartService.updateCart(cart.id, cart);
    }
  }, [cart])

  const productTemplate = (product) => {
    return (
      <Image width={550}
        height={550}
        alt=""
        objectFit="contain" src={product} />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageProduct}>
        <div className={styles.card}>
          <Carousel value={product[0].images} numVisible={1} numScroll={1}
            itemTemplate={productTemplate} />
        </div>

      </div>
      <div className={styles.detailContainer}>
        <div className={styles.productTitle}>{product[0].name}</div>
        <div className={styles.productPrice}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product[0].price)}
        </div>
        {
          product[0]?.quantity != 0 ? (
            <span className="font-medium">
              Left in stock: {product[0].quantity}
            </span>
          ) : (
            <span className=" font-medium text-red-500">
              Out of stock
            </span>
          )
        }

        <div className={styles.descriptionTitle}>Description</div>
        <div className={styles.descriptionContent}>
          {product[0].description}
        </div>
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
                <td>{product[0].configuration.width} cm</td>
                <td>{product[0].configuration.height} cm</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/*buy quality product  */}
        <div className={styles.buyProduct}>
          <div className={styles.contentQualityContainer}>
            <div className={styles.quantityAmountTitle}>Amount</div>

            <div className={styles.contentQuantityAmount}>
              <motion.div
                whileHover={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiMinus
                  className={styles.btnMinus}
                  onClick={() =>
                    valueInput !== 1 && setValueInput(Number(valueInput) - 1)
                  }
                />
              </motion.div>
              <input
                className="mx-2 border text-center w-8 rounded-md"
                type="text"
                value={valueInput}
                onChange={(e) =>
                  setValueInput(
                    Number(e.target.value) <= Number(1)
                      ? Number(1)
                      : Number(e.target.value) >= Number(product[0].quantity)
                        ? Number(product[0].quantity)
                        : Number(e.target.value)
                  )
                }
                max={product[0].quantity}
                min={1}
              />
              <motion.div
                whileHover={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                whileTap={{ scale: 0.9 }}
              >
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
              </motion.div>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            whileTap={{ scale: 0.9 }}
            className={`${styles.btnAddCart} ${product[0]?.quantity != 0 ? "" : "btn-disabled"}`}>
            <button type="submit" onClick={handleAddToCart} >
              Add to Cart
            </button>
          </motion.div>
        </div>
      </div>
    </div >
  );
};
export default ProductDetail;

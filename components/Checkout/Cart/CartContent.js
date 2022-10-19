import Image from "next/image";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { updateProductInCart } from "../../../redux/actions/cartAction";

const styles = {
  tableContentContainer: "flex items-center hover:bg-gray-100 -mx-8 px-6 py-5",
  contentDetail: "flex w-1/2",
  contentQuantity:
    "flex justify-center flex-col sm:w-1/4 w-1/2 items-center gap-y-2",
  totalInMobile: "block sm:hidden text-center font-seminbold text-sm",
  contentQuantityAmount: "flex justify-center items-center",
  contentAmount: "text-center w-1/4 hidden sm:block font-semibold text-sm",
  imageContainer: "w-20",
  image: "h-24",
  contentDetailContainer: "flex flex-col justify-between ml-4 flex-grow",
  productName: "font-bold text-sm",
  brandName: "text-red-500 text-xs",
  removeButton: "font-semibold hover:text-red-500 text-gray-500 text-xs",
  price: "font-semibold",
  disabled: "text-[#ccc]",
};

export default function CartContent({ cart, orderNo }) {
  const dispatch = useDispatch();
  if (!cart) {
    cart = [{ productName: "Please add some product to your cart" }];
  }

  const adjustProduct = (data, type) => {
    if (
      (type === "minus" && data.amount === 0) ||
      (type === "plus" && data.amount === Number(data.quantity))
    ) {
      return;
    }
    dispatch(
      updateProductInCart({
        productId: data.productId,
        type: type,
        price: data.price,
      })
    );
  };

  return (
    <div>
      {cart.map((data) => (
        <div key={data.productId} className={styles.tableContentContainer}>
          <div className={styles.contentDetail}>
            <div className={styles.imageContainer}>
              <Image
                className={styles.image}
                src={data.image}
                alt=""
                width={100}
                height={100}
              />
            </div>
            <div className={styles.contentDetailContainer}>
              <span className={styles.productName}>{data.productName}</span>
              <span className={styles.brandName}>{data.brandName}</span>
              <span className={styles.price}>{data.price} VND</span>
            </div>
          </div>
          <div className={styles.contentQuantity}>
            <span className={styles.totalInMobile}>
              Total: {data.total} VND
            </span>
            <div className={styles.contentQuantityAmount}>
              <HiMinus
                className={orderNo ? styles.disabled : ""}
                onClick={() => {
                  adjustProduct(data, "minus");
                }}
              />
              <input
                className="mx-2 border text-center w-8"
                type="text"
                disabled={orderNo}
                value={data.amount}
              />
              <HiPlus
                className={orderNo ? styles.disabled : ""}
                onClick={() => {
                  adjustProduct(data, "plus");
                }}
              />
            </div>
            <div href="#" className={styles.removeButton}>
              Remove
            </div>
          </div>
          <span className={styles.contentAmount}>{data.total} VND</span>
        </div>
      ))}
    </div>
  );
}

import Image from "next/image";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";

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

export default function CartContent({ data, orderNo }) {
  return (
    <div>
      {data.map((data) => (
        <div key={data.id} className={styles.tableContentContainer}>
          <div className={styles.contentDetail}>
            <div className={styles.imageContainer}>
              <Image className={styles.image} src={data.image} alt="" />
            </div>
            <div className={styles.contentDetailContainer}>
              <span className={styles.productName}>{data.productName}</span>
              <span className={styles.brandName}>{data.brandName}</span>
              <span className={styles.price}>{data.price} VND</span>
            </div>
          </div>
          <div className={styles.contentQuantity}>
            <span className={styles.totalInMobile}>
              Total: {data.quantity * data.price} VND
            </span>
            <div className={styles.contentQuantityAmount}>
              <HiMinus className={orderNo ? styles.disabled : ""} />
              <input
                className="mx-2 border text-center w-8"
                type="text"
                disabled={orderNo}
                value={data.quantity}
              />
              <HiPlus className={orderNo ? styles.disabled : ""} />
            </div>
            <div href="#" className={styles.removeButton}>
              Remove
            </div>
          </div>
          <span className={styles.contentAmount}>
            {data.quantity * data.price} VND
          </span>
        </div>
      ))}
    </div>
  );
}

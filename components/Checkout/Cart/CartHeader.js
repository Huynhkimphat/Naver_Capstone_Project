const styles = {
  cartBorder: "flex shadow-md my-10",
  cart: "w-full bg-white px-10 py-10",
  titleContainer: "flex justify-between border-b pb-8",
  title: "font-semibold text-2xl",
  tableTitleContainer: "flex mt-10 mb-5",
  tableTitle: "font-semibold text-gray-600 text-xs uppercase w-1/2",
  tableTitleCenter:
    "font-semibold text-center text-gray-600 text-xs uppercase sm:w-1/4 w-1/2 text-center",
  tableTitleCenterNoMobile:
    "font-semibold text-center text-gray-600 text-xs uppercase w-1/4 hidden sm:block text-center",
};
export default function CartHeader({ orderNo }) {
  return (
    <div>
      {/* Title */}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          {orderNo ? `Your Order: ${orderNo}` : `Your Shopping Cart`}
        </h1>
      </div>
      {/* Table Title */}
      <div className={styles.tableTitleContainer}>
        <h3 className={styles.tableTitle}>Product Details</h3>
        <h3 className={styles.tableTitleCenter}>Quantity</h3>
        <h3 className={styles.tableTitleCenterNoMobile}>Total</h3>
      </div>
    </div>
  );
}

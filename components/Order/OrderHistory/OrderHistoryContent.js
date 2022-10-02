import { useRouter } from "next/router";

const styles = {
  tableContentContainer: "flex items-center hover:bg-gray-100 -mx-8 px-6 py-5",
  contentDetail: "flex w-1/2",
  contentCreatedOn: "flex justify-center flex-col w-1/2 items-center gap-y-2",
  contentDetailContainer:
    "flex flex-col justify-between ml-4 flex-grow cursor-pointer",
  orderName: "font-bold text-sm",
  brandName: "text-red-500 text-xs",
  removeButton: "font-semibold hover:text-red-500 text-gray-500 text-xs",
  price: "font-semibold",
};

export default function OrderHistoryContent({ data }) {
  const router = useRouter();
  return (
    <div>
      {data.map((data) => (
        <div key={data.id} className={styles.tableContentContainer}>
          <div className={styles.contentDetail}>
            <div
              className={styles.contentDetailContainer}
              onClick={() => {
                router.push(`/order/${data.orderNo}`);
              }}
            >
              <span className={styles.orderName}>
                {data.orderNo}- Total: {data.total} VND
              </span>
            </div>
          </div>
          <div className={styles.contentCreatedOn}>
            {new Date(data.createdOn.toString()).toDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}

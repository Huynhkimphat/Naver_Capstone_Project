const styles = {
  wrapper:
    "max-w-7xl mx-auto flex sm:justify-between justify-center items-center p-4",
  groupFilter: "flex  sm:gap-x-4 gap-x-8 ",
  filterContainer: "text-sm flex ",
  filterByDate: "sm:flex gap-x-4 items-center",
  selectionFilter: "outline-none",
  defaultOption: "hidden ",
  title: "mx-4",
};
const priceList = [
  { id: 1, name: "Desc", value: 0 },
  { id: 2, name: "Acs", value: 1 },
];
const dateList = [
  { id: 3, name: "Newest", value: 0 },
  { id: 4, name: "Oldest", value:1},
];

const Filter = ({ handleFilterPriceUpdate, handleFilterDateUpdate }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.groupFilter}>
        {/*  price filter */}
        <div className={styles.filterContainer}>
          <div className={styles.title}>Sorting price: </div>
          <select
            className={styles.selectionFilter}
            onChange={(e) => {
              handleFilterPriceUpdate(e.target.value);
            }}
          >
            <option className={styles.defaultOption}>Option</option>
            {priceList.map((item) => (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {/*  brand filter*/}
      </div>

      <div className={styles.filterByDate}>
        <div className={styles.title}>Sorting by: </div>
        {/*  date added filter*/}
        <div className={styles.filterContainer}>
          <select
            className={styles.selectionFilter}
            onChange={(e) => {
              handleFilterDateUpdate(e.target.value);
            }}
          >
            <option className={styles.defaultOption}>Date Added</option>
            {dateList.map((item) => (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
export default Filter;

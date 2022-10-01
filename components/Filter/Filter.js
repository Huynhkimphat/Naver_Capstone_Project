const styles = {
  wrapper: "mx-auto flex justify-between",
  groupFilter: "flex flex-start",
  categoryFilter: "",
  filterByDate: "flex",
  selectionFilter: "",
  productFilter: "",
  priceFilter: "",
  brandFilter: "",
};
// const listCategory = [];

const Filter = () => {
  const categoryList = [
    { id: 1, name: "Crockery" },
    { id: 2, name: "Furniture" },
    { id: 3, name: "Homeware" },
    { id: 4, name: "Plant pots" },
    { id: 5, name: "Chairs" },
    { id: 6, name: "Cutlery" },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.groupFilter}>
        {/* category filter */}
        <div className={styles.categoryFilter}>
          <select className={styles.selectionFilter}>
            <option value="">Category</option>
          </select>
        </div>
        {/* category product */}
        <div className={styles.productFilter}>
          <select className={styles.selectionFilter}>
            <option value="">Product Type</option>
          </select>
        </div>
        {/* category price */}
        <div className={styles.priceFilter}>
          <select className={styles.selectionFilter} value="">
            <option value="">Price</option>
          </select>
        </div>
        {/* category brand */}
        <div className={styles.brandFilter}>
          <select className={styles.selectionFilter} value="">
            <option value="">Brand</option>
          </select>
        </div>
      </div>

      <div className={styles.filterByDate}>
        <div className={styles.title}>Sorting by </div>
        {/* category date added */}
        <div className={styles.filterDateBy}>
        <select className={styles.selectionFilter} value="" 
          >
            <option value="">Date Added</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default Filter;

import { AiOutlineSearch } from "react-icons/ai";
const styles = {
  wrapper: "flex gap-y-2 gap-x-2 mx-8",
  additionContext: "p-2",
};
const SearchInput = () => {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder="Search here"
        size="30"
        className={styles.additionContext}
      ></input>

      <div className={styles.searchIcon}>
        <AiOutlineSearch size={30} />
      </div>
    </div>
  );
};
export default SearchInput;
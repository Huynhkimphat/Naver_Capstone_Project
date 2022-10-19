import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
const styles = {
  wrapper: "flex gap-y-2 gap-x-2 mx-8",
  additionContext: "p-2",
};
const SearchInput = () => {
  const [productSearch, setProductSearch] = useState("");
  const handleChange = (event) => {
    setProductSearch(event.target.value);
  };
  const handleClick = (event) => {
    event.preventDefault();
    console.log(setProductSearch);
  };
  return (

       <div className={styles.wrapper}>
        <input
          type="text"
          placeholder="Search here"
          size="30"
          className={styles.additionContext}
          value={productSearch}
          onChange={handleChange}
        ></input>

        <button className={styles.searchIcon} onClick={handleClick}>
          <AiOutlineSearch size={30} />
        </button>
      </div>
  
  );
};
export default SearchInput;

const styles = {
  wrapper: "mx-auto flex ",
  accountMenu: "hidden sm:block mx-2 sm:mx-24 ",
  accountName: "text-2xl py-8 font-bold font-body",
accTitle: "py-4 font-body",
  btnLogOutContainer: "py-4",
  btnLogout: "rounded-lg border border-x-0 p-4 bg-[#2A254B] text-white",
  //content account
  accountContent: "mx-4 sm:mx-24 ",
  nameAcc: "text-[36px] py-8 font-bold font-body",
  formInforAcc: "space-y-4 w-200",
  inforTitle: "text-2xl font-body py-4",
  btnContainer:"block sm:hidden py-4"
};
const UserInfo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.accountMenu}>
        <div className={styles.accountName}>My account</div>

        <div className={styles.accTitle}>Account Details</div>
        <div className={styles.accTitle}>Adress Book</div>
        <div className={styles.accTitle}>History order</div>
        <div className={styles.btnLogoutContainer}>
          <button className={styles.btnLogout} type="submit">
            Log out
          </button>
        </div>
      </div>
      {/* content account */}
      <div className={styles.accountContent}>
        <div className={styles.nameAcc}>Hi, Huong</div>
        <div className={styles.inforAcc}>
          <div className={styles.inforTitle}>Account detail</div>
          <div className={styles.formInforAcc}>
            <label
              for="UserName"
              class="block w-auto overflow-hidden border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <span class="text-xs font-medium text-gray-700"> Username </span>

              <input
                type="userName"
                id="UserName"
                placeholder="Le Thi A"
                class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              />
            </label>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  for="UserEmail"
                  class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <span class="text-xs font-medium text-gray-700"> Email </span>

                  <input
                    type="email"
                    id="UserEmail"
                    placeholder="anthony@rhcp.com"
                    class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>
              </div>

              <div>
                <label
                  for="UserPhone"
                  class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <span class="text-xs font-medium text-gray-700"> Phone </span>

                  <input
                    type="userPhone"
                    id="UserPhone"
                    placeholder="0703264721"
                    class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.adressAcc}>
          <div className={styles.inforTitle}>Adress Book</div>
          <div className={styles.adressAccDetail}>
            <textarea
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Message"
              rows="8"
              id="message"
            ></textarea>
          </div>
        </div>
        <div className={styles.historyOrderAcc}>
          <div className={styles.inforTitle}>History order</div>
          <div className={styles.historyOrderContent}>
            <input
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="No product yet"
              type="text"
              id="name"
            />
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.btnLogout} type="submit">
            Log out
          </button>
        </div> 
      
      </div>
    </div>
  );
};
export default UserInfo;

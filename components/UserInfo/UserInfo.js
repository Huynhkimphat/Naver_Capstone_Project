import Image from "next/image";
import UserProfile from "../../static/UserProfile.jpg";
import { AuthenUserContext } from "../../context/AuthUserContext";
import { useContext, useState } from "react";

import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useEffect } from "react";

const styles = {
  wrapper: "mx-auto flex justify-around ",
  accountMenu: "hidden sm:block w-1/3 ml-24",
  accountName: "text-2xl py-4 font-bold font-body",
  accTitle: "font-body py-4",
  btnLogOutContainer: "",
  btnLogout: "rounded-lg border border-x-0 p-4 bg-[#2A254B] text-white",
  //content account
  accountContent: "w-full m-4",
  nameAcc: "text-4xl py-8 font-bold font-body",
  formInforAcc: "space-y-4",
  inforTitle: "text-2xl font-body py-8",
  btnContainer: "block sm:hidden py-4",
  userImage: "mw-full mh-full",
};
const UserInfo = () => {
  const { signOut } = useContext(AuthenUserContext);
  const [user,setUser]=useState([])
  // useEffect(() => {
  //   const getAllUser = async () => {
  //     const querySnapshot = await getDocs(collection(db, "users"));
  //     console.log(
  //       querySnapshot.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           data: {
  //             name: doc.data().name,
  //           },
  //         };
  //       })
  //     );
  //   };

  //   getAllUser();
  // });

  useEffect(() => {
    const getUserByEmail = async () => {
      const querySnapshot = await getDoc(doc(db, "users", "19521992@gm.uit.edu.vn"));
      setUser(querySnapshot.data());
    };

    getUserByEmail();
  },[]);
  console.log(user.imageUrl);

  return (
    <div className={styles.wrapper}>
      <div className={styles.accountMenu}>
        <div className={styles.accountName}>My accounts</div>

        <div className={styles.accTitle}>Account Details</div>
        <div className={styles.accTitle}>Address Book</div>
        <div className={styles.accTitle}>History order</div>
        <div className={styles.btnLogoutContainer}>
          <button className={styles.btnLogout} onClick={signOut}>
            Log out
          </button>
        </div>
      </div>
      {/* content account */}
      <div className={styles.accountContent}>
        <div className={styles.userImage}>
          <Image src={`https://res.cloudinary.com/demo/image/fetch/${user?.imageUrl}`} width={100} height={100} alt="" objectFit="contain" />
        </div>
        <div className={styles.nameAcc}>Hi, {user.name}</div>
        <div className={styles.inforAcc}>
          <div className={styles.inforTitle}>Account details</div>
          <div className={styles.formInforAcc}>
            <label
              for="UserName"
              className="block w-auto overflow-hidden border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <span className="text-xs font-medium text-gray-700">
                {" "}
                Username{" "}
              </span>

              <input
                type="userName"
                id="UserName"
                placeholder="Le Thi A"
                className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              />
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  for="UserEmail"
                  className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <span className="text-xs font-medium text-gray-700">
                    {" "}
                    Email{" "}
                  </span>

                  <input
                    type="email"
                    id="UserEmail"
                    value={user.email}
                    placeholder="anthony@rhcp.com"
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>
              </div>

              <div>
                <label
                  for="UserPhone"
                  className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <span className="text-xs font-medium text-gray-700">
                    {" "}
                    Phone{" "}
                  </span>

                  <input
                    type="userPhone"
                    id="UserPhone"
                    placeholder="0703264721"
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.adressAcc}>
          <div className={styles.inforTitle}>Address Book</div>
          <div className={styles.adressAccDetail}>
            <textarea
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
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
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="No product yet"
              type="text"
              id="name"
            />
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.btnLogout} onClick={signOut} type="submit">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;

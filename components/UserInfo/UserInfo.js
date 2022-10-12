import Image from "next/image";
import UserProfile from "../../static/UserProfile.jpg";
import { AuthenUserContext } from "../../context/AuthUserContext";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppSelector from "../../redux/selector";
import { useEffect } from "react";
import userService from "../../services/api/userService";
import { setUser } from "../../redux/actions/userAction";
import { useRouter } from "next/router";

const styles = {
    wrapper: "mx-auto flex justify-around ",
    accountMenu: "hidden sm:block w-1/3 ml-24",
    accountName: "text-2xl py-4 font-bold font-body",
    accTitle: "font-body py-4 font-bold",
    btnLogOutContainer: "",
    btn: "rounded-lg border border-x-0 p-4 bg-[#2A254B] text-white w-full md:w-32",
    //content account
    accountContent: "w-full m-4",
    nameAcc: "text-4xl py-8 font-bold font-body",
    formInforAcc: "space-y-4",
    inforTitle: "text-2xl font-body py-8 font-black",
    btnContainer: "block sm:hidden py-4",
    userImage: "mw-full mh-full",
    disabledBtn:
        "rounded-lg border border-x-0 p-4 bg-[#cccccc] text-white w-full md:w-32",
    enabledBtn:
        "rounded-lg border border-x-0 p-4 bg-[#2A254B] text-white w-full md:w-32",
};
const UserInfo = () => {
    const { signOut } = useContext(AuthenUserContext);
    const dispatch = useDispatch();
    const userEmail = useSelector((state) => AppSelector.getUserEmail(state));
    const user = useSelector((state) => AppSelector.getUser(state));
    const [userName, setUserName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const router = useRouter();
    const [isUserNameValid, setIsUserNameValid] = useState(true);

    const handleUserNameInput = (e) => {
        setUserName(e.target.value);
        userName.trim() === ""
            ? setIsUserNameValid(false)
            : setIsUserNameValid(true);
    };
    const handleUserNameBlur = () => {
        userName.trim() === ""
            ? setIsUserNameValid(false)
            : setIsUserNameValid(true);
    };
    const handlePhoneInput = (e) => {
        setPhone(e.target.value);
    };
    const handleAddressInput = (e) => {
        setAddress(e.target.value);
    };
    const goToAdmin = () => {
        router.push("/admin");
    };

    const handleUpdateUser = (e) => {
        if (!isUserNameValid) {
            return;
        }
        // logic if every field is valid
        const prepareUser = {
            ...user,
            name: userName,
            phone: phone || 0,
            address: address || "",
        };
        if (JSON.stringify(prepareUser) === JSON.stringify(user)) {
            return;
        }
        userService.updateUser(prepareUser);
        userService
            .getUserByEmail(userEmail)
            .then((res) => dispatch(setUser(res)));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.accountMenu}>
                <div className={styles.accountName}>My accounts</div>
                {user.isAdmin && (
                    <div className={styles.accTitle}>
                        <button className={styles.btn} onClick={goToAdmin}>
                            Go to Admin
                        </button>
                    </div>
                )}
                <div className={styles.accTitle}>
                    <button className={styles.btn} onClick={signOut}>
                        Log out
                    </button>
                </div>
                {!user.isAdmin && (
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
                )}
            </div>
            {/* content account */}
            <div className={styles.accountContent}>
                <div className={styles.userImage}>
                    <Image
                        src={`https://res.cloudinary.com/demo/image/fetch/${user?.imageUrl}`}
                        width={100}
                        height={100}
                        alt=""
                        objectFit="contain"
                    />
                </div>
                <div className={styles.nameAcc}>Hi, {user.name}</div>
                <div className={styles.inforAcc}>
                    <div className={styles.inforTitle}>Account details</div>
                    <div className={styles.formInforAcc}>
                        <label
                            for="userName"
                            className={`block w-auto overflow-hidden border  px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${
                                !isUserNameValid
                                    ? "border-[red]"
                                    : "border-gray-200"
                            }`}
                        >
                            <span className="text-xs font-medium text-gray-700">
                                Username
                            </span>
                            <input
                                type="text"
                                id="userName"
                                value={userName}
                                onChange={handleUserNameInput}
                                onBlur={handleUserNameBlur}
                                placeholder="Le Thi A"
                                className={`mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm`}
                            />
                        </label>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    for="email"
                                    className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                >
                                    <span className="text-xs font-medium text-gray-700">
                                        Email
                                    </span>
                                    <input
                                        type="text"
                                        id="email"
                                        value={user.email}
                                        disabled={true}
                                        placeholder="anthony@rhcp.com"
                                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                    />
                                </label>
                            </div>

                            <div>
                                <label
                                    for="phone"
                                    className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                >
                                    <span className="text-xs font-medium text-gray-700">
                                        Phone{" "}
                                    </span>
                                    <input
                                        type="number"
                                        id="phone"
                                        value={phone}
                                        maxLength={10}
                                        onChange={handlePhoneInput}
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
                            placeholder="Your address"
                            value={address}
                            onChange={handleAddressInput}
                            rows="8"
                            id="message"
                        ></textarea>
                    </div>
                </div>

                <div className={styles.btnSave}>
                    <button
                        className={`${
                            isUserNameValid
                                ? styles.enabledBtn
                                : styles.disabledBtn
                        }`}
                        type="submit"
                        onClick={handleUpdateUser}
                    >
                        Save
                    </button>
                </div>

                {user.isAdmin && (
                    <div className={styles.btnContainer}>
                        <button
                            className={styles.btn}
                            onClick={goToAdmin}
                            type="submit"
                        >
                            Go to Admin
                        </button>
                    </div>
                )}
                <div className={styles.btnContainer}>
                    <button
                        className={styles.btn}
                        onClick={signOut}
                        type="submit"
                    >
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
};
export default UserInfo;

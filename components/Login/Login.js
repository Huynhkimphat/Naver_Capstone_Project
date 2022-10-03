import React, { useState } from "react";
import Image from "next/image";
import { BsFacebook, BsTwitter, BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../static/Logo.png";
import { useRouter } from "next/router";
const styles = {
  wrapper: "flex items-center justify-center flex-col p-[2rem]",
  image: "",
  title: "font-[700] sm:text-4xl text-2xl mb-[2rem]",
  label: "font-[500]",
  formContainer: "flex flex-col p-10 border-2 rounded-md ",
  usernameContainer: "flex w-full flex-col",
  passwordContainer: "flex w-full flex-col mt-[20px]",
  checkRemember: "flex gap-x-1",
  loginConfig:
    "flex gap-x-[7rem] mt-4 sm:flex-row flex-col items-center justify-center",
  forgot: "hover:text-[blue] text-slate-500 cursor-pointer",
  button:
    "text-center text-white p-2 my-4 bg-blue-700 rounded-md cursor-pointer",
  invalidButton: "bg-gray-500",
  input: "border p-1 w-full rounded-md",
  invalid: "border-[red]",
  hrContainer: "w-full text-center text-[#888]",
  socialContainer: "flex justify-center gap-x-10 mt-2",
  social:
    "flex items-center justify-center cursor-pointer border-2 rounded-md w-full py-2",
  icon: "text-2xl",
  fbIcon: "text-[blue]",
};
export default function Login() {
  const router = useRouter();

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [userNameInvalid, setUserNameInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const signInHandler = (event) => {
    router.push(`/`);
  };

  const checkUsernameValid = (value) => {
    if (value.trim().length > 6 && value.includes("@")) {
      setUserNameInvalid(false);
      return;
    }
    setUserNameInvalid(true);
  };
  const checkPasswordValid = (value) => {
    if (value.trim().length > 6) {
      setPasswordInvalid(false);
      return;
    }
    setPasswordInvalid(true);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image src={Logo} />
      </div>
      <div className={styles.title}>Sign to your account</div>

      <div className={styles.formContainer}>
        <div className={styles.usernameContainer}>
          <label htmlFor="username" className={styles.label}>
            Email address
          </label>
          <input
            type="text"
            name="username"
            value={enteredUsername}
            className={`${styles.input} ${userNameInvalid && styles.invalid}`}
            onChange={(e) => {
              setEnteredUsername(e.target.value);
              checkUsernameValid(e.target.value);
            }}
          />
        </div>
        <div className={styles.passwordContainer}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={enteredPassword}
            className={`${styles.input} ${passwordInvalid && styles.invalid}`}
            onChange={(e) => {
              setEnteredPassword(e.target.value);
              checkPasswordValid(e.target.value);
            }}
          />
        </div>
        <div className={styles.loginConfig}>
          <div className={styles.checkRemember}>
            <input type="checkbox" />
            <div>Remember me</div>
          </div>
          <div className={styles.forgot}>Forgot your password?</div>
        </div>
        <div
          className={`${styles.button} ${
            (!(enteredUsername && enteredPassword) ||
              passwordInvalid ||
              userNameInvalid) &&
            styles.invalidButton
          }`}
          onClick={signInHandler}
        >
          Sign in
        </div>
        <div className={styles.hrContainer}>Or continue with</div>
        <div className={styles.socialContainer}>
          <div className={styles.social}>
            <FcGoogle className={styles.icon} />
          </div>
          <div className={styles.social}>
            <BsFacebook className={`${styles.icon} ${styles.fbIcon}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

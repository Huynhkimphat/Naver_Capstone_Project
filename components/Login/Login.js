import React from "react";
import Image from "next/image";
import { BsFacebook, BsTwitter, BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../static/Logo.png";
export default function Login() {
  const styles = {
    wrapper: "flex items-center justify-center flex-col p-[2rem]",
    image: "",
    title: "font-[700] text-[3rem] mb-[2rem]",
    label: "font-[500]",
    formContainer: "flex flex-col p-10 border-2 rounded-md ",
    usernameContainer: "flex w-full flex-col",
    passwordContainer: "flex w-full flex-col mt-[20px]",
    checkRemember: "flex gap-x-1",
    loginConfig: "flex gap-x-[7rem] mt-4",
    button: "text-center text-white p-2 my-4 bg-blue-700 rounded-md",
    input: "border p-1 w-full rounded-md",
    hrContainer: "w-full text-center text-[#888]",
    socialContainer: "flex justify-center gap-x-10 mt-2",
    social: "flex items-center justify-center cursor-pointer border-2 rounded-md w-full py-2",
    icon: "text-2xl",
    fbIcon: "text-[blue]",
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image src={Logo} />
      </div>
      <div className={styles.title}>Sign to your account</div>

      <form>
        <div className={styles.formContainer}>
          <div className={styles.usernameContainer}>
            <label htmlFor="username" className={styles.label}>
              Email address
            </label>
            <input type="text" name="username" className={styles.input} />
          </div>
          <div className={styles.passwordContainer}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input type="password" name="password" className={styles.input} />
          </div>
          <div className={styles.loginConfig}>
            <div className={styles.checkRemember}>
              <input type="checkbox" />
              <div>Remember me</div>
            </div>
            <div>Forgot your password?</div>
          </div>
          <div className={styles.button}>Sign in</div>
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
      </form>
    </div>
  );
}

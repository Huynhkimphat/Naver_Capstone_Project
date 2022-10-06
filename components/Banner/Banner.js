const styles = {
  wrapper: "mx-auto py-2 flex justify-center",
  content: "flex justify-center bg-[#F9F9F9] w-3/4 p-2 sm:p-8 ",
  infoUser: "text-center items-center flex flex-col space-y-2",
  title: "text-3xl p-4",
  instruction: "text-2xl p-4",
  emailAddition: " flex gap-y-2 justify-center gap-x-2 flex-col sm:flex-row",
  emailAdditionContext: " p-2 w-full outline-none",
  btnSignup: "rounded-lg border border-x-0 p-2 w-auto sm:w-1/3 bg-[#2A254B] text-white",
};

const Banner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.infoUser}>
          <div className={styles.title}>Join the club and get the benefits</div>
          <div className={styles.instruction}>
            Sign up for our newsletter and receive exclusive offers on new
            ranges, sales, pop up stores and more
          </div>
          <div className={styles.emailAddition}>
            <input
              type="text"
              placeholder="you@example.com"
              size="30"
              className={styles.emailAdditionContext}
            ></input>
            <button className={styles.btnSignup} type="submit">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;

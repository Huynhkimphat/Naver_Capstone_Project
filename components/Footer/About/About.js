import Image from "next/image";
import Logo from "../../../static/logoWhite.png";

const styles = {
  wrapper: "flex gap-y-4 flex-col text-white",
  logoContainer: "flex-start",
  logo: "cursor-pointer object-contain",
};

const About = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logo}
          height={50}
          src={Logo}
          width={76}
          alt={""}
        />
      </div>
      <div className={styles.streetInfo}>21 New York Street</div>
      <div className={styles.cityInfo}>New York City</div>
      <div className={styles.countryInfo}>United States Of America</div>
      <div className={styles.phoneInfo}>43234</div>
    </div>
  );
};

export default About;

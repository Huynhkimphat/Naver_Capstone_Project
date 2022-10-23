import Image from "next/image";
import Logo from "../../../static/logoWhite.png";
import { BsTelephone } from "react-icons/bs";
import { SiGooglestreetview } from "react-icons/si";
import { BiStreetView } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
const styles = {
  wrapper:
    "flex gap-y-4 flex-col text-white lg:w-1/4 md:w-1/2 w-full items-center ",
  logoContainer: "flex-start",
  logo: "cursor-pointer object-contain",
  streetInfo: "flex",
  icon: "p-1",
  cityName: "flex",
  countryInfo: "flex",
  phoneInfo: "flex",
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
      <div className={styles.streetInfo}>
        <div className={styles.icon}>
          <GoLocation />
        </div>
        <div className={styles.name}>21 New York Street</div>
      </div>

      <div className={styles.cityName}>
        <div className={styles.icon}>
          <BiStreetView />
        </div>
        <div className={styles.name}>New York</div>
      </div>
      <div className={styles.countryInfo}>
        <div className={styles.icon}>
          <SiGooglestreetview />
        </div>
        <div className={styles.name}> United States Of America</div>
      </div>
      <div className={styles.phoneInfo}>
        <div className={styles.icon}>
          <BsTelephone />
        </div>
        <div className={styles.name}>0703264721</div>
      </div>
    </div>
  );
};

export default About;
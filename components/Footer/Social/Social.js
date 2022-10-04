import { SiLinkedin } from "react-icons/si";
import { SiFacebook } from "react-icons/si";
import { SiInstagram } from "react-icons/si";
import { SiSkype } from "react-icons/si";
import { SiTwitter } from "react-icons/si";
import { SiPinterest } from "react-icons/si";

const styles = {
  wrapper: "text-white lg:w-1/4 md:w-1/2 w-full flex justify-center",
  socialLinkContainer: `flex flex-col gap-y-4 `,
  container: `flex gap-x-8`,
  socialLinkTitle: `text-bold text-xl text-center`,
  iconConainer: "flex gap-x-8 flex-wrap gap-y-4 justify-center",
  icon: "text-xl hover:text-[red] cursor-pointer rounded-full",
};

const Social = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.socialLinkContainer}>
        <div className={styles.socialLinkTitle}>Social Links</div>
        <div className={styles.iconConainer}>
          <div className={styles.container}>
            <div className={styles.icon}>
              <SiLinkedin />
            </div>
            <div className={styles.icon}>
              <SiFacebook />
            </div>
            <div className={styles.icon}>
              <SiInstagram />
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.icon}>
              <SiSkype />
            </div>
            <div className={styles.icon}>
              <SiTwitter />
            </div>
            <div className={styles.icon}>
              <SiPinterest />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;

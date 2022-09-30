import { SiLinkedin } from "react-icons/si";
import { SiFacebook } from "react-icons/si";
import { SiInstagram } from "react-icons/si";
import { SiSkype } from "react-icons/si";
import { SiTwitter } from "react-icons/si";
import { SiPinterest } from "react-icons/si";

const styles = {
  wrapper: "text-white",
  socialLinkContainer: `flex flex-col gap-y-4 `,
  socialLinkTitle: `text-bold text-xl`,
  iconConainer: "flex gap-x-8 flex-wrap gap-y-4",
  icon: "text-xl hover:text-[red] cursor-pointer rounded-full",
};

const Social = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.socialLinkContainer}>
        <div className={styles.socialLinkTitle}>Social Links</div>
        <div className={styles.iconConainer}>
          <div className={styles.icon}>
            <SiLinkedin />
          </div>
          <div className={styles.icon}>
            <SiFacebook />
          </div>
          <div className={styles.icon}>
            <SiInstagram />
          </div>
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
  );
};

export default Social;

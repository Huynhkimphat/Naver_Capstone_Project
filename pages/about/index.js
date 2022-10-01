import Layout from "../../components/Layout";
import AboutContent from "../../components/AboutContent/AboutContent";
import AboutLogo from "../../static/AboutImage.png";
import AboutLogo1 from "../../static/AboutImage2.png";

const styles = {
  wrapper: "mx-auto max-w-7xl flex",
  content: " ",
  title: "flex justify-center items-center p-8 text-3xl flex-col",
};

const aboutLists = [
  {
    id: 1,
    title: `From a studio in London to a global brand with over 400 outlets`,
    label1: `When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market.`,
    label2: `Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.`,
    logo: AboutLogo,
    isReverse: false,
  },
  {
    id: 2,
    title: `Our service isn’t just personal, it’s actually hyper personally exquisite`,
    label1: `When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market.`,
    label2: `Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.`,
    logo: AboutLogo1,
    isReverse: true,
  },
];

export default function About() {
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>
            <div>A brand built on the love of craftmanship,</div>
            <div>quality and outstanding customer service</div>
          </div>
          <div className={styles.aboutContentContainer}>
            {aboutLists.map((item) => (
              <AboutContent key={item.id} data={item} />
            ))}
          </div>
          {/* What... */}
          {/* Join and feedback */}
        </div>
      </div>
    </Layout>
  );
}

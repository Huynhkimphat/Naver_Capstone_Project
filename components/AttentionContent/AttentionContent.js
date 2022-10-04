import { TbCarCrash } from "react-icons/tb";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineCreditCard } from "react-icons/ai";
import { TbLeaf } from "react-icons/tb";

const styles = {
  wrapper: "lg:p-14 p-6 text-xl",
  title: "pb-12 text-2xl text-center",
  container: "grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 md:gap-x-6 gap-y-8",
  item: "md:mr-15 md:mb-15 bg-zinc-50 md:p-8 p-5",
  icon: "text-2xl",
  mainContent: "pt-4 pb-3",
  description: "text-sm",
};

const attentionList = [
  {
    id: 1,
    icon: <TbCarCrash />,
    mainContent: `Next day as standard`,
    description: `Order before 3pm and get your order the next day as standard`,
  },
  {
    id: 2,
    icon: <BsCheckCircle />,
    mainContent: `Made by true artisans`,
    description: `Handmade crafted goods made with real passion and craftmanship`,
  },
  {
    id: 3,
    icon: <AiOutlineCreditCard />,
    mainContent: `Unbeatable prices`,
    description: `For our materials and quality you won’t find better prices anywhere`,
  },
  {
    id: 4,
    icon: <TbLeaf />,
    mainContent: `Recycled packaging`,
    description: `We use 100% recycled packaging to ensure our footprint is manageable`,
  },
];

const AttentionContent = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>What makes our brand different?</div>
      <div className={styles.container}>
        {attentionList.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.icon}>
              {item.icon}
            </div>
            <div className={styles.mainContent}>{item.mainContent}</div>
            <div className={styles.description}>{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttentionContent;

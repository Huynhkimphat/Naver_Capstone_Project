const styles = {
  content: "text-white flex flex-col gap-y-3",
  title: "text-bold text-xl",
  footerItem: "hover:text-[red] cursor-pointer",
};

const FooterList = (props) => {
  const footerList = props.footerList;
  console.log(footerList);

  const footerItemRendering = footerList?.map((item) => (
    <div key={item.id} className={styles.footerItem}>
      {item.name}
    </div>
  ));
  return (
    <div className={styles.content}>
      <div className={styles.title}>{props.title}</div>
      {footerItemRendering}
    </div>
  );
};

export default FooterList;

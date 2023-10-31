import cls from "classnames";

const RippleLoader = ({ sm }: { sm?: boolean }) => {
  return (
    <div className={cls("loaderRipple", sm && "loaderRipple--sm")}>
      <div></div>
      <div></div>
    </div>
  );
};

export default RippleLoader;

import cls from "classnames";

const VerticalBarLoader = ({ align, sm }: { align?: string; sm?: boolean }) => {
  return (
    <div className={align || "text-center"}>
      <div className={cls("loaderVBars", sm && "loaderVBars--sm")}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default VerticalBarLoader;

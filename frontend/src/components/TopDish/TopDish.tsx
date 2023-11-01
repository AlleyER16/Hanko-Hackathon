import { useNavigate } from "react-router-dom";
import cls from "classnames";

import { IonIcon } from "@ionic/react";
import { arrowForwardOutline } from "ionicons/icons";

import { tMeal } from "../../store/types/app.types";

const TopDish = ({
  _id,
  Name,
  Calories,
  PicturePath,
  right,
}: tMeal & { right?: boolean }) => {
  const navigate = useNavigate();

  const [name1, ...name2] = Name.split(" ");

  return (
    <div
      className={cls(
        "top-dish-container",
        right && "top-dish-container--right"
      )}
    >
      <div className={cls("top-dish", right && "top-dish--right")}>
        <div className="top-dish__img-block">
          <div className="top-dish__calories">{Calories} CR</div>
          <img src={PicturePath} alt="" className="top-dish__img" />
        </div>
        <div className="top-dish__content">
          <h1 className="top-dish__heading">{name1}</h1>
          <h3 className="top-dish__sub-heading">{name2.join(" ")}</h3>
          <p className="top-dish__description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
            quisquam enim ipsum ullam iusto quia dolore
          </p>
          <button
            className="top-dish__action"
            onClick={() => navigate(`/meal/${_id}`)}
          >
            view product
            <IonIcon icon={arrowForwardOutline} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopDish;

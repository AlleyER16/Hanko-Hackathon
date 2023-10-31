import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IonIcon } from "@ionic/react";
import {
  star,
  starOutline,
  cartOutline,
  starHalfOutline,
  removeCircleOutline,
} from "ionicons/icons";

import { tMeal } from "../../store/types/app.types";

import { addMealToCart, removeMealFromCart } from "../../store/cartReducer";

import useData from "../../hooks/useData/useData";

import { roundDP } from "../../utils/func";

const Product = (meal: tMeal) => {
  const { _id, Name, AvgRatings, Price, PicturePath } = meal;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { inCart } = useData();

  const mealInCart = inCart(_id);

  return (
    <div className="product">
      <span className="product__label">sale</span>
      <img src={PicturePath} alt="" className="product__img" />
      <div className="product__name" onClick={() => navigate(`/meal/${_id}`)}>
        {Name}
      </div>
      <div className="product__stars">
        {new Array(5).fill(null).map((_, i) => (
          <IonIcon
            icon={
              AvgRatings >= i + 1
                ? star
                : AvgRatings > i && AvgRatings < i + 1
                ? starHalfOutline
                : starOutline
            }
            key={i}
          />
        ))}
      </div>
      <p className="product__price">&#8358; {roundDP(Price, 2)}</p>
      <button
        className="product__btn"
        onClick={() =>
          mealInCart
            ? dispatch(removeMealFromCart(_id))
            : dispatch(addMealToCart(meal))
        }
      >
        <IonIcon icon={mealInCart ? removeCircleOutline : cartOutline} />{" "}
        {mealInCart ? "Remove from cart" : "+ Add to Cart"}
      </button>
    </div>
  );
};

export default Product;

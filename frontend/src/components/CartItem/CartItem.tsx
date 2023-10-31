import { useDispatch } from "react-redux";

import { IonIcon } from "@ionic/react";
import {
  star,
  starOutline,
  addOutline,
  removeOutline,
  closeOutline,
  starHalfOutline,
} from "ionicons/icons";

import { tCartItem } from "../../store/types/app.types";
import { removeMealFromCart, updateQuantity } from "../../store/cartReducer";

import { roundDP } from "../../utils/func";

const CartItem = (cartItem: tCartItem) => {
  const {
    meal: { _id, Name, AvgRatings, Price, PicturePath },
    quantity,
  } = cartItem;

  const dispatch = useDispatch();

  return (
    <tr>
      <td>
        <div className="cart-product">
          <img src={PicturePath} alt="" className="cart-product__img" />
        </div>
      </td>
      <td>
        <div className="cart-product-info">
          <div className="cart-product-info__name">{Name}</div>
          <div className="cart-product-info__stars">
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
        </div>
      </td>
      <td className="cart-table__price">
        <div className="cart-product-info-2">
          <p className="cart-product-info-2__key">Unit Price (&#8358;)</p>
          <p className="cart-product-info-2__value">{roundDP(Price, 0)}</p>
        </div>
      </td>
      <td>
        <div className="cart-product-info-2">
          <p className="cart-product-info-2__key">Quantity</p>
          <p className="cart-product-info-2__value cart-actions">
            <span
              onClick={() =>
                dispatch(updateQuantity({ mealId: _id, type: "dec" }))
              }
            >
              <IonIcon icon={removeOutline} />
            </span>
            {quantity}
            <span
              onClick={() =>
                dispatch(updateQuantity({ mealId: _id, type: "inc" }))
              }
            >
              <IonIcon icon={addOutline} />
            </span>
          </p>
        </div>
      </td>
      <td>
        <div className="cart-product-info-2">
          <p className="cart-product-info-2__key">Price (&#8358;)</p>
          <p className="cart-product-info-2__value">
            {roundDP(Price * quantity, 0)}
          </p>
        </div>
      </td>
      <td>
        <div className="cart-remove">
          <div
            className="cart-remove__icon-block"
            onClick={() => dispatch(removeMealFromCart(_id))}
          >
            <IonIcon icon={closeOutline} />
          </div>
          <div className="cart-remove__text">Remove</div>
        </div>
      </td>
    </tr>
  );
};

export default CartItem;

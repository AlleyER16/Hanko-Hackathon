import { useNavigate } from "react-router-dom";

import { IonIcon } from "@ionic/react";
import { eyeOutline } from "ionicons/icons";

import { tOrder } from "../../store/types/app.types";

import { roundDP } from "../../utils/func";

const getStatusInfo = (status: string) => {
  if (status === "PENDING-PAYMENT") return ["info", "PENDING"];
  if (status === "IN-PROGRESS") return ["pending", "TRANSIT"];
  if (status === "DELIVERED") return ["success", "DELIVERED"];

  return ["danger", "CANCELED"];
};

const OrderItem = ({
  _id,
  ShippingInformation: { Name, Telephone },
  Status,
  TotalAmount,
  Meals,
}: tOrder) => {
  const navigate = useNavigate();

  const meal = Meals[0]!.Meal;

  const [statusClass, statusText] = getStatusInfo(Status);

  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className={`cart-badge cart-badge--${statusClass}`}>
            {statusText}
          </div>
          <img src={meal.PicturePath} alt="" className="cart-product__img" />
        </div>
      </td>
      <td>
        <div className="cart-product-info">
          <div className="cart-product-info__name cart-product-info__name--1">
            {Name} <br />
            <small> Telephone: {Telephone} </small>
          </div>
        </div>
      </td>
      <td>
        <div className="cart-product-info-2">
          <p className="cart-product-info-2__key">Meals</p>
          <p className="cart-product-info-2__value cart-actions">
            {Meals.length}
          </p>
        </div>
      </td>
      <td>
        <div className="cart-product-info-2">
          <p className="cart-product-info-2__key">Amount</p>
          <p className="cart-product-info-2__value">
            {roundDP(TotalAmount, 2)}
          </p>
        </div>
      </td>
      <td>
        <div className="cart-remove">
          <div
            className="cart-remove__icon-block cart-remove__icon-block--1"
            onClick={() => navigate(`/order/${_id}`)}
          >
            <IonIcon icon={eyeOutline} />
          </div>
          <div className="cart-remove__text">View</div>
        </div>
      </td>
    </tr>
  );
};

export default OrderItem;

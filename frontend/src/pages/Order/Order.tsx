import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { IonIcon } from "@ionic/react";
import {
  callOutline,
  star,
  starHalfOutline,
  starOutline,
} from "ionicons/icons";

import api_client from "../../api/client";

import { tRootState } from "../../store";
import { tOrder } from "../../store/types/app.types";

import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import RippleLoader from "../../loaders/RippleLoader/RippleLoader";

import { roundDP, sleep } from "../../utils/func";

const Order = () => {
  const { id: orderId } = useParams();

  const navigate = useNavigate();

  const accessToken = useSelector(
    (state: tRootState) => state.auth.accessToken
  );

  const [order, setOrder] = useState<tOrder | null>(null);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    api_client({
      url: `/orders/${orderId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        setOrder(res.data.data);
      })
      .catch(() => {
        navigate("/404");
      })
      .finally(() => {
        if (order?.Status === "PENDING-PAYMENT")
          sleep(3000).then(() => setReload((rl) => !rl));
      });
  }, [accessToken, navigate, reload, order?.Status, orderId]);

  return (
    <>
      <Navigation />
      <section className="cart">
        {order ? (
          <>
            <div className="cart__left">
              <div className="cart__left-main">
                <div className="cart-block">
                  <h3 className="cart-block__heading">Order</h3>
                  <div className="cart-block__products">
                    <table className="cart-table">
                      <tbody>
                        {order.Meals.map((orderItem) => {
                          return (
                            <tr key={orderItem.Meal._id}>
                              <td>
                                <div className="cart-product">
                                  <img
                                    src={orderItem.Meal.PicturePath}
                                    alt=""
                                    className="cart-product__img"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="cart-product-info">
                                  <div className="cart-product-info__name">
                                    {orderItem.Meal.Name}
                                  </div>
                                  <div className="cart-product-info__stars">
                                    {new Array(5).fill(null).map((_, i) => (
                                      <IonIcon
                                        icon={
                                          orderItem.Meal.AvgRatings >= i + 1
                                            ? star
                                            : orderItem.Meal.AvgRatings > i &&
                                              orderItem.Meal.AvgRatings < i + 1
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
                                  <p className="cart-product-info-2__key">
                                    Unit Price (&#8358;)
                                  </p>
                                  <p className="cart-product-info-2__value">
                                    {roundDP(orderItem.Meal.Price, 0)}
                                  </p>
                                </div>
                              </td>
                              <td>
                                <div className="cart-product-info-2">
                                  <p className="cart-product-info-2__key">
                                    Quantity
                                  </p>
                                  <p className="cart-product-info-2__value cart-actions">
                                    {orderItem.Quantity}
                                  </p>
                                </div>
                              </td>
                              <td>
                                <div className="cart-product-info-2">
                                  <p className="cart-product-info-2__key">
                                    Price (&#8358;)
                                  </p>
                                  <p className="cart-product-info-2__value">
                                    {roundDP(orderItem.TotalAmount, 0)}
                                  </p>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="cart-block__subtotal">
                      <p>Total: &#8358; {roundDP(order.MealsAmount, 2)}</p>
                      <p>
                        Delivery Fee: &#8358; {roundDP(order.DeliveryFee, 2)}
                      </p>
                      <p>Sub Total: &#8358; {roundDP(order.TotalAmount, 2)}</p>
                    </div>
                    <span className="cart-block__products-label">Bought</span>
                    <p className="cart-block__products-info">{order.Status}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="cart__right">
              <div className="header-2__menu">
                <div className="header-menu header-menu--shadow">
                  <div className="header-menu__icon-block">
                    <IonIcon icon={callOutline} />
                  </div>
                  (+234) 907 319 3054
                </div>
              </div>
              <div className="cart__right-main">
                <div className="payment-block">
                  <h3 className="payment-block__heading">
                    Delivery Information
                  </h3>
                  <p className="payment-block__text">Contact delivered to</p>
                  <div>
                    <p>
                      <strong>Name:</strong> {order.ShippingInformation.Name}
                    </p>
                    <p>
                      <strong>Telephone:</strong>{" "}
                      {order.ShippingInformation.Telephone}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {order.ShippingInformation.Address}
                    </p>
                    <p>
                      <strong>Extra Instructions:</strong>{" "}
                      {order.ShippingInformation.ExtraInstructions}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="cart-loader">
            <RippleLoader />
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Order;

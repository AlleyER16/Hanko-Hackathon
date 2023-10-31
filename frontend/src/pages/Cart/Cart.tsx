import { useState, useRef, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cls from "classnames";

import { IonIcon } from "@ionic/react";
import { callOutline } from "ionicons/icons";

import api_client from "../../api/client";

import { tRootState } from "../../store";
import { clearCart } from "../../store/cartReducer";

import useAlert from "../../hooks/useAlert/useAlert";

import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import CartItem from "../../components/CartItem/CartItem";

import { roundDP } from "../../utils/func";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state: tRootState) => state.cart.cart);
  const accessToken = useSelector(
    (state: tRootState) => state.auth.accessToken
  );

  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [extraInstructions, setExtraInstructions] = useState("");

  const submitBtnRef = useRef<HTMLButtonElement>({} as HTMLButtonElement);

  const [message, setMessage, clearMessage] = useAlert();

  const initiatePaystack = (transaction: {
    Order: string;
    PaystackRefID: string;
    Amount: number;
    EmailAddress: string;
  }) => {
    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEK,
      email: transaction.EmailAddress,
      amount: transaction.Amount * 100,
      currency: "NGN",
      ref: transaction.PaystackRefID,
      metadata: {
        order_id: transaction.Order,
      },
      onClose: function () {
        // do nothing
      },
      callback: function () {
        navigate(`/order/${transaction.Order}`);

        const interval = window.setInterval(() => {
          dispatch(clearCart());

          window.clearInterval(interval);
        }, 3000);
      },
    });
    handler.openIframe();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cart.length)
      return setMessage("warning", "You have no product in cart");

    if (!name || !telephone || !address)
      return setMessage("warning", "Fill in all required fields");

    const target = submitBtnRef.current;

    target.innerHTML = `
      <div class="loaderRipple loaderRipple--btn">
        <div></div>
        <div></div>
      </div>
    `;
    target.setAttribute("disabled", "disabled");

    api_client({
      url: "/orders",
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        meals: cart.map((cartItem) => ({
          _id: cartItem.meal._id,
          quantity: cartItem.quantity,
        })),
        shippingInfo: {
          Name: name,
          Telephone: telephone,
          Address: address,
          ExtraInstructions: extraInstructions,
        },
      },
    })
      .then((res) => {
        initiatePaystack({
          ...res.data.data.transaction,
          EmailAddress: res.data.data.email,
        });
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          setMessage("warning", err.response.data.message);
        } else {
          setMessage("error", err.message);
        }
      })
      .finally(() => {
        target.removeAttribute("disabled");
        target.innerHTML = "Checkout";
      });
  };

  useEffect(() => {
    clearMessage();
  }, [name, telephone, address, extraInstructions, clearMessage]);

  const totalPrice = cart.reduce((a, b) => a + b.meal.Price * b.quantity, 0);

  return (
    <>
      <Navigation />
      <section className="cart">
        <div className="cart__left">
          <div className="cart__left-main">
            <div className="cart-block">
              <h3 className="cart-block__heading">Shopping Cart</h3>
              <div className="cart-block__products">
                <table className="cart-table">
                  <tbody>
                    {cart.map((cartItem) => (
                      <CartItem {...cartItem} key={cartItem.meal._id} />
                    ))}

                    {!cart.length ? (
                      <tr>
                        <td colSpan={7} className="text-center py-medium">
                          You have no meal in cart
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>

                {cart.length ? (
                  <div className="cart-block__subtotal">
                    <p>Total: &#8358; {roundDP(totalPrice, 2)}</p>
                    <p>Delivery Fee: &#8358; 500.00</p>
                    <p>Sub Total: &#8358; {roundDP(totalPrice + 500, 2)}</p>
                  </div>
                ) : null}

                <span className="cart-block__products-label">sale</span>
                <p className="cart-block__products-info">Your Meals</p>
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
              <h3 className="payment-block__heading">Delivery Information</h3>
              <p className="payment-block__text">
                <strong>Note:</strong> At the moment we only make deliveries to
                addresses within Ibadan, Oyo State, Nigeria
              </p>
              <span className="payment-block__info"> Fill in the data </span>
              <form className="payment-block__form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={cls("form-input", name && "form-input--filled")}
                    placeholder="Name E.g John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="form-label">Name *</div>
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Telephone E.g +2349073193054"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                  <div className="form-label">Telephone *</div>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-input"
                    placeholder="Address"
                    rows={5}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                  <div className="form-label">Address *</div>
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Extra Instructions E.g Call when you get to Water Bus Stop"
                    value={extraInstructions}
                    onChange={(e) => setExtraInstructions(e.target.value)}
                  />
                  <div className="form-label">Extra Instructions</div>
                </div>
                {message}
                <div className="d-flex">
                  <button className="button" ref={submitBtnRef}>
                    Checkout
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
